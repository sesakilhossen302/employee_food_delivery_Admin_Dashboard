import React, { useState } from 'react';
import { DeliverySettings, DeliveryTier } from '../types';
import { MapPin, DollarSign, Plus, Trash2, CheckCircle } from 'lucide-react';

interface Props {
  settings: DeliverySettings;
  onSave: (settings: DeliverySettings) => void;
}

export const DeliverySettingsPage: React.FC<Props> = ({ settings, onSave }) => {
  const [storeAddress, setStoreAddress] = useState(settings.storeAddress);
  const [maxRadius, setMaxRadius] = useState(settings.maxDeliveryRadiusKm.toString());
  const [freeThreshold, setFreeThreshold] = useState(settings.freeDeliveryThreshold.toString());
  const [tiers, setTiers] = useState<DeliveryTier[]>(settings.tiers);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleAddTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const newMin = lastTier ? lastTier.maxKm : 0;
    const newMax = newMin + 5;
    const newTier: DeliveryTier = {
      id: `t-${Date.now()}`,
      minKm: newMin,
      maxKm: newMax,
      fee: 5.00,
    };
    setTiers([...tiers, newTier]);
  };

  const handleRemoveTier = (id: string) => {
    setTiers(tiers.filter((t) => t.id !== id));
  };

  const handleUpdateTier = (id: string, field: 'minKm' | 'maxKm' | 'fee', val: number) => {
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...settings,
      storeAddress,
      maxDeliveryRadiusKm: parseFloat(maxRadius) || 20,
      freeDeliveryThreshold: parseFloat(freeThreshold) || 50,
      tiers,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Delivery Zone & Pricing Tiers</h2>
        <p className="text-xs text-slate-500">
          Set your delivery radius and distance-based fees according to Dakota Gas Station specifications.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Delivery configuration successfully saved!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Store Location & Radius */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900">Gas Station Location & Boundary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Store Address (Origin)</label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Maximum Delivery Radius (km)</label>
              <input
                type="number"
                value={maxRadius}
                onChange={(e) => setMaxRadius(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tiered Delivery Fees (0-5 km, 5-10 km, etc.) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Distance-Based Delivery Pricing</h3>
              <p className="text-xs text-slate-400">Customer fees calculate automatically based on delivery distance</p>
            </div>
            <button
              type="button"
              onClick={handleAddTier}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl text-xs font-bold border border-sky-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Distance Tier
            </button>
          </div>

          <div className="space-y-3">
            {tiers.map((tier, idx) => (
              <div
                key={tier.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs"
              >
                <span className="font-bold text-slate-500 w-16">Tier {idx + 1}:</span>
                
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">From</span>
                  <input
                    type="number"
                    value={tier.minKm}
                    onChange={(e) => handleUpdateTier(tier.id, 'minKm', parseFloat(e.target.value) || 0)}
                    className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center font-bold"
                  />
                  <span className="text-slate-400">km to</span>
                  <input
                    type="number"
                    value={tier.maxKm}
                    onChange={(e) => handleUpdateTier(tier.id, 'maxKm', parseFloat(e.target.value) || 0)}
                    className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center font-bold"
                  />
                  <span className="text-slate-400">km</span>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-bold text-slate-700">Fee ($):</span>
                  <input
                    type="number"
                    step="0.01"
                    value={tier.fee}
                    onChange={(e) => handleUpdateTier(tier.id, 'fee', parseFloat(e.target.value) || 0)}
                    className="w-20 bg-white border border-slate-300 rounded-lg px-2 py-1 text-right font-extrabold text-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(tier.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Free Delivery Threshold */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800">Free Delivery Minimum Order Amount:</span>
              <p className="text-[11px] text-slate-400">Orders above this subtotal get $0 delivery fee</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-500">$</span>
              <input
                type="number"
                step="1"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(e.target.value)}
                className="w-24 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-black text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Save Delivery Settings
          </button>
        </div>

      </form>

    </div>
  );
};
