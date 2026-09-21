import React from 'react';
import { OrderStatus } from '../../types';

interface BadgeProps {
  status: OrderStatus;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
  const configs: Record<OrderStatus, { label: string; bg: string; text: string; dot: string }> = {
    received: {
      label: '1. Order Received',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500'
    },
    confirmed: {
      label: '2. Confirmed',
      bg: 'bg-sky-50 border-sky-200',
      text: 'text-sky-800',
      dot: 'bg-sky-500'
    },
    preparing: {
      label: '3. Preparing',
      bg: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-800',
      dot: 'bg-indigo-500 animate-pulse'
    },
    ready_for_driver: {
      label: '4. Ready for Driver',
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-800',
      dot: 'bg-purple-500'
    },
    out_for_delivery: {
      label: '5. Out for Delivery',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500 animate-ping'
    },
    delivered: {
      label: '6. Delivered & Paid',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500'
    },
  };

  const config = configs[status] || configs.received;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};
