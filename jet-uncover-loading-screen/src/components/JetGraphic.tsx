import React from 'react';
import { JetLivery } from '../types';

interface JetGraphicProps {
  livery: JetLivery;
  scale?: number;
  className?: string;
  showEnginesGlow?: boolean;
}

export const JetGraphic: React.FC<JetGraphicProps> = ({
  livery,
  scale = 1,
  className = '',
  showEnginesGlow = true,
}) => {
  // Livery themes
  const liveryStyles = {
    pearl_gold: {
      bodyPrimary: '#171717',
      bodySecondary: '#0A0A0A',
      accent: '#c5a059',
      accentGradient: ['#E5C178', '#c5a059'],
      wingColor: '#262626',
      cockpitGlass: 'url(#glassGold)',
      engineCore: '#c5a059',
      exhaustGlow: '#D4AF37',
    },
    stealth_black: {
      bodyPrimary: '#1E293B',
      bodySecondary: '#0F172A',
      accent: '#06B6D4',
      accentGradient: ['#22D3EE', '#0891B2'],
      wingColor: '#334155',
      cockpitGlass: 'url(#glassCyan)',
      engineCore: '#00F0FF',
      exhaustGlow: '#06B6D4',
    },
    midnight_blue: {
      bodyPrimary: '#1E1B4B',
      bodySecondary: '#312E81',
      accent: '#38BDF8',
      accentGradient: ['#0EA5E9', '#0284C7'],
      wingColor: '#4338CA',
      cockpitGlass: 'url(#glassBlue)',
      engineCore: '#38BDF8',
      exhaustGlow: '#0284C7',
    },
    crimson_carbon: {
      bodyPrimary: '#27272A',
      bodySecondary: '#18181B',
      accent: '#EF4444',
      accentGradient: ['#F87171', '#DC2626'],
      wingColor: '#3F3F46',
      cockpitGlass: 'url(#glassRed)',
      engineCore: '#FF2A2A',
      exhaustGlow: '#DC2626',
    },
  };

  const style = liveryStyles[livery] || liveryStyles.pearl_gold;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Contrails / Engine Trails */}
      {showEnginesGlow && (
        <div className="absolute top-[82%] left-0 right-0 flex justify-center gap-12 pointer-events-none opacity-90 z-0">
          <div className="w-2.5 h-48 bg-gradient-to-b from-amber-400 via-orange-500/50 to-transparent rounded-full blur-[3px] animate-pulse" />
          <div className="w-2.5 h-48 bg-gradient-to-b from-amber-400 via-orange-500/50 to-transparent rounded-full blur-[3px] animate-pulse" />
        </div>
      )}

      {/* SVG Jet Illustration */}
      <svg
        width={320 * scale}
        height={380 * scale}
        viewBox="0 0 320 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter relative z-10"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="fuselageGrad" x1="160" y1="10" x2="160" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor={style.bodyPrimary} />
            <stop offset="70%" stopColor={style.bodySecondary} />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>

          <linearGradient id="wingLeftGrad" x1="20" y1="200" x2="160" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={style.wingColor} />
            <stop offset="50%" stopColor={style.bodyPrimary} />
            <stop offset="100%" stopColor={style.bodySecondary} />
          </linearGradient>

          <linearGradient id="wingRightGrad" x1="160" y1="200" x2="300" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={style.bodySecondary} />
            <stop offset="50%" stopColor={style.bodyPrimary} />
            <stop offset="100%" stopColor={style.wingColor} />
          </linearGradient>

          <linearGradient id="stripeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={style.accentGradient[0]} />
            <stop offset="100%" stopColor={style.accentGradient[1]} />
          </linearGradient>

          {/* Glass Cockpit Gradients */}
          <linearGradient id="glassGold" x1="160" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E5C178" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#c5a059" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8A6B29" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="glassCyan" x1="160" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0891B2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0E7490" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="glassBlue" x1="160" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="glassRed" x1="160" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.95" />
          </linearGradient>

          {/* Engine Exhaust Radial Glow */}
          <radialGradient id="engineExhaust" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor={style.engineCore} />
            <stop offset="70%" stopColor={style.exhaustGlow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={style.exhaustGlow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- MAIN WINGS (Swept Aerodynamic Wings) --- */}
        {/* Left Wing */}
        <path
          d="M160 160 L18 245 L15 255 L35 258 L160 215 Z"
          fill="url(#wingLeftGrad)"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Right Wing */}
        <path
          d="M160 160 L302 245 L305 255 L285 258 L160 215 Z"
          fill="url(#wingRightGrad)"
          stroke="#475569"
          strokeWidth="0.8"
        />

        {/* Winglets / Wing Tip Extensions */}
        {/* Left Winglet */}
        <path d="M15 255 L10 230 L18 245 Z" fill={style.accent} />
        {/* Right Winglet */}
        <path d="M305 255 L310 230 L302 245 Z" fill={style.accent} />

        {/* Navigation LED Lights */}
        {/* Left Wingtip - Port Red */}
        <circle cx="10" cy="230" r="3" fill="#EF4444" className="animate-ping" />
        <circle cx="10" cy="230" r="2" fill="#FF0000" />
        {/* Right Wingtip - Starboard Green */}
        <circle cx="310" cy="230" r="3" fill="#10B981" className="animate-ping" />
        <circle cx="310" cy="230" r="2" fill="#00FF66" />

        {/* --- REAR TAIL WINGS (Horizontal Stabilizers) --- */}
        <path d="M160 300 L90 350 L88 358 L105 360 L160 335 Z" fill={style.bodySecondary} />
        <path d="M160 300 L230 350 L232 358 L215 360 L160 335 Z" fill={style.bodySecondary} />

        {/* --- ENGINE NACELLES (Twin Jet Turbines) --- */}
        {/* Left Engine */}
        <rect x="122" y="260" width="16" height="55" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="124" y="262" width="12" height="15" rx="4" fill="#334155" />
        {/* Right Engine */}
        <rect x="182" y="260" width="16" height="55" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="184" y="262" width="12" height="15" rx="4" fill="#334155" />

        {/* Engine Exhaust Nozzles */}
        <ellipse cx="130" cy="315" rx="7" ry="4" fill="url(#engineExhaust)" />
        <ellipse cx="190" cy="315" rx="7" ry="4" fill="url(#engineExhaust)" />

        {/* --- MAIN FUSELAGE (Sleek Streamlined Body) --- */}
        <path
          d="M160 10 C168 45 178 120 178 260 C178 310 168 355 160 365 C152 355 142 310 142 260 C142 120 152 45 160 10 Z"
          fill="url(#fuselageGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Metallic Center Spine Light Specular */}
        <path
          d="M160 15 L162 350"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Luxury Racing Livery Accent Stripes */}
        <path
          d="M160 60 C170 110 176 180 176 250 M160 60 C150 110 144 180 144 250"
          stroke="url(#stripeGrad)"
          strokeWidth="3"
          fill="none"
        />

        {/* --- COCKPIT WINDSHIELD --- */}
        {/* Sleek Panoramic Glass Canopy */}
        <path
          d="M160 55 C168 62 172 75 170 88 C165 92 155 92 150 88 C148 75 152 62 160 55 Z"
          fill={style.cockpitGlass}
          stroke="#0284C7"
          strokeWidth="0.8"
        />
        {/* Glass Specular Glare */}
        <path
          d="M158 58 C162 62 165 72 163 82"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Pilot HUD Glow Point */}
        <circle cx="160" cy="72" r="2" fill="#00FFCC" opacity="0.9" />

        {/* --- CABIN WINDOWS (Tiny Luxury Oval Windows) --- */}
        <g opacity="0.75" fill="#38BDF8">
          <ellipse cx="148" cy="120" rx="1.5" ry="2.5" />
          <ellipse cx="148" cy="132" rx="1.5" ry="2.5" />
          <ellipse cx="148" cy="144" rx="1.5" ry="2.5" />
          <ellipse cx="148" cy="156" rx="1.5" ry="2.5" />
          <ellipse cx="148" cy="168" rx="1.5" ry="2.5" />
          <ellipse cx="148" cy="180" rx="1.5" ry="2.5" />

          <ellipse cx="172" cy="120" rx="1.5" ry="2.5" />
          <ellipse cx="172" cy="132" rx="1.5" ry="2.5" />
          <ellipse cx="172" cy="144" rx="1.5" ry="2.5" />
          <ellipse cx="172" cy="156" rx="1.5" ry="2.5" />
          <ellipse cx="172" cy="168" rx="1.5" ry="2.5" />
          <ellipse cx="172" cy="180" rx="1.5" ry="2.5" />
        </g>

        {/* Vertical Tail Fin Blade */}
        <path d="M160 290 L160 360" stroke={style.accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="290" r="2.5" fill="#FFFFFF" className="animate-pulse" />
      </svg>
    </div>
  );
};
