import React from 'react';
import { Cake, Star, Sparkles, MessageSquare } from 'lucide-react';
import { MainViewTab } from '../types';

interface BottomNavProps {
  activeTab: MainViewTab;
  onTabChange: (tab: MainViewTab) => void;
  hasFavoriteSelected?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  hasFavoriteSelected = false,
}) => {
  const tabs: {
    id: MainViewTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    hasBadge?: boolean;
  }[] = [
    {
      id: 'postres',
      label: 'Postres',
      icon: Cake,
    },
    {
      id: 'calificar',
      label: 'Calificar',
      icon: Star,
      hasBadge: hasFavoriteSelected,
    },
    {
      id: 'cotizador',
      label: 'Cotizador',
      icon: Sparkles,
    },
    {
      id: 'contacto',
      label: 'Contacto',
      icon: MessageSquare,
    },
  ];

  return (
    <nav
      aria-label="Barra de selección inferior"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#FFE4E8] shadow-[0_-4px_25px_rgba(224,90,104,0.08)]"
    >
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1 cursor-pointer select-none transition-all group"
            >
              {/* Soft pink oval pill matching user Image 2 */}
              <div
                className={`relative px-4 py-1 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-[#FFE4E8] scale-105 shadow-xs'
                    : 'bg-transparent group-hover:bg-[#FFF1F2]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-[#E05A68] fill-[#F472B6]/40 stroke-[2.3]'
                      : 'text-[#8C6D62] stroke-[1.8]'
                  }`}
                />

                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1 bg-[#F59E0B] text-white text-[9px] font-extrabold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    ★
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-0.5 transition-colors ${
                  isActive
                    ? 'font-bold text-[#E05A68]'
                    : 'font-semibold text-[#8C6D62]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
