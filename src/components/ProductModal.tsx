import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Plus, Minus, Check, Star, Award, Sparkles, Tag } from 'lucide-react';
import { Product, UserProfile } from '../types';
import { createProductWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  user: UserProfile | null;
  isFavorite?: boolean;
  userRating?: number;
  onOpenRate?: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  user,
  isFavorite = false,
  userRating,
  onOpenRate,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const whatsappLink = createProductWhatsAppLink(product, user);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFE4E8] z-10 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 text-[#2C1810] hover:text-[#E05A68] hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Product Image on Top */}
        <div className="relative w-full aspect-[16/10] bg-[#FFE4E8]/40 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            {product.badge && (
              <div className="bg-white/95 backdrop-blur-sm text-[#E05A68] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs border border-[#FFE4E8]">
                {product.badge}
              </div>
            )}
            {isFavorite && (
              <div className="bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white">
                <Award className="w-3.5 h-3.5 fill-white text-transparent" />
                <span>¡Tu Favorito #1!</span>
              </div>
            )}
          </div>
        </div>

        {/* Content: Title, description and price */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
                {product.name}
              </h3>
              <p className="text-xs text-[#8C6D62] mt-0.5 font-semibold">{product.unit}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E05A68] tabular-nums">
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Rating bar & Quick rate button */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8] my-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-xs font-extrabold text-[#2C1810]">
                {product.averageRating || 4.9}
              </span>
              <span className="text-xs text-[#8C6D62] font-semibold">
                ({product.ratingCount || 30} calificaciones)
              </span>
              {userRating && (
                <span className="text-[10px] bg-amber-50 text-amber-800 font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                  Tu nota: {userRating}★
                </span>
              )}
            </div>

            {onOpenRate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRate(product);
                }}
                className="text-xs font-extrabold text-[#E05A68] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Star className="w-3.5 h-3.5 fill-[#E05A68]" />
                <span>Calificar este postre</span>
              </button>
            )}
          </div>

          <p className="text-sm text-[#5C453C] leading-relaxed my-3 font-medium">
            {product.description}
          </p>

          {/* Details / Portions */}
          <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8] text-xs">
            <div className="flex items-center gap-2 text-[#2C1810] font-semibold">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>{product.portions || 'Elaboración fresca del día'}</span>
            </div>
            <div className="flex items-center gap-2 text-[#2C1810] font-semibold">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>¡Precio Económico!</span>
            </div>
          </div>

          {/* Quantity Stepper & Agregar */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center bg-[#FFFDF9] border border-[#FFE4E8] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-extrabold text-[#2C1810] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
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
                    <span>Agregar (S/ {(product.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Big button on the bottom: 'Pedir por WhatsApp' in berry gradient */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#E05A68]/25 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>Pedir por WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
