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
    heroSubtitle: 'Handcrafted Paris journeys — from iconic landmarks to local secrets.',
    planMyTrip: 'Plan My Trip',
    statTravelers: 'Customized to your pace, interests, and budget.',
    statConcierge: 'Dedicated local concierge support throughout your stay.',
    tailorMadeItineraries: 'Tailor-Made Itineraries',
    travelSupport247: '24/7 Support',

    // Top Bar Widget
    weatherParis: 'Paris',
    sunny: 'Sunny',
    currencyConverter: 'Currency Reference',

    // About Section
    aboutBadge: 'About Paris Travel Co.',
    aboutHeadline: 'Guiding Paris travelers since 2019 — from sunrise walks to twilight cruises.',
    aboutOverviewDesc: 'Curated routes with local guides and scenic photo stops.',
    pickupIncluded: 'Pickup Included',
    tripsDuration: '2–3 Hour Trips',
    sunsetViews: 'Sunset Views',
    contactUs: 'Contact Us',
    parisExplore: 'Paris Explore',
    momentsDesc: 'Real moments from travelers exploring Paris with us.',
    
    // Stats
    yearsExp: 'years experience',
    happyTravelers: 'happy travelers',
    scenicRoutes: 'scenic routes',
    avgRating: 'avg rating',

    // Story Section
    storyBadge: 'About Us',
    storyTitle: 'Your Local Experts in Paris',
    storyDesc: 'Paris-based travel planners designing journeys that blend iconic landmarks with quiet cafés and local gems.',
    storyQuote: '"We tailor every itinerary to your rhythm — slow, adventurous, or in between."',
    quietCafes: 'Quiet Cafés',
    localTeam: 'Local Paris Team',
    tailoredPace: 'Tailored Pacing',

    // Why Choose Us
    whyTitle: 'Why travelers choose Paris Travel Co.',
    whySub: 'Built on trust, safety, and insider local knowledge.',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'Guided by Paris locals who know hidden paths and traditions.',
    certifiedGuides: 'Certified Guides',
    certifiedGuidesDesc: 'Certified travel guides for safety and history.',
    communityPart: 'Community & Culture',
    communityPartDesc: 'Working directly with Paris artisans and local shops.',
    seeRealMoments: 'See real moments from our trips.',
    trustedByPartners: 'Trusted by Leading Travel Partners',

    // Brand Badges
    badgeOfficialPartner: 'Official Partner',
    badgeFeatured: 'Featured',
    badgeTopPick: 'Top Pick',
    badgeExcellence: 'Excellence Award',
    badge5Star: '5-Star Rated',
    badgeHeritage: 'Heritage Partner',

    // District Guide
    districtBadge: 'Neighborhood Guide',
    districtTitle: 'Explore Paris’s Arrondissements',
    districtSub: 'Click any district below to reveal secret photo spots and top highlights.',
    distHighlightsLabel: 'District Highlights:',
    distPhotoSpotLabel: 'Secret Photo Spot:',
    distBestTimeLabel: 'Best Time:',
    distMapPinboard: 'Interactive Seine Map',

    // District 7th
    d7Name: '7th Arr. (Eiffel & Invalides)',
    d7Arr: '7th Arrondissement',
    d7Vibe: 'Iconic Grandeur & Riverside Romance',
    d7Desc: 'Home to the Eiffel Tower, leafy avenues, and museums along the Seine.',
    d7H1: 'Eiffel Tower Summit Access',
    d7H2: 'Musée d’Orsay Impressionists',
    d7H3: 'Rue Cler Bakery Walk',
    d7Photo: 'Avenue de Camoëns & Pont Bir-Hakeim',
    d7Time: 'Sunset & Sparkle Hour (10 PM)',

    // District 4th
    d4Name: '4th Arr. (Le Marais & Place des Vosges)',
    d4Arr: '4th Arrondissement',
    d4Vibe: 'Historic Mansions & Secret Courtyards',
    d4Desc: 'Historic Marais with 17th-century mansions and trendy boutiques.',
    d4H1: 'Place des Vosges',
    d4H2: 'Victor Hugo Residence',
    d4H3: 'Jewish Quarter Falafel & Pastries',
    d4Photo: 'Rue des Rosiers & Cour du Commerce',
    d4Time: 'Morning Coffee & Sunday Stroll',

    // District 1st
    d1Name: '1st Arr. (Louvre & Palais-Royal)',
    d1Arr: '1st Arrondissement',
    d1Vibe: 'Royal Heritage & Architecture',
    d1Desc: 'Royal heart of Paris with the Louvre and Tuileries Gardens.',
    d1H1: 'Louvre Masterpieces',
    d1H2: 'Palais-Royal Columns',
    d1H3: 'Jardin des Tuileries',
    d1Photo: 'Palais-Royal Black & White Columns',
    d1Time: 'Early Morning (8:30 AM)',

    // District 18th
    d18Name: '18th Arr. (Montmartre & Sacré-Cœur)',
    d18Arr: '18th Arrondissement',
    d18Vibe: 'Bohemian Art & Hillside Views',
    d18Desc: 'Artist hillside with Montmartre vineyards and Sacré-Cœur views.',
    d18H1: 'Sacré-Cœur Viewpoint',
    d18H2: 'Place du Tertre Painters',
    d18H3: 'Vignes de Montmartre',
    d18Photo: 'Maison Rose & Square Marcel Bleustein',
    d18Time: 'Golden Hour & Twilight',

    // District 6th
    d6Name: '6th Arr. (Saint-Germain-des-Prés)',
    d6Arr: '6th Arrondissement',
    d6Vibe: 'Literary Cafes & Luxembourg Gardens',
    d6Desc: 'Literary Saint-Germain with iconic cafés and Luxembourg Gardens.',
    d6H1: 'Jardin du Luxembourg',
    d6H2: 'Café de Flore & Les Deux Magots',
    d6H3: 'Antique Bookshops',
    d6Photo: 'Medici Fountain',
    d6Time: 'Afternoon Reading & Wine',

    // Services
    servicesBadge: 'Our Offerings',
    servicesTitle: 'Crafted Experiences For Every Traveler',
    learnMore: 'Learn More',

    serviceClassicTitle: 'Classic Paris Tours',
    serviceClassicDesc: 'Eiffel Tower, Louvre, and Notre-Dame with skip-the-line access.',
    serviceClassicTag: 'Most Popular',
    serviceClassicH1: 'Eiffel Tower Summit Access',
    serviceClassicH2: 'Louvre Museum Masterpieces',
    serviceClassicH3: 'Historic Notre-Dame Walk',

    serviceHiddenTitle: 'Hidden Paris Experiences',
    serviceHiddenDesc: 'Local markets, rooftop views, and hidden courtyards in Le Marais.',
    serviceHiddenTag: 'Insider Favorite',
    serviceHiddenH1: 'Artisan Bakery Walk',
    serviceHiddenH2: 'Secret Courtyards & Gardens',
    serviceHiddenH3: 'Local Wine Tasting',

    serviceCustomTitle: 'Custom Itineraries',
    serviceCustomDesc: '100% tailor-made itineraries built around your rhythm.',
    serviceCustomTag: 'Bespoke',
    serviceCustomH1: 'Personal Travel Concierge',
    serviceCustomH2: 'Flexible Daily Schedule',
    serviceCustomH3: 'Curated Interactive Map',

    serviceDaytripsTitle: 'Day Trips & Countryside',
    serviceDaytripsDesc: 'Versailles Palace, Monet’s Giverny, and Champagne vineyards.',
    serviceDaytripsTag: 'Day Excursion',
    serviceDaytripsH1: 'Private Chauffeur Transfer',
    serviceDaytripsH2: 'Vineyard Wine Tasting',
    serviceDaytripsH3: 'Skip-The-Line Palace Entry',

    serviceGroupTitle: 'Group & Family Packages',
    serviceGroupDesc: 'Planned trips for families, celebrations, and corporate groups.',
    serviceGroupTag: 'Family & Groups',
    serviceGroupH1: 'Kids Scavenger Hunts',
    serviceGroupH2: 'Group Dining Reservations',
    serviceGroupH3: 'Spacious Vehicles',

    // Pricing & Packages
    pricingBadge: 'Pricing & Plans',
    pricingTitle: 'Transparent Packages Tailored to You',
    pricingSub: 'Transparent pricing with zero hidden fees. Pick a tier or calculate a custom estimate.',
    filterAll: 'All Packages',
    filterRomantic: 'Romantic Getaways',
    filterVIP: 'Private VIP',
    filterFood: 'Art & Gastronomy',
    filterFamily: 'Family Friendly',
    perTrip: 'per trip',
    choosePlan: 'Choose Plan',

    planDiscTitle: 'Discovery Experience',
    planDiscTagline: 'For short trips & essential Paris highlights',
    planDiscH1: '3-day curated Paris itinerary',
    planDiscH2: 'Skip-the-line Eiffel & Louvre entries',
    planDiscH3: 'Self-guided routes with local tips',
    planDiscH4: 'Direct WhatsApp support',

    planClassTitle: 'Classic Paris Plan',
    planClassTagline: 'For a seamless, fully guided stay',
    planClassH1: '5–7 day bespoke itinerary',
    planClassH2: 'Private Seine Cruise with Champagne',
    planClassH3: 'Boutique hotels & hidden bistros',
    planClassH4: 'Dedicated Paris travel consultant',
    planClassH5: '24/7 concierge support',

    planPremTitle: 'Bespoke VIP Luxury',
    planPremTagline: 'For an ultra-exclusive Paris journey',
    planPremH1: '100% custom itinerary',
    planPremH2: 'Private Mercedes Chauffeur & Guide',
    planPremH3: 'Day trips (Versailles, Champagne & Giverny)',
    planPremH4: 'Personal luxury travel concierge',
    planPremH5: 'VIP Airport Meet & Greet',

    // Testimonials & Trust
    testimonialsBadge: 'Traveler Reviews',
    testimonialsTitle: 'Loved by Travelers Worldwide',
    testimonialsSub: 'Real stories from travelers who explored Paris with us.',
    trustLocalTitle: 'Local Knowledge',
    trustLocalDesc: 'Insider Parisian secrets missing from guidebooks.',
    trustCustomTitle: 'Custom Itineraries',
    trustCustomDesc: '100% bespoke itineraries built for you.',
    trustSupportTitle: '24/7 Support',
    trustSupportDesc: '24/7 WhatsApp assistance during your stay.',
    trustGlobalTitle: 'Global Love',
    trustGlobalDesc: 'Trusted by travelers from 20+ countries.',

    rev1Quote: 'Our 6-day trip felt like it was planned by a friend who lives in Paris. Every café recommendation in Le Marais was spot on!',
    rev1Plan: 'Classic Plan',
    rev1Date: 'Oct 2025',

    rev2Quote: 'The private tour of Versailles and Monet’s gardens in Giverny was the highlight of our honeymoon. Concierge support was seamless.',
    rev2Plan: 'Premium VIP Plan',
    rev2Date: 'Dec 2025',

    rev3Quote: 'As a solo female traveler, the self-guided walking maps and safety tips were invaluable. Discovered hidden bakeries!',
    rev3Plan: 'Discovery Plan',
    rev3Date: 'Jan 2026',

    rev4Quote: 'Exceptional service! Skip-the-line access at the Louvre saved us hours. The private wine tasting in Montmartre was unforgettable.',
    rev4Plan: 'Premium VIP Plan',
    rev4Date: 'Jan 2026',

    rev5Quote: 'Ronak and his team designed the perfect balance of iconic sights and relaxed neighborhood walks. Best travel service ever!',
    rev5Plan: 'Classic Plan',
    rev5Date: 'Nov 2025',

    rev6Quote: 'From airport transfer to our anniversary dinner at a bistro near the Seine, everything was seamless. Highly recommended!',
    rev6Plan: 'Classic Plan',
    rev6Date: 'Dec 2025',

    rev7Quote: 'The 3-day Paris itinerary was beautifully structured. Not rushed, easy to follow, and packed with local secrets.',
    rev7Plan: 'Discovery Plan',
    rev7Date: 'Sep 2025',

    rev8Quote: 'Worth every rupee and dollar. Having local experts handle bookings allowed us to sit back and soak in Paris.',
    rev8Plan: 'Premium VIP Plan',
    rev8Date: 'Oct 2025',

    // Quote Calculator
    calcTitle: 'Calculate Custom Quote',
    calcDays: 'Trip Duration:',
    calcTravelers: 'Number of Travelers:',
    calcTotal: 'Estimated Total',
    calcSub: 'Includes hotels, skip-line passes & guide',
    lockEstimate: 'Lock in Estimate',

    // Contact Section
    contactTitle: 'Ready to Experience Paris?',
    contactSub: 'Send a message or request a custom itinerary.',
    accepting2026: 'Accepting Bookings for 2026–27',
    founderRole: 'Founder & Travel Consultant',
    founderQuote: '"Our mission is to help you experience Paris as a local with custom routes and 24/7 support."',
    responseTime: 'We respond within 24 hours.',
    eiffelBadge: 'Eiffel Sunset & Sparkle Hour',
    eiffelTitle: 'Experience Paris Illuminated',
    eiffelDesc: 'Private summit access, champagne toasts, and Seine cruises.',
    exploreEiffelTours: 'Explore Eiffel Tours',
    startConsultation: 'Start Consultation',
    messageSentTitle: 'Message Sent!',
    sendAnotherMsg: 'Send Another Message',
    yourName: 'Your Name',
    emailAddr: 'Email Address',
    travelDates: 'Travel Dates (Optional)',
    tellTrip: 'Tell us about your trip',
    sendInquiry: 'Send Inquiry',

    // Itinerary Wizard Modal
    wizTitle: 'Paris Itinerary Builder',
    wizStepSub: 'Step {step} of 5 — Tailored in 60s',
    wizSuccessTitle: 'Request Submitted!',
    wizSuccessSub: 'Our Paris travel concierge received your preferences and will send a proposal to',
    wizBackToSite: 'Back to Site',
    wizStep1Title: 'How long is your trip to Paris?',
    wizStep2Title: 'Who is traveling with you?',
    wizStep3Title: 'Select your top interests in Paris',
    wizStep4Title: 'Preferred comfort tier?',
    wizStep5Summary: 'Travel Summary:',
    wizLabelDuration: 'Duration:',
    wizLabelGroup: 'Group:',
    wizLabelInterests: 'Interests:',
    wizLabelTier: 'Tier:',
    wizBtnSubmit: 'Get Custom Itinerary',
    wizBtnBack: 'Back',
    wizBtnContinue: 'Continue',

    // WhatsApp Chat
    waConcierge: 'Paris Travel Concierge',
    waOnlineStatus: 'Online • Responds in ~5 min',
    waWelcomeMsg: 'Bonjour! 👋 How can we help plan your Paris trip today?',
    waTypeMsg: 'Type your message...',
    waStartChat: 'Start WhatsApp Chat',
    waChatWithGuide: 'Chat with Guide',
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
    heroSubtitle: 'Séjours sur mesure à Paris — des monuments aux secrets locaux.',
    planMyTrip: 'Créer Mon Voyage',
    statTravelers: 'Personnalisé selon votre rythme, vos goûts et votre budget.',
    statConcierge: 'Assistance concierge dédiée durant tout votre séjour.',
    tailorMadeItineraries: 'Itinéraires Sur Mesure',
    travelSupport247: 'Support 24/7',

    // Top Bar Widget
    weatherParis: 'Paris',
    sunny: 'Ensoleillé',
    currencyConverter: 'Convertisseur Devise',

    // About Section
    aboutBadge: 'À Propos de Paris Travel Co.',
    aboutHeadline: 'Vos guides à Paris depuis 2019 — des balades à l\'aube aux croisières nocturnes.',
    aboutOverviewDesc: 'Parcours sur mesure avec guides locaux et arrêts photos.',
    pickupIncluded: 'Prise en charge incluse',
    tripsDuration: 'Circuits 2–3 Heures',
    sunsetViews: 'Couchers de soleil',
    contactUs: 'Nous Contacter',
    parisExplore: 'Explorez Paris',
    momentsDesc: 'Moments authentiques de nos voyageurs à Paris.',
    
    // Stats
    yearsExp: 'ans d’expérience',
    happyTravelers: 'voyageurs ravis',
    scenicRoutes: 'parcours scéniques',
    avgRating: 'note moyenne',

    // Story Section
    storyBadge: 'À Propos',
    storyTitle: 'Vos Experts Locaux à Paris',
    storyDesc: 'Boutique voyage à Paris créant des séjours entre monuments et adresses locales.',
    storyQuote: '"Chaque itinéraire est adapté à votre rythme — doux, aventureux ou sur mesure."',
    quietCafes: 'Cafés Paisibles',
    localTeam: 'Équipe Locale Parisienne',
    tailoredPace: 'Rythme Sur Mesure',

    // Why Choose Us
    whyTitle: 'Pourquoi choisir Paris Travel Co.',
    whySub: 'Bâti sur la confiance, la sécurité et l’expertise locale.',
    localExpertise: 'Expertise Locale',
    localExpertiseDesc: 'Guidé par des Parisiens connaissant ruelles et traditions.',
    certifiedGuides: 'Guides Certifiés',
    certifiedGuidesDesc: 'Guides certifiés pour une sécurité et histoire parfaites.',
    communityPart: 'Communauté & Culture',
    communityPartDesc: 'En direct avec les artisans et commerces locaux.',
    seeRealMoments: 'Voir les moments réels de nos séjours.',
    trustedByPartners: 'Recommandé par nos Partenaires Voyage',

    // Brand Badges
    badgeOfficialPartner: 'Partenaire Officiel',
    badgeFeatured: 'Recommandé',
    badgeTopPick: 'Choix Top',
    badgeExcellence: 'Prix d\'Excellence',
    badge5Star: 'Noté 5 Étoiles',
    badgeHeritage: 'Partenaire Patrimoine',

    // District Guide
    districtBadge: 'Guide Quartiers',
    districtTitle: 'Explorez les Arrondissements',
    districtSub: 'Cliquez sur un quartier pour découvrir les spots photos et incontournables.',
    distHighlightsLabel: 'Points Forts :',
    distPhotoSpotLabel: 'Spot Photo Secret :',
    distBestTimeLabel: 'Meilleur Moment :',
    distMapPinboard: 'Carte Interactive de la Seine',

    // District 7th
    d7Name: '7e Arr. (Tour Eiffel & Invalides)',
    d7Arr: '7e Arrondissement',
    d7Vibe: 'Grandeur & Romance au Bord de Seine',
    d7Desc: 'Foyer de la Tour Eiffel, d\'avenues et de grands musées.',
    d7H1: 'Accès Sommet Tour Eiffel',
    d7H2: 'Musée d’Orsay Impressionnistes',
    d7H3: 'Balade Rue Cler',
    d7Photo: 'Avenue de Camoëns & Pont Bir-Hakeim',
    d7Time: 'Coucher de Soleil (22h)',

    // District 4th
    d4Name: '4e Arr. (Le Marais & Place des Vosges)',
    d4Arr: '4e Arrondissement',
    d4Vibe: 'Hôtels Particuliers & Cours Secrètes',
    d4Desc: 'Le Marais historique avec ses hôtels du XVIIe et boutiques.',
    d4H1: 'Place des Vosges',
    d4H2: 'Maison de Victor Hugo',
    d4H3: 'Falafels Quartier Juif',
    d4Photo: 'Rue des Rosiers',
    d4Time: 'Café du Matin & Dimanche',

    // District 1st
    d1Name: '1er Arr. (Louvre & Palais-Royal)',
    d1Arr: '1er Arrondissement',
    d1Vibe: 'Héritage Royal & Architecture',
    d1Desc: 'Cœur royal de Paris avec le Louvre et les Tuileries.',
    d1H1: 'Chefs-d\'œuvre du Louvre',
    d1H2: 'Colonnes du Palais-Royal',
    d1H3: 'Jardin des Tuileries',
    d1Photo: 'Colonnes du Palais-Royal',
    d1Time: 'Tôt le Matin (8h30)',

    // District 18th
    d18Name: '18e Arr. (Montmartre & Sacré-Cœur)',
    d18Arr: '18e Arrondissement',
    d18Vibe: 'Art Bohème & Panorama',
    d18Desc: 'Butte des artistes avec vignes de Montmartre et Sacré-Cœur.',
    d18H1: 'Panorama Sacré-Cœur',
    d18H2: 'Peintres Place du Tertre',
    d18H3: 'Vignes de Montmartre',
    d18Photo: 'Maison Rose',
    d18Time: 'Heure Dorée',

    // District 6th
    d6Name: '6e Arr. (Saint-Germain-des-Prés)',
    d6Arr: '6e Arrondissement',
    d6Vibe: 'Cafés Littéraires & Jardin du Luxembourg',
    d6Desc: 'Saint-Germain littéraire avec ses cafés mythiques et jardins.',
    d6H1: 'Jardin du Luxembourg',
    d6H2: 'Café de Flore & Les Deux Magots',
    d6H3: 'Librairies Anciennes',
    d6Photo: 'Fontaine de Médicis',
    d6Time: 'Après-midi & Verre de Vin',

    // Services
    servicesBadge: 'Nos Prestations',
    servicesTitle: 'Des Expériences Conçues Pour Vous',
    learnMore: 'En Savoir Plus',

    serviceClassicTitle: 'Circuits Classiques',
    serviceClassicDesc: 'Tour Eiffel, Louvre et Notre-Dame avec billets coupe-file.',
    serviceClassicTag: 'Plus Populaire',
    serviceClassicH1: 'Sommet Tour Eiffel',
    serviceClassicH2: 'Chefs-d\'œuvre du Louvre',
    serviceClassicH3: 'Balade Notre-Dame',

    serviceHiddenTitle: 'Expériences Secrètes',
    serviceHiddenDesc: 'Marchés locaux, vues toits et cours cachées du Marais.',
    serviceHiddenTag: 'Favori Habitants',
    serviceHiddenH1: 'Balade Boulangeries',
    serviceHiddenH2: 'Cours Secrètes',
    serviceHiddenH3: 'Dégustation Vins',

    serviceCustomTitle: 'Itinéraires Sur Mesure',
    serviceCustomDesc: 'Séjours 100% personnalisés selon votre propre rythme.',
    serviceCustomTag: 'Sur Mesure',
    serviceCustomH1: 'Concierge Dédié',
    serviceCustomH2: 'Programme Flexible',
    serviceCustomH3: 'Carte Dédiée',

    serviceDaytripsTitle: 'Excursions & Campagne',
    serviceDaytripsDesc: 'Versailles, Giverny de Monet et vignobles de Champagne.',
    serviceDaytripsTag: 'Excursion Journée',
    serviceDaytripsH1: 'Chauffeur Privé',
    serviceDaytripsH2: 'Dégustation Vignes',
    serviceDaytripsH3: 'Coupe-File Château',

    serviceGroupTitle: 'Famille & Groupes',
    serviceGroupDesc: 'Voyages sur mesure pour familles, évènements et groupes.',
    serviceGroupTag: 'Famille & Groupes',
    serviceGroupH1: 'Chasses au Trésor',
    serviceGroupH2: 'Réservations Groupes',
    serviceGroupH3: 'Véhicules Spacieux',

    // Pricing & Packages
    pricingBadge: 'Formules & Tarifs',
    pricingTitle: 'Des Offres Transparentes',
    pricingSub: 'Tarifs transparents sans frais cachés. Choisissez une formule ou calculez un devis.',
    filterAll: 'Toutes les Formules',
    filterRomantic: 'Escapades Romantiques',
    filterVIP: 'VIP Privé',
    filterFood: 'Art & Gastronomie',
    filterFamily: 'En Famille',
    perTrip: 'par séjour',
    choosePlan: 'Choisir la Formule',

    planDiscTitle: 'Expérience Découverte',
    planDiscTagline: 'Pour séjours courts et essentiels',
    planDiscH1: 'Itinéraire 3 jours',
    planDiscH2: 'Billets coupe-file Tour Eiffel & Louvre',
    planDiscH3: 'Parcours à pied avec conseils locaux',
    planDiscH4: 'Assistance WhatsApp directe',

    planClassTitle: 'Formule Paris Classique',
    planClassTagline: 'Pour un séjour guidé et fluide',
    planClassH1: 'Itinéraire 5-7 jours sur mesure',
    planClassH2: 'Croisière privée Seine avec Champagne',
    planClassH3: 'Hôtels sélects & bistros secrets',
    planClassH4: 'Consultant voyage dédié',
    planClassH5: 'Support concierge 24/7',

    planPremTitle: 'Luxe VIP Sur Mesure',
    planPremTagline: 'Pour un voyage ultra-exclusif',
    planPremH1: 'Itinéraire 100% sur mesure',
    planPremH2: 'Chauffeur privé Mercedes & Guide',
    planPremH3: 'Excursions (Versailles, Champagne & Giverny)',
    planPremH4: 'Concierge de luxe dédié',
    planPremH5: 'Accueil VIP Aéroport',

    // Testimonials & Trust
    testimonialsBadge: 'Avis Voyageurs',
    testimonialsTitle: 'Apprécié dans le Monde Entier',
    testimonialsSub: 'De vrais témoignages de voyageurs ayant exploré Paris avec nous.',
    trustLocalTitle: 'Expertise Locale',
    trustLocalDesc: 'Secrets de Parisiens introuvables dans les guides.',
    trustCustomTitle: 'Sur Mesure',
    trustCustomDesc: 'Des séjours 100% sur mesure conçus pour vous.',
    trustSupportTitle: 'Support 24/7',
    trustSupportDesc: 'Assistance WhatsApp 24/7 durant votre séjour.',
    trustGlobalTitle: 'Reconnaissance',
    trustGlobalDesc: 'Apprécié par des voyageurs de plus de 20 pays.',

    rev1Quote: 'Notre séjour de 6 jours donnait l’impression d’être organisé par un ami à Paris. Chaque café dans Le Marais était parfait !',
    rev1Plan: 'Formule Classique',
    rev1Date: 'Oct 2025',

    rev2Quote: 'La visite privée de Versailles et Giverny était le moment fort de notre lune de miel. Support concierge au top.',
    rev2Plan: 'Formule VIP',
    rev2Date: 'Déc 2025',

    rev3Quote: 'Voyageant seule, les cartes à pied et conseils sécurité m’ont été très précieux. J’ai découvert de super boulangeries.',
    rev3Plan: 'Formule Découverte',
    rev3Date: 'Janv 2026',

    rev4Quote: 'Service exceptionnel ! L’accès coupe-file au Louvre nous a évité des heures d’attente. La dégustation vin à Montmartre était top.',
    rev4Plan: 'Formule VIP',
    rev4Date: 'Janv 2026',

    rev5Quote: 'Ronak et son équipe ont trouvé le juste milieu entre monuments et balades relaxantes. Meilleur service de voyage !',
    rev5Plan: 'Formule Classique',
    rev5Date: 'Nov 2025',

    rev6Quote: 'Du transfert aéroport jusqu’au dîner d’anniversaire près de la Seine, tout était parfait. Hautement recommandé !',
    rev6Plan: 'Formule Classique',
    rev6Date: 'Déc 2025',

    rev7Quote: 'Itinéraire 3 jours très bien structuré. Sans stress, facile à suivre et rempli de secrets locaux.',
    rev7Plan: 'Formule Découverte',
    rev7Date: 'Sept 2025',

    rev8Quote: 'Chaque euro valait la peine. Avoir des experts locaux qui gèrent tout nous a permis de vraiment profiter.',
    rev8Plan: 'Formule VIP',
    rev8Date: 'Oct 2025',

    // Quote Calculator
    calcTitle: 'Calculer un Devis Sur Mesure',
    calcDays: 'Durée du Séjour:',
    calcTravelers: 'Nombre de Voyageurs:',
    calcTotal: 'Estimation Totale',
    calcSub: 'Hôtels, pass coupe-file & guide inclus',
    lockEstimate: 'Valider l’Estimation',

    // Contact Section
    contactTitle: 'Prêt à Découvrir Paris ?',
    contactSub: 'Envoyez un message ou demandez un devis.',
    accepting2026: 'Réservations Ouvertes pour 2026–27',
    founderRole: 'Fondateur & Consultant Voyage',
    founderQuote: '"Notre mission est de vous faire vivre Paris comme un habitant avec un accompagnement 24/7."',
    responseTime: 'Réponse sous 24 heures.',
    eiffelBadge: 'Coucher de Soleil & Heure Scintillante',
    eiffelTitle: 'Découvrez Paris Illuminé',
    eiffelDesc: 'Sommet privé, champagne et croisière sur la Seine.',
    exploreEiffelTours: 'Découvrir les Tours Eiffel',
    startConsultation: 'Démarrer une Consultation',
    messageSentTitle: 'Message Envoyé !',
    sendAnotherMsg: 'Envoyer un Autre Message',
    yourName: 'Votre Nom',
    emailAddr: 'Adresse Email',
    travelDates: 'Dates de Voyage (Optionnel)',
    tellTrip: 'Parlez-nous de votre projet',
    sendInquiry: 'Envoyer la Demande',

    // Itinerary Wizard Modal
    wizTitle: 'Créateur d\'Itinéraire Paris',
    wizStepSub: 'Étape {step} sur 5 — En 60s',
    wizSuccessTitle: 'Demande Envoyée !',
    wizSuccessSub: 'Notre concierge voyage à Paris a reçu vos choix et vous enverra une proposition à',
    wizBackToSite: 'Retour au Site',
    wizStep1Title: 'Quelle est la durée de votre séjour ?',
    wizStep2Title: 'Qui voyage avec vous ?',
    wizStep3Title: 'Vos centres d\'intérêt à Paris',
    wizStep4Title: 'Niveau de confort souhaité ?',
    wizStep5Summary: 'Résumé du Voyage :',
    wizLabelDuration: 'Durée :',
    wizLabelGroup: 'Groupe :',
    wizLabelInterests: 'Intérêts :',
    wizLabelTier: 'Niveau :',
    wizBtnSubmit: 'Obtenir Mon Itinéraire',
    wizBtnBack: 'Retour',
    wizBtnContinue: 'Continuer',

    // WhatsApp Chat
    waConcierge: 'Concierge Voyage Paris',
    waOnlineStatus: 'En Ligne • Réponse sous ~5 min',
    waWelcomeMsg: 'Bonjour ! 👋 Comment vous aider à préparer votre séjour à Paris ?',
    waTypeMsg: 'Écrivez votre message...',
    waStartChat: 'Discussion WhatsApp',
    waChatWithGuide: 'Discuter avec un Guide',
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
