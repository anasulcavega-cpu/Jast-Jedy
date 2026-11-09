import React, { useState } from 'react';
import { Star, Award, Heart, MessageCircle, Check, Sparkles, Send, CakeSlice, ThumbsUp } from 'lucide-react';
import { Product, UserProfile, ProductRating } from '../types';
import { WHATSAPP_PHONE_RAW } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface RatingAndFavoritesViewProps {
  allProducts: Product[];
  user: UserProfile | null;
  favoriteProductId: string | null;
  ratings: Record<string, ProductRating>;
  onSelectFavorite: (productId: string) => void;
  onRateProduct: (productId: string, rating: number, comment?: string, isFavorite?: boolean) => void;
  onGoToCatalog: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const RatingAndFavoritesView: React.FC<RatingAndFavoritesViewProps> = ({
  allProducts,
  user,
  favoriteProductId,
  ratings,
  onSelectFavorite,
  onRateProduct,
  onGoToCatalog,
  onAddToCart,
}) => {
  const currentFavorite = allProducts.find((p) => p.id === favoriteProductId) || null;
  const currentFavoriteRating = favoriteProductId ? ratings[favoriteProductId] : null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    favoriteProductId || allProducts[0]?.id || ''
  );
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [activeScore, setActiveScore] = useState<number>(
    currentFavoriteRating?.rating || 5
  );
  const [comment, setComment] = useState<string>(
    currentFavoriteRating?.comment || ''
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // When changing product selection
  const handleProductChange = (id: string) => {
    setSelectedProductId(id);
    const existing = ratings[id];
    setActiveScore(existing?.rating || 5);
    setComment(existing?.comment || '');
    setSaveSuccess(false);
  };

  const selectedProduct = allProducts.find((p) => p.id === selectedProductId) || allProducts[0];

  const handleSaveFavoriteAndRating = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    onSelectFavorite(selectedProduct.id);
    onRateProduct(selectedProduct.id, activeScore, comment.trim(), true);
    setSaveSuccess(true);

    trackEvent('rate_product', 'Rating & Favorites', `${selectedProduct.name} - ${activeScore} stars`, activeScore);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleShareToWhatsApp = () => {
    if (!selectedProduct) return;
    const clientName = user?.name ? user.name.trim() : 'Cliente';
    const stars = '⭐'.repeat(activeScore);

    const message = `¡Hola! Soy *${clientName}*. Quería compartir que mi postre favorito de *Dulce Tentación Jast🧁Jedy* es:\n\n🏆 *${selectedProduct.name}*\n⭐ Calificación: ${stars} (${activeScore}/5 estrellas)\n${comment ? `💬 Mi opinión: "${comment}"\n` : ''}\n¡Recomendado al 100%!`;

    trackEvent('share_review_whatsapp', 'Social', selectedProduct.name, activeScore);
    const url = `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-24 space-y-6">
      {/* Header banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
          <Star className="w-6 h-6 fill-white text-transparent" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
          Escoge tu Postre Favorito & Califícalo
        </h1>
        <p className="text-xs sm:text-sm text-[#5C453C] mt-1 max-w-lg mx-auto font-medium">
          Dinos cuál es tu postre preferido de nuestra pastelería y dale tu puntuación con estrellas. ¡Tu opinión nos ayuda a seguir horneando con amor!
        </p>
      </div>

      {/* Main Interactive Favorite & Rating Form */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#FFE4E8] shadow-xs space-y-6">
        <form onSubmit={handleSaveFavoriteAndRating} className="space-y-6">
          {/* Step 1: Pick favorite dessert */}
          <div>
            <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E05A68]" />
              <span>1. Selecciona cuál es tu postre favorito</span>
            </label>

            <select
              value={selectedProductId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm font-extrabold text-[#2C1810] focus:outline-none focus:border-[#E05A68] cursor-pointer shadow-xs"
            >
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — S/ {p.price.toFixed(2)} ({p.category.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Product Preview Card */}
          {selectedProduct && (
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#FFE4E8] flex flex-col sm:flex-row items-center gap-4">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border-2 border-white shadow-xs"
              />
              <div className="flex-1 text-center sm:text-left min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE4E8] text-[#E05A68] text-[11px] font-extrabold mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{selectedProduct.badge || 'Delicia Artesanal'}</span>
                </div>
                <h3 className="text-base font-extrabold text-[#2C1810] truncate">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-[#5C453C] line-clamp-2 mt-0.5 font-medium">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs">
                  <span className="font-extrabold text-[#E05A68] text-sm tabular-nums">
                    S/ {selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="text-[#8C6D62] font-semibold">
                    {selectedProduct.unit}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Rate with interactive stars */}
          <div>
            <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F59E0B]" />
              <span>2. Califica tu postre favorito (Toca las estrellas)</span>
            </label>

            <div className="flex flex-col items-center sm:items-start gap-2 p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#FFE4E8]">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoverRating || activeScore);
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setActiveScore(star)}
                      aria-label={`Calificar con ${star} estrellas`}
                      className="p-1 text-3xl sm:text-4xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                          isFilled
                            ? 'fill-[#F59E0B] text-[#F59E0B] drop-shadow-xs'
                            : 'text-[#D1D5DB]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-extrabold text-[#2C1810] mt-1">
                {activeScore === 5 && '⭐⭐⭐⭐⭐ ¡Excelente! ¡El mejor postre de todos!'}
                {activeScore === 4 && '⭐⭐⭐⭐ ¡Muy bueno! Delicioso y recomendado.'}
                {activeScore === 3 && '⭐⭐⭐ Bueno, con rico sabor.'}
                {activeScore === 2 && '⭐⭐ Regular, puede mejorar.'}
                {activeScore === 1 && '⭐ No fue de mi agrado.'}
              </span>
            </div>
          </div>

          {/* Step 3: Write personal review / comment */}
          <div>
            <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2">
              3. ¿Por qué es tu favorito? (Comentario u opinión opcional)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ej. ¡La torta tiene el fudge más suave y delicioso! La textura es húmeda y perfecta para compartir en familia..."
              className="w-full p-3.5 rounded-2xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm font-semibold text-[#2C1810] placeholder-[#8C6D62]/60 focus:outline-none focus:border-[#E05A68] shadow-xs"
            />
          </div>

          {/* Feedback message */}
          {saveSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>¡Tu postre favorito y tu calificación han sido guardados con éxito! 🎉</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Guardar como mi Favorito</span>
            </button>

            <button
              type="button"
              onClick={handleShareToWhatsApp}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>Compartir en WhatsApp</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of other rated desserts */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#FFE4E8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#FFE4E8] pb-3">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-[#E05A68]" />
            <h2 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
              Tus Calificaciones Registradas
            </h2>
          </div>
          <button
            onClick={onGoToCatalog}
            className="text-xs font-extrabold text-[#E05A68] hover:underline cursor-pointer"
          >
            Explorar más postres
          </button>
        </div>

        {Object.keys(ratings).length === 0 ? (
          <div className="p-8 text-center text-xs text-[#8C6D62] font-semibold space-y-2">
            <p>Aún no has calificado postres. Elige tu favorito arriba y dale 5 estrellas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(ratings).map(([prodId, r]) => {
              const product = allProducts.find((p) => p.id === prodId);
              if (!product) return null;
              const isFav = favoriteProductId === prodId;

              return (
                <div
                  key={prodId}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                    isFav
                      ? 'bg-[#FFE4E8]/40 border-[#F472B6]'
                      : 'bg-[#FFFDF9] border-[#FFE4E8]'
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#FFE4E8]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-extrabold text-[#2C1810] truncate">
                        {product.name}
                      </h4>
                      {isFav && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E05A68] text-white shrink-0">
                          🏆 Favorito #1
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= r.rating
                              ? 'fill-[#F59E0B] text-[#F59E0B]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] font-bold text-[#2C1810] ml-1">
                        {r.rating}.0
                      </span>
                    </div>

                    {r.comment && (
                      <p className="text-[11px] text-[#5C453C] italic line-clamp-2">
                        "{r.comment}"
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleProductChange(prodId)}
                        className="text-[11px] text-[#E05A68] font-extrabold hover:underline cursor-pointer"
                      >
                        Modificar calificación
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
