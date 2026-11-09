import React from 'react';
import { Bell, UserCircle2, ShoppingBag } from 'lucide-react';
import { UserProfile, BRAND_LOGO_URL, MainViewTab } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  user: UserProfile | null;
  activeTab: MainViewTab;
  onTabChange: (tab: MainViewTab) => void;
  cartCount: number;
  favoriteProductCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  onTabChange,
  cartCount,
  favoriteProductCount,
  onOpenCart,
  onOpenProfile,
  onOpenRules,
}) => {
  const displayName = user?.name ? user.name.split(' ')[0] : 'Invitado';

  const topNavTabs: { id: MainViewTab; label: string; badge?: number }[] = [
    { id: 'postres', label: 'Catálogo' },
    { id: 'calificar', label: 'Calificar' },
    { id: 'cotizador', label: 'Cotizador' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F472B6]/30 shadow-xs transition-all">
      {/* Upper Zone: Brand Logo + Greeting + Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand logo & Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-white p-0.5 border-2 border-[#F472B6]/40 shadow-xs shrink-0 hover:rotate-3 transition-transform">
            <img
              src={BRAND_LOGO_URL}
              alt="Logo Dulce Tentación Jast Jedy"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-[#2C1810] leading-tight">
              ¡Hola, {displayName}! 👋
            </span>
            <span className="text-[11px] text-[#E05A68] font-bold leading-none mt-0.5">
              Dulce Tentación Jast🧁Jedy
            </span>
          </div>
        </div>

        {/* Right: Install App Button, Bell, Profile, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* PWA Install Button in top bar */}
          <PWAInstallButton variant="header" />

          {/* Bell Icon (Horarios & Reglamentos) */}
          <button
            onClick={onOpenRules}
            title="Instrucciones de entrega y reglamentos"
            aria-label="Ver avisos y reglamentos de entrega"
            className="relative p-2.5 rounded-full bg-[#FFE4E8]/60 hover:bg-[#FFE4E8] text-[#E05A68] transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 text-[#E05A68]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E05A68] ring-2 ring-white" />
          </button>

          {/* Profile Icon */}
          <button
            onClick={onOpenProfile}
            title="Mi Perfil"
            aria-label="Abrir mi perfil"
            className="p-2.5 rounded-full bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#8B5CF6] transition-colors cursor-pointer"
          >
            <UserCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label={`Ver pedido (${cartCount} items)`}
            className="relative p-2.5 rounded-full bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-90 text-white shadow-xs transition-all cursor-pointer ml-1"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2C1810] text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Lower Zone: Top Navigation Strip matching user Image 1 with creative pastel underline */}
      <div className="bg-[#FFFDF9] border-t border-[#FFE4E8]">
        <div className="max-w-md mx-auto px-4 flex items-center justify-around h-11">
          {topNavTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                  isActive ? 'text-[#E05A68]' : 'text-[#8C6D62] hover:text-[#2C1810]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#E05A68] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}

                {/* Creative active line matching user Image 1 */}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E05A68] rounded-full shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
