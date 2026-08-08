import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollObserver } from './components/ScrollObserver';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then((m) => ({ default: m.PackagesPage })));
const CustomItineraryPage = lazy(() => import('./pages/CustomItineraryPage').then((m) => ({ default: m.CustomItineraryPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

function PageFallback() {
  return (
    <div className="w-full min-h-[60dvh] flex flex-col items-center justify-center space-y-3">
      <div className="w-9 h-9 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      <span className="text-xs font-mono text-white/60">Loading Paris Co...</span>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Scroll Reveal Observer */}
        <ScrollObserver />

        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="packages" element={<PackagesPage />} />
              <Route path="custom-itinerary" element={<CustomItineraryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
