# Gas Station & Convenience Store - Admin Dashboard ⛽ 🏪

Modern, responsive Admin Dashboard for managing gas station food, drinks, convenience items, and local deliveries. Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Live 6-Stage Order Lifecycle**:
   - `1. Order Received` ➔ `2. Order Confirmed` ➔ `3. Preparing` ➔ `4. Ready for Driver` ➔ `5. Out for Delivery` ➔ `6. Delivered & Paid`.
   - Real-time updates and driver assignment modal.
2. **🖨️ Customer Order Packing Slip / Invoice PDF**:
   - Printable receipt with store logo, customer delivery address, special delivery notes, itemized table, taxes, tiered delivery fee, and total cash due.
   - Designed to be printed and attached to grocery bags.
3. **Catalog & Inventory Management**:
   - Gas station categories (Drinks & Pop, Energy Drinks, Chips, Candy, Ice Cream, Automotive & Fluids, Ice, Firewood, Grocery).
   - **Instant "In Stock" / "Sold Out" toggle switch** so staff can immediately mark unavailable items.
   - Add new product with pricing, sale price, unit, and image.
4. **Delivery Zone & Pricing Tiers**:
   - Radial distance settings (km).
   - Distance tiers (0-5 km, 5-10 km, 10-20 km).
   - Minimum subtotal threshold for Free Delivery.
5. **Store Settings**:
   - Toggle **Store Pickup** and **Pay at Door**.
   - Configurable Sales Tax rate percentage.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Real-Time**: Socket.io-client
- **HTTP Client**: Axios