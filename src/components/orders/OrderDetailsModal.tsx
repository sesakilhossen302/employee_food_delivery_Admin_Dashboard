import React, { useState } from 'react';
import { Order, OrderStatus, Driver, StoreSettings } from '../../types';
import { StatusBadge } from '../common/Badge';
import { PackingSlipModal } from './PackingSlipModal';
import { X, Printer, User, Phone, MapPin, Truck, Check, Clock, AlertCircle } from 'lucide-react';

interface Props {
  order: Order;
  drivers: Driver[];
  storeSettings: StoreSettings;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  onAssignDriver: (orderId: string, driverId: string) => void;
}

export const OrderDetailsModal: React.FC<Props> = ({
  order,
  drivers,
  storeSettings,
  onClose,
  onUpdateStatus,
  onAssignDriver,
}) => {
  const [showSlip, setShowSlip] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(order.assignedDriver?.id || '');

  const statuses: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'received', label: '1. Received', desc: 'Order placed by customer' },
    { key: 'confirmed', label: '2. Confirmed', desc: 'Accepted by store' },
    { key: 'preparing', label: '3. Preparing', desc: 'Items being gathered' },
    { key: 'ready_for_driver', label: '4. Ready for Driver', desc: 'Packed with slip' },
    { key: 'out_for_delivery', label: '5. Out for Delivery', desc: 'Driver on the road' },
    { key: 'delivered', label: '6. Delivered', desc: 'Delivered & cash collected' },
  ];

  const handleDriverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const drvId = e.target.value;
    setSelectedDriver(drvId);
    if (drvId) {
      onAssignDriver(order.id, drvId);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-slate-900">{order.orderNumber}</h2>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleString()} • {order.fulfillmentType.toUpperCase()}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSlip(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-bold transition"
              >
                <Printer className="w-4 h-4" />
                Packing Slip PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Status Pipeline Controller (6 Statuses) */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Update Order Lifecycle Stage (Dakota Spec)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {statuses.map((s) => {
                  const isCurrent = order.status === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => { if (!['ready_for_driver', 'out_for_delivery', 'delivered'].includes(s.key)) { onUpdateStatus(order.id, s.key); } }}
                        disabled={['ready_for_driver', 'out_for_delivery', 'delivered'].includes(s.key)}
                        title={['ready_for_driver', 'out_for_delivery', 'delivered'].includes(s.key) ? 'This status is managed automatically by the Driver App' : ''}
                      className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between ${['ready_for_driver', 'out_for_delivery', 'delivered'].includes(s.key) ? 'opacity-50 cursor-not-allowed bg-slate-50 grayscale' : 'cursor-pointer'} ${
                        isCurrent
                          ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-sky-900' : 'text-slate-800'}`}>
                          {s.label}
                        </span>
                        {isCurrent && <Check className="w-4 h-4 text-sky-600" />}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{s.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer & Delivery Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <User className="w-4 h-4 text-sky-600" /> Customer Information
                </div>
                <p className="font-bold text-slate-900">{order.customer.name}</p>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {order.customer.phone}
                </p>
                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  {order.customer.deliveryAddress}
                </p>
                {order.customer.distanceKm && (
                  <p className="text-[11px] font-medium text-slate-500">
                    Distance: <span className="text-slate-800 font-semibold">{order.customer.distanceKm} km</span> from store
                  </p>
                )}
              </div>

              {/* Delivery Instructions & Driver Assignment */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-sky-600" /> Driver & Instructions
                </div>

                {order.customer.deliveryInstructions ? (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wide block">Customer Note:</span>
                    "{order.customer.deliveryInstructions}"
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No special delivery instructions provided.</p>
                )}

                {order.fulfillmentType === 'delivery' && (
                    <div className="mt-2">
                      {order.assignedDriver ? (
                        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-xs">
                          <span className="font-bold text-[10px] uppercase tracking-wide block mb-1 text-sky-600">Assigned Driver:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-sky-200 flex items-center justify-center shrink-0">
                               <User className="w-4 h-4 text-sky-700" />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{order.assignedDriver.name}</p>
                              <p className="text-xs opacity-75">{order.assignedDriver.phone}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                               <Truck className="w-3 h-3 text-slate-500" />
                            </div>
                           <p className="text-xs text-slate-500 font-medium">
                             Driver will accept this order from their app.
                           </p>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Order Items</h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3 text-center">Quantity</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="p-3 font-semibold text-slate-800">{item.name}</td>
                        <td className="p-3 text-center font-bold text-slate-700">{item.quantity}x</td>
                        <td className="p-3 text-right text-slate-600">${item.price.toFixed(2)}</td>
                        <td className="p-3 text-right font-bold text-slate-900">${item.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxes:</span>
                  <span>${order.taxes.toFixed(2)}</span>
                </div>
                {order.fulfillmentType === 'delivery' && (
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery Fee:</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {order.tip > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>Tip:</span>
                    <span>${order.tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                  <span>Total (Cash to Collect):</span>
                  <span className="text-base text-emerald-700">${order.total.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-400 text-right uppercase">
                  Payment: {order.paymentMethod.replace(/_/g, ' ')}
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={() => setShowSlip(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-sky-600" />
              Print Packing Slip (For Bag)
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Done
            </button>
          </div>

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
