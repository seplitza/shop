import FortuneWheel from '@/components/FortuneWheel';

export default function FortunePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🎡 Колесо удачи</h1>
        <p className="text-xl text-gray-600">
          Крутите колесо и получайте эксклюзивные скидки и бонусы!
        </p>
      </div>
      <div className="flex justify-center">
        <FortuneWheel />
      </div>
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Как это работает?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">1️⃣</div>
            <p className="font-semibold">Нажмите на кнопку</p>
            <p className="text-gray-500 text-sm">«Крутить!» для запуска колеса</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">2️⃣</div>
            <p className="font-semibold">Дождитесь результата</p>
            <p className="text-gray-500 text-sm">Колесо остановится на вашем призе</p>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">3️⃣</div>
            <p className="font-semibold">Используйте скидку</p>
            <p className="text-gray-500 text-sm">Применяйте при оформлении заказа</p>
          </div>
        </div>
      </div>
    </div>
  );
}
