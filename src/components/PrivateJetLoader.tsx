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
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Attempt autoplay; fallback to first pointer interaction
    try {
      playJetSound(DURATION_MS / 1000);
    } catch {
      const trySound = () => {
        playJetSound(DURATION_MS / 1000);
        window.removeEventListener('pointerdown', trySound);
      };
      window.addEventListener('pointerdown', trySound, { once: true });
    }

    // Cubic ease-in-out animation loop
    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const raw = Math.min(elapsed / DURATION_MS, 1);
      const eased = raw < 0.5
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

  useEffect(() => {
    if (isLoaded && animProgress >= 0.99) {
      setTimeout(() => setHidden(true), 300);
    }
  }, [isLoaded, animProgress]);

  if (hidden) return null;

  // Jet flies from 110vh → -110vh
  const jetYPercent = 110 - animProgress * 220;
  // Curtain clips from bottom upward as jet ascends
  const curtainClip = `inset(0 0 ${animProgress * 100}% 0)`;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">

      {/* ── CLOUDY NAVY CURTAIN wiped away bottom→top ── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: curtainClip, WebkitClipPath: curtainClip }}
      >
        {/* Sky gradient base — deep navy at bottom, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2550] via-[#061830] to-[#030e1f]" />

        {/* Large slow drifting cloud blobs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Clouds — scattered across the full curtain */}
          <div className="absolute top-[5%] left-[-5%] w-[55vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />
          <div className="absolute top-[8%] left-[35%] w-[40vw] h-[18vh] bg-white/[0.05] rounded-full blur-3xl" />
          <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[20vh] bg-white/[0.06] rounded-full blur-3xl" />

          <div className="absolute top-[35%] left-[-8%] w-[60vw] h-[25vh] bg-white/[0.08] rounded-full blur-3xl" />
          <div className="absolute top-[38%] right-[5%] w-[45vw] h-[20vh] bg-white/[0.05] rounded-full blur-3xl" />

          <div className="absolute top-[55%] left-[10%] w-[55vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />
          <div className="absolute top-[60%] right-[-5%] w-[40vw] h-[18vh] bg-white/[0.06] rounded-full blur-3xl" />

          <div className="absolute top-[75%] left-[-5%] w-[50vw] h-[20vh] bg-white/[0.08] rounded-full blur-3xl" />
          <div className="absolute top-[78%] right-[10%] w-[45vw] h-[18vh] bg-white/[0.05] rounded-full blur-3xl" />

          <div className="absolute top-[88%] left-[5%] w-[60vw] h-[22vh] bg-white/[0.07] rounded-full blur-3xl" />

          {/* Subtle blue atmospheric glow streaks */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80vw] h-[8vh] bg-blue-400/[0.04] rounded-full blur-2xl" />
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[90vw] h-[10vh] bg-blue-300/[0.05] rounded-full blur-2xl" />
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[70vw] h-[8vh] bg-blue-400/[0.04] rounded-full blur-2xl" />
        </div>
      </div>

      {/* ── PRIVATE JET flying from bottom to top, above the curtain edge ── */}
      <div
        className="absolute left-0 right-0 z-[60] flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: `${jetYPercent}vh`,
          transform: 'translateY(-50%)',
        }}
      >
        <div className="relative">
          {/* Shockwave ring ahead of nose */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-24 border border-blue-300/20 rounded-full animate-ping opacity-40 pointer-events-none blur-sm" />

          {/* Cloud parting wake */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[480px] h-24 bg-gradient-to-t from-white/10 via-white/[0.06] to-transparent rounded-full filter blur-xl pointer-events-none" />

          {/* The Jet */}
          <JetGraphic scale={1.15} showEnginesGlow={true} />

          {/* Nose searchlight beam */}
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-48 h-56 bg-gradient-to-t from-blue-200/20 via-blue-300/[0.07] to-transparent rounded-full filter blur-lg pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
