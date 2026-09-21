import React, { useState } from 'react';
import { Order, OrderStatus, Driver, StoreSettings } from '../types';
import { OrderCard } from '../components/orders/OrderCard';
import { OrderDetailsModal } from '../components/orders/OrderDetailsModal';
import { Search, Filter, RefreshCw, ShoppingBag } from 'lucide-react';

interface Props {
  orders: Order[];
  drivers: Driver[];
  storeSettings: StoreSettings;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAssignDriver: (orderId: string, driverId: string) => void;
}

export const LiveOrders: React.FC<Props> = ({
  orders,
  drivers,
  storeSettings,
  onUpdateStatus,
  onAssignDriver,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const tabs: { key: string; label: string; count: number }[] = [
    { key: 'all', label: 'All Active', count: orders.filter(o => o.status !== 'delivered').length },
    { key: 'received', label: '1. Received', count: orders.filter(o => o.status === 'received').length },
    { key: 'confirmed', label: '2. Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
    { key: 'preparing', label: '3. Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'ready_for_driver', label: '4. Ready for Driver', count: orders.filter(o => o.status === 'ready_for_driver').length },
    { key: 'out_for_delivery', label: '5. Out for Delivery', count: orders.filter(o => o.status === 'out_for_delivery').length },
    { key: 'delivered', label: '6. Delivered (History)', count: orders.filter(o => o.status === 'delivered').length },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesTab =
      activeTab === 'all'
        ? o.status !== 'delivered'
        : o.status === activeTab;

    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.includes(search);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Order Pipeline</h2>
          <p className="text-xs text-slate-500">
            6-stage order lifecycle tracking according to Dakota Convenience Store specifications
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order # or customer..."
            className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition shadow-sm"
          />
        </div>
      </div>

      {/* Status Pipeline Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-700">No orders found in this stage</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When customer orders reach this stage, they will appear here with packing slip and driver assignment options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              storeSettings={storeSettings}
              onOpenDetails={(ord) => setSelectedOrder(ord)}
              onQuickAdvance={(id, next) => onUpdateStatus(id, next)}
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          drivers={drivers}
          storeSettings={storeSettings}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={(id, st) => {
            onUpdateStatus(id, st);
            setSelectedOrder((prev) => (prev ? { ...prev, status: st } : null));
          }}
          onAssignDriver={(orderId, drvId) => {
            onAssignDriver(orderId, drvId);
            const drv = drivers.find(d => d.id === drvId);
            if (drv) {
              setSelectedOrder((prev) => (prev ? {
                ...prev,
                assignedDriver: { id: drv.id, name: drv.name, phone: drv.phone }
              } : null));
            }
          }}
        />
      )}

    </div>
  );
};
