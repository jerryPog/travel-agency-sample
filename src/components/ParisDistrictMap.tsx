import React, { useState } from 'react';
import { MapPin, Sparkles, X, Camera, Compass, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DistrictInfo {
  id: string;
  name: string;
  arrondissement: string;
  vibe: string;
  highlights: string[];
  photoSpot: string;
  description: string;
  bestTime: string;
}

const districtsData: DistrictInfo[] = [
  {
    id: 'eiffel-7th',
    name: '7th Arr. (Eiffel & Invalides)',
    arrondissement: '7th Arrondissement',
    vibe: 'Iconic Grandeur & Riverside Romance',
    highlights: ['Eiffel Tower Summit Access', 'Musée d’Orsay Impressionists', 'Rue CLAR Bakery Walk'],
    photoSpot: 'Avenue de Camoëns & Pont Bir-Hakeim',
    description: 'Home to the iron lady, leafy avenues, Michelin-starred bistros, and grand museums along the Seine.',
    bestTime: 'Sunset & Sparkle Hour (10 PM)',
  },
  {
    id: 'marais-4th',
    name: '4th Arr. (Le Marais & Place des Vosges)',
    arrondissement: '4th Arrondissement',
    vibe: 'Historic Mansions, Art Boutiques & Secret Courtyards',
    highlights: ['Place des Vosges', 'Victor Hugo Residence', 'Artisanal Jewish Quarter Falafel & Pastries'],
    photoSpot: 'Rue des Rosiers & Cour du Commerce',
    description: 'Paris’s most vibrant neighborhood filled with 17th-century aristocratic palaces converted into trendy boutiques.',
    bestTime: 'Morning Coffee & Sunday Stroll',
  },
  {
    id: 'louvre-1st',
    name: '1st Arr. (Louvre & Palais-Royal)',
    arrondissement: '1st Arrondissement',
    vibe: 'Royal Heritage & Classical Architecture',
    highlights: ['Louvre Masterpieces', 'Palais-Royal Columns', 'Jardin des Tuileries'],
    photoSpot: 'Palais-Royal Black & White Columns',
    description: 'The ancient heart of French royalty, hosting world-famous galleries, manicured gardens, and luxury shopping.',
    bestTime: 'Early Morning (8:30 AM before crowds)',
  },
  {
    id: 'montmartre-18th',
    name: '18th Arr. (Montmartre & Sacré-Cœur)',
    arrondissement: '18th Arrondissement',
    vibe: 'Bohemian Art, Cobblestone Hillside & Vineyards',
    highlights: ['Sacré-Cœur Basilica Viewpoint', 'Place du Tertre Painters', 'Vignes de Montmartre'],
    photoSpot: 'Maison Rose & Square Marcel Bleustein',
    description: 'The hill of artists where Picasso and Van Gogh painted, featuring village charm, windmills, and panoramic city views.',
    bestTime: 'Golden Hour & Twilight',
  },
  {
    id: 'saint-germain-6th',
    name: '6th Arr. (Saint-Germain-des-Prés)',
    arrondissement: '6th Arrondissement',
    vibe: 'Literary Cafes, Jazz & Luxembourg Gardens',
    highlights: ['Jardin du Luxembourg', 'Café de Flore & Les Deux Magots', 'Antique Bookshops'],
    photoSpot: 'Medici Fountain in Luxembourg Gardens',
    description: 'The intellectual soul of Paris where Hemingway and Simone de Beauvoir debated over espresso.',
    bestTime: 'Afternoon Reading & Wine Hour',
  },
];

export function ParisDistrictMap() {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(districtsData[0]);

  return (
    <section id="districts" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 text-white font-['DM_Sans',sans-serif]">
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
            Interactive Seine Map Pinboard
          </div>

          {/* Seine River Curve Background SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" viewBox="0 0 600 400" fill="none">
            <path d="M0 260 C 150 280, 250 180, 380 200 C 480 220, 550 160, 600 140" stroke="#38BDF8" strokeWidth="24" strokeLinecap="round" />
          </svg>

          {/* District Pins Container */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto pt-8">
            {districtsData.map((d) => {
              const isSelected = selectedDistrict?.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
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
                <span>Curated District Highlights:</span>
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
                <span>Insider Secret Photo Spot:</span>
              </div>
              <div className="text-white/90 font-medium">{selectedDistrict.photoSpot}</div>
              <div className="text-[11px] text-white/60">Best Time: {selectedDistrict.bestTime}</div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
