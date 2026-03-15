export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🌿 Seplitza Shop</h3>
            <p className="text-gray-400">
              Интернет-магазин сопутствующих товаров для омоложения
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Главная</a></li>
              <li><a href="/catalog" className="hover:text-white transition-colors">Каталог</a></li>
              <li><a href="/fortune" className="hover:text-white transition-colors">Колесо удачи</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <p className="text-gray-400">support@seplitza.ru</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 Seplitza Shop. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
