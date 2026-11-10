import React, { useState } from 'react';
import { Download, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { IOSInstallModal } from './IOSInstallModal';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'banner' | 'welcome';
  className?: string;
  showWhenInstalled?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
  showWhenInstalled = false,
}) => {
  const { isInstallable, isInstalled, isIOS, isStandalone, triggerInstall } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [modalPlatform, setModalPlatform] = useState<'ios' | 'android'>('ios');
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'installed'>('idle');

  // If already installed or running in standalone mode
  if (isInstalled || isStandalone) {
    if (variant === 'welcome' && showWhenInstalled) {
      return (
        <div className={`p-4 rounded-2xl bg-emerald-50/90 border-2 border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#2C1810]">
                ¡App Instalada en tu Celular!
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">
                Ya tienes Dulce Tentación Jast🧁Jedy en tu pantalla de inicio.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  // If not welcome variant and not installable / not iOS, hide
  if (variant !== 'welcome' && !isInstallable && !isIOS) {
    return null;
  }

  const handleClick = async () => {
    if (isIOS) {
      setModalPlatform('ios');
      setShowModal(true);
      return;
    }

    setInstallState('installing');
    const result = await triggerInstall();
    if (result === 'accepted') {
      setInstallState('installed');
    } else if (result === 'ios') {
      setModalPlatform('ios');
      setShowModal(true);
      setInstallState('idle');
    } else if (result === 'unsupported') {
      // Guide modal for Android/Desktop browsers when prompt is not yet ready
      setModalPlatform('android');
      setShowModal(true);
      setInstallState('idle');
    } else {
      setInstallState('idle');
    }
  };

  return (
    <>
      {variant === 'welcome' ? (
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFE4E8]/90 via-white to-[#F3E8FF]/90 border-2 border-[#FFE4E8] shadow-md transition-all ${className}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#E05A68]/30">
                <Smartphone className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-extrabold text-[#2C1810]">
                    ¿Deseas instalar la App en tu Celular?
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFE4E8] text-[#E05A68] font-black border border-[#F472B6]/40">
                    PWA Rápida
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#5C453C] font-semibold mt-0.5">
                  Descárgala a tu pantalla de inicio para pedidos directos y catálogo sin escribir la web.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClick}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#E05A68]/30 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 animate-pulse hover:animate-none"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Instalar App Ahora</span>
            </button>
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#FFE4E8]/80 flex items-center justify-between text-[10px] text-[#8C6D62] font-semibold">
            <span>✨ Funciona en Android, iPhone (iOS) y computadoras</span>
            <span className="text-[#E05A68]">100% Gratis y Ligera</span>
          </div>
        </div>
      ) : variant === 'header' ? (
        <button
          type="button"
          onClick={handleClick}
          title="Descargar e instalar aplicación en tu celular"
          aria-label="Instalar app en tu pantalla de inicio"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 text-white text-xs font-extrabold shadow-xs transition-all cursor-pointer shrink-0 animate-pulse hover:animate-none ${className}`}
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Instalar App</span>
        </button>
      ) : variant === 'banner' ? (
        <div className={`p-3 rounded-2xl bg-gradient-to-r from-[#FFE4E8] via-white to-[#F3E8FF] border-2 border-[#FFE4E8] shadow-xs flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#E05A68] to-[#F472B6] text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#2C1810]">
                ¡Instala la App en tu Celular!
              </p>
              <p className="text-[11px] text-[#5C453C] font-medium">
                Acceso rápido sin escribir la dirección y pedidos directos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar</span>
          </button>
        </div>
      ) : (
        /* Floating Pill Button */
        <button
          type="button"
          onClick={handleClick}
          aria-label="Descargar aplicación en tu celular"
          className={`fixed bottom-20 left-4 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white text-xs font-extrabold shadow-lg shadow-[#E05A68]/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Descargar App</span>
        </button>
      )}

      {/* Guide Modal for iOS Safari or Android/Browser */}
      <IOSInstallModal
        isOpen={showModal}
        platform={modalPlatform}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
