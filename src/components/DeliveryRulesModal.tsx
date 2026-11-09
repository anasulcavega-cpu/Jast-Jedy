import React from 'react';
import { X, Clock, Calendar, ShieldCheck, AlertCircle, Truck, Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY_PHONE, createGeneralWhatsAppLink } from '../utils/whatsapp';
import { UserProfile } from '../types';

interface DeliveryRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
}

export const DeliveryRulesModal: React.FC<DeliveryRulesModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFE4E8] z-10 animate-scale-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#FFE4E8] bg-[#FFFDF9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
                Instrucciones & Reglamentos
              </h3>
              <p className="text-xs text-[#8C6D62] font-semibold">
                Horarios de entrega y políticas de pedido
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8C6D62] hover:text-[#2C1810] hover:bg-[#FFE4E8]/60 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#2C1810]">
          {/* Section 1: Horarios */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FFE4E8]">
            <div className="flex items-center gap-2 font-extrabold text-[#2C1810] mb-1.5">
              <Clock className="w-4 h-4 text-[#E05A68]" />
              <span>1. Horarios de Entrega y Despacho</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#5C453C] pl-5 list-disc leading-relaxed font-medium">
              <li><strong>Lunes a Sábado:</strong> 9:00 am a 8:00 pm.</li>
              <li><strong>Domingos:</strong> 10:00 am a 4:00 pm (previa coordinación).</li>
              <li><strong>Franjas de Entrega:</strong> Mañana (10:00 am - 1:00 pm) o Tarde (3:00 pm - 7:30 pm).</li>
            </ul>
          </div>

          {/* Section 2: Anticipación */}
          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#FFE4E8] shadow-xs">
            <div className="flex items-center gap-2 font-extrabold text-[#2C1810] mb-1.5">
              <Calendar className="w-4 h-4 text-[#8B5CF6]" />
              <span>2. Tiempo de Anticipación Requerido</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#5C453C] pl-5 list-disc leading-relaxed font-medium">
              <li><strong>Tortas Clásicas y Porciones:</strong> Mínimo 24 horas de anticipación.</li>
              <li><strong>Tortas Personalizadas y Creativas:</strong> Mínimo 48 a 72 horas para modelado y detalles finos.</li>
              <li><strong>Bocaditos para Eventos (Quinceañeros, Compromisos):</strong> Mínimo 3 a 5 días de anticipación para reservas de fecha.</li>
            </ul>
          </div>

          {/* Section 3: Pagos y Reservas */}
          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FFE4E8]">
            <div className="flex items-center gap-2 font-extrabold text-[#2C1810] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>3. Reglamento de Pagos & Confirmación</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#5C453C] pl-5 list-disc leading-relaxed font-medium">
              <li>Todo pedido se programa con el <strong>50% de anticipo</strong> por Yape, Plin o transferencia bancaria.</li>
              <li>El 50% restante se cancela contraentrega o previo al envío por motorizado.</li>
              <li>Se envía foto del producto terminado antes del despacho para tu total tranquilidad.</li>
            </ul>
          </div>

          {/* Section 4: Políticas de Entrega */}
          <div className="p-3.5 rounded-2xl bg-white border-2 border-[#FFE4E8] shadow-xs">
            <div className="flex items-center gap-2 font-extrabold text-[#2C1810] mb-1.5">
              <Truck className="w-4 h-4 text-[#E05A68]" />
              <span>4. Entrega y Recepción del Pedido</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#5C453C] pl-5 list-disc leading-relaxed font-medium">
              <li>Existe un tiempo de tolerancia de 15 minutos en el punto de entrega convenido.</li>
              <li>En caso de reprogramación de entrega, comunicarse con al menos 24 horas de aviso.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#FFE4E8] bg-white flex flex-col sm:flex-row gap-2.5">
          <a
            href={createGeneralWhatsAppLink(user)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-transparent" />
            <span>Consultar Dudas al WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
          </a>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-[#FFE4E8] hover:bg-[#FCD5DC] text-[#E05A68] text-xs font-extrabold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
