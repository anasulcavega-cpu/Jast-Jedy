import React, { useState } from 'react';
import { User, Phone, Calendar, Clock, ShieldCheck, Truck, MessageCircle, LogOut, Edit3, CheckCircle2 } from 'lucide-react';
import { UserProfile, BRAND_LOGO_URL } from '../types';
import { WHATSAPP_DISPLAY_PHONE, createGeneralWhatsAppLink } from '../utils/whatsapp';

interface ProfileViewProps {
  user: UserProfile | null;
  onUpdateUser: (profile: UserProfile) => void;
  onOpenRules: () => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onOpenRules,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [age, setAge] = useState(user?.age || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !age.trim()) return;

    onUpdateUser({
      name: name.trim(),
      phone: phone.trim(),
      age: age.trim(),
    });

    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const whatsappUrl = createGeneralWhatsAppLink(user);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-3 pb-24 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#FFE4E8] shadow-xs text-center relative overflow-hidden">
        <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden p-1 bg-white border-2 border-[#FFE4E8] shadow-xs mb-3">
          <img
            src={BRAND_LOGO_URL}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#2C1810]">
          {user?.name || 'Cliente'}
        </h1>
        <p className="text-xs text-[#E05A68] font-extrabold mt-0.5">
          {user?.age ? `${user.age} años` : ''} • Cel: {user?.phone || 'Sin registrar'}
        </p>

        {savedSuccess && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Datos actualizados con éxito</span>
          </div>
        )}
      </div>

      {/* Edit Profile Form or Information Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#FFE4E8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#FFE4E8] pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#E05A68]" />
            <h2 className="text-base font-extrabold text-[#2C1810]">
              Información de Contacto
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-extrabold text-[#E05A68] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="block text-xs font-extrabold text-[#2C1810] mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#E05A68] font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#2C1810] mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#E05A68] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#2C1810] mb-1">
                  Celular
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#FFE4E8] bg-[#FFFDF9] text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#E05A68] font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] text-white font-extrabold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-[#FFE4E8]">
              <span className="text-[#8C6D62] font-semibold">Nombre:</span>
              <span className="font-extrabold text-[#2C1810]">{user?.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FFE4E8]">
              <span className="text-[#8C6D62] font-semibold">Edad:</span>
              <span className="font-extrabold text-[#2C1810]">{user?.age} años</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#8C6D62] font-semibold">Celular para entregas:</span>
              <span className="font-extrabold text-[#2C1810]">{user?.phone}</span>
            </div>
          </div>
        )}
      </div>

      {/* Horarios & Reglamentos */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#FFE4E8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#FFE4E8] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#E05A68]" />
            <h2 className="text-base font-extrabold text-[#2C1810]">
              Horarios & Reglamentos
            </h2>
          </div>

          <button
            onClick={onOpenRules}
            className="text-xs font-extrabold text-[#E05A68] hover:underline cursor-pointer"
          >
            Ver Detalle Completo
          </button>
        </div>

        <div className="space-y-3 text-xs text-[#2C1810]">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <Clock className="w-4 h-4 text-[#E05A68] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Horario de Despacho:</strong>
              <span className="text-[#5C453C] font-medium">Lunes a Sábado de 9:00 am a 8:00 pm. Domingos de 10:00 am a 4:00 pm.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <Calendar className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Anticipación de Pedidos:</strong>
              <span className="text-[#5C453C] font-medium">Tortas clásicas con 24h; tortas temáticas con 48h; bocaditos para eventos con 3 días.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFFDF9] border border-[#FFE4E8]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C1810]">Pagos:</strong>
              <span className="text-[#5C453C] font-medium">50% de anticipo para programar el horneado y 50% al entregar.</span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Help & Logout */}
      <div className="space-y-3 pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white text-transparent" />
          <span>Atención al Cliente por WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
        </a>

        <button
          type="button"
          onClick={onLogout}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-red-50 text-red-600 font-bold text-xs border border-red-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Cambiar de Usuario / Salir</span>
        </button>
      </div>
    </div>
  );
};
