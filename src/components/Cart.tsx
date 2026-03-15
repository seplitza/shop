'use client';

import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart, closeCart, totalPrice } = useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Корзина</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        {state.items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🛒</p>
              <p className="text-gray-500">Корзина пуста</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.items.map(item => (
                <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                  <span className="text-3xl">🧴</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-sm text-primary font-semibold">
                      {item.product.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-400 hover:text-red-600 ml-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Итого:</span>
                <span className="font-bold text-xl text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors mb-2">
                Оформить заказ
              </button>
              <button
                onClick={clearCart}
                className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
