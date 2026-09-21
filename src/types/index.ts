export type OrderStatus =
  | 'received'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_driver'
  | 'out_for_delivery'
  | 'delivered';

export type PaymentMethod =
  | 'cash_on_delivery'
  | 'pay_at_door'
  | 'cash_at_pickup';

export type FulfillmentType = 'delivery' | 'pickup';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  sizeOrOption?: string;
  totalPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  distanceKm?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  fulfillmentType: FulfillmentType;
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  deliveryFee: number;
  tip: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'unpaid' | 'paid';
  status: OrderStatus;
  assignedDriver?: {
    id: string;
    name: string;
    phone: string;
  };
  estimatedDeliveryTime?: string;
}

export interface Category {
  id: string;
  name: string;
  iconEmoji: string;
  iconUrl?: string;
  itemCount: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  unit: string; // e.g. '500ml', 'Pack of 6', '1 Gallon'
  imageUrl: string;
  description: string;
  inStock: boolean;
  maxPerOrder: number;
}

export interface DeliveryTier {
  id: string;
  minKm: number;
  maxKm: number;
  fee: number;
}

export interface DeliverySettings {
  storeAddress: string;
  maxDeliveryRadiusKm: number;
  freeDeliveryThreshold: number;
  tiers: DeliveryTier[];
  allowedPostalCodes: string[];
}

export interface StoreSettings {
  storeName: string;
  storePhone: string;
  storeEmail: string;
  enableStorePickup: boolean;
  enablePayAtDoor: boolean;
  taxRatePercent: number;
  bannerMessage: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'available' | 'on_delivery' | 'offline';
  activeOrdersCount: number;
  totalDeliveries: number;
}
