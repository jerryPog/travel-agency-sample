import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { CustomItineraryPage } from './pages/CustomItineraryPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollObserver } from './components/ScrollObserver';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Scroll Reveal Observer */}
        <ScrollObserver />

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
      </BrowserRouter>
    </LanguageProvider>
  );
}
