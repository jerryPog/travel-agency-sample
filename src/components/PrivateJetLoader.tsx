import { useEffect, useRef, useState } from 'react';
import { JetGraphic } from './JetGraphic';

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

  // Cubic ease-in-out animation loop
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

      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // Hide once both animation & images are ready
  useEffect(() => {
    if (isLoaded && animProgress >= 0.99) {
      setTimeout(() => setHidden(true), 200);
    }
  }, [isLoaded, animProgress]);

  if (hidden) return null;

  // Jet travels from 110vh → -110vh
  const jetYPercent = 110 - animProgress * 220;

  // Blur starts at 28px, linearly reduces to 0 as jet finishes crossing
  const blurPx = (1 - animProgress) * 28;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">

      {/* ── Blur overlay — covers entire screen, fades as jet crosses ── */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
        }}
      />

      {/* ── PRIVATE JET flying from bottom to top ── */}
      <div
        className="absolute left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: `${jetYPercent}vh`,
          transform: 'translateY(-50%)',
        }}
      >
        <div className="relative">
          {/* Shockwave ring ahead of nose */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-24 border border-white/20 rounded-full animate-ping opacity-30 blur-sm" />

          {/* Cloud-parting wake behind jet */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[420px] h-20 bg-gradient-to-t from-white/10 via-white/[0.05] to-transparent rounded-full blur-xl" />

          {/* The Jet */}
          <JetGraphic scale={1.15} showEnginesGlow={true} />

          {/* Nose searchlight beam */}
          <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-40 h-52 bg-gradient-to-t from-blue-200/15 via-blue-300/[0.06] to-transparent rounded-full blur-lg" />
        </div>
      </div>

    </div>
  );
}
