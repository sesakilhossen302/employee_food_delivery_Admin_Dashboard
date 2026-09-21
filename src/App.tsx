import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  initialOrders,
  initialProducts,
  initialCategories,
  initialDrivers,
  initialStoreSettings,
  initialDeliverySettings,
} from './services/mockData';
import { Order, Product, OrderStatus, DeliverySettings, StoreSettings } from './types';
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
  const [categories, setCategories] = useState(initialCategories);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(initialStoreSettings);
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(initialDeliverySettings);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status transitions
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
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
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Add Product
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
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
                onSave={setStoreSettings}
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
