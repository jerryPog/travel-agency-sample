import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="w-full min-h-[70dvh] flex flex-col items-center justify-center text-center px-4 py-16 font-['DM_Sans',sans-serif]">
      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 mb-6 shadow-2xl animate-pulse">
        <Compass className="w-8 h-8" />
      </div>

      <span className="inline-block px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-mono font-bold text-amber-300 mb-3 uppercase tracking-widest">
        404 - Lost in Paris
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-3">
        Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-white/80 max-w-md mb-8 leading-relaxed">
        Looks like you strolled into a secret alleyway in Montmartre. Let us guide you back to the main avenue.
      </p>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 bg-white hover:bg-white/95 text-[#0B132B] font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Paris Homepage</span>
      </Link>
    </div>
  );
}
