'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-500 mb-8">Добавьте товары из каталога</p>
        <Link
          href="/catalog"
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.items.map(item => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4">
              <span className="text-4xl">🧴</span>
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-primary font-bold">{item.product.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="ml-2 text-red-400 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            Очистить корзину
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Итого</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Товары ({state.items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Доставка</span>
              <span className="text-green-500">Бесплатно</span>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
            <span>К оплате</span>
            <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
