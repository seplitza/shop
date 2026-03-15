const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchProducts(category?: string): Promise<any[]> {
  try {
    const url = category 
      ? `${API_URL}/api/products?category=${category}`
      : `${API_URL}/api/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('API error, using mock data:', error);
    return getMockProducts(category);
  }
}

export async function fetchProduct(id: number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  } catch (error) {
    console.error('API error, using mock data:', error);
    return getMockProducts().find(p => p.id === id) || null;
  }
}

function getMockProducts(category?: string) {
  const products = [
    {
      id: 1,
      name: 'Сыворотка для лица с ретинолом',
      description: 'Антивозрастная сыворотка с ретинолом для омоложения кожи. Уменьшает морщины, выравнивает тон кожи.',
      price: 2490,
      originalPrice: 3200,
      image: '/images/product-1.jpg',
      category: 'serum',
      rating: 4.8,
      reviewCount: 124,
      inStock: true,
    },
    {
      id: 2,
      name: 'Крем для лица гиалуроновый',
      description: 'Увлажняющий крем с гиалуроновой кислотой. Глубоко питает и увлажняет кожу.',
      price: 1890,
      originalPrice: 2400,
      image: '/images/product-2.jpg',
      category: 'cream',
      rating: 4.7,
      reviewCount: 89,
      inStock: true,
    },
    {
      id: 3,
      name: 'Маска для лица коллагеновая',
      description: 'Восстанавливающая маска с коллагеном. Подтягивает кожу и борется с признаками старения.',
      price: 890,
      originalPrice: 1200,
      image: '/images/product-3.jpg',
      category: 'mask',
      rating: 4.6,
      reviewCount: 67,
      inStock: true,
    },
    {
      id: 4,
      name: 'Тоник для лица с витамином C',
      description: 'Осветляющий тоник с витамином C. Выравнивает тон кожи, придает сияние.',
      price: 1290,
      originalPrice: 1600,
      image: '/images/product-4.jpg',
      category: 'toner',
      rating: 4.5,
      reviewCount: 45,
      inStock: true,
    },
    {
      id: 5,
      name: 'Сыворотка для глаз пептидная',
      description: 'Концентрированная сыворотка для области вокруг глаз. Уменьшает отечность и темные круги.',
      price: 2190,
      originalPrice: 2800,
      image: '/images/product-5.jpg',
      category: 'serum',
      rating: 4.9,
      reviewCount: 156,
      inStock: true,
    },
    {
      id: 6,
      name: 'SPF 50+ крем солнцезащитный',
      description: 'Легкий солнцезащитный крем с SPF 50+. Защищает от UVA и UVB лучей.',
      price: 1590,
      originalPrice: 2000,
      image: '/images/product-6.jpg',
      category: 'spf',
      rating: 4.7,
      reviewCount: 98,
      inStock: false,
    },
  ];

  if (category) {
    return products.filter(p => p.category === category);
  }
  return products;
}
