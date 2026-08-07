import React, { useState } from 'react';
import { LoaderConfig, JetLivery, UncoverStyle } from '../types';
import { X, Play, Copy, Check, Volume2, Sliders, Code, Sparkles, Shield, Palette } from 'lucide-react';

interface LoaderControlsModalProps {
  config: LoaderConfig;
  isOpen: boolean;
  onClose: () => void;
  onChangeConfig: (newConfig: Partial<LoaderConfig>) => void;
  onReplayLoader: () => void;
}

export const LoaderControlsModal: React.FC<LoaderControlsModalProps> = ({
  config,
  isOpen,
  onClose,
  onChangeConfig,
  onReplayLoader,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'code'>('settings');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const reactEmbedCode = `// React 2-Second Private Jet Uncover Loading Screen
import React, { useState, useEffect } from 'react';

export function PrivateJetLoader({ duration = ${config.duration}, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let animationFrameId;

    const updateFrame = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / durationMs, 1);
      // Smooth cubic ease for jet acceleration
      const ease = rawProgress < 0.5 
        ? 4 * rawProgress * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setProgress(ease);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateFrame);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration, onComplete]);

  // Jet Y moves from 110vh (bottom) to -110vh (top) over duration
  const jetY = 110 - progress * 220;
  // Curtain uncovers website from bottom to top
  const clipPath = \`inset(0 0 \${progress * 100}% 0)\`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Dark Curtain Layer Uncovering Website */}
      <div
        className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-white"
        style={{ clipPath }}
      >
        <h2 className="text-2xl font-bold tracking-widest uppercase">
          ${config.customBrandName || 'APEX AVIATION'}
        </h2>
        <p className="text-sm text-sky-400 mt-2 font-mono font-bold">
          {Math.round(progress * 100)}% UNCOVERING WEBSITE
        </p>
      </div>

      {/* Ascending Jet */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: \`\${jetY}vh\`, transform: 'translate(-50%, -50%)' }}
      >
        <svg width="200" height="240" viewBox="0 0 320 380">
          {/* Private Jet SVG Payload */}
        </svg>
      </div>
    </div>
  );
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reactEmbedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-[#c5a059]/30 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#c5a059]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-light text-white">Jet Loading Screen Customizer</h3>
              <p className="text-xs text-slate-400 font-mono">
                Tune duration, jet livery, audio & export code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#171717] hover:bg-[#262626] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#c5a059]/20 px-6 bg-[#050505]">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 font-semibold text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Animation & Jet Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 font-semibold text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-[#c5a059] text-[#c5a059]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Export Code</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'settings' ? (
            <>
              {/* Duration Slider */}
              <div className="bg-[#050505] p-4 rounded-xl border border-[#c5a059]/20">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    <span>Transition Duration</span>
                  </label>
                  <span className="font-mono text-[#c5a059] font-bold text-xs px-2 py-0.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/30">
                    {config.duration.toFixed(1)} Seconds
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={config.duration}
                  onChange={(e) => onChangeConfig({ duration: parseFloat(e.target.value) })}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>1.0s (Fast Pass)</span>
                  <span className="text-[#c5a059] font-bold">2.0s (User Requested)</span>
                  <span>5.0s (Cinematic)</span>
                </div>
              </div>

              {/* Jet Livery Options */}
              <div>
                <label className="font-semibold text-white block mb-3">
                  Select Private Jet Livery
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'pearl_gold', label: 'Pearl & 24K Gold', desc: 'Obsidian & Gold Metallic Accent' },
                    { id: 'stealth_black', label: 'Phantom Stealth Black', desc: 'Matte Obsidian, Neon Cyan Cockpit' },
                    { id: 'midnight_blue', label: 'Sapphire Midnight Navy', desc: 'Deep Blue Metallic, Silver Wings' },
                    { id: 'crimson_carbon', label: 'Crimson Carbon Fiber', desc: 'Forged Dark Carbon, Red Engine Glow' },
                  ].map((livery) => (
                    <button
                      key={livery.id}
                      onClick={() => onChangeConfig({ jetLivery: livery.id as JetLivery })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        config.jetLivery === livery.id
                          ? 'bg-[#c5a059]/10 border-[#c5a059] text-white shadow-md'
                          : 'bg-[#050505] border-[#c5a059]/20 text-slate-400 hover:border-[#c5a059]/40'
                      }`}
                    >
                      <div className="font-bold text-xs text-white mb-0.5">{livery.label}</div>
                      <div className="text-[11px] font-mono text-slate-500">{livery.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Uncover Style */}
              <div>
                <label className="font-semibold text-white block mb-3">
                  Uncover Visual Effect
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'direct_wipe', label: 'Bottom-to-Top Jet Wipe', desc: 'Clean, crisp curtain reveal' },
                    { id: 'shockwave', label: 'Supersonic Shockwave', desc: 'Vapor distortion ring around nose' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => onChangeConfig({ uncoverStyle: style.id as UncoverStyle })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        config.uncoverStyle === style.id
                          ? 'bg-[#c5a059]/10 border-[#c5a059] text-white'
                          : 'bg-[#050505] border-[#c5a059]/20 text-slate-400 hover:border-[#c5a059]/40'
                      }`}
                    >
                      <div className="font-bold text-xs text-white mb-0.5">{style.label}</div>
                      <div className="text-[11px] font-mono text-slate-500">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio & Visual Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3.5 bg-[#050505] rounded-xl border border-[#c5a059]/20 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-[#c5a059]" />
                    <div>
                      <div className="font-semibold text-white text-xs">Jet Turbine Engine Audio</div>
                      <div className="text-[11px] text-slate-500 font-mono">Synthesizes jet spool & doppler swoosh sound</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.enableSound}
                    onChange={(e) => onChangeConfig({ enableSound: e.target.checked })}
                    className="w-4 h-4 accent-[#c5a059] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-[#050505] rounded-xl border border-[#c5a059]/20 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-[#c5a059]" />
                    <div>
                      <div className="font-semibold text-white text-xs">Engine Heat Contrails & Glow</div>
                      <div className="text-[11px] text-slate-500 font-mono">Renders orange combustion flames & vapor trails</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showContrails}
                    onChange={(e) => onChangeConfig({ showContrails: e.target.checked })}
                    className="w-4 h-4 accent-[#c5a059] cursor-pointer"
                  />
                </label>
              </div>

              {/* Brand Text Customization */}
              <div className="pt-2">
                <label className="font-semibold text-white block mb-2">
                  Website Brand Name
                </label>
                <input
                  type="text"
                  value={config.customBrandName}
                  onChange={(e) => onChangeConfig({ customBrandName: e.target.value })}
                  placeholder="e.g. ASTRA, APEX AVIATION"
                  className="w-full bg-[#050505] border border-[#c5a059]/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#c5a059] text-sm font-mono"
                />
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-slate-400">
                  React + Tailwind Component Snippet
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-md bg-[#c5a059] hover:bg-[#d4af37] text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy React Component'}</span>
                </button>
              </div>

              <pre className="p-4 bg-[#050505] border border-[#c5a059]/20 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-80 select-all leading-relaxed">
                {reactEmbedCode}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#c5a059]/20 bg-[#050505] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-md bg-[#171717] hover:bg-[#262626] text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onReplayLoader();
            }}
            className="px-6 py-2.5 rounded-md bg-[#c5a059] hover:bg-[#d4af37] text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#c5a059]/20 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Apply & Replay Jet Loader</span>
          </button>
        </div>

      </div>
    </div>
  );
};
