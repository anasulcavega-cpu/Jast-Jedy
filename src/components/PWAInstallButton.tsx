import React, { useState } from 'react';
import { Download, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { IOSInstallModal } from './IOSInstallModal';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, isStandalone, triggerInstall } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'installed'>('idle');

  // If app is already installed or running in standalone mode, hide
  if (isInstalled || isStandalone) {
    return null;
  }

  // If browser is not iOS and cannot install (no beforeinstallprompt fired), hide
  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    setInstallState('installing');
    const result = await triggerInstall();
    if (result === 'accepted') {
      setInstallState('installed');
    } else if (result === 'ios') {
      setShowIOSModal(true);
      setInstallState('idle');
    } else {
      setInstallState('idle');
    }
  };

  return (
    <>
      {variant === 'header' ? (
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

      {/* iOS Safari Manual Guide Modal */}
      <IOSInstallModal
        isOpen={showIOSModal}
        onClose={() => setShowIOSModal(false)}
      />
    </>
  );
};
