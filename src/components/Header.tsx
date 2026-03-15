'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🌿 Seplitza</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Главная
            </Link>
            <Link href="/catalog" className="text-gray-700 hover:text-primary transition-colors">
              Каталог
            </Link>
            <Link href="/fortune" className="text-gray-700 hover:text-primary transition-colors">
              🎡 Колесо удачи
            </Link>
          </nav>
          <button
            onClick={toggleCart}
            className="relative bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            🛒 Корзина
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
