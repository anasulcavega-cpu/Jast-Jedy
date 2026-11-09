import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { createGeneralWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  user: UserProfile | null;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ user }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = createGeneralWhatsAppLink(user);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2">
      {/* Speech bubble / Tooltip on desktop */}
      <div
        className={`hidden sm:flex items-center gap-1.5 bg-white text-[#2C1810] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-[#FFE4E8] transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-90'
        }`}
      >
        <span>¿Deseas pedir? ¡Escríbenos!</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={`Contáctanos por WhatsApp al ${WHATSAPP_DISPLAY_PHONE}`}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-95 text-white px-3.5 py-3 rounded-full shadow-lg shadow-[#E05A68]/35 transition-all duration-300"
      >
        <MessageCircle className="w-5 h-5 fill-white text-transparent" />
        <span className="font-extrabold text-xs sm:text-sm tracking-wide pr-1">
          WhatsApp
        </span>

        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#E05A68] opacity-30 group-hover:animate-ping -z-10" />
      </a>
    </div>
  );
};
