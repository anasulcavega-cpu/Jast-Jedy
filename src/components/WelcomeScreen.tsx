import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Phone, User, Heart, ArrowRight, Calendar, Clock, ShieldCheck, Truck } from 'lucide-react';
import { UserProfile, BRAND_LOGO_URL } from '../types';
import { TulipCelebration } from './TulipCelebration';
import { PWAInstallButton } from './PWAInstallButton';

interface WelcomeScreenProps {
  onSuccess: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSuccess,
  initialProfile,
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [phone, setPhone] = useState(initialProfile?.phone || '');
  const [age, setAge] = useState(initialProfile?.age || '');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; age?: string }>({});
  const [submittedProfile, setSubmittedProfile] = useState<UserProfile | null>(null);
  const [showTulips, setShowTulips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; age?: string } = {};

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanAge = age.trim();

    if (!cleanName) {
      newErrors.name = 'Por favor ingresa tu nombre';
    } else if (cleanName.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!cleanPhone) {
      newErrors.phone = 'Por favor ingresa tu número de teléfono';
    } else if (cleanPhone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Ingresa un celular válido (ej. 983 344 508)';
    }

    const ageNum = parseInt(cleanAge, 10);
    if (!cleanAge) {
      newErrors.age = 'Por favor ingresa tu edad';
    } else if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      newErrors.age = 'Ingresa una edad válida (1 a 120 años)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const profileData: UserProfile = {
      name: cleanName,
      phone: cleanPhone,
      age: cleanAge,
    };

    setSubmittedProfile(profileData);
    setShowTulips(true);

    try {
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#E05A68', '#F472B6', '#8B5CF6', '#FDE047', '#FFE4E8'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleContinueToCatalog = () => {
    if (submittedProfile) {
      onSuccess(submittedProfile);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
      {/* Realistic Tulip rain animation (NO emojis) */}
      {showTulips && <TulipCelebration />}

      {/* Ambient background glows with soft pastel tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FFE4E8]/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#F3E8FF]/60 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg mx-auto z-10">
        {/* Main Card with creative boutique styling */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#FFE4E8] transition-all duration-300">
          {/* Official circular logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 group">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Dulce Tentación Jast Jedy"
                className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
              Dulce Tentación
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE4E8] text-[#E05A68] font-extrabold text-xs sm:text-sm mt-1 border border-[#F472B6]/40">
              <span>Jast🧁Jedy</span>
            </div>
            <p className="text-[#5C453C] text-xs sm:text-sm mt-1.5 font-medium">
              Pastelería Fina, Tortas Creativas & Precios Económicos
            </p>
          </div>

          {/* Submitted State with Tulip Welcome & Delivery Rules */}
          {submittedProfile ? (
            <div className="space-y-4 animate-scale-up">
              {/* Tulip Welcome Greeting */}
              <div className="text-center bg-gradient-to-r from-[#FFE4E8]/80 to-[#F3E8FF]/80 p-5 rounded-2xl border-2 border-[#FFE4E8] relative overflow-hidden">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810] tracking-tight">
                  ¡Bienvenida {submittedProfile.name}!
                </h2>
                <p className="text-xs sm:text-sm text-[#E05A68] font-extrabold mt-1">
                  {submittedProfile.age} años • Tel: {submittedProfile.phone}
                </p>
                <p className="text-xs text-[#5C453C] mt-1 font-medium">
                  Lluvia de tulipanes para darte la más cálida bienvenida 🌷
                </p>
              </div>

              {/* Opción destacada para instalar la App en el celular tras dar la bienvenida */}
              <PWAInstallButton variant="welcome" showWhenInstalled={true} />

              {/* Delivery instructions & regulations */}
              <div className="bg-[#FFFDF9] rounded-2xl p-4 border-2 border-[#FFE4E8] space-y-2.5 text-xs text-[#2C1810]">
                <div className="flex items-center gap-2 font-extrabold text-sm text-[#2C1810]">
                  <Clock className="w-4 h-4 text-[#E05A68]" />
                  <span>Horarios de Entrega & Reglamentos</span>
                </div>

                <div className="space-y-1.5 pl-1">
                  <div className="flex items-start gap-2">
                    <span className="text-[#E05A68] font-bold">•</span>
                    <span><strong>Horario de Despacho:</strong> Lunes a Sábado de 9:00 am a 8:00 pm. Domingos de 10:00 am a 4:00 pm.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#E05A68] font-bold">•</span>
                    <span><strong>Anticipación de Pedidos:</strong> Tortas regulares con mínimo 24h de anticipación; tortas temáticas y creativas con 48h a 72h.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#E05A68] font-bold">•</span>
                    <span><strong>Reserva y Pago:</strong> 50% de anticipo para programar el horneado artesanal y 50% al entregar.</span>
                  </div>
                </div>
              </div>

              {/* Primary button in berry gradient */}
              <button
                type="button"
                onClick={handleContinueToCatalog}
                className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#E05A68]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Entrar a la Aplicación y Catálogo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ) : (
            /* Mandatory Login Form (no guest option) */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-3">
                <h2 className="text-base sm:text-lg font-extrabold text-[#2C1810]">
                  ¡Bienvenida a nuestra pastelería!
                </h2>
                <p className="text-xs text-[#5C453C] mt-0.5 font-medium">
                  Ingresa tus datos para una atención dulce y personalizada
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label
                  htmlFor="client-name"
                  className="block text-xs font-extrabold uppercase tracking-wider text-[#2C1810]"
                >
                  Tu Nombre Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6D62]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="client-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ej. Ana Sulca"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFDF9] border-2 ${
                      errors.name ? 'border-red-400' : 'border-[#FFE4E8] focus:border-[#E05A68]'
                    } text-[#2C1810] placeholder-[#8C6D62]/60 text-sm focus:outline-none transition-all font-semibold`}
                    autoFocus
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-600 pl-1">{errors.name}</p>
                )}
              </div>

              {/* Age & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="client-age"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#2C1810]"
                  >
                    Tu Edad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6D62]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="client-age"
                      type="number"
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                        if (errors.age) setErrors((prev) => ({ ...prev, age: undefined }));
                      }}
                      placeholder="Ej. 24"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFDF9] border-2 ${
                        errors.age ? 'border-red-400' : 'border-[#FFE4E8] focus:border-[#E05A68]'
                      } text-[#2C1810] placeholder-[#8C6D62]/60 text-sm focus:outline-none transition-all font-semibold`}
                    />
                  </div>
                  {errors.age && (
                    <p className="text-xs text-red-600 pl-1">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="client-phone"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#2C1810]"
                  >
                    Número de Celular
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C6D62]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="client-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="Ej. 983 344 508"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFDF9] border-2 ${
                        errors.phone ? 'border-red-400' : 'border-[#FFE4E8] focus:border-[#E05A68]'
                      } text-[#2C1810] placeholder-[#8C6D62]/60 text-sm focus:outline-none transition-all font-semibold`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 pl-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="p-3 bg-[#FFE4E8]/50 rounded-xl border border-[#FFE4E8] flex items-center gap-2 text-[11px] text-[#5C453C]">
                <Truck className="w-4 h-4 text-[#E05A68] shrink-0" />
                <span>Horario de entrega: Lun-Sáb 9am a 8pm • Pedidos con 24h a 48h</span>
              </div>

              {/* Primary button in berry gradient */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E05A68] to-[#C84654] hover:opacity-95 active:scale-98 text-white font-extrabold text-sm shadow-md shadow-[#E05A68]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Ingresar a la Pastelería</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Sweet trust badges */}
          <div className="mt-6 pt-4 border-t border-[#FFE4E8] flex items-center justify-around text-center text-xs text-[#8C6D62]">
            <div className="flex items-center gap-1 font-semibold">
              <Heart className="w-3.5 h-3.5 text-[#E05A68]" />
              <span>100% Artesanal</span>
            </div>
            <div className="text-[#FFE4E8]">•</div>
            <div className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Horneado Fresco</span>
            </div>
          </div>
        </div>

        {/* Brand footer note */}
        <p className="text-center text-xs text-[#8C6D62] mt-4 font-semibold">
          Dulce Tentación Jast🧁Jedy • Pedidos al WhatsApp +51 983 344 508
        </p>
      </div>
    </div>
  );
};
