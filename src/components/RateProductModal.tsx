import React, { useState } from 'react';
import { X, Star, Award, Check, MessageCircle, Sparkles } from 'lucide-react';
import { Product, UserProfile } from '../types';
import { WHATSAPP_PHONE_RAW } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface RateProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  isCurrentFavorite: boolean;
  currentRating?: number;
  currentComment?: string;
  onSaveRating: (productId: string, rating: number, comment?: string, setAsFavorite?: boolean) => void;
}

export const RateProductModal: React.FC<RateProductModalProps> = ({
  product,
  isOpen,
  onClose,
  user,
  isCurrentFavorite,
  currentRating = 5,
  currentComment = '',
  onSaveRating,
}) => {
  const [rating, setRating] = useState<number>(currentRating);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(currentComment);
  const [makeFavorite, setMakeFavorite] = useState<boolean>(isCurrentFavorite);
  const [saved, setSaved] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    if (product) {
      setRating(currentRating || 5);
      setComment(currentComment || '');
      setMakeFavorite(isCurrentFavorite);
      setSaved(false);
    }
  }, [product, currentRating, currentComment, isCurrentFavorite]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveRating(product.id, rating, comment.trim(), makeFavorite);
    setSaved(true);
    trackEvent('rate_product_modal', 'Rating', `${product.name} - ${rating} stars`, rating);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleShareWhatsApp = () => {
    const clientName = user?.name ? user.name.trim() : 'Cliente';
    const stars = '⭐'.repeat(rating);
    const message = `¡Hola! Soy *${clientName}*. Quiero dejar mi calificación para *${product.name}* en *Dulce Tentación Jast🧁Jedy*:\n\n⭐ Calificación: ${stars} (${rating}/5 estrellas)\n${makeFavorite ? '🏆 ¡Es mi postre favorito #1!\n' : ''}${comment ? `💬 Comentario: "${comment}"\n` : ''}`;

    trackEvent('share_rate_whatsapp', 'Social', product.name, rating);
    const url = `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFE4E8] z-10 animate-scale-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#FFE4E8] bg-[#FFFDF9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shadow-xs">
              <Star className="w-4 h-4 fill-white text-transparent" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#2C1810]">
                Calificar Postre
              </h3>
              <p className="text-[11px] text-[#8C6D62] font-semibold">
                Dulce Tentación Jast🧁Jedy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C6D62] hover:text-[#2C1810] hover:bg-[#FFE4E8]/60 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Product info banner */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#FFE4E8]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-extrabold text-sm text-[#2C1810] truncate">
                {product.name}
              </h4>
              <p className="text-[#E05A68] font-bold text-xs tabular-nums">
                S/ {product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Interactive Star rating */}
          <div className="text-center py-2 bg-[#FFFDF9] rounded-2xl border border-[#FFE4E8] p-3">
            <span className="block text-xs font-extrabold text-[#2C1810] mb-2 uppercase tracking-wider">
              ¿Cuántas estrellas le das?
            </span>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hoverRating || rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    aria-label={`${star} estrellas`}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                        isFilled
                          ? 'fill-[#F59E0B] text-[#F59E0B]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] font-bold text-[#8C6D62] mt-1.5 block">
              {rating === 5 && '⭐⭐⭐⭐⭐ ¡Excelente delicia!'}
              {rating === 4 && '⭐⭐⭐⭐ ¡Muy rico!'}
              {rating === 3 && '⭐⭐⭐ Bueno'}
              {rating <= 2 && '⭐ Regular'}
            </span>
          </div>

          {/* Checkbox: Pick as #1 Favorite */}
          <label className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFE4E8]/40 border border-[#FFE4E8] cursor-pointer select-none hover:bg-[#FFE4E8]/60 transition-colors">
            <input
              type="checkbox"
              checked={makeFavorite}
              onChange={(e) => setMakeFavorite(e.target.checked)}
              className="w-4 h-4 accent-[#E05A68] rounded cursor-pointer"
            />
            <div>
              <span className="font-extrabold text-xs text-[#2C1810] block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#E05A68]" />
                <span>Marcar como mi postre favorito #1</span>
              </span>
              <span className="text-[11px] text-[#5C453C] font-medium">
                Aparecerá destacado en tu perfil y pantalla principal
              </span>
            </div>
          </label>

          {/* Comment */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#2C1810] mb-1">
              Tu reseña u opinión (opcional)
            </label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="¿Qué fue lo que más te gustó? (Ej. La frescura, el chocolate, la presentación)..."
              className="w-full p-2.5 rounded-xl border border-[#FFE4E8] bg-[#FFFDF9] text-xs font-semibold text-[#2C1810] placeholder-[#8C6D62]/60 focus:outline-none focus:border-[#E05A68]"
            />
          </div>

          {saved && (
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>¡Calificación guardada con éxito!</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-[#E05A68]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Calificación</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>Compartir en WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
