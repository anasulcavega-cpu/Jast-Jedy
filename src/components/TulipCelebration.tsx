import React, { useMemo } from 'react';

interface TulipData {
  id: number;
  type: 'full-pink' | 'full-rose' | 'full-cream' | 'petal-pink' | 'petal-rose';
  left: string;
  animationDelay: string;
  animationDuration: string;
  size: number;
}

export const TulipCelebration: React.FC = () => {
  const tulips: TulipData[] = useMemo(() => {
    const types: ('full-pink' | 'full-rose' | 'full-cream' | 'petal-pink' | 'petal-rose')[] = [
      'full-pink',
      'full-rose',
      'full-cream',
      'petal-pink',
      'petal-rose',
    ];

    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${(i * 3.6 + Math.random() * 3).toFixed(1)}%`,
      animationDelay: `${(Math.random() * 3.2).toFixed(2)}s`,
      animationDuration: `${(4.5 + Math.random() * 3.5).toFixed(2)}s`,
      size: Math.floor(34 + Math.random() * 26),
    }));
  }, []);

  const renderTulipSvg = (type: TulipData['type'], size: number) => {
    if (type.startsWith('petal')) {
      const isRose = type === 'petal-rose';
      return (
        <svg
          width={size * 0.6}
          height={size * 0.8}
          viewBox="0 0 24 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6 8 2 15 3 22C4 28 8 30 12 30C16 30 20 28 21 22C22 15 18 8 12 2Z"
            fill={isRose ? '#FB7185' : '#F472B6'}
            stroke="#E11D48"
            strokeWidth="0.6"
          />
          <path
            d="M12 4C10 9 8 16 9 24"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );
    }

    // Full tulip bloom with stem
    let petalFill = '#F472B6';
    let petalHighlight = '#FECDD3';
    let petalDark = '#E11D48';

    if (type === 'full-rose') {
      petalFill = '#FB7185';
      petalHighlight = '#FFE4E6';
      petalDark = '#BE123C';
    } else if (type === 'full-cream') {
      petalFill = '#FFF1F2';
      petalHighlight = '#FFFFFF';
      petalDark = '#FDA4AF';
    }

    return (
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 36 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slender green stem */}
        <path
          d="M18 25C17.5 32 18 40 18.5 46"
          stroke="#4ADE80"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Small tender green leaf */}
        <path
          d="M18 34C22 32 25 28 26 23C23 27 20 29 18 30"
          fill="#86EFAC"
          stroke="#22C55E"
          strokeWidth="0.6"
        />

        {/* Back petal */}
        <path
          d="M18 8C13 14 11 20 12 25C14 27 22 27 24 25C25 20 23 14 18 8Z"
          fill={petalDark}
        />

        {/* Left side tulip petal */}
        <path
          d="M12 25C9 23 8 17 11 11C13 15 15 20 18 24C16 25 14 25 12 25Z"
          fill={petalFill}
          stroke="#BE123C"
          strokeWidth="0.5"
        />

        {/* Right side tulip petal */}
        <path
          d="M24 25C27 23 28 17 25 11C23 15 21 20 18 24C20 25 22 25 24 25Z"
          fill={petalFill}
          stroke="#BE123C"
          strokeWidth="0.5"
        />

        {/* Front central curved tulip cup petal */}
        <path
          d="M18 10C13 16 13 22 15 26C16 27 20 27 21 26C23 22 23 16 18 10Z"
          fill={petalHighlight}
          stroke="#BE123C"
          strokeWidth="0.5"
        />

        {/* Delicate shine highlight */}
        <path
          d="M17 14C15 18 15 22 16 24"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    );
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {tulips.map((item) => (
        <div
          key={item.id}
          className="tulip-shower-item drop-shadow-sm filter"
          style={{
            left: item.left,
            animationDelay: item.animationDelay,
            animationDuration: item.animationDuration,
          }}
        >
          {renderTulipSvg(item.type, item.size)}
        </div>
      ))}
    </div>
  );
};
