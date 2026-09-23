import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  getOrders,
  getProducts,
  getCategories,
  getDrivers,
  getStoreSettings,
  updateOrderStatusApi,
  assignDriverApi,
  toggleProductStockApi,
  createProductApi,
  updateStoreSettingsApi,
} from './services/api';
import { socket } from './services/socket';
import {
  initialOrders,
  initialProducts,
  initialCategories,
  initialDrivers,
  initialStoreSettings,
  initialDeliverySettings,
} from './services/mockData';
import { Order, Product, OrderStatus, DeliverySettings, StoreSettings, Category, Driver } from './types';
import { Layout } from './components/layout/Layout';
import { DashboardOverview } from './pages/DashboardOverview';
import { LiveOrders } from './pages/LiveOrders';
import { MenuCatalog } from './pages/MenuCatalog';
import { DeliverySettingsPage } from './pages/DeliverySettings';
import { DriversPage } from './pages/Drivers';
import { StoreSettingsPage } from './pages/StoreSettings';
import { OrderDetailsModal } from './components/orders/OrderDetailsModal';

export const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(initialStoreSettings);
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(initialDeliverySettings);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Load Initial Live Data from Backend APIs
  useEffect(() => {
    const loadData = async () => {
      try {
        const [liveOrders, liveProducts, liveCategories, liveDrivers, liveSettings] = await Promise.all([
          getOrders(),
          getProducts(),
          getCategories(),
          getDrivers(),
          getStoreSettings(),
        ]);
        if (liveOrders.length > 0) setOrders(liveOrders);
        if (liveProducts.length > 0) setProducts(liveProducts);
        if (liveCategories.length > 0) setCategories(liveCategories);
        if (liveDrivers.length > 0) setDrivers(liveDrivers);
        if (liveSettings) setStoreSettings(liveSettings);
      } catch (err) {
        console.warn('Backend API sync notice: running with current cache', err);
      }
    };
    loadData();

    // Realtime Socket.io Listeners
    socket.on('new_order', (newOrder: Order) => {
      console.log('ðŸ”” New Live Order received via Socket.io:', newOrder);
      setOrders((prev) => [newOrder, ...prev]);
    });

    socket.on('order_status_updated', (updatedOrder: Order) => {
      console.log('âš¡ Order status updated via Socket.io:', updatedOrder);
      setOrders((prev) =>
        prev.map((o) => (o.id === (updatedOrder as any)._id || o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o))
      );
    });

    return () => {
      socket.off('new_order');
      socket.off('order_status_updated');
    };
  }, []);

  // Status transitions
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatusApi(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              paymentStatus: newStatus === 'delivered' ? 'paid' : o.paymentStatus,
            }
          : o
      )
    );
  };

  // Driver Assignment
  const handleAssignDriver = (orderId: string, driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    assignDriverApi(orderId, driver.id, driver.name, driver.phone);

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              assignedDriver: { id: driver.id, name: driver.name, phone: driver.phone },
              status: o.status === 'received' || o.status === 'confirmed' ? 'preparing' : o.status,
            }
          : o
      )
    );
  };

  // Instant Stock toggle
  const handleToggleStock = (productId: string) => {
    toggleProductStockApi(productId);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Add Product
  const handleAddProduct = async (newProd: Product) => {
    const created = await createProductApi(newProd);
    if (created) {
      setProducts((prev) => [created, ...prev]);
    } else {
      setProducts((prev) => [newProd, ...prev]);
    }
  };

  // Save Store Settings
  const handleSaveStoreSettings = (newSettings: StoreSettings) => {
    updateStoreSettingsApi(newSettings);
    setStoreSettings(newSettings);
  };

  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              storeSettings={storeSettings}
              activeOrdersCount={activeOrdersCount}
            />
          }
        >
          <Route
            path="/"
            element={
              <DashboardOverview
                orders={orders}
                products={products}
                drivers={drivers}
                storeSettings={storeSettings}
                onOpenDetails={(ord) => setSelectedOrder(ord)}
                onQuickAdvance={handleUpdateStatus}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <LiveOrders
                orders={orders}
                drivers={drivers}
                storeSettings={storeSettings}
                onUpdateStatus={handleUpdateStatus}
                onAssignDriver={handleAssignDriver}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <MenuCatalog
                categories={categories}
                products={products}
                onToggleStock={handleToggleStock}
                onAddProduct={handleAddProduct}
              />
            }
          />
          <Route
            path="/delivery-settings"
            element={
              <DeliverySettingsPage
                settings={deliverySettings}
                onSave={setDeliverySettings}
              />
            }
          />
          <Route path="/drivers" element={<DriversPage drivers={drivers} />} />
          <Route
            path="/store-settings"
            element={
              <StoreSettingsPage
                settings={storeSettings}
                onSave={handleSaveStoreSettings}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {/* Global Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          drivers={drivers}
          storeSettings={storeSettings}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(id, st) => {
            handleUpdateStatus(id, st);
            setSelectedOrder((prev) => (prev ? { ...prev, status: st } : null));
          }}
          onAssignDriver={(orderId, drvId) => {
            handleAssignDriver(orderId, drvId);
            const drv = drivers.find((d) => d.id === drvId);
            if (drv) {
              setSelectedOrder((prev) =>
                prev
                  ? {
                      ...prev,
                      assignedDriver: { id: drv.id, name: drv.name, phone: drv.phone },
                    }
                  : null
              );
            }
          }}
        />
      )}
    </BrowserRouter>
  );
};

export default App;