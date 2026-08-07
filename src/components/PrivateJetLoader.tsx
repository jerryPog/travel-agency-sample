import { useEffect, useRef, useState } from 'react';
import { JetGraphic } from './JetGraphic';
import { playJetSound } from '../utils/audio';

const DURATION_MS = 2600;

interface PrivateJetLoaderProps {
  progress: number;
  isLoaded: boolean;
}

export function PrivateJetLoader({ isLoaded }: PrivateJetLoaderProps) {
  const [animProgress, setAnimProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // ── Sound: try immediately, then re-try on first user gesture ───────
  useEffect(() => {
    const tryPlay = () => {
      if (!soundPlayed) {
        playJetSound(DURATION_MS / 1000);
        setSoundPlayed(true);
      }
    };

    // Attempt direct autoplay (works when page was activated via navigation)
    tryPlay();

    // Fallback: unlock on first pointer/touch in case browser blocked it
    const unlock = () => {
      tryPlay();
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('pointerdown', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });

    return () => {
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, []);

  // ── Cubic ease-in-out animation loop ────────────────────────────────
  useEffect(() => {
    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const raw = Math.min(elapsed / DURATION_MS, 1);
      const eased =
        raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      setAnimProgress(eased);

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Hide after both animation done AND images ready ──────────────────
  useEffect(() => {
    if (isLoaded && animProgress >= 0.99) {
      setTimeout(() => setHidden(true), 300);
    }
  }, [isLoaded, animProgress]);

  if (hidden) return null;

  // Jet flies from 110vh → -110vh as eased progress goes 0 → 1
  const jetYPercent = 110 - animProgress * 220;
  // Curtain clips from bottom upward as jet ascends
  const curtainClip = `inset(0 0 ${animProgress * 100}% 0)`;

  return (
    // pointer-events-auto so first tap on mobile triggers audio unlock
    <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none">

      {/* ── CLOUDY NAVY CURTAIN wiped away bottom → top ── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: curtainClip, WebkitClipPath: curtainClip }}
      >
        {/* Sky gradient: lighter near top (horizon), deep navy at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2550] via-[#061830] to-[#030e1f]" />

        {/* Cloud blobs scattered across the full curtain height */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[4%]  left-[-5%]  w-[55vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />
          <div className="absolute top-[7%]  left-[38%]  w-[40vw] h-[18vh] bg-white/[0.05] rounded-full blur-3xl" />
          <div className="absolute top-[18%] right-[-8%] w-[50vw] h-[20vh] bg-white/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-[32%] left-[-6%] w-[58vw] h-[24vh] bg-white/[0.08] rounded-full blur-3xl" />
          <div className="absolute top-[36%] right-[4%]  w-[44vw] h-[20vh] bg-white/[0.05] rounded-full blur-3xl" />
          <div className="absolute top-[52%] left-[8%]   w-[55vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />
          <div className="absolute top-[58%] right-[-4%] w-[42vw] h-[18vh] bg-white/[0.06] rounded-full blur-3xl" />
          <div className="absolute top-[72%] left-[-4%] w-[50vw] h-[20vh] bg-white/[0.08] rounded-full blur-3xl" />
          <div className="absolute top-[76%] right-[8%]  w-[46vw] h-[18vh] bg-white/[0.05] rounded-full blur-3xl" />
          <div className="absolute top-[88%] left-[4%]   w-[62vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />
          {/* Blue atmospheric glow bands between cloud layers */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[90vw] h-[6vh] bg-blue-300/[0.04] rounded-full blur-2xl" />
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[80vw] h-[8vh] bg-blue-400/[0.05] rounded-full blur-2xl" />
          <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-[75vw] h-[6vh] bg-blue-300/[0.04] rounded-full blur-2xl" />
        </div>
      </div>

      {/* ── PRIVATE JET flying upward, on top of the curtain wipe edge ── */}
      <div
        className="absolute left-0 right-0 z-[60] flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: `${jetYPercent}vh`,
          transform: 'translateY(-50%)',
        }}
      >
        <div className="relative">
          {/* Shockwave ring ahead of nose */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-24 border border-blue-300/20 rounded-full animate-ping opacity-40 blur-sm" />

          {/* Cloud-parting wake behind jet */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[480px] h-24 bg-gradient-to-t from-white/10 via-white/[0.06] to-transparent rounded-full blur-xl" />

          {/* The Jet */}
          <JetGraphic scale={1.15} showEnginesGlow={true} />

          {/* Nose searchlight beam cutting through clouds */}
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-48 h-56 bg-gradient-to-t from-blue-200/20 via-blue-300/[0.07] to-transparent rounded-full blur-lg" />
        </div>
      </div>

    </div>
  );
}
