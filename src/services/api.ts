import axios from 'axios';
import { Order, Product, Category, Driver, StoreSettings, DeliverySettings, OrderStatus } from '../types';
import {
  initialOrders,
  initialProducts,
  initialCategories,
  initialDrivers,
  initialStoreSettings,
  initialDeliverySettings,
} from './mockData';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// ORDERS
export const getOrders = async (): Promise<Order[]> => {
  try {
    const res = await apiClient.get('/orders');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data.map((o: any) => ({
        ...o,
        id: o._id || o.id,
      }));
    }
    return initialOrders;
  } catch (error) {
    console.warn('Backend not reachable, using initial orders:', error);
    return initialOrders;
  }
};

export const updateOrderStatusApi = async (orderId: string, status: OrderStatus): Promise<void> => {
  try {
    await apiClient.patch(`/orders/${orderId}/status`, { status });
  } catch (error) {
    console.warn('API update failed, updating local state:', error);
  }
};

export const assignDriverApi = async (
  orderId: string,
  driverId: string,
  driverName: string,
  driverPhone: string
): Promise<void> => {
  try {
    await apiClient.patch(`/orders/${orderId}/assign-driver`, {
      driverId,
      driverName,
      driverPhone,
    });
  } catch (error) {
    console.warn('API driver assign failed, updating local state:', error);
  }
};

// PACKING SLIP PDF
export const getPackingSlipPdfUrl = (orderId: string): string => {
  return `${API_BASE_URL}/orders/${orderId}/packing-slip`;
};

// PRODUCTS
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await apiClient.get('/products');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data.map((p: any) => ({
        ...p,
        id: p._id || p.id,
      }));
    }
    return initialProducts;
  } catch (error) {
    console.warn('Backend not reachable, using initial products:', error);
    return initialProducts;
  }
};

export const toggleProductStockApi = async (productId: string): Promise<void> => {
  try {
    await apiClient.patch(`/products/${productId}/toggle-stock`);
  } catch (error) {
    console.warn('API toggle stock failed, updating local state:', error);
  }
};

export const createProductApi = async (product: Partial<Product>): Promise<Product | null> => {
  try {
    const res = await apiClient.post('/products', product);
    if (res.data?.data) {
      return {
        ...res.data.data,
        id: res.data.data._id || res.data.data.id,
      };
    }
  } catch (error) {
    console.warn('API create product failed:', error);
  }
  return null;
};

// CATEGORIES
export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await apiClient.get('/categories');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data.map((c: any) => ({
        ...c,
        id: c._id || c.id,
        itemCount: 10,
      }));
    }
    return initialCategories;
  } catch (error) {
    return initialCategories;
  }
};

// STORE SETTINGS
export const getStoreSettings = async (): Promise<StoreSettings> => {
  try {
    const res = await apiClient.get('/store/settings');
    if (res.data?.data) {
      return res.data.data;
    }
    return initialStoreSettings;
  } catch (error) {
    return initialStoreSettings;
  }
};

export const updateStoreSettingsApi = async (settings: Partial<StoreSettings>): Promise<void> => {
  try {
    await apiClient.put('/store/settings', settings);
  } catch (error) {
    console.warn('API update settings failed:', error);
  }
};

// DRIVERS
export const getDrivers = async (): Promise<Driver[]> => {
  try {
    const res = await apiClient.get('/admin/drivers');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data.map((d: any) => ({
        id: d._id || d.id,
        name: d.name,
        phone: d.phone,
        vehicle: d.driverDetails?.vehicle || 'Delivery Vehicle',
        status: d.driverDetails?.isAvailable ? 'available' : 'offline',
        activeOrdersCount: d.driverDetails?.activeOrdersCount || 0,
        totalDeliveries: d.driverDetails?.totalDeliveries || 0,
      }));
    }
    return initialDrivers;
  } catch (error) {
    return initialDrivers;
  }
};