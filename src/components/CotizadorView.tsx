import React, { useState } from 'react';
import { Sparkles, Calculator, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { WHATSAPP_PHONE_RAW, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface CotizadorViewProps {
  user: UserProfile | null;
}

export const CotizadorView: React.FC<CotizadorViewProps> = ({ user }) => {
  const [eventType, setEventType] = useState('Cumpleaños');
  const [portions, setPortions] = useState('15');
  const [flavor, setFlavor] = useState('Torta de Chocolate con Fudge');
  const [themeText, setThemeText] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [includeBocaditos, setIncludeBocaditos] = useState(false);

  // Price calculation
  const portionCount = parseInt(portions, 10);
  let basePrice = portionCount * 4.8;
  if (flavor.includes('Red Velvet') || flavor.includes('Maracuyá')) basePrice += 10;
  if (includeBocaditos) basePrice += 45; // bandeja de bocaditos complementaria

  const totalEstimate = Math.max(50, Math.round(basePrice));

  const handleSendQuoteWhatsApp = () => {
    const clientName = user?.name ? user.name.trim() : 'Cliente';
    const ageText = user?.age ? ` (${user.age} años)` : '';
    const phoneText = user?.phone ? ` - Tel: ${user.phone}` : '';

    const text = `¡Hola! Soy *${clientName}*${ageText}${phoneText}. Deseo cotizar una torta personalizada en *Dulce Tentación Jast🧁Jedy*:\n\n• *Tipo de Evento:* ${eventType}\n• *Porciones:* ${portions} porciones\n• *Sabor deseado:* ${flavor}\n• *Temática / Dedicatoria:* ${themeText || 'Por coordinar'}\n• *Fecha estimada:* ${deliveryDate || 'Por coordinar'}\n• *Bocaditos adicionales:* ${includeBocaditos ? 'Sí (Bandeja surtida)' : 'No'}\n\n*Presupuesto aproximado en app:* S/ ${totalEstimate}.00\n\n¿Tienen disponibilidad para esta fecha? ¡Gracias!`;

    const url = `https://wa.me/${WHATSAPP_PHONE_RAW}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-3 pb-24 space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
          Cotizador de Ideas Creativas & Tortas
        </h1>
        <p className="text-xs sm:text-sm text-[#5C453C] mt-1 max-w-md mx-auto font-medium">
          Calcula un estimado económico para tu torta decorativa o mesa dulce y coordina los detalles por WhatsApp
        </p>
      </div>

      {/* Calculator Form */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#FFE4E8] shadow-xs space-y-5">
        {/* Event Type */}
        <div>
          <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2">
            1. Tipo de Celebración
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Cumpleaños', 'Quinceañero', 'Bautizo', 'Gender Reveal', 'Aniversario', 'Reunión Familiar'].map((ev) => (
              <button
                key={ev}
                type="button"
                onClick={() => setEventType(ev)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  eventType === ev
                    ? 'bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white border-transparent shadow-xs'
                    : 'bg-[#FFFDF9] text-[#2C1810] border-[#FFE4E8] hover:border-[#E05A68]/40'
                }`}
              >
                {ev}
              </button>
            ))}
          </div>
        </div>

        {/* Portions */}
        <div>
          <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2">
            2. Cantidad de Porciones ({portions} personas)
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['10', '15', '20', '25', '30', '50'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPortions(p)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer whitespace-nowrap ${
                  portions === p
                    ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-xs'
                    : 'bg-[#FFFDF9] text-[#2C1810] border-[#FFE4E8] hover:border-[#E05A68]/40'
                }`}
              >
                {p} porc.
              </button>
            ))}
          </div>
        </div>

        {/* Flavor Selection */}
        <div>
          <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-2">
            3. Sabor y Relleno
          </label>
          <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#E05A68] font-semibold cursor-pointer"
          >
            <option value="Torta de Chocolate con Fudge">Torta de Chocolate húmeda con fudge casero</option>
            <option value="Tres Leches Clásica">Tres Leches bañada con canela y chantilly</option>
            <option value="Red Velvet con Frosting">Red Velvet con suave frosting de queso crema</option>
            <option value="Maracuyá Natural">Torta de Maracuyá con pulpa fresca</option>
            <option value="Vainilla con Manjar Blanco">Bizcocho de vainilla relleno de manjar artesanal</option>
          </select>
        </div>

        {/* Theme notes & date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-1.5">
              Idea Creativa o Temática Deseada
            </label>
            <input
              type="text"
              value={themeText}
              onChange={(e) => setThemeText(e.target.value)}
              placeholder="Ej. Selva & Dinosaurios, Rosas con perlas, Flores pastel..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-[#2C1810] placeholder-[#8C6D62]/60 focus:outline-none focus:border-[#E05A68] font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#2C1810] uppercase tracking-wider mb-1.5">
              Fecha del Evento
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-[#2C1810] focus:outline-none focus:border-[#E05A68] font-semibold cursor-pointer"
            />
          </div>
        </div>

        {/* Add Bocaditos Toggle */}
        <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFE4E8]/40 border border-[#FFE4E8] cursor-pointer select-none hover:bg-[#FFE4E8]/60 transition-colors">
          <input
            type="checkbox"
            checked={includeBocaditos}
            onChange={(e) => setIncludeBocaditos(e.target.checked)}
            className="w-4 h-4 accent-[#E05A68] rounded cursor-pointer"
          />
          <div className="text-xs">
            <span className="font-extrabold text-[#2C1810] block">
              Añadir bandeja surtida de bocaditos para fiesta (+S/ 35.00)
            </span>
            <span className="text-[#5C453C] font-medium">
              Alfajorcitos, trufas de cacao y mini tartaletas para acompañar
            </span>
          </div>
        </label>

        {/* Total Estimate Calculation */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFE4E8]/60 to-[#F3E8FF]/60 border-2 border-[#FFE4E8] flex items-baseline justify-between pt-3">
          <div>
            <span className="text-xs text-[#8C6D62] font-extrabold block">Presupuesto Económico Estimado:</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#E05A68] tabular-nums">
              S/ {totalEstimate}.00
            </span>
          </div>
          <span className="text-[11px] text-[#5C453C] font-medium">
            *Precio accesible sujeto a confirmación
          </span>
        </div>

        {/* WhatsApp Quote CTA with +51 983 344 508 */}
        <button
          type="button"
          onClick={handleSendQuoteWhatsApp}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-transparent" />
          <span>Enviar Cotización a WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
