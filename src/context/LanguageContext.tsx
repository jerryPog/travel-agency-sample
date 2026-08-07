import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    aboutUs: 'About Us',
    services: 'Services',
    packages: 'Packages',
    whyUs: 'Why Choose Us',
    contact: 'Contact',
    districts: 'Paris Districts',
    openMenu: 'Open menu',

    // Hero Section
    heroBadge: 'Handcrafted Paris Journeys',
    heroHeadline: 'Discover Paris, Beyond the Postcard',
    heroSubtitle: 'Handcrafted Paris experiences — from timeless landmarks to hidden corners only locals know.',
    planMyTrip: 'Plan My Trip',
    statTravelers: 'Every trip is planned around you — your pace, your interests, your budget.',
    statConcierge: 'From the moment you land to the moment you leave, our team is one message away.',

    // Top Bar Widget
    weatherParis: 'Paris',
    sunny: 'Sunny',
    currencyConverter: 'Currency Reference',

    // About Section
    aboutBadge: 'About Paris Travel Co.',
    aboutHeadline: 'Since 2019, our team has guided hundreds of travelers through Paris’s unique landscapes, from sunrise walks to stargazing nights.',
    aboutOverviewDesc: 'Explore Paris with routes designed for all experience levels. Each trip includes local guides and scenic stops for photos and rest.',
    pickupIncluded: 'Pickup Included',
    tripsDuration: '2–3 Hour Trips',
    sunsetViews: 'Sunset Views',
    contactUs: 'Contact Us',
    parisExplore: 'Paris Explore',
    momentsDesc: 'Stories and moments from travelers who explored Paris’s beauty with us.',
    
    // Stats
    yearsExp: 'years of experience',
    happyTravelers: 'happy travelers',
    scenicRoutes: 'scenic routes',
    avgRating: 'average rating',

    // Why Choose Us
    whyTitle: 'Why travelers choose Paris Travel Co.',
    whySub: 'Every journey we organize is built on trust, safety, and unforgettable views.',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'Guided by people who grew up in Paris and know its hidden paths, stories, and traditions.',
    certifiedGuides: 'Certified Paris Guides',
    certifiedGuidesDesc: 'Certified by local and international travel associations for safety and historical navigation.',
    communityPart: 'Community & Partnerships',
    communityPartDesc: 'Working hand in hand with Paris’s local community to preserve culture and share stories.',
    seeRealMoments: 'See real moments from our trips.',
    trustedByPartners: 'Trusted by Leading Global Travel & Media Partners',

    // District Guide
    districtBadge: 'Interactive Neighborhood Guide',
    districtTitle: 'Explore Paris’s Most Iconic Arrondissements',
    districtSub: 'Click any district on the interactive map below to uncover secret photo spots, top sights, and local guide recommendations.',

    // Services
    servicesBadge: 'Our Offerings',
    servicesTitle: 'Crafted Experiences For Every Traveler',

    // Pricing & Packages
    pricingBadge: 'Curated Pricing & Plans',
    pricingTitle: 'Transparent Packages Tailored to Your Journey',
    pricingSub: 'No hidden fees or generic tour groups. Pick a pre-crafted tier or calculate a custom quote below.',
    filterAll: 'All Packages',
    filterRomantic: 'Romantic Getaways',
    filterVIP: 'Private VIP',
    filterFood: 'Art & Gastronomy',
    filterFamily: 'Family Friendly',

    // Quote Calculator
    calcTitle: 'Calculate Your Custom Itinerary Estimate',
    calcDays: 'Trip Duration:',
    calcTravelers: 'Number of Travelers:',
    calcTotal: 'Estimated Package Total',
    calcSub: 'Includes hotels, skip-line passes & guide',
    lockEstimate: 'Lock in Estimate',

    // Contact
    contactTitle: 'Ready to Experience Paris?',
    contactSub: 'Send us a message or start a live consultation.',
    accepting2026: 'Accepting Bookings for 2026–27',
    yourName: 'Your Name',
    emailAddr: 'Email Address',
    travelDates: 'Travel Dates (Optional)',
    tellTrip: 'Tell us about your trip',
    sendInquiry: 'Send Inquiry',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    aboutUs: 'À Propos',
    services: 'Services',
    packages: 'Formules',
    whyUs: 'Pourquoi Nous',
    contact: 'Contact',
    districts: 'Quartiers de Paris',
    openMenu: 'Menu',

    // Hero Section
    heroBadge: 'Voyages Sur Mesure à Paris',
    heroHeadline: 'Découvrez Paris, Au-delà de la Carte Postale',
    heroSubtitle: 'Des expériences parisiennes uniques — des monuments incontournables aux secrets bien gardés par les locaux.',
    planMyTrip: 'Créer Mon Voyage',
    statTravelers: 'Chaque voyage est conçu pour vous — votre rythme, vos intérêts, votre budget.',
    statConcierge: 'Dès votre arrivée jusqu’à votre départ, notre équipe est à votre écoute à tout moment.',

    // Top Bar Widget
    weatherParis: 'Paris',
    sunny: 'Ensoleillé',
    currencyConverter: 'Convertisseur Devise',

    // About Section
    aboutBadge: 'À Propos de Paris Travel Co.',
    aboutHeadline: 'Depuis 2019, notre équipe accompagne des centaines de voyageurs à travers les plus beaux panoramas de Paris.',
    aboutOverviewDesc: 'Explorez Paris avec des parcours conçus pour tous. Chaque circuit inclut des guides locaux et des pauses photos scéniques.',
    pickupIncluded: 'Prise en charge incluse',
    tripsDuration: 'Circuits 2–3 Heures',
    sunsetViews: 'Couchers de soleil',
    contactUs: 'Nous Contacter',
    parisExplore: 'Explorez Paris',
    momentsDesc: 'Histoires et souvenirs de voyageurs ayant exploré Paris avec nous.',
    
    // Stats
    yearsExp: 'années d’expérience',
    happyTravelers: 'voyageurs ravis',
    scenicRoutes: 'parcours panoramiques',
    avgRating: 'note moyenne',

    // Why Choose Us
    whyTitle: 'Pourquoi les voyageurs choisissent Paris Travel Co.',
    whySub: 'Chaque itinéraire est bâti sur la confiance, la sécurité et des vues inoubliables.',
    localExpertise: 'Expertise Locale',
    localExpertiseDesc: 'Guidé par des passionnés nés à Paris qui connaissent chaque rue, histoire et tradition.',
    certifiedGuides: 'Guides Parisiens Certifiés',
    certifiedGuidesDesc: 'Certifiés par les associations de tourisme pour une sécurité et un récit historique parfaits.',
    communityPart: 'Communauté & Partenariats',
    communityPartDesc: 'En collaboration directe avec les artisans et la communauté locale de Paris.',
    seeRealMoments: 'Voir les moments réels de nos séjours.',
    trustedByPartners: 'Recommandé par les plus grands partenaires médias & voyage',

    // District Guide
    districtBadge: 'Guide Interactif des Quartiers',
    districtTitle: 'Explorez les Arrondissements Mythiques de Paris',
    districtSub: 'Cliquez sur un quartier de la carte pour découvrir les spots photos secrets et nos recommandations.',

    // Services
    servicesBadge: 'Nos Prestations',
    servicesTitle: 'Des Expériences Conçues Pour Chaque Voyageur',

    // Pricing & Packages
    pricingBadge: 'Formules & Tarifs',
    pricingTitle: 'Des Offres Transparentes Adaptées à Votre Séjour',
    pricingSub: 'Pas de frais cachés ni de groupes impersonnels. Choisissez une formule ou calculez un devis.',
    filterAll: 'Toutes les Formules',
    filterRomantic: 'Escapades Romantiques',
    filterVIP: 'VIP Privé',
    filterFood: 'Art & Gastronomie',
    filterFamily: 'En Famille',

    // Quote Calculator
    calcTitle: 'Calculez l’Estimation de Votre Séjour Sur Mesure',
    calcDays: 'Durée du Séjour:',
    calcTravelers: 'Nombre de Voyageurs:',
    calcTotal: 'Estimation Totale du Séjour',
    calcSub: 'Hôtels, pass coupe-file & guide inclus',
    lockEstimate: 'Valider l’Estimation',

    // Contact
    contactTitle: 'Prêt à Découvrir Paris ?',
    contactSub: 'Envoyez-nous un message ou démarrez une consultation.',
    accepting2026: 'Réservations Ouvertes pour 2026–27',
    yourName: 'Votre Nom',
    emailAddr: 'Adresse Email',
    travelDates: 'Dates de Voyage (Optionnel)',
    tellTrip: 'Parlez-nous de votre projet',
    sendInquiry: 'Envoyer la Demande',
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
