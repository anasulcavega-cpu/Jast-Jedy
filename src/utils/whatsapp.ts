import { CartItem, Product, UserProfile } from '../types';

// Updated phone number explicitly provided by the user
export const WHATSAPP_PHONE_RAW = '51987415813';
export const WHATSAPP_DISPLAY_PHONE = '+51 987 415 813';
export const DEFAULT_WHATSAPP_MESSAGE = 'Hola, quiero hacer un pedido de postres';

export function createGeneralWhatsAppLink(user?: UserProfile | null): string {
  let message = DEFAULT_WHATSAPP_MESSAGE;
  if (user?.name) {
    const ageText = user.age ? ` (${user.age} años)` : '';
    message = `Hola, soy ${user.name.trim()}${ageText}, quiero hacer un pedido de postres en Dulce Tentación Jast🧁Jedy.`;
  }
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
}

export function createProductWhatsAppLink(product: Product, user?: UserProfile | null): string {
  const greeting = user?.name ? `Hola, soy ${user.name.trim()}${user.age ? ` (${user.age} años)` : ''}` : 'Hola';
  const text = `${greeting}. Quiero pedir por WhatsApp: *${product.name}* (Precio: S/ ${product.price.toFixed(2)}) de Dulce Tentación Jast🧁Jedy. ¿Tienen disponibilidad?`;
  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppLink(
  items: CartItem[],
  total: number,
  user?: UserProfile | null,
  orderNotes?: string
): string {
  if (items.length === 0) {
    return createGeneralWhatsAppLink(user);
  }

  const ageText = user?.age ? ` (${user.age} años)` : '';
  const phoneText = user?.phone ? ` (Tel: ${user.phone.trim()})` : '';
  const clientInfo = user?.name
    ? `Soy *${user.name.trim()}*${ageText}${phoneText}`
    : 'Hola';

  const itemsList = items
    .map(
      (item) =>
        `• ${item.quantity}x *${item.product.name}* (S/ ${(item.product.price * item.quantity).toFixed(2)})${item.notes ? ` [Nota: ${item.notes}]` : ''}`
    )
    .join('\n');

  let message = `¡Hola! ${clientInfo}. Deseo realizar el siguiente pedido en *Dulce Tentación Jast🧁Jedy*:\n\n${itemsList}\n\n*Total estimado:* S/ ${total.toFixed(2)}`;

  if (orderNotes && orderNotes.trim()) {
    message += `\n*Detalles de entrega:* ${orderNotes.trim()}`;
  }

  message += '\n\nHe leído las instrucciones de entrega. ¿Me confirman la disponibilidad y métodos de pago? ¡Muchas gracias!';

  return `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(message)}`;
}
