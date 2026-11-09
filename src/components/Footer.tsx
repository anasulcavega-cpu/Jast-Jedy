import React from 'react';
import { MessageCircle, Clock, Heart, MapPin, Sparkles } from 'lucide-react';
import { UserProfile, BRAND_LOGO_URL } from '../types';
import { createGeneralWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface FooterProps {
  user: UserProfile | null;
}

export const Footer: React.FC<FooterProps> = ({ user }) => {
  const whatsappUrl = createGeneralWhatsAppLink(user);

  return (
    <footer className="mt-16 bg-white border-t border-[#F2C1A3] text-[#525871]">
      {/* Contact Banner Section ("Contáctanos por WhatsApp") */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-tr from-[#F2C1A3]/40 via-[#F8CCAA]/30 to-white rounded-3xl p-6 sm:p-10 border border-[#F2C1A3] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CD9FA0]/20 text-[#525871] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#CD9FA0]" />
              <span>Atención Personalizada</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#525871] tracking-tight">
              ¿Tienes un pedido especial o evento?
            </h2>
            <p className="text-sm text-[#857C91] mt-2 leading-relaxed">
              En <strong className="text-[#525871]">Dulce Tentación Jast🧁Jedy</strong> elaboramos tortas personalizadas, bocaditos surtidos para quinceañeros, cumpleaños y compromisos. Escríbenos directamente y coordinemos juntos cada detalle.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-sm shadow-md shadow-[#25D366]/30 flex items-center justify-center gap-2.5 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-transparent" />
              <span>Contáctanos por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Informational Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#F2C1A3]/60 text-xs sm:text-sm">
          {/* Brand info with Official Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white p-0.5 border border-[#F2C1A3] shrink-0">
                <img
                  src={BRAND_LOGO_URL}
                  alt="Logo Dulce Tentación Jast Jedy"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-base text-[#525871]">
                Dulce Tentación Jast🧁Jedy
              </span>
            </div>
            <p className="text-[#857C91] leading-relaxed">
              Pastelería y repostería artesanal con los más altos estándares de calidad, frescura y dedicación en cada bocado.
            </p>
            <div className="flex items-center gap-1 text-[#CD9FA0] font-semibold text-xs">
              <Heart className="w-3.5 h-3.5 fill-[#CD9FA0]" />
              <span>Hecho con amor en cada receta</span>
            </div>
          </div>

          {/* Schedule & Delivery */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#525871] uppercase tracking-wider text-xs">
              Horario & Pedidos
            </h3>
            <ul className="space-y-2 text-[#857C91]">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#CD9FA0] shrink-0 mt-0.5" />
                <span>Lunes a Sábado: 8:00 am - 8:00 pm</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#857C91] shrink-0 mt-0.5" />
                <span>Pedidos con anticipación de 24 a 48 horas para tortas temáticas.</span>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Contact details */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#525871] uppercase tracking-wider text-xs">
              Contacto Directo
            </h3>
            <p className="text-[#857C91]">
              WhatsApp oficial para consultas, cotizaciones y pedidos:
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#525871] hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{WHATSAPP_DISPLAY_PHONE}</span>
            </a>
            <p className="text-[11px] text-[#857C91]">
              Mensaje predefinido: <em>&ldquo;Hola, quiero hacer un pedido de postres&rdquo;</em>
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 pt-6 border-t border-[#F2C1A3]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#857C91] gap-2">
          <span>&copy; {new Date().getFullYear()} Dulce Tentación Jast🧁Jedy. Todos los derechos reservados.</span>
          <span>Endulzando tus mejores momentos 🌸</span>
        </div>
      </div>
    </footer>
  );
};
