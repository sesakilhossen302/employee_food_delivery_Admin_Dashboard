import React, { useState } from 'react';
import { Order, OrderStatus, Driver, StoreSettings } from '../../types';
import { StatusBadge } from '../common/Badge';
import { PackingSlipModal } from './PackingSlipModal';
import { Printer, MapPin, Phone, Clock, ArrowRight, UserCheck } from 'lucide-react';

interface Props {
  order: Order;
  storeSettings: StoreSettings;
  onOpenDetails: (order: Order) => void;
  onQuickAdvance: (orderId: string, nextStatus: OrderStatus) => void;
}

export const OrderCard: React.FC<Props> = ({
  order,
  storeSettings,
  onOpenDetails,
  onQuickAdvance,
}) => {
  const [showSlip, setShowSlip] = useState(false);

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'received': return 'confirmed';
      case 'confirmed': return 'preparing';
      case 'preparing': return 'ready_for_driver';
      case 'ready_for_driver': return 'out_for_delivery';
      case 'out_for_delivery': return 'delivered';
      case 'delivered': return null;
    }
  };

  const next = getNextStatus(order.status);

  return (
    <>
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4">
        
        {/* Top Meta */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight">{order.orderNumber}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                {order.fulfillmentType}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Customer & Address */}
        <div className="space-y-1 text-xs">
          <p className="font-bold text-slate-800">{order.customer.name}</p>
          <p className="text-slate-500 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" /> {order.customer.phone}
          </p>
          {order.fulfillmentType === 'delivery' && (
            <p className="text-slate-600 flex items-start gap-1 line-clamp-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
              {order.customer.deliveryAddress}
            </p>
          )}

          {order.customer.deliveryInstructions && (
            <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px] border border-amber-200/60 line-clamp-1">
              Note: "{order.customer.deliveryInstructions}"
            </div>
          )}
        </div>

        {/* Item count & Total Price */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items ordered
          </span>
          <span className="font-extrabold text-sm text-emerald-700">
            ${order.total.toFixed(2)} <span className="text-[10px] font-normal text-slate-400">(Cash)</span>
          </span>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setShowSlip(true)}
            title="Print packing slip to staple to grocery bag"
            className="p-2 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 rounded-xl transition text-xs font-bold flex items-center gap-1"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Slip</span>
          </button>

          <button
            onClick={() => onOpenDetails(order)}
            className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition text-center"
          >
            Details
          </button>

          {next && (
            <button
              onClick={() => onQuickAdvance(order.id, next)}
              className="py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {showSlip && (
        <PackingSlipModal
          order={order}
          storeSettings={storeSettings}
          onClose={() => setShowSlip(false)}
        />
      )}
    </>
  );
};
