import React, { useState } from 'react';
import { StoreSettings } from '../types';
import { Store, ShieldCheck, CheckCircle } from 'lucide-react';

interface Props {
  settings: StoreSettings;
  onSave: (settings: StoreSettings) => void;
}

export const StoreSettingsPage: React.FC<Props> = ({ settings, onSave }) => {
  const [storeName, setStoreName] = useState(settings.storeName);
  const [storePhone, setStorePhone] = useState(settings.storePhone);
  const [storeEmail, setStoreEmail] = useState(settings.storeEmail);
  const [taxRatePercent, setTaxRatePercent] = useState(settings.taxRatePercent.toString());
  const [enableStorePickup, setEnableStorePickup] = useState(settings.enableStorePickup);
  const [enablePayAtDoor, setEnablePayAtDoor] = useState(settings.enablePayAtDoor);
  const [bannerMessage, setBannerMessage] = useState(settings.bannerMessage);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      storeName,
      storePhone,
      storeEmail,
      taxRatePercent: parseFloat(taxRatePercent) || 8.5,
      enableStorePickup,
      enablePayAtDoor,
      bannerMessage,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Store & Checkout Settings</h2>
        <p className="text-xs text-slate-500">
          Configure Gas Station branding, pickup availability, taxes, and cash payment options
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Store settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5 text-xs">
        
        <div className="space-y-3">
          <h4 className="font-extrabold text-sm text-slate-900">General Information</h4>
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Store / Gas Station Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Store Contact Phone</label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Store Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Customer App Announcement Banner</label>
            <input
              type="text"
              value={bannerMessage}
              onChange={(e) => setBannerMessage(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900">Taxes & Payment Features (Dakota Spec)</h4>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Store Pickup Option</p>
              <p className="text-slate-400 text-[11px]">Allow customers to select "Store Pickup" at checkout</p>
            </div>
            <input
              type="checkbox"
              checked={enableStorePickup}
              onChange={(e) => setEnableStorePickup(e.target.checked)}
              className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Pay at Door</p>
              <p className="text-slate-400 text-[11px]">Allow customers to pay cash directly to driver upon arrival</p>
            </div>
            <input
              type="checkbox"
              checked={enablePayAtDoor}
              onChange={(e) => setEnablePayAtDoor(e.target.checked)}
              className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Applicable Sales Tax Percentage (%)</p>
              <p className="text-slate-400 text-[11px]">Automatically added to customer shopping cart</p>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                value={taxRatePercent}
                onChange={(e) => setTaxRatePercent(e.target.value)}
                className="w-20 bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-right"
              />
              <span className="font-bold text-slate-500">%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition shadow-sm"
          >
            Save Settings
          </button>
        </div>

      </form>
    </div>
  );
};
