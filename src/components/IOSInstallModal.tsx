import React from 'react';
import { X, Share, PlusSquare, Smartphone, CheckCircle2, MoreVertical, Download } from 'lucide-react';
import { BRAND_LOGO_URL } from '../types';

interface IOSInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: 'ios' | 'android';
}

export const IOSInstallModal: React.FC<IOSInstallModalProps> = ({
  isOpen,
  onClose,
  platform = 'ios',
}) => {
  if (!isOpen) return null;

  const isIosMode = platform === 'ios';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#FFE4E8] z-10 animate-scale-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#FFE4E8] bg-[#FFFDF9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#FFE4E8] p-0.5 bg-white shrink-0">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Dulce Tentación"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#2C1810]">
                {isIosMode ? 'Instalar en iPhone / iPad' : 'Instalar en tu Celular (Android)'}
              </h3>
              <p className="text-[11px] text-[#E05A68] font-bold">
                Dulce Tentación Jast🧁Jedy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C6D62] hover:text-[#2C1810] hover:bg-[#FFE4E8]/60 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-[#2C1810]">
          <p className="text-xs text-[#5C453C] font-semibold leading-relaxed text-center">
            {isIosMode
              ? 'Para instalar esta aplicación en tu iPhone o iPad, sigue estos sencillos pasos desde Safari:'
              : 'Para descargar e instalar la app directamente en tu celular Android, sigue estos pasos:'}
          </p>

          {/* Steps */}
          <div className="space-y-3">
            {isIosMode ? (
              <>
                {/* iOS Step 1 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE4E8] text-[#E05A68] flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      1. Toca el botón Compartir
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      En la barra inferior de Safari, presiona el icono de <strong>Compartir</strong> (cuadrado con flecha hacia arriba).
                    </span>
                  </div>
                </div>

                {/* iOS Step 2 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      2. Añadir a pantalla de inicio
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      Desliza hacia abajo en el menú de opciones y selecciona <strong>"Añadir a pantalla de inicio"</strong>.
                    </span>
                  </div>
                </div>

                {/* iOS Step 3 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      3. Confirma tocando "Añadir"
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      Toca <strong>"Añadir"</strong> en la esquina superior derecha ¡y listo! Tendrás el icono de la pastelería en tu celular.
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Android Step 1 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE4E8] text-[#E05A68] flex items-center justify-center shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      1. Abre el menú del navegador
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      Toca el menú de los <strong>tres puntos (⋮)</strong> en la esquina superior derecha de tu navegador Chrome o Edge.
                    </span>
                  </div>
                </div>

                {/* Android Step 2 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-[#F3E8FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      2. Selecciona "Instalar aplicación"
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      Presiona en <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla de inicio"</strong>.
                    </span>
                  </div>
                </div>

                {/* Android Step 3 */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[#2C1810] font-extrabold mb-0.5">
                      3. Confirma la instalación
                    </strong>
                    <span className="text-[#5C453C] font-medium leading-relaxed">
                      Presiona <strong>"Instalar"</strong>. La app se guardará en tu inicio con acceso rápido y pedidos directos.
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-[#E05A68]/25 transition-all cursor-pointer"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};
