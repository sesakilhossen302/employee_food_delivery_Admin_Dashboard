import React, { useState } from 'react';
import { Category, Product } from '../types';
import { CreateCategoryModal } from '../components/common/CreateCategoryModal';
import { Plus, Search, Check, AlertCircle, Sparkles, Tag, Layers, X } from 'lucide-react';

interface Props {
  categories: Category[];
  products: Product[];
  onToggleStock: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
}

export const MenuCatalog: React.FC<Props> = ({
  categories,
  products,
  onToggleStock,
  onAddProduct,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // New Product form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Drinks & Pop');
  const [price, setPrice] = useState('3.99');
  const [salePrice, setSalePrice] = useState('');
  const [unit, setUnit] = useState('1 pc');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      category,
      price: parseFloat(price) || 0,
      salePrice: salePrice ? parseFloat(salePrice) : undefined,
      unit,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60',
      description,
      inStock: true,
      maxPerOrder: 12,
    };

    onAddProduct(newProd);
    setName('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Store Catalog & Menu</h2>
          <p className="text-xs text-slate-500">
            Manage gas station & convenience store items. Staff can quickly mark items sold-out.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Items ({products.length})
        </button>
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.name).length;
          const isSelected = selectedCategory === c.name;
          const catId = c.id || (c as any)._id;

          return (
            <div
              key={catId}
              className={`inline-flex items-center rounded-xl text-xs font-bold whitespace-nowrap transition border shadow-sm ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedCategory(c.name)}
                className="flex items-center gap-1.5 px-3 py-2 cursor-pointer"
              >
                <span>{c.iconEmoji || '🍲'}</span>
                <span>{c.name}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete category "${c.name}"?`)) {
                    onDeleteCategory(catId);
                  }
                }}
                className={`mr-1.5 p-1 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                }`}
                title={`Delete ${c.name} category`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => setShowCategoryModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add New Category
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
              p.inStock
                ? 'border-slate-200/80 hover:shadow-lg'
                : 'border-rose-200 bg-rose-50/10'
            }`}
          >
            {/* Product Image & Badges */}
            <div className="relative h-44 bg-slate-100 overflow-hidden">
              <img
                src={p.imageUrl}
                alt={p.name}
                className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                  !p.inStock ? 'grayscale opacity-60' : ''
                }`}
              />
              
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-extrabold shadow-sm">
                  {p.category}
                </span>
                {p.salePrice && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-extrabold shadow-sm">
                    SALE
                  </span>
                )}
              </div>

              {!p.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Content & Details */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">{p.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{p.unit}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-tight">{p.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base text-slate-900">
                      ${(p.salePrice || p.price).toFixed(2)}
                    </span>
                    {p.salePrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${p.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Instant In-Stock / Sold-Out Toggle Switch (Dakota Spec) */}
                <button
                  onClick={() => onToggleStock(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    p.inStock
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  }`}
                  title="Click to toggle stock availability"
                >
                  <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span>{p.inStock ? 'In Stock' : 'Sold Out'}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {showCategoryModal && (
        <CreateCategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSuccess={(c) => {
            onAddCategory(c);
            setShowCategoryModal(false);
          }}
        />
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Add New Product</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Monster Energy Zero Ultra"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Size / Unit</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. 16 fl oz / 1 bag"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Regular Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sale Price ($ optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="Leave blank if none"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product details..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
