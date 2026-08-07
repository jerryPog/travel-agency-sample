import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Plane } from 'lucide-react';

interface PrivateJetLoaderProps {
  progress: number;
  isLoaded: boolean;
}

export function PrivateJetLoader({ progress, isLoaded }: PrivateJetLoaderProps) {
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Initialize Web Audio API Jet Engine Sound Generator
  useEffect(() => {
    if (isLoaded) {
      if (gainNodeRef.current && audioCtxRef.current) {
        // Fade out jet audio smoothly when loaded
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          audioCtxRef.current?.close();
        }, 1300);
      }
    }
  }, [isLoaded]);

  const startAudio = () => {
    if (audioStarted || muted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // 1. Create Jet Engine White Noise Buffer (2 seconds looping)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      noiseSourceRef.current = whiteNoise;

      // 2. Lowpass Filter for Jet Engine Cabin Hum
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      // 3. Sub-Bass Sine Oscillator for Engine Vibration
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.connect(oscGain);

      // 4. Main Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNodeRef.current = masterGain;

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      oscGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      whiteNoise.start();
      osc.start();
      setAudioStarted(true);
    } catch (e) {
      console.warn('Web Audio API not supported or user blocked audio auto-play');
    }
  };

  const toggleMute = () => {
    if (!audioStarted) {
      startAudio();
      setMuted(false);
      return;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      if (muted) {
        gainNodeRef.current.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        setMuted(false);
      } else {
        gainNodeRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
        setMuted(true);
      }
    }
  };

  return (
    <div
      onClick={startAudio}
      className={`fixed inset-0 bg-[#030712] z-50 flex flex-col items-center justify-between py-12 px-6 transition-all duration-1000 font-['DM_Sans',sans-serif] pointer-events-auto ${
        isLoaded ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Background Animated Cloud Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sky Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E36] via-[#050C1E] to-[#02050E]" />

        {/* Passing Cloud Vectors */}
        <div className="cloud-layer cloud-layer-1 absolute inset-0 opacity-25">
          <div className="absolute top-[10%] -left-[20%] w-[600px] h-[200px] bg-white/20 rounded-full blur-3xl animate-cloud-pass-1" />
          <div className="absolute top-[40%] -right-[30%] w-[700px] h-[250px] bg-white/15 rounded-full blur-3xl animate-cloud-pass-2" />
        </div>
        <div className="cloud-layer cloud-layer-2 absolute inset-0 opacity-15">
          <div className="absolute top-[60%] -left-[10%] w-[500px] h-[180px] bg-amber-300/10 rounded-full blur-2xl animate-cloud-pass-3" />
        </div>
      </div>

      {/* Top Header: Sound Control & Flight Status */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-white/80">
        <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <Plane className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] text-amber-300 font-mono">
            Flight PA-707 • En Route to Paris
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white transition-all cursor-pointer"
        >
          {muted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[11px] font-mono">Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] font-mono">Jet Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* Center Animated Private Jet Silhouette */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-8">
        
        {/* Glowing Contrail & Jet Container */}
        <div className="relative flex flex-col items-center animate-jet-float">
          
          {/* Engine Exhaust Flame / Glow Effect */}
          <div className="absolute -bottom-6 w-8 h-20 bg-gradient-to-t from-transparent via-amber-400/40 to-blue-400 rounded-full blur-md animate-pulse" />
          
          {/* Luxury Private Jet SVG */}
          <svg
            className="w-36 sm:w-48 md:w-56 h-auto text-white drop-shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-transform duration-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>

          {/* Cloud Passing Speed Lines */}
          <div className="absolute -top-12 -left-12 w-1 h-16 bg-gradient-to-b from-transparent to-white/40 rounded-full animate-speed-line-1" />
          <div className="absolute -top-8 -right-12 w-1 h-20 bg-gradient-to-b from-transparent to-white/30 rounded-full animate-speed-line-2" />
        </div>

        {/* Flight Status Label */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight">
            Descend Into Paris
          </h2>
          <p className="text-xs text-white/70 font-mono tracking-widest uppercase">
            Passing through cloud layer • {progress}%
          </p>
        </div>

      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-10 w-full max-w-md space-y-3 text-center">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-amber-300 to-amber-400 rounded-full shadow-[0_0_15px_#fbbf24] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/50 uppercase tracking-widest">
          <span>Takeoff</span>
          <span>Cruising Altitude</span>
          <span>Arrival Paris</span>
        </div>
      </div>
    </div>
  );
}
