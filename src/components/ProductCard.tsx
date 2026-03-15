'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative bg-gray-100 h-48 flex items-center justify-center">
        <span className="text-6xl">🧴</span>
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center mb-3">
          <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm ml-2">
                {product.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
