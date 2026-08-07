import { useEffect, useRef, useState } from 'react';
import { Compass, Gauge, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { JetGraphic } from './JetGraphic';
import { playJetSound } from '../utils/audio';

const DURATION_MS = 2600; // Mandatory display time for all users

interface PrivateJetLoaderProps {
  progress: number;  // 0-100, drives the progress bar
  isLoaded: boolean; // true when images are ready AND minimum time passed
}

export function PrivateJetLoader({ progress, isLoaded }: PrivateJetLoaderProps) {
  const [animProgress, setAnimProgress] = useState(0); // 0.0 → 1.0 internal animation progress
  const [altitude, setAltitude] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundStarted, setSoundStarted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto-play sound on first render (requires user gesture on some browsers)
    const trySound = () => {
      if (!soundStarted && soundEnabled) {
        playJetSound(DURATION_MS / 1000);
        setSoundStarted(true);
      }
      window.removeEventListener('pointerdown', trySound);
    };
    // Try immediately (works on desktop/most browsers); fallback on first touch
    try {
      playJetSound(DURATION_MS / 1000);
      setSoundStarted(true);
    } catch {
      window.addEventListener('pointerdown', trySound, { once: true });
    }

    // Cubic ease-in-out animation loop
    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const raw = Math.min(elapsed / DURATION_MS, 1);
      // Cubic ease-in-out
      const eased = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      setAnimProgress(eased);
      setAltitude(Math.round(eased * 45000));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Once both animation finished AND images loaded → fade out & unmount
  useEffect(() => {
    if (isLoaded && animProgress >= 0.99) {
      setTimeout(() => setHidden(true), 300);
    }
  }, [isLoaded, animProgress]);

  if (hidden) return null;

  // Jet travels from 110vh → -110vh as animProgress goes 0 → 1
  const jetYPercent = 110 - animProgress * 220;
  // Curtain clips away from bottom to top as jet ascends
  const curtainClip = `inset(0 0 ${animProgress * 100}% 0)`;

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none font-['DM_Sans',sans-serif]">

      {/* ── DARK CURTAIN that gets wiped away bottom→top by the jet ── */}
      <div
        className="absolute inset-0 bg-[#050E24] flex flex-col justify-between text-[#f5f5f5] transition-none"
        style={{ clipPath: curtainClip, WebkitClipPath: curtainClip }}
      >
        {/* Subtle Gold Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(5,14,36,0))]" />
        {/* Fine grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Top Brand & Flight Status Bar */}
        <div className="relative z-10 p-6 sm:p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0B1A35] border border-[#60a5fa]/40 flex items-center justify-center text-[#60a5fa] font-serif text-lg sm:text-xl tracking-widest shadow-inner">
              P
            </div>
            <div>
              <span className="text-[#f5f5f5] font-serif font-light text-base sm:text-xl tracking-[0.2em] uppercase block">
                PARIS TRAVEL CO.
              </span>
              <span className="text-[#93c5fd] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-ping" />
                PRIVATE JET • FLIGHT PA-707
              </span>
            </div>
          </div>

          {/* Flight Metrics Badge */}
          <div className="hidden sm:flex items-center gap-6 px-5 py-2.5 rounded-full bg-[#0B1A35] border border-[#3b82f6]/30 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#60a5fa]" />
              <span className="text-[#93c5fd]">MACH:</span>
              <span className="text-white font-serif font-light text-sm">0.925</span>
            </div>
            <div className="w-px h-3 bg-[#3b82f6]/30" />
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#60a5fa]" />
              <span className="text-[#93c5fd]">ALTITUDE:</span>
              <span className="text-white font-serif font-light text-sm">{altitude.toLocaleString()} FT</span>
            </div>
          </div>
        </div>

        {/* Center: Headline & Progress */}
        <div className="relative z-10 text-center px-4 max-w-lg mx-auto my-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e3a8a]/40 border border-[#3b82f6]/30 text-[#93c5fd] text-[10px] font-mono uppercase tracking-[0.3em] mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            UNCOVERING PARIS • {(DURATION_MS / 1000).toFixed(1)}S PASS
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#f5f5f5] tracking-tight leading-none mb-3 italic">
            Beyond the Horizon.
          </h2>
          <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-mono mb-7 max-w-sm mx-auto">
            Bespoke Paris journeys, crafted for discerning travelers.
          </p>

          {/* Progress Bar */}
          <div className="relative w-full h-1.5 bg-[#0B1A35] rounded-full overflow-hidden mb-3 border border-[#3b82f6]/20">
            <div
              className="h-full bg-gradient-to-r from-[#1d4ed8]/60 via-[#3b82f6] to-[#93c5fd] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-none"
              style={{ width: `${Math.round(animProgress * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#93c5fd] uppercase">
            <span>0.0s</span>
            <span className="font-bold text-white text-xs">{Math.round(animProgress * 100)}% UNCOVERED</span>
            <span>{(DURATION_MS / 1000).toFixed(1)}s</span>
          </div>

          {/* Flight Metric Badges */}
          <div className="grid grid-cols-3 gap-4 mt-7 pt-5 border-t border-[#3b82f6]/20 text-left">
            <div className="border-l border-[#3b82f6]/40 pl-4">
              <div className="text-[9px] uppercase tracking-widest text-[#93c5fd] font-mono">Mach</div>
              <div className="text-xl font-serif font-light text-white">0.925</div>
            </div>
            <div className="border-l border-[#3b82f6]/40 pl-4">
              <div className="text-[9px] uppercase tracking-widest text-[#93c5fd] font-mono">Range</div>
              <div className="text-xl font-serif font-light text-white">7,500 nm</div>
            </div>
            <div className="border-l border-[#3b82f6]/40 pl-4">
              <div className="text-[9px] uppercase tracking-widest text-[#93c5fd] font-mono">Cabin</div>
              <div className="text-xl font-serif font-light text-white">Ultra Quiet</div>
            </div>
          </div>
        </div>

        {/* Bottom Status Footer */}
        <div className="relative z-10 p-6 sm:p-8 flex justify-between items-center max-w-7xl mx-auto w-full text-[10px] text-slate-500 font-mono tracking-widest uppercase border-t border-[#3b82f6]/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
            <span>EST. 2019 &mdash; PRIVATE PARIS CONCIERGE</span>
          </div>
          <button onClick={toggleSound} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            {soundEnabled ? (
              <span className="flex items-center gap-1.5 text-[#93c5fd]">
                <Volume2 className="w-3.5 h-3.5" /> TURBINE ACOUSTICS ACTIVE
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-600">
                <VolumeX className="w-3.5 h-3.5" /> ACOUSTICS MUTED
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── PRIVATE JET flying from bottom to top, on top of the curtain wipe edge ── */}
      <div
        className="absolute left-0 right-0 z-[60] flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: `${jetYPercent}vh`,
          transform: 'translateY(-50%)',
        }}
      >
        <div className="relative">
          {/* Shockwave Ring around Jet Nose */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-28 border-2 border-sky-400/30 rounded-full animate-ping opacity-50 pointer-events-none blur-sm" />

          {/* Cloud Parting Wake Particles */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[500px] h-28 bg-gradient-to-t from-sky-400/15 via-white/10 to-transparent rounded-full filter blur-xl pointer-events-none opacity-70" />

          {/* The Detailed Private Jet */}
          <JetGraphic scale={1.15} showEnginesGlow={true} />

          {/* Nose Spotlight Beam */}
          <div className="absolute -top-52 left-1/2 -translate-x-1/2 w-56 h-64 bg-gradient-to-t from-sky-200/25 via-sky-300/10 to-transparent rounded-full filter blur-md pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
