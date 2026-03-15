import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const products = await fetchProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌿 Seplitza Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Товары для омоложения и ухода за кожей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/fortune"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-colors"
            >
              🎡 Крутить колесо удачи
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-500">Доставка по всей России от 1-3 дней</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-500">Только сертифицированные товары</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Лучшие цены</h3>
              <p className="text-gray-500">Скидки до 30% на все товары</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Популярные товары</h2>
            <Link href="/catalog" className="text-primary hover:text-secondary transition-colors font-medium">
              Все товары →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fortune Wheel CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">🎡 Колесо удачи</h2>
          <p className="text-xl mb-6 opacity-90">
            Крутите колесо и получайте скидки до 20%!
          </p>
          <Link
            href="/fortune"
            className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Попробовать удачу
          </Link>
        </div>
      </section>
    </div>
  );
}
