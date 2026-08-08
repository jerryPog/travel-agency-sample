import { useState } from 'react';
import { MapPin, Sparkles, Camera, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ParisDistrictMap() {
  const { t } = useLanguage();

  const districtsData = [
    {
      id: 'eiffel-7th',
      name: t('d7Name'),
      arrondissement: t('d7Arr'),
      vibe: t('d7Vibe'),
      highlights: [t('d7H1'), t('d7H2'), t('d7H3')],
      photoSpot: t('d7Photo'),
      description: t('d7Desc'),
      bestTime: t('d7Time'),
    },
    {
      id: 'marais-4th',
      name: t('d4Name'),
      arrondissement: t('d4Arr'),
      vibe: t('d4Vibe'),
      highlights: [t('d4H1'), t('d4H2'), t('d4H3')],
      photoSpot: t('d4Photo'),
      description: t('d4Desc'),
      bestTime: t('d4Time'),
    },
    {
      id: 'louvre-1st',
      name: t('d1Name'),
      arrondissement: t('d1Arr'),
      vibe: t('d1Vibe'),
      highlights: [t('d1H1'), t('d1H2'), t('d1H3')],
      photoSpot: t('d1Photo'),
      description: t('d1Desc'),
      bestTime: t('d1Time'),
    },
    {
      id: 'montmartre-18th',
      name: t('d18Name'),
      arrondissement: t('d18Arr'),
      vibe: t('d18Vibe'),
      highlights: [t('d18H1'), t('d18H2'), t('d18H3')],
      photoSpot: t('d18Photo'),
      description: t('d18Desc'),
      bestTime: t('d18Time'),
    },
    {
      id: 'saint-germain-6th',
      name: t('d6Name'),
      arrondissement: t('d6Arr'),
      vibe: t('d6Vibe'),
      highlights: [t('d6H1'), t('d6H2'), t('d6H3')],
      photoSpot: t('d6Photo'),
      description: t('d6Desc'),
      bestTime: t('d6Time'),
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('eiffel-7th');
  const selectedDistrict = districtsData.find((d) => d.id === selectedId) || districtsData[0];

  return (
    <section id="districts" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300 mb-3 shadow-lg">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('districtBadge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-white mb-3">
          {t('districtTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-white/70">
          {t('districtSub')}
        </p>
      </div>

      {/* Main Grid: Interactive Map + District Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Interactive SVG Map Display */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
          <div className="absolute top-3 left-4 text-xs font-mono text-amber-300/80 bg-black/40 px-3 py-1 rounded-full border border-amber-300/30">
            {t('distMapPinboard')}
          </div>

          {/* Seine River Curve Background SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 600 400" fill="none">
            <path d="M0 260 C 150 280, 250 180, 380 200 C 480 220, 550 160, 600 140" stroke="#38BDF8" strokeWidth="24" strokeLinecap="round" />
          </svg>

          {/* District Pins Container */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto pt-8">
            {districtsData.map((d) => {
              const isSelected = selectedDistrict.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-start space-x-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-white text-[#0B132B] border-amber-400 font-bold shadow-xl scale-[1.03]'
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-[#0B132B] text-amber-300' : 'bg-white/15 text-white group-hover:bg-amber-400 group-hover:text-[#0B132B]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      {d.name}
                    </div>
                    <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-[#0B132B]/80 font-normal' : 'text-white/60'}`}>
                      {d.vibe}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Selected District Details Display */}
        {selectedDistrict && (
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {selectedDistrict.arrondissement}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mt-2">
                  {selectedDistrict.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              {selectedDistrict.description}
            </p>

            {/* Highlights list */}
            <div>
              <h4 className="text-xs font-semibold text-white/90 mb-2 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('distHighlightsLabel')}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-white/80">
                {selectedDistrict.highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secret Photo Spot */}
            <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs space-y-1">
              <div className="font-semibold text-amber-300 flex items-center space-x-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>{t('distPhotoSpotLabel')}</span>
              </div>
              <div className="text-white/90 font-medium">{selectedDistrict.photoSpot}</div>
              <div className="text-[11px] text-white/60">{t('distBestTimeLabel')} {selectedDistrict.bestTime}</div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
