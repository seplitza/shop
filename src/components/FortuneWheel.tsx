'use client';

import { useState } from 'react';

const prizes = [
  { label: '5% скидка', value: 'discount_5', color: '#74C69D' },
  { label: '10% скидка', value: 'discount_10', color: '#40916C' },
  { label: '15% скидка', value: 'discount_15', color: '#2D6A4F' },
  { label: 'Подарок!', value: 'gift', color: '#52B788' },
  { label: '20% скидка', value: 'discount_20', color: '#1B4332' },
  { label: 'Бесплатная доставка', value: 'free_shipping', color: '#081C15' },
  { label: '7% скидка', value: 'discount_7', color: '#95D5B2' },
  { label: 'Купон -500₽', value: 'coupon_500', color: '#B7E4C7' },
];

export default function FortuneWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const spin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const prizeIndex = Math.floor(normalizedAngle / (360 / prizes.length));
      setResult(prizes[prizeIndex].label);
      setIsSpinning(false);
      setHasSpun(true);
    }, 4000);
  };

  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 10;
  const sliceAngle = (2 * Math.PI) / prizes.length;

  const getSlicePath = (index: number) => {
    const startAngle = index * sliceAngle - Math.PI / 2;
    const endAngle = startAngle + sliceAngle;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const getLabelPosition = (index: number) => {
    const angle = index * sliceAngle + sliceAngle / 2 - Math.PI / 2;
    const r = radius * 0.65;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 text-3xl">
          ▼
        </div>
        <svg
          width={size}
          height={size}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {prizes.map((prize, index) => (
            <g key={prize.value}>
              <path
                d={getSlicePath(index)}
                fill={prize.color}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={getLabelPosition(index).x}
                y={getLabelPosition(index).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                transform={`rotate(${(index * 360) / prizes.length + 360 / prizes.length / 2}, ${getLabelPosition(index).x}, ${getLabelPosition(index).y})`}
              >
                {prize.label.split(' ').map((word, i) => (
                  <tspan key={i} x={getLabelPosition(index).x} dy={i === 0 ? '-5' : '12'}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
          <circle cx={center} cy={center} r="20" fill="white" stroke="#2D6A4F" strokeWidth="3" />
        </svg>
      </div>

      {result && (
        <div className="bg-primary text-white px-6 py-4 rounded-xl text-center shadow-lg">
          <p className="text-2xl font-bold">🎉 Поздравляем!</p>
          <p className="text-lg mt-1">Вы выиграли: <strong>{result}</strong></p>
        </div>
      )}

      <button
        onClick={spin}
        disabled={isSpinning || hasSpun}
        className="bg-primary text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSpinning ? '🎡 Крутится...' : hasSpun ? '✅ Использовано' : '🎡 Крутить!'}
      </button>

      {hasSpun && (
        <p className="text-gray-500 text-sm">
          Каждый пользователь может покрутить колесо один раз в день
        </p>
      )}
    </div>
  );
}
