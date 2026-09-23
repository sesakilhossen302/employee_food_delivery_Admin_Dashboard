import { Category, Product, Order, DeliverySettings, StoreSettings, Driver } from '../types';

export const initialStoreSettings: StoreSettings = {
  storeName: "Little Arrows Delivery App",
  storePhone: "+1 (555) 492-3810",
  storeEmail: "orders@dakotagasstore.com",
  enableStorePickup: true,
  enablePayAtDoor: true,
  taxRatePercent: 8.5,
  bannerMessage: "âš¡ Fast local delivery from your favorite convenience store & gas station!"
};

export const initialDeliverySettings: DeliverySettings = {
  storeAddress: "742 Evergreen Blvd, Dakota Hub",
  maxDeliveryRadiusKm: 20,
  freeDeliveryThreshold: 50.00,
  tiers: [
    { id: 't1', minKm: 0, maxKm: 5, fee: 3.99 },
    { id: 't2', minKm: 5, maxKm: 10, fee: 6.99 },
    { id: 't3', minKm: 10, maxKm: 20, fee: 11.99 },
  ],
  allowedPostalCodes: ["58102", "58103", "58104", "58105", "58109"]
};

export const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Drinks & Pop', iconEmoji: 'ðŸ¥¤', itemCount: 18, isActive: true },
  { id: 'cat-2', name: 'Energy Drinks', iconEmoji: 'âš¡', itemCount: 12, isActive: true },
  { id: 'cat-3', name: 'Snacks & Chips', iconEmoji: 'ðŸŸ', itemCount: 24, isActive: true },
  { id: 'cat-4', name: 'Candy & Chocolate', iconEmoji: 'ðŸ«', itemCount: 16, isActive: true },
  { id: 'cat-5', name: 'Ice Cream', iconEmoji: 'ðŸ¦', itemCount: 8, isActive: true },
  { id: 'cat-6', name: 'Automotive & Fluids', iconEmoji: 'ðŸš—', itemCount: 9, isActive: true },
  { id: 'cat-7', name: 'Ice & Coolers', iconEmoji: 'ðŸ§Š', itemCount: 4, isActive: true },
  { id: 'cat-8', name: 'Firewood & Camp', iconEmoji: 'ðŸªµ', itemCount: 5, isActive: true },
  { id: 'cat-9', name: 'Grocery & Essentials', iconEmoji: 'ðŸ›’', itemCount: 22, isActive: true },
  { id: 'cat-10', name: 'Seasonal Specials', iconEmoji: 'ðŸ”¥', itemCount: 7, isActive: true },
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Red Bull Energy Drink',
    category: 'Energy Drinks',
    price: 3.99,
    salePrice: 3.49,
    unit: '12 fl oz',
    imageUrl: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=60',
    description: 'Vitalizes body and mind. High caffeine content.',
    inStock: true,
    maxPerOrder: 12
  },
  {
    id: 'prod-2',
    name: 'Coca-Cola Classic Can',
    category: 'Drinks & Pop',
    price: 1.99,
    unit: '355ml',
    imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop&q=60',
    description: 'Classic crisp taste in a chilled can.',
    inStock: true,
    maxPerOrder: 24
  },
  {
    id: 'prod-3',
    name: 'Doritos Nacho Cheese',
    category: 'Snacks & Chips',
    price: 4.79,
    salePrice: 4.29,
    unit: '9.25 oz bag',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    description: 'Iconic triangular tortilla chips with bold nacho cheese flavor.',
    inStock: true,
    maxPerOrder: 6
  },
  {
    id: 'prod-4',
    name: 'Premium Seasoned Firewood Bundle',
    category: 'Firewood & Camp',
    price: 8.99,
    unit: 'Bundle (.75 cu ft)',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60',
    description: 'Dry, ready to burn local hardwood bundle. Great for campfires or fireplaces.',
    inStock: true,
    maxPerOrder: 4
  },
  {
    id: 'prod-5',
    name: '-20Â°F Windshield Washer Fluid',
    category: 'Automotive & Fluids',
    price: 4.49,
    unit: '1 Gallon',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&auto=format&fit=crop&q=60',
    description: 'All-season de-icer formula leaves glass streak-free.',
    inStock: true,
    maxPerOrder: 3
  },
  {
    id: 'prod-6',
    name: 'Crystal Purified Bagged Ice',
    category: 'Ice & Coolers',
    price: 2.99,
    unit: '7 lb bag',
    imageUrl: 'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=500&auto=format&fit=crop&q=60',
    description: 'Clean purified party ice cubes.',
    inStock: false, // Demo out of stock
    maxPerOrder: 5
  },
  {
    id: 'prod-7',
    name: 'Snickers King Size Candy Bar',
    category: 'Candy & Chocolate',
    price: 2.49,
    unit: '3.29 oz',
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=60',
    description: 'Milk chocolate, peanuts, caramel and nougat.',
    inStock: true,
    maxPerOrder: 10
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'drv-1',
    name: 'Marcus Vance',
    phone: '+1 (555) 304-9122',
    vehicle: 'Toyota RAV4 (Plate: DK-782)',
    status: 'available',
    activeOrdersCount: 1,
    totalDeliveries: 142
  },
  {
    id: 'drv-2',
    name: 'Sarah Connor',
    phone: '+1 (555) 782-4519',
    vehicle: 'Honda Civic (Plate: DK-319)',
    status: 'on_delivery',
    activeOrdersCount: 2,
    totalDeliveries: 89
  },
  {
    id: 'drv-3',
    name: 'Liam Peterson',
    phone: '+1 (555) 918-2041',
    vehicle: 'Ford F-150 (Plate: DK-904)',
    status: 'available',
    activeOrdersCount: 0,
    totalDeliveries: 215
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: '#GS-10024',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    customer: {
      name: 'Emily Watson',
      phone: '+1 (555) 234-8901',
      deliveryAddress: '412 Maple Ridge Rd, Apt 3B',
      deliveryInstructions: 'Leave at front door, ring doorbell once please.',
      distanceKm: 3.4
    },
    fulfillmentType: 'delivery',
    items: [
      { id: 'item-1', productId: 'prod-1', name: 'Red Bull Energy Drink', price: 3.49, quantity: 2, totalPrice: 6.98 },
      { id: 'item-2', productId: 'prod-3', name: 'Doritos Nacho Cheese', price: 4.29, quantity: 1, totalPrice: 4.29 },
      { id: 'item-3', productId: 'prod-7', name: 'Snickers King Size Candy Bar', price: 2.49, quantity: 2, totalPrice: 4.98 }
    ],
    subtotal: 16.25,
    taxes: 1.38,
    deliveryFee: 3.99,
    tip: 3.00,
    discount: 0,
    total: 24.62,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'unpaid',
    status: 'received',
    estimatedDeliveryTime: '20â€“30 min'
  },
  {
    id: 'ord-102',
    orderNumber: '#GS-10023',
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    customer: {
      name: 'James Rodriguez',
      phone: '+1 (555) 881-3092',
      deliveryAddress: '900 Riverside Campgrounds, Lot 14',
      deliveryInstructions: 'Campground entrance gate, call when you arrive.',
      distanceKm: 8.2
    },
    fulfillmentType: 'delivery',
    items: [
      { id: 'item-4', productId: 'prod-4', name: 'Premium Seasoned Firewood Bundle', price: 8.99, quantity: 2, totalPrice: 17.98 },
      { id: 'item-5', productId: 'prod-2', name: 'Coca-Cola Classic Can', price: 1.99, quantity: 6, totalPrice: 11.94 }
    ],
    subtotal: 29.92,
    taxes: 2.54,
    deliveryFee: 6.99,
    tip: 5.00,
    discount: 0,
    total: 44.45,
    paymentMethod: 'pay_at_door',
    paymentStatus: 'unpaid',
    status: 'preparing',
    assignedDriver: {
      id: 'drv-1',
      name: 'Marcus Vance',
      phone: '+1 (555) 304-9122'
    },
    estimatedDeliveryTime: '15â€“25 min'
  },
  {
    id: 'ord-103',
    orderNumber: '#GS-10022',
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    customer: {
      name: 'David Miller',
      phone: '+1 (555) 774-1290',
      deliveryAddress: 'Store Counter Pickup',
      deliveryInstructions: 'Customer picking up at cashier counter.',
      distanceKm: 0
    },
    fulfillmentType: 'pickup',
    items: [
      { id: 'item-6', productId: 'prod-5', name: '-20Â°F Windshield Washer Fluid', price: 4.49, quantity: 2, totalPrice: 8.98 }
    ],
    subtotal: 8.98,
    taxes: 0.76,
    deliveryFee: 0,
    tip: 0,
    discount: 0,
    total: 9.74,
    paymentMethod: 'cash_at_pickup',
    paymentStatus: 'paid',
    status: 'delivered'
  }
];

