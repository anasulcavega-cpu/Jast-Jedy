import React from 'react';
import { Heart, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { Product, UserProfile } from '../types';
import { ProductCard } from './ProductCard';

interface FavoritesViewProps {
  favorites: string[];
  allProducts: Product[];
  user: UserProfile | null;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  onGoToCatalog: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  allProducts,
  user,
  onAddToCart,
  onQuickView,
  onGoToCatalog,
}) => {
  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-24 space-y-6">
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
          <Heart className="w-6 h-6 fill-white text-transparent" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
          Mis Postres Favoritos
        </h1>
        <p className="text-xs sm:text-sm text-[#5C453C] mt-1 font-medium">
          Guarda tus tortas decorativas y dulces preferidos para pedirlos rápidamente por WhatsApp
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-[#FFE4E8] shadow-xs max-w-md mx-auto my-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#FFE4E8] flex items-center justify-center mx-auto text-2xl">
            🧁
          </div>
          <h2 className="text-base font-extrabold text-[#2C1810]">
            Aún no tienes favoritos guardados
          </h2>
          <p className="text-xs text-[#5C453C] font-medium">
            Toca el corazón en cualquier postre de nuestro catálogo para tenerlo siempre a mano.
          </p>
          <button
            onClick={onGoToCatalog}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white text-xs font-extrabold shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            Explorar Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              user={user}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
};
