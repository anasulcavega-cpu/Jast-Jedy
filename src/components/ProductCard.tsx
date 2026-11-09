import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, ShoppingBag, Eye, Heart, Check, Sparkles } from 'lucide-react';
import { Product, UserProfile } from '../types';
import { createProductWhatsAppLink } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  user: UserProfile | null;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  user,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  const directWhatsAppLink = createProductWhatsAppLink(product, user);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border-2 border-[#FFE4E8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:border-[#F472B6]">
      {/* Big Product Image on Top */}
      <div
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[4/3] bg-[#FFE4E8]/30 overflow-hidden cursor-pointer"
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFE4E8]/40 via-white to-[#FFE4E8]/40 animate-pulse flex items-center justify-center">
            <span className="text-3xl opacity-30">🧁</span>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 bg-[#FFE4E8]/30 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-3xl mb-1">🍰</span>
            <span className="text-xs font-semibold text-[#2C1810]">{product.name}</span>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Creative Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#E05A68] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs border border-[#FFE4E8]">
            {product.badge}
          </div>
        )}

        {/* Action icons: Heart favorite + Eye */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-[#E05A68] hover:scale-110 flex items-center justify-center shadow-xs transition-transform cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-[#E05A68] text-[#E05A68]' : 'text-[#8C6D62]'
                }`}
              />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Ver detalle"
            className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-[#2C1810] hover:text-[#E05A68] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Presentation unit tag */}
        <div className="absolute bottom-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
          {product.unit}
        </div>
      </div>

      {/* Content Section: Título, descripción y precio */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-extrabold text-[#2C1810] leading-snug hover:text-[#E05A68] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#5C453C] mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>

          {product.portions && (
            <div className="flex items-center gap-1 mt-1 text-[11px] text-[#8B5CF6] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Rinde: {product.portions}</span>
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="mt-4 pt-3 border-t border-[#FFE4E8] space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#8C6D62] font-semibold">Precio económico:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-[#E05A68] tabular-nums">
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Stepper + Agregar Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#FFFDF9] border border-[#FFE4E8] rounded-xl p-0.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-extrabold text-[#2C1810] tabular-nums select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Aumentar cantidad"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FFE4E8] hover:bg-[#FCD5DC] text-[#E05A68] active:scale-95'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{addedAnimation ? '¡Agregado!' : 'Agregar'}</span>
            </button>
          </div>

          {/* Big button on the bottom: 'Pedir por WhatsApp' in creative gradient */}
          <a
            href={directWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
