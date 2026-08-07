import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    aboutUs: 'About Us',
    services: 'Services',
    packages: 'Packages',
    whyUs: 'Why Choose Us',
    contact: 'Contact',
    districts: 'Paris Districts',
    openMenu: 'Open menu',
    planMyTrip: 'Plan My Trip',
    heroBadge: 'Handcrafted Paris Journeys',
    heroHeadline: 'Discover Paris, Beyond the Postcard',
    heroSubtitle: 'Handcrafted Paris experiences — from timeless landmarks to hidden corners only locals know.',
    weatherParis: 'Paris',
    sunny: 'Sunny',
    currencyConverter: 'Currency Reference',
    accepting2026: 'Accepting new itineraries for 2026/2027',
    startWizard: 'Start Custom Itinerary',
    whatsappChat: 'Chat with Local Guide',
    filterAll: 'All Packages',
    filterRomantic: 'Romantic Getaways',
    filterVIP: 'Private VIP',
    filterFood: 'Art & Gastronomy',
    filterFamily: 'Family Friendly',
    calculateQuote: 'Custom Quote Calculator',
    days: 'Days',
    travelers: 'Travelers',
    estimatedCost: 'Estimated Package Total',
  },
  fr: {
    home: 'Accueil',
    aboutUs: 'À Propos',
    services: 'Services',
    packages: 'Formules',
    whyUs: 'Pourquoi Nous',
    contact: 'Contact',
    districts: 'Quartiers de Paris',
    openMenu: 'Menu',
    planMyTrip: 'Créer Mon Voyage',
    heroBadge: 'Voyages Sur Mesure à Paris',
    heroHeadline: 'Découvrez Paris, Au-delà de la Carte Postale',
    heroSubtitle: 'Des expériences parisiennes uniques — des monuments incontournables aux secrets bien gardés par les locaux.',
    weatherParis: 'Paris',
    sunny: 'Ensoleillé',
    currencyConverter: 'Convertisseur Devise',
    accepting2026: 'Réservations ouvertes pour 2026/2027',
    startWizard: 'Planifier Mon Itinéraire',
    whatsappChat: 'Discuter avec un Guide',
    filterAll: 'Toutes les Formules',
    filterRomantic: 'Escapades Romantiques',
    filterVIP: 'VIP Privé',
    filterFood: 'Art & Gastronomie',
    filterFamily: 'En Famille',
    calculateQuote: 'Calculateur de Devis Sur Mesure',
    days: 'Jours',
    travelers: 'Voyageurs',
    estimatedCost: 'Estimation Totale du Séjour',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
