import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  MapPin,
  Truck,
  Settings,
  Flame,
  Store
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/orders', label: 'Live Orders', icon: ShoppingBag, badge: 'Live' },
    { to: '/menu', label: 'Menu & Products', icon: UtensilsCrossed },
    { to: '/delivery-settings', label: 'Delivery Zones & Fees', icon: MapPin },
    { to: '/drivers', label: 'Drivers', icon: Truck },
    { to: '/store-settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800">
      
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-tight leading-none">
              LITTLE ARROWS
            </h1>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Delivery App
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                      : 'hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Store Status footer */}
      <div className="p-4 m-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-200 text-[11px]">Store Open for Delivery</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Orders are syncing live via WebSockets.
        </p>
      </div>

    </aside>
  );
};

