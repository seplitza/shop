'use client';

import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
      aria-label={`Корзина, ${totalItems} товаров`}
    >
      🛒 Корзина
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
