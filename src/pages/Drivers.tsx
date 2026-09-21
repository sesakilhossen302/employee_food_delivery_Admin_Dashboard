import React from 'react';
import { Driver } from '../types';
import { Truck, Phone, CheckCircle, Clock } from 'lucide-react';

interface Props {
  drivers: Driver[];
}

export const DriversPage: React.FC<Props> = ({ drivers }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Delivery Drivers</h2>
        <p className="text-xs text-slate-500">
          Staff and local couriers assigned to gas station food and convenience orders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {drivers.map((d) => (
          <div key={d.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{d.name}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" /> {d.phone}
                  </p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                d.status === 'available'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {d.status.replace('_', ' ')}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Vehicle:</span>
                <span className="font-bold text-slate-800">{d.vehicle}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Active Deliveries:</span>
                <span className="font-bold text-sky-600">{d.activeOrdersCount} in progress</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Completed Orders:</span>
                <span className="font-bold text-emerald-700">{d.totalDeliveries}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
