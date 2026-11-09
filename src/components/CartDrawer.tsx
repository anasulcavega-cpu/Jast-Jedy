import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { createCartWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user: UserProfile | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onRequestLogin: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRequestLogin,
}) => {
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const whatsappCheckoutLink = createCartWhatsAppLink(
    items,
    total,
    user,
    orderNotes
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l-2 border-[#FFE4E8]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#FFE4E8] bg-[#FFFDF9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
                  Tu Pedido Dulce
                </h2>
                <p className="text-xs text-[#8C6D62] font-semibold">
                  {items.length === 0
                    ? 'Aún no has agregado delicias'
                    : `${totalUnits} ${totalUnits === 1 ? 'producto' : 'productos'} seleccionados`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8C6D62] hover:text-[#2C1810] hover:bg-[#FFE4E8]/60 transition-colors cursor-pointer"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info banner */}
          <div className="px-4 py-2.5 bg-[#FFE4E8]/40 border-b border-[#FFE4E8] flex items-center justify-between text-xs text-[#2C1810]">
            {user ? (
              <div className="truncate">
                <span className="font-extrabold">Cliente: </span>
                <span className="font-semibold">{user.name}</span>
                {user.age && <span> ({user.age} años)</span>}
                {user.phone && <span className="text-[#8C6D62]"> · {user.phone}</span>}
              </div>
            ) : (
              <span className="text-[#8C6D62]">Cliente registrado</span>
            )}
            <button
              onClick={onRequestLogin}
              className="text-[#E05A68] font-extrabold hover:underline shrink-0 ml-2 cursor-pointer"
            >
              Editar
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8C6D62]">
                <div className="w-16 h-16 rounded-full bg-[#FFE4E8] flex items-center justify-center mb-3 text-3xl">
                  🍰
                </div>
                <h3 className="font-extrabold text-[#2C1810] text-base mb-1">
                  Tu canasta está vacía
                </h3>
                <p className="text-xs max-w-xs mb-4 text-[#5C453C] font-medium">
                  Explora nuestro catálogo y agrega tus tortas decorativas o bocaditos favoritos para armar tu pedido.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white text-xs font-extrabold rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-xs"
                >
                  Ver Catálogo de Postres
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-[#FFFDF9] border-2 border-[#FFE4E8] hover:border-[#F472B6] transition-all"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#FFE4E8]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-extrabold text-[#2C1810] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#8C6D62] hover:text-red-500 p-1 transition-colors cursor-pointer"
                        title="Eliminar del pedido"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#E05A68] tabular-nums font-bold">
                      S/ {item.product.price.toFixed(2)} c/u
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center bg-white border border-[#FFE4E8] rounded-lg">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-[#2C1810] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#2C1810] hover:bg-[#FFE4E8] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-xs font-extrabold text-[#2C1810] tabular-nums">
                        S/ {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#FFE4E8] bg-white space-y-3">
              <div>
                <label className="block text-[11px] font-extrabold text-[#2C1810] uppercase tracking-wider mb-1">
                  Notas de entrega / dedicatoria (opcional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Ej. Para el sábado 3pm, dedicatoria con nombre..."
                  className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-[#2C1810] placeholder-[#8C6D62]/60 focus:outline-none focus:border-[#E05A68] font-semibold"
                />
              </div>

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm font-extrabold text-[#8C6D62]">Total económico:</span>
                <span className="text-2xl font-extrabold text-[#E05A68] tabular-nums">
                  S/ {total.toFixed(2)}
                </span>
              </div>

              {/* Send to WhatsApp button */}
              <a
                href={whatsappCheckoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>Enviar Pedido a WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#8C6D62] font-semibold">
                <span>Atención directa al {WHATSAPP_DISPLAY_PHONE}</span>
                <button
                  onClick={onClearCart}
                  className="text-red-500 hover:underline cursor-pointer font-bold"
                >
                  Vaciar canasta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
