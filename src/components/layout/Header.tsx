import React from 'react';
import { Bell, Search, User, ShieldCheck } from 'lucide-react';
import { StoreSettings } from '../../types';

interface Props {
  storeSettings: StoreSettings;
  activeOrdersCount: number;
}

export const Header: React.FC<Props> = ({ storeSettings, activeOrdersCount }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search orders, products, customers..."
          className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-sky-400 focus:outline-none transition"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        {/* Active Order Alert Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>{activeOrdersCount} Active Orders</span>
        </div>

        {/* Staff User Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Store Manager</p>
            <span className="text-[10px] text-slate-400">Admin Staff</span>
          </div>
        </div>

      </div>

    </header>
  );
};
