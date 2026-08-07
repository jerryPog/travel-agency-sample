import { useState } from 'react';
import { Check, Copy, X, Code2 } from 'lucide-react';
import { BannerConfig } from '../types';

interface CodeExportModalProps {
  config: BannerConfig;
  getNavyHex: () => string;
  onClose: () => void;
}

export function CodeExportModal({ config, getNavyHex, onClose }: CodeExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'react'>('react');

  const navyHex = getNavyHex();

  const reactCode = `import React from 'react';
import { ArrowUpRight, Compass, Headphones, Menu } from 'lucide-react';

export default function ParisTravelBanner() {
  return (
    <section 
      style={{ backgroundColor: '${navyHex}' }} 
      className="h-screen max-h-[900px] w-full text-white font-sans flex flex-col justify-between relative overflow-hidden select-none max-w-[1440px] mx-auto py-4"
    >
      {/* Top Navbar */}
      <header className="w-full pt-5 pb-3 px-6 md:px-12 flex items-center justify-between z-20 relative flex-nowrap whitespace-nowrap">
        <div className="text-2xl md:text-3xl font-extrabold tracking-wider text-white">
          ${config.brandName}
        </div>

        <nav className="hidden lg:flex items-center space-x-1.5 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full absolute left-1/2 -translate-x-1/2">
          {['Home', 'Solutions', 'Projects', 'About us', 'Contact'].map((item) => (
            <button
              key={item}
              className={\`px-5 py-2 text-sm font-medium rounded-full transition-all \${
                item === '${config.activeNav}' ? 'bg-white text-[#0B132B] font-semibold' : 'text-white/80 hover:text-white'
              }\`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button className="px-5 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 flex items-center space-x-2">
            <span>Open menu</span>
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Hero Content (54px Headline) */}
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto pt-8 md:pt-12 pb-2 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-[54px] font-semibold text-white tracking-tight leading-[1.12] mb-2.5">
          ${config.headline}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-white/80 font-normal max-w-lg mb-4 leading-relaxed">
          ${config.subtitle}
        </p>
        <button className="group inline-flex items-center space-x-2.5 bg-white hover:bg-white/95 text-[#0B132B] font-medium text-xs md:text-sm py-2 pl-5 pr-1.5 rounded-full shadow-lg transition-all">
          <span className="font-semibold tracking-tight">${config.ctaText}</span>
          <div className="w-8 h-8 rounded-full bg-[#1A62FF] text-white flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </div>

      {/* Bottom Glass Cards with Icons */}
      <div className="w-full px-6 md:px-12 pb-5 pt-1 flex flex-col md:flex-row justify-between items-stretch gap-4 z-10">
        <div className="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5 shadow-2xl">
          <div className="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3 shadow-md">
            <Compass className="w-4.5 h-4.5 text-[#0B132B] stroke-[2.2]" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-white mb-1.5">Tailor-Made Itineraries</h3>
          <p className="text-white/80 text-xs leading-relaxed">${config.cleanEnergyText}</p>
        </div>

        <div className="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5 shadow-2xl">
          <div className="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3 shadow-md">
            <Headphones className="w-4.5 h-4.5 text-[#0B132B] stroke-[2.2]" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-white mb-1.5">24/7 Travel Support</h3>
          <p className="text-white/80 text-xs leading-relaxed">${config.impactText}</p>
        </div>
      </div>
    </section>
  );
}`;

  const htmlCode = `<!-- SUNROCK Solid Navy Blue Banner -->
<section style="background-color: ${navyHex}; color: #ffffff;" class="h-screen max-h-[900px] w-full flex flex-col justify-between relative overflow-hidden font-sans max-w-[1440px] mx-auto py-4">
  <header class="w-full pt-5 pb-3 px-6 md:px-12 flex items-center justify-between relative">
    <div class="text-2xl md:text-3xl font-extrabold tracking-wider text-white">${config.brandName}</div>
    <nav class="hidden lg:flex items-center space-x-1.5 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full absolute left-1/2 -translate-x-1/2">
      <a href="#" class="px-5 py-2 text-sm font-semibold bg-white text-[#0B132B] rounded-full">Home</a>
      <a href="#" class="px-5 py-2 text-sm text-white/80 hover:text-white rounded-full">Solutions</a>
      <a href="#" class="px-5 py-2 text-sm text-white/80 hover:text-white rounded-full">Projects</a>
      <a href="#" class="px-5 py-2 text-sm text-white/80 hover:text-white rounded-full">About us</a>
      <a href="#" class="px-5 py-2 text-sm text-white/80 hover:text-white rounded-full">Contact</a>
    </nav>
    <button class="px-5 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full">Open menu</button>
  </header>

  <div class="flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto py-2">
    <h1 class="text-3xl sm:text-4xl md:text-[54px] font-semibold text-white tracking-tight leading-[1.12] mb-2.5">${config.headline}</h1>
    <p class="text-xs sm:text-sm md:text-base text-white/80 max-w-lg mb-4">${config.subtitle}</p>
    <button class="inline-flex items-center space-x-2.5 bg-white text-[#0B132B] font-medium py-2 pl-5 pr-1.5 rounded-full shadow-lg">
      <span class="font-semibold text-sm">${config.ctaText}</span>
      <span class="w-8 h-8 rounded-full bg-[#1A62FF] text-white flex items-center justify-center">↗</span>
    </button>
  </div>

  <div class="w-full px-6 md:px-12 pb-5 pt-1 flex flex-col md:flex-row justify-between gap-4">
    <div class="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5">
      <div class="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3">🧭</div>
      <h3 class="text-base md:text-lg font-bold text-white mb-1.5">Tailor-Made Itineraries</h3>
      <p class="text-white/80 text-xs leading-relaxed">${config.cleanEnergyText}</p>
    </div>
    <div class="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5">
      <div class="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3">🎧</div>
      <h3 class="text-base md:text-lg font-bold text-white mb-1.5">24/7 Travel Support</h3>
      <p class="text-white/80 text-xs leading-relaxed">${config.impactText}</p>
    </div>
  </div>
</section>`;

  const activeCode = activeTab === 'react' ? reactCode : htmlCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F172A] border border-white/20 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Banner Source Code</h2>
              <p className="text-xs text-white/60">Export complete HTML & Tailwind or React component</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Actions Bar */}
        <div className="px-6 py-3 bg-[#0B132B] border-b border-white/10 flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'react'
                  ? 'bg-white text-[#0B132B]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              React Component
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-white text-[#0B132B]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              HTML + Tailwind
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-1.5 bg-[#1A62FF] hover:bg-[#004FFF] text-white rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content Box */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-white/90 bg-[#050B18]">
          <pre className="whitespace-pre-wrap leading-relaxed select-all">
            {activeCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
