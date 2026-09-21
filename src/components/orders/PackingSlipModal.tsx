import React from 'react';
import { Order, StoreSettings } from '../../types';
import { Printer, X, CheckCircle, MapPin, Phone, Clock, FileText } from 'lucide-react';

interface Props {
  order: Order;
  storeSettings: StoreSettings;
  onClose: () => void;
}

export const PackingSlipModal: React.FC<Props> = ({ order, storeSettings, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Order Packing Slip / Receipt</h3>
              <p className="text-xs text-slate-500">Attach this receipt with delivery bag for customer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print Receipt / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-receipt" className="p-8 overflow-y-auto font-sans text-slate-800 space-y-6 print:p-0">
          
          {/* Header */}
          <div className="text-center border-b border-dashed border-slate-300 pb-5">
            <span className="text-2xl">⛽ 🏪</span>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">{storeSettings.storeName}</h1>
            <p className="text-xs text-slate-500">{storeSettings.storePhone} • {storeSettings.storeEmail}</p>
            <div className="inline-block mt-3 px-3 py-1 bg-slate-100 rounded-md text-xs font-mono font-bold tracking-wider">
              {order.orderNumber}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Fulfillment & Payment Banner */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Fulfillment Type:</span>
              <p className="font-bold text-slate-800 uppercase tracking-wide">
                {order.fulfillmentType === 'delivery' ? '🚗 Local Delivery' : '🏪 Store Counter Pickup'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-slate-400 font-medium">Payment Method:</span>
              <p className="font-bold text-emerald-700 uppercase tracking-wide">
                💵 {order.paymentMethod.replace(/_/g, ' ')}
              </p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="space-y-2 text-xs border-b border-dashed border-slate-300 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 font-medium">Customer Name:</p>
                <p className="font-bold text-slate-900 text-sm">{order.customer.name}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 font-medium">Phone:</p>
                <p className="font-bold text-slate-900">{order.customer.phone}</p>
              </div>
            </div>

            {order.fulfillmentType === 'delivery' && (
              <div>
                <p className="text-slate-400 font-medium">Delivery Address:</p>
                <p className="font-semibold text-slate-800">{order.customer.deliveryAddress}</p>
              </div>
            )}

            {order.customer.deliveryInstructions && (
              <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200 text-amber-900">
                <span className="font-bold text-[11px] uppercase tracking-wide">Delivery Note from Customer:</span>
                <p className="font-medium text-xs mt-0.5">"{order.customer.deliveryInstructions}"</p>
              </div>
            )}
          </div>

          {/* Itemized Products List */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ordered Items</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-left">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 font-medium text-slate-800">
                      {item.name}
                      {item.sizeOrOption && (
                        <span className="block text-[10px] text-slate-400">{item.sizeOrOption}</span>
                      )}
                    </td>
                    <td className="py-2 text-center font-bold text-slate-700">{item.quantity}x</td>
                    <td className="py-2 text-right text-slate-600">${item.price.toFixed(2)}</td>
                    <td className="py-2 text-right font-bold text-slate-900">${item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="border-t border-dashed border-slate-300 pt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Sales Tax ({storeSettings.taxRatePercent}%)</span>
              <span>${order.taxes.toFixed(2)}</span>
            </div>
            {order.fulfillmentType === 'delivery' && (
              <div className="flex justify-between text-slate-600">
                <span>Distance Delivery Fee ({order.customer.distanceKm || 3} km)</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
            )}
            {order.tip > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Driver Tip</span>
                <span>${order.tip.toFixed(2)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-3 border-t border-slate-300 font-bold text-base text-slate-900">
              <span>TOTAL CASH DUE</span>
              <span className="text-xl text-emerald-700">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Bottom Sign-off */}
          <div className="border-t border-dashed border-slate-300 pt-4 text-center text-[11px] text-slate-400 space-y-1">
            <p>Thank you for shopping with {storeSettings.storeName}!</p>
            <p className="italic">Customer verification: [ &nbsp; ] Cash Collected &nbsp;&nbsp; [ &nbsp; ] Items Checked</p>
          </div>

        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print Packing Slip
          </button>
        </div>

      </div>
    </div>
  );
};
