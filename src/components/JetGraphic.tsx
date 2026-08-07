import React from 'react';

interface JetGraphicProps {
  scale?: number;
  className?: string;
  showEnginesGlow?: boolean;
}

export const JetGraphic: React.FC<JetGraphicProps> = ({
  scale = 1,
  className = '',
  showEnginesGlow = true,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Contrails / Engine Exhaust Trails */}
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
          {/* Body Gradient */}
          <linearGradient id="fuselageGrad" x1="160" y1="10" x2="160" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#0B1A35" />
            <stop offset="70%" stopColor="#050E24" />
            <stop offset="100%" stopColor="#030912" />
          </linearGradient>

          <linearGradient id="wingLeftGrad" x1="20" y1="200" x2="160" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#0B1A35" />
            <stop offset="100%" stopColor="#050E24" />
          </linearGradient>

          <linearGradient id="wingRightGrad" x1="160" y1="200" x2="300" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#050E24" />
            <stop offset="50%" stopColor="#0B1A35" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </linearGradient>

          <linearGradient id="stripeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Blue Glass Cockpit */}
          <linearGradient id="glassGold" x1="160" y1="50" x2="160" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95" />
          </linearGradient>

          {/* Engine Exhaust Glow */}
          <radialGradient id="engineExhaust" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#60a5fa" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- MAIN WINGS (Swept Aerodynamic) --- */}
        <path d="M160 160 L18 245 L15 255 L35 258 L160 215 Z" fill="url(#wingLeftGrad)" stroke="#475569" strokeWidth="0.8" />
        <path d="M160 160 L302 245 L305 255 L285 258 L160 215 Z" fill="url(#wingRightGrad)" stroke="#475569" strokeWidth="0.8" />

        {/* Winglets */}
        <path d="M15 255 L10 230 L18 245 Z" fill="#3b82f6" />
        <path d="M305 255 L310 230 L302 245 Z" fill="#3b82f6" />

        {/* Navigation LED Lights */}
        <circle cx="10" cy="230" r="3" fill="#EF4444" className="animate-ping" />
        <circle cx="10" cy="230" r="2" fill="#FF0000" />
        <circle cx="310" cy="230" r="3" fill="#10B981" className="animate-ping" />
        <circle cx="310" cy="230" r="2" fill="#00FF66" />

        {/* --- REAR TAIL WINGS --- */}
        <path d="M160 300 L90 350 L88 358 L105 360 L160 335 Z" fill="#050E24" />
        <path d="M160 300 L230 350 L232 358 L215 360 L160 335 Z" fill="#050E24" />

        {/* --- ENGINE NACELLES --- */}
        <rect x="122" y="260" width="16" height="55" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="124" y="262" width="12" height="15" rx="4" fill="#334155" />
        <rect x="182" y="260" width="16" height="55" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="184" y="262" width="12" height="15" rx="4" fill="#334155" />

        {/* Engine Exhaust Nozzles */}
        <ellipse cx="130" cy="315" rx="7" ry="4" fill="url(#engineExhaust)" />
        <ellipse cx="190" cy="315" rx="7" ry="4" fill="url(#engineExhaust)" />

        {/* --- MAIN FUSELAGE --- */}
        <path
          d="M160 10 C168 45 178 120 178 260 C178 310 168 355 160 365 C152 355 142 310 142 260 C142 120 152 45 160 10 Z"
          fill="url(#fuselageGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Metallic Center Spine Specular */}
        <path d="M160 15 L162 350" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Luxury Gold Livery Accent Stripes */}
        <path
          d="M160 60 C170 110 176 180 176 250 M160 60 C150 110 144 180 144 250"
          stroke="url(#stripeGrad)"
          strokeWidth="3"
          fill="none"
        />

        {/* --- COCKPIT WINDSHIELD --- */}
        <path
          d="M160 55 C168 62 172 75 170 88 C165 92 155 92 150 88 C148 75 152 62 160 55 Z"
          fill="url(#glassGold)"
          stroke="#0284C7"
          strokeWidth="0.8"
        />
        {/* Glass Specular Glare */}
        <path d="M158 58 C162 62 165 72 163 82" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />

        {/* Pilot HUD Glow */}
        <circle cx="160" cy="72" r="2" fill="#00FFCC" opacity="0.9" />

        {/* --- CABIN WINDOWS --- */}
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

        {/* Vertical Tail Fin */}
        <path d="M160 290 L160 360" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="290" r="2.5" fill="#FFFFFF" className="animate-pulse" />
      </svg>
    </div>
  );
};
