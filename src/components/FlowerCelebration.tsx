import React, { useMemo } from 'react';

const FLOWER_EMOJIS = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼', '✨', '🌸', '🌷', '🌺'];

interface FlowerPetalData {
  id: number;
  emoji: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
  fontSize: string;
}

export const FlowerCelebration: React.FC = () => {
  const petals: FlowerPetalData[] = useMemo(() => {
    return Array.from({ length: 32 }).map((_, index) => {
      const emoji = FLOWER_EMOJIS[index % FLOWER_EMOJIS.length];
      const left = `${Math.floor(Math.random() * 96)}%`;
      const animationDelay = `${(Math.random() * 2.5).toFixed(2)}s`;
      const animationDuration = `${(3.5 + Math.random() * 3).toFixed(2)}s`;
      const fontSize = `${Math.floor(20 + Math.random() * 26)}px`;

      return {
        id: index,
        emoji,
        left,
        animationDelay,
        animationDuration,
        fontSize,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="flower-petal drop-shadow-sm filter"
          style={{
            left: petal.left,
            animationDelay: petal.animationDelay,
            animationDuration: petal.animationDuration,
            fontSize: petal.fontSize,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  );
};
