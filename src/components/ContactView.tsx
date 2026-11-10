import React from 'react';
import { MessageCircle, Clock, Calendar, ShieldCheck, MapPin, Phone, Heart, Sparkles } from 'lucide-react';
import { UserProfile, BRAND_LOGO_URL } from '../types';
import { WHATSAPP_DISPLAY_PHONE, createGeneralWhatsAppLink } from '../utils/whatsapp';

interface ContactViewProps {
  user: UserProfile | null;
  onOpenRules: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ user, onOpenRules }) => {
  const whatsappUrl = createGeneralWhatsAppLink(user);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-3 pb-24 space-y-6">
      {/* Brand card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden p-1 bg-white border-2 border-[#FFE4E8] shadow-xs">
          <img
            src={BRAND_LOGO_URL}
            alt="Logo Dulce Tentación Jast Jedy"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
          Contacto & Atención al Cliente
        </h1>
        <p className="text-xs sm:text-sm text-[#5C453C] max-w-md mx-auto font-medium">
          ¿Tienes una idea especial o quieres coordinar un pedido para tu fiesta? Estamos para ayudarte de forma personalizada con precios súper económicos.
        </p>

        {/* Big WhatsApp CTA with +51 987 415 813 */}
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/30 flex items-center justify-center gap-2.5 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white text-transparent" />
            <span>Chatear por WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
          </a>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-[#2C1810] border-b border-[#FFE4E8] pb-2">
          Horarios de Despacho & Atención
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-[#2C1810]">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <Clock className="w-5 h-5 text-[#E05A68] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Lunes a Sábado:</strong>
              <span className="text-[#5C453C] font-medium">9:00 am a 8:00 pm (Despacho y atención de pedidos).</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <Calendar className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Domingos:</strong>
              <span className="text-[#5C453C] font-medium">10:00 am a 4:00 pm (Entregas programadas con anticipación).</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Políticas de Pedido:</strong>
              <span className="text-[#5C453C] font-medium">
                Tortas regulares con 24h de aviso; temáticas con 48h; bocaditos para eventos con 3 días.
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenRules}
          className="w-full mt-2 py-3 rounded-xl bg-[#FFE4E8] hover:bg-[#FCD5DC] text-[#E05A68] font-extrabold text-xs transition-colors cursor-pointer"
        >
          Ver Todas las Instrucciones & Reglamentos
        </button>
      </div>
    </div>
  );
};
