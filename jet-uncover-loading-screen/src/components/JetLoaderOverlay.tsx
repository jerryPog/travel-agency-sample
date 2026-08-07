import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JetGraphic } from './JetGraphic';
import { LoaderConfig } from '../types';
import { playJetSound } from '../utils/audio';
import { Compass, Gauge, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface JetLoaderOverlayProps {
  config: LoaderConfig;
  isActive: boolean;
  onComplete: () => void;
}

export const JetLoaderOverlay: React.FC<JetLoaderOverlayProps> = ({
  config,
  isActive,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setAltitude(0);
      setSpeed(0);
      return;
    }

    // Play sound if enabled
    if (config.enableSound) {
      playJetSound(config.duration);
    }

    const startTime = performance.now();
    const durationMs = config.duration * 1000;

    let animationFrameId: number;

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      
      // Smooth ease-in-out curve for hyper-realistic acceleration
      // Cubic ease
      const easeProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setProgress(easeProgress);
      setAltitude(Math.round(easeProgress * 45000));
      setSpeed(Math.round(easeProgress * 560));

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateFrame);
      } else {
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive, config.duration, config.enableSound, onComplete]);

  if (!isActive) return null;

  // The jet moves from 110% (below viewport) to -110% (above viewport)
  // Jet translateY: at progress=0 -> 110vh, at progress=1 -> -110vh
  const jetYPercent = 110 - progress * 220; // 110 down to -110

  // The dark curtain overlay is uncovered from top to bottom as the jet moves UP.
  // When jet moves from bottom (100vh) to top (0vh), the curtain's bottom reveal edge moves UP.
  // Clip path inset: inset(0 0 ${progress * 100}% 0) uncovers from bottom to top!
  const curtainClip = `inset(0 0 ${progress * 100}% 0)`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-auto overflow-hidden select-none">
        
        {/* --- DARK CURTAIN OVERLAY THAT GETS UNCOVERED AS JET ASCENDS --- */}
        <div
          className="absolute inset-0 bg-[#050505] flex flex-col justify-between transition-all duration-75 text-[#f5f5f5]"
          style={{
            clipPath: curtainClip,
            WebkitClipPath: curtainClip,
          }}
        >
          {/* Subtle Grain / Gold Radial Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.12),rgba(5,5,5,0))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a05908_1px,transparent_1px),linear-gradient(to_bottom,#c5a05908_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Top Brand & Status Bar */}
          <div className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] font-serif text-xl tracking-widest shadow-inner">
                A
              </div>
              <div>
                <span className="text-[#f5f5f5] font-serif font-light text-xl tracking-[0.2em] uppercase block">
                  {config.customBrandName || 'ASTRA AVIATION'}
                </span>
                <span className="text-[#c5a059] text-[10px] font-mono tracking-[0.3em] uppercase flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
                  SEQUENCE 04 // 12 • PRIVATE JET MATRIX
                </span>
              </div>
            </div>

            {/* Flight Metrics Badge */}
            <div className="hidden sm:flex items-center gap-6 px-5 py-2.5 rounded-full bg-[#0a0a0a] border border-[#c5a059]/30 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[#c5a059]">MACH:</span>
                <span className="text-white font-serif font-light text-sm">0.925</span>
              </div>
              <div className="w-px h-3 bg-[#c5a059]/30" />
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c5a059]" />
                <span className="text-[#c5a059]">ALTITUDE:</span>
                <span className="text-white font-serif font-light text-sm">{altitude.toLocaleString()} FT</span>
              </div>
            </div>
          </div>

          {/* Center Loading Announcement & Progress Ring */}
          <div className="relative z-10 text-center px-4 max-w-lg mx-auto my-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin" />
              UNCOVERING ASPIRATION • {config.duration.toFixed(1)}S PASS
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#f5f5f5] tracking-tight leading-none mb-4 italic">
              Beyond the Horizon.
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-mono mb-8 max-w-sm mx-auto">
              Redefining luxury travel through bespoke aviation.
            </p>

            {/* Percentage Progress Bar */}
            <div className="relative w-full h-1.5 bg-[#171717] rounded-full overflow-hidden mb-4 border border-[#c5a059]/20">
              <div
                className="h-full bg-gradient-to-r from-[#c5a059]/40 via-[#c5a059] to-[#E5C178] transition-all duration-75 ease-out rounded-full shadow-[0_0_15px_rgba(197,160,89,0.8)]"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#c5a059] uppercase">
              <span>0.0s</span>
              <span className="font-bold text-white text-xs">{Math.round(progress * 100)}% UNCOVERED</span>
              <span>{config.duration.toFixed(1)}s</span>
            </div>

            {/* Highlight Metric Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#c5a059]/20 text-left">
              <div className="border-l border-[#c5a059]/40 pl-4">
                <div className="text-[9px] uppercase tracking-widest text-[#c5a059] font-mono">Mach</div>
                <div className="text-xl font-serif font-light text-white">0.925</div>
              </div>
              <div className="border-l border-[#c5a059]/40 pl-4">
                <div className="text-[9px] uppercase tracking-widest text-[#c5a059] font-mono">Range</div>
                <div className="text-xl font-serif font-light text-white">7,500 nm</div>
              </div>
              <div className="border-l border-[#c5a059]/40 pl-4">
                <div className="text-[9px] uppercase tracking-widest text-[#c5a059] font-mono">Cabin</div>
                <div className="text-xl font-serif font-light text-white">Ultra Quiet</div>
              </div>
            </div>
          </div>

          {/* Bottom Security / Status Footer */}
          <div className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full text-[10px] text-slate-500 font-mono tracking-widest uppercase border-t border-[#c5a059]/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>EST. 1998 &mdash; PRIVATE CONCIERGE</span>
            </div>
            <div className="flex items-center gap-2">
              {config.enableSound ? (
                <span className="flex items-center gap-1.5 text-[#c5a059]">
                  <Volume2 className="w-3.5 h-3.5" /> TURBINE ACOUSTICS ACTIVE
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-slate-600">
                  <VolumeX className="w-3.5 h-3.5" /> ACOUSTICS MUTED
                </span>
              )}
            </div>
          </div>
        </div>

        {/* --- THE HYPER-REALISTIC JET FLYING FROM BOTTOM TO TOP --- */}
        {/* Placed at a z-index above the curtain clip so the jet flies ON TOP of the uncover line! */}
        <div
          className="absolute left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none transition-transform duration-75"
          style={{
            top: `${jetYPercent}vh`,
            transform: 'translateY(-50%)',
          }}
        >
          {/* Dynamic Vapor Shockwave Ring around Jet Nose */}
          <div className="relative">
            {config.uncoverStyle === 'shockwave' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-32 border-2 border-sky-400/40 rounded-full animate-ping opacity-60 pointer-events-none blur-sm" />
            )}

            {/* Cloud parting particles trailing the jet */}
            {config.showCloudEffects && (
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-gradient-to-t from-sky-400/20 via-white/10 to-transparent rounded-full filter blur-xl pointer-events-none opacity-80" />
            )}

            {/* The Jet Graphic */}
            <JetGraphic
              livery={config.jetLivery}
              scale={1.15}
              showEnginesGlow={config.showContrails}
            />

            {/* Nose Spotlight Beam */}
            <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-64 h-80 bg-gradient-to-t from-sky-200/30 via-sky-300/10 to-transparent clip-path-triangle filter blur-md pointer-events-none" />
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
};
