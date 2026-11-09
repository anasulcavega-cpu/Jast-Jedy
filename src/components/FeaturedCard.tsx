import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Sparkles, Check, Tag, Star, Award } from 'lucide-react';
import { Product, UserProfile } from '../types';
import { createProductWhatsAppLink } from '../utils/whatsapp';

interface FeaturedCardProps {
  product: Product;
  user: UserProfile | null;
  isFavorite?: boolean;
  userRating?: number;
  onOpenRate?: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  product,
  user,
  isFavorite = false,
  userRating,
  onOpenRate,
  onAddToCart,
  onQuickView,
}) => {
  const [added, setAdded] = useState(false);
  const whatsappUrl = createProductWhatsAppLink(product, user);

  const handleAdd = () => {
    onAddToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
      isFavorite ? 'border-[#E05A68] shadow-lg ring-2 ring-[#FFE4E8]' : 'border-[#FFE4E8] shadow-md hover:shadow-xl'
    }`}>
      {/* Big Product Image on Top */}
      <div
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#FFE4E8]/40 overflow-hidden cursor-pointer group"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
          <div className="bg-white/95 backdrop-blur-sm text-[#E05A68] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-[#FFE4E8]">
            <Sparkles className="w-3.5 h-3.5 fill-[#E05A68]" />
            <span>Postre Estrella</span>
          </div>

          <div className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>¡Precio Económico!</span>
          </div>

          {isFavorite && (
            <div className="bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white">
              <Award className="w-3.5 h-3.5 fill-white text-transparent" />
              <span>¡Tu Favorito #1!</span>
            </div>
          )}
        </div>

        {/* Portion tag */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          {product.unit} • {product.portions}
        </div>

        {/* Bottom image overlay with title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-[#FCD34D] font-extrabold">
              Especialidad de la Casa
            </span>
            <div className="flex items-center gap-1 text-[#FCD34D] text-xs font-extrabold bg-black/40 px-2 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-[#FCD34D]" />
              <span>{product.averageRating || 5.0} ({product.ratingCount || 48} reseñas)</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            {product.name}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 space-y-4 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-xs sm:text-sm text-[#5C453C] leading-relaxed max-w-lg font-medium">
              {product.description}
            </p>
            {onOpenRate && (
              <button
                type="button"
                onClick={() => onOpenRate(product)}
                className="mt-2 text-xs font-extrabold text-[#E05A68] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-[#E05A68]" />
                <span>{userRating ? `Tu calificación: ${userRating}★ (Editar)` : 'Calificar esta torta'}</span>
              </button>
            )}
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] text-[#8C6D62] block font-bold uppercase tracking-wider">
              ¡Oferta Especial!
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#E05A68] tabular-nums">
                S/ {product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#8C6D62] line-through font-semibold">
                S/ 55.00
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Agregar + Big Pedir por WhatsApp in vibrant creative berry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Agregar button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FFE4E8] hover:bg-[#FCD5DC] text-[#E05A68] active:scale-98'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Agregado al pedido!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </>
            )}
          </button>

          {/* Big Pedir por WhatsApp button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
