import { useState } from 'react';
import { Sliders, Code, RefreshCw, Palette, Type } from 'lucide-react';
import { BannerConfig } from '../types';

interface BannerControlToolbarProps {
  config: BannerConfig;
  onChange: (updated: Partial<BannerConfig>) => void;
  onOpenCode: () => void;
  onReset: () => void;
  navyPresets: Array<{ id: BannerConfig['navyTheme']; name: string; hex: string }>;
}

export function BannerControlToolbar({
  config,
  onChange,
  onOpenCode,
  onReset,
  navyPresets,
}: BannerControlToolbarProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'text'>('colors');

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      {/* Floating Toolbar Badge */}
      <div className="bg-[#050C1E]/90 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-2xl flex items-center space-x-3 text-xs font-medium text-white">
        <span className="flex items-center space-x-1.5 font-semibold text-white/90 pr-2 border-r border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Dev Toolbar</span>
        </span>

        {/* Color Presets Quick Picker */}
        <div className="hidden sm:flex items-center space-x-1.5">
          {navyPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange({ navyTheme: preset.id })}
              title={preset.name}
              className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                config.navyTheme === preset.id
                  ? 'border-white scale-125 ring-2 ring-white/40'
                  : 'border-white/30 hover:scale-110'
              }`}
              style={{ backgroundColor: preset.hex }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 pl-2 border-l border-white/20">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all cursor-pointer ${
              panelOpen
                ? 'bg-white text-[#0B132B] font-semibold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{panelOpen ? 'Close Settings' : 'Customize'}</span>
          </button>

          <button
            onClick={onOpenCode}
            className="px-3 py-1.5 bg-[#1A62FF] hover:bg-[#004FFF] text-white rounded-full flex items-center space-x-1.5 font-semibold shadow-md transition-all cursor-pointer"
          >
            <Code className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Export Code</span>
          </button>

          <button
            onClick={onReset}
            title="Reset to Original"
            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Expanded Customizer Panel */}
      {panelOpen && (
        <div className="mt-3 w-[92vw] max-w-xl bg-[#081028]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('colors')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'colors'
                    ? 'bg-white text-[#0B132B]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Navy Color</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-white text-[#0B132B]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Text & Copy</span>
              </button>
            </div>
          </div>

          {/* Color Settings */}
          {activeTab === 'colors' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 mb-2 font-medium">Select Navy Background Tone</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {navyPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => onChange({ navyTheme: preset.id })}
                      className={`p-3 rounded-xl border flex flex-col items-center space-y-1.5 transition-all cursor-pointer ${
                        config.navyTheme === preset.id
                          ? 'border-white bg-white/20 font-bold'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span className="text-[11px] text-white/90">{preset.name}</span>
                      <span className="text-[9px] font-mono text-white/50">{preset.hex}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Color Picker */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/80 font-medium">Custom Navy Color Code:</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={config.customNavyColor}
                    onChange={(e) =>
                      onChange({ navyTheme: 'custom', customNavyColor: e.target.value })
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
                  />
                  <input
                    type="text"
                    value={config.customNavyColor}
                    onChange={(e) =>
                      onChange({ navyTheme: 'custom', customNavyColor: e.target.value })
                    }
                    className="w-24 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-center font-mono text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Text Settings */}
          {activeTab === 'text' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-medium">Brand Name</label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) => onChange({ brandName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Main Headline</label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => onChange({ headline: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Subtitle Paragraph</label>
                <textarea
                  rows={2}
                  value={config.subtitle}
                  onChange={(e) => onChange({ subtitle: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">CTA Button Text</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => onChange({ ctaText: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-white/50"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
