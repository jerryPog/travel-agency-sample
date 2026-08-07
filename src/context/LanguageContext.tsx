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

    // Story Section
    storyBadge: 'About Us',
    storyTitle: 'Your Local Experts in Everything Paris',
    storyDesc: 'We are a Paris-based travel company built on one simple idea: the best trips aren\'t just seen, they\'re felt. Our team of local experts and passionate travel planners designs journeys that go beyond the usual checklist of sights, blending iconic landmarks with quiet cafés, riverside walks, and neighborhood gems.',
    storyQuote: '"Whether it\'s your first visit or your fifth, we tailor every itinerary to how you like to travel — slow and immersive, packed and adventurous, or somewhere in between."',
    quietCafes: 'Quiet Cafés',
    localTeam: 'Local Paris Team',
    tailoredPace: 'Tailored Pacing',

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
    districtSub: 'Click any district on the interactive map below to uncover secret photo spots, top attractions, and local guide recommendations.',

    // Services
    servicesBadge: 'Our Offerings',
    servicesTitle: 'Crafted Experiences For Every Traveler',
    learnMore: 'Learn More',

    serviceClassicTitle: 'Classic Paris Tours',
    serviceClassicDesc: 'Eiffel Tower, Louvre, Notre-Dame, and the essentials, done right with skip-the-line access and expert art historians.',
    serviceClassicTag: 'Most Popular',
    serviceClassicH1: 'Eiffel Tower Summit Access',
    serviceClassicH2: 'Louvre Museum Masterpieces',
    serviceClassicH3: 'Historic Notre-Dame Walk',

    serviceHiddenTitle: 'Hidden Paris Experiences',
    serviceHiddenDesc: 'Local markets, secret rooftop gardens, underground speakeasies, and off-the-map neighborhoods in Belleville & Le Marais.',
    serviceHiddenTag: 'Insider Favorite',
    serviceHiddenH1: 'Artisan Bakery Walk',
    serviceHiddenH2: 'Secret Courtyards & Gardens',
    serviceHiddenH3: 'Local Wine & Cheese Tasting',

    serviceCustomTitle: 'Custom Itineraries',
    serviceCustomDesc: 'Fully personalized trips designed around your rhythm, interests, food preferences, and pace — 100% tailor-made.',
    serviceCustomTag: 'Bespoke',
    serviceCustomH1: 'Personal Travel Concierge',
    serviceCustomH2: 'Flexible Daily Schedule',
    serviceCustomH3: 'Curated Interactive Map App',

    serviceDaytripsTitle: 'Day Trips & Countryside',
    serviceDaytripsDesc: 'Château de Versailles, Monet’s Gardens in Giverny, Champagne vineyards, and Normandy coast with private transfers.',
    serviceDaytripsTag: 'Day Excursion',
    serviceDaytripsH1: 'Private Chauffeur Transfer',
    serviceDaytripsH2: 'Vineyard Wine Tasting',
    serviceDaytripsH3: 'Skip-The-Line Palace Entry',

    serviceGroupTitle: 'Group & Family Packages',
    serviceGroupDesc: 'Thoughtfully planned trips for families with children, milestone birthdays, corporate retreats, and couples.',
    serviceGroupTag: 'Family & Groups',
    serviceGroupH1: 'Kids Scavenger Hunts',
    serviceGroupH2: 'Group Dining Reservations',
    serviceGroupH3: 'Spacious Vehicles',

    // Pricing & Packages
    pricingBadge: 'Curated Pricing & Plans',
    pricingTitle: 'Transparent Packages Tailored to Your Journey',
    pricingSub: 'No hidden fees or generic tour groups. Pick a pre-crafted tier or calculate a custom quote below.',
    filterAll: 'All Packages',
    filterRomantic: 'Romantic Getaways',
    filterVIP: 'Private VIP',
    filterFood: 'Art & Gastronomy',
    filterFamily: 'Family Friendly',

    planDiscTitle: 'Discovery Experience',
    planDiscTagline: 'For short trips & essential Paris highlights',
    planDiscH1: '3-day curated Paris itinerary',
    planDiscH2: 'Skip-the-line Eiffel Tower & Louvre timed entries',
    planDiscH3: 'Self-guided walking routes with local tips',
    planDiscH4: 'Direct WhatsApp support before your trip',

    planClassTitle: 'Classic Paris Plan',
    planClassTagline: 'For travelers who want a seamless, fully guided stay',
    planClassH1: '5–7 day full day-by-day bespoke itinerary',
    planClassH2: 'Private Seine River Sunset Cruise with Champagne',
    planClassH3: 'Handpicked boutique hotels, cafés & hidden bistros',
    planClassH4: 'Dedicated Paris travel consultant',
    planClassH5: '24/7 concierge support during your stay',

    planPremTitle: 'Bespoke VIP Luxury',
    planPremTagline: 'For a fully personalized, ultra-exclusive Paris journey',
    planPremH1: '100% custom itinerary tailored to your exact pace',
    planPremH2: 'Private Mercedes Chauffeur & Private Licensed Guide',
    planPremH3: 'Day trips included (Versailles, Champagne & Giverny)',
    planPremH4: 'Personal luxury travel concierge available anytime',
    planPremH5: 'VIP Airport Meet & Greet + Priority transfers',

    // Testimonials
    testimonialsBadge: 'Traveler Stories & Reviews',
    testimonialsTitle: 'Loved by Travelers Worldwide',
    testimonialsSub: 'Real stories from couples, families, and solo adventurers who explored Paris with us.',

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

    // Story Section
    storyBadge: 'À Propos',
    storyTitle: 'Vos Experts Locaux à Paris',
    storyDesc: 'Nous sommes une agence basée à Paris créée autour d\'une idée simple : les meilleurs voyages ne se visitent pas seulement, ils se vivent. Notre équipe de guides passionnés conçoit des séjours qui vont au-delà des itinéraires touristiques classiques, mêlant monuments célèbres, cafés tranquilles et ruelles secrètes.',
    storyQuote: '"Que ce soit votre première ou votre cinquième visite, nous adaptons chaque itinéraire à vos envies — immersif et doux, dynamique et aventureux, ou un juste milieu."',
    quietCafes: 'Cafés Paisibles',
    localTeam: 'Équipe Locale Parisienne',
    tailoredPace: 'Rythme Sur Mesure',

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
    learnMore: 'En Savoir Plus',

    serviceClassicTitle: 'Circuits Classiques de Paris',
    serviceClassicDesc: 'Tour Eiffel, Musée du Louvre, Notre-Dame et les incontournables avec billets coupe-file et historiens de l\'art.',
    serviceClassicTag: 'Plus Populaire',
    serviceClassicH1: 'Sommet de la Tour Eiffel',
    serviceClassicH2: 'Chefs-d\'œuvre du Louvre',
    serviceClassicH3: 'Balade à Notre-Dame',

    serviceHiddenTitle: 'Expériences Parisiennes Secrètes',
    serviceHiddenDesc: 'Marchés locaux, jardins suspendus secrets, bars cachés et quartiers typiques de Belleville et du Marais.',
    serviceHiddenTag: 'Favori des Habitants',
    serviceHiddenH1: 'Balade des Boulangeries',
    serviceHiddenH2: 'Cours Intérieures Secrètes',
    serviceHiddenH3: 'Dégustation de Vins',

    serviceCustomTitle: 'Itinéraires Sur Mesure',
    serviceCustomDesc: 'Séjours 100% personnalisés selon votre rythme, vos centres d\'intérêt et vos envies culinaires.',
    serviceCustomTag: 'Sur Mesure',
    serviceCustomH1: 'Concierge Dédié',
    serviceCustomH2: 'Programme Flexible',
    serviceCustomH3: 'Application Carte Dédiée',

    serviceDaytripsTitle: 'Excursions & Campagne',
    serviceDaytripsDesc: 'Château de Versailles, Jardins de Monet à Giverny, vignobles de Champagne et côte normande avec chauffeur privé.',
    serviceDaytripsTag: 'Excursion d\'une Journée',
    serviceDaytripsH1: 'Chauffeur Privé',
    serviceDaytripsH2: 'Dégustation dans les Vignes',
    serviceDaytripsH3: 'Entrée Coupe-File',

    serviceGroupTitle: 'Offres Famille & Groupes',
    serviceGroupDesc: 'Voyages sur mesure pour familles avec enfants, anniversaires, séminaires et séjours en groupe.',
    serviceGroupTag: 'Famille & Groupes',
    serviceGroupH1: 'Chasses au Trésor Enfants',
    serviceGroupH2: 'Réservations Restaurants de Groupe',
    serviceGroupH3: 'Véhicules Spacieux',

    // Pricing & Packages
    pricingBadge: 'Formules & Tarifs',
    pricingTitle: 'Des Offres Transparentes Adaptées à Votre Séjour',
    pricingSub: 'Pas de frais cachés ni de groupes impersonnels. Choisissez une formule ou calculez un devis.',
    filterAll: 'Toutes les Formules',
    filterRomantic: 'Escapades Romantiques',
    filterVIP: 'VIP Privé',
    filterFood: 'Art & Gastronomie',
    filterFamily: 'En Famille',

    planDiscTitle: 'Expérience Découverte',
    planDiscTagline: 'Pour séjours courts et incontournables de Paris',
    planDiscH1: 'Itinéraire 3 jours personnalisé',
    planDiscH2: 'Billets horodatés Tour Eiffel & Louvre',
    planDiscH3: 'Parcours à pied avec conseils locaux',
    planDiscH4: 'Assistance WhatsApp directe avant séjour',

    planClassTitle: 'Formule Paris Classique',
    planClassTagline: 'Pour les voyageurs souhaitant un séjour guidé et fluide',
    planClassH1: 'Itinéraire 5-7 jours jour par jour',
    planClassH2: 'Croisière privée au coucher du soleil avec Champagne',
    planClassH3: 'Hôtels sélects, cafés et bistros secrets',
    planClassH4: 'Consultant voyage dédié à Paris',
    planClassH5: 'Support concierge 24/7 durant le séjour',

    planPremTitle: 'Luxe VIP Sur Mesure',
    planPremTagline: 'Pour un voyage ultra-exclusif et 100% personnalisé',
    planPremH1: 'Itinéraire 100% sur mesure selon votre rythme',
    planPremH2: 'Chauffeur privé Mercedes & Guide officiel privé',
    planPremH3: 'Excursions incluses (Versailles, Champagne & Giverny)',
    planPremH4: 'Concierge de luxe disponible à tout moment',
    planPremH5: 'Accueil VIP Aéroport & Transferts prioritaires',

    // Testimonials
    testimonialsBadge: 'Témoignages & Avis Voyageurs',
    testimonialsTitle: 'Apprécié par les Voyageurs du Monde Entier',
    testimonialsSub: 'De vraies histoires de couples, familles et aventuriers solitaires ayant exploré Paris avec nous.',

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
