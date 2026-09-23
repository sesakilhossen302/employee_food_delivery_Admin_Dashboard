import React from 'react';
import { Order, Product, Driver, StoreSettings, OrderStatus } from '../types';
import { OrderCard } from '../components/orders/OrderCard';
import {
  ShoppingBag,
  TrendingUp,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  orders: Order[];
  products: Product[];
  drivers: Driver[];
  storeSettings: StoreSettings;
  onOpenDetails: (order: Order) => void;
  onQuickAdvance: (orderId: string, nextStatus: OrderStatus) => void;
}

export const DashboardOverview: React.FC<Props> = ({
  orders,
  products,
  drivers,
  storeSettings,
  onOpenDetails,
  onQuickAdvance,
}) => {
  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);

  const stats = [
    {
      title: 'Active Orders',
      value: activeOrders.length,
      sub: `${orders.filter(o => o.status === 'received').length} need confirmation`,
      icon: ShoppingBag,
      color: 'bg-amber-500/10 text-amber-600',
    },
    {
      title: 'Out for Delivery',
      value: orders.filter((o) => o.status === 'out_for_delivery').length,
      sub: 'En route to customer',
      icon: Truck,
      color: 'bg-sky-500/10 text-sky-600',
    },
    {
      title: 'Delivered (Today)',
      value: deliveredOrders.length,
      sub: 'Cash collected & closed',
      icon: CheckCircle,
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Sold Out Items',
      value: outOfStockCount,
      sub: 'Staff marked unavailable',
      icon: AlertTriangle,
      color: 'bg-rose-500/10 text-rose-600',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold">
            <span>ðŸª Little Arrows Delivery Live Hub</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">{storeSettings.storeName}</h2>
          <p className="text-sm text-slate-300">
            {storeSettings.bannerMessage} â€¢ Monitor active orders, print packing slips, and manage stock in real-time.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.title}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{s.value}</h3>
                <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
              </div>
              <div className={`p-3.5 rounded-2xl ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Current Active Orders</h3>
            <p className="text-xs text-slate-500">Live order pipeline with instant packing slip printing</p>
          </div>
          <Link
            to="/orders"
            className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-3.5 py-2 rounded-xl transition"
          >
            <span>View Full Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            No active orders right now. New customer orders will pop up here live!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                storeSettings={storeSettings}
                onOpenDetails={onOpenDetails}
                onQuickAdvance={onQuickAdvance}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

