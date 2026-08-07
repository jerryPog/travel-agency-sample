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
    tailorMadeItineraries: 'Tailor-Made Itineraries',
    travelSupport247: '24/7 Travel Support',

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

    // Brand Badges
    badgeOfficialPartner: 'Official Partner',
    badgeFeatured: 'Featured',
    badgeTopPick: 'Traveler Top Pick',
    badgeExcellence: 'Excellence Award',
    badge5Star: '5-Star Rated',
    badgeHeritage: 'Heritage Partner',

    // District Guide
    districtBadge: 'Interactive Neighborhood Guide',
    districtTitle: 'Explore Paris’s Most Iconic Arrondissements',
    districtSub: 'Click any district on the interactive map below to uncover secret photo spots, top attractions, and local guide recommendations.',
    distHighlightsLabel: 'Curated District Highlights:',
    distPhotoSpotLabel: 'Insider Secret Photo Spot:',
    distBestTimeLabel: 'Best Time:',
    distMapPinboard: 'Interactive Seine Map Pinboard',

    // District 7th
    d7Name: '7th Arr. (Eiffel & Invalides)',
    d7Arr: '7th Arrondissement',
    d7Vibe: 'Iconic Grandeur & Riverside Romance',
    d7Desc: 'Home to the iron lady, leafy avenues, Michelin-starred bistros, and grand museums along the Seine.',
    d7H1: 'Eiffel Tower Summit Access',
    d7H2: 'Musée d’Orsay Impressionists',
    d7H3: 'Rue Cler Bakery Walk',
    d7Photo: 'Avenue de Camoëns & Pont Bir-Hakeim',
    d7Time: 'Sunset & Sparkle Hour (10 PM)',

    // District 4th
    d4Name: '4th Arr. (Le Marais & Place des Vosges)',
    d4Arr: '4th Arrondissement',
    d4Vibe: 'Historic Mansions, Art Boutiques & Secret Courtyards',
    d4Desc: 'Paris’s most vibrant neighborhood filled with 17th-century aristocratic palaces converted into trendy boutiques.',
    d4H1: 'Place des Vosges',
    d4H2: 'Victor Hugo Residence',
    d4H3: 'Artisanal Jewish Quarter Falafel & Pastries',
    d4Photo: 'Rue des Rosiers & Cour du Commerce',
    d4Time: 'Morning Coffee & Sunday Stroll',

    // District 1st
    d1Name: '1st Arr. (Louvre & Palais-Royal)',
    d1Arr: '1st Arrondissement',
    d1Vibe: 'Royal Heritage & Classical Architecture',
    d1Desc: 'The ancient heart of French royalty, hosting world-famous galleries, manicured gardens, and luxury shopping.',
    d1H1: 'Louvre Masterpieces',
    d1H2: 'Palais-Royal Columns',
    d1H3: 'Jardin des Tuileries',
    d1Photo: 'Palais-Royal Black & White Columns',
    d1Time: 'Early Morning (8:30 AM before crowds)',

    // District 18th
    d18Name: '18th Arr. (Montmartre & Sacré-Cœur)',
    d18Arr: '18th Arrondissement',
    d18Vibe: 'Bohemian Art, Cobblestone Hillside & Vineyards',
    d18Desc: 'The hill of artists where Picasso and Van Gogh painted, featuring village charm, windmills, and panoramic city views.',
    d18H1: 'Sacré-Cœur Basilica Viewpoint',
    d18H2: 'Place du Tertre Painters',
    d18H3: 'Vignes de Montmartre',
    d18Photo: 'Maison Rose & Square Marcel Bleustein',
    d18Time: 'Golden Hour & Twilight',

    // District 6th
    d6Name: '6th Arr. (Saint-Germain-des-Prés)',
    d6Arr: '6th Arrondissement',
    d6Vibe: 'Literary Cafes, Jazz & Luxembourg Gardens',
    d6Desc: 'The intellectual soul of Paris where Hemingway and Simone de Beauvoir debated over espresso.',
    d6H1: 'Jardin du Luxembourg',
    d6H2: 'Café de Flore & Les Deux Magots',
    d6H3: 'Antique Bookshops',
    d6Photo: 'Medici Fountain in Luxembourg Gardens',
    d6Time: 'Afternoon Reading & Wine Hour',

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
    perTrip: 'per trip',
    choosePlan: 'Choose Plan',

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

    // Testimonials & Trust
    testimonialsBadge: 'Traveler Stories & Reviews',
    testimonialsTitle: 'Loved by Travelers Worldwide',
    testimonialsSub: 'Real stories from couples, families, and solo adventurers who explored Paris with us.',
    trustLocalTitle: 'Local Knowledge',
    trustLocalDesc: 'Local knowledge you won\'t find in guidebooks.',
    trustCustomTitle: 'Customized Itineraries',
    trustCustomDesc: 'Fully customized itineraries, not cookie-cutter tours.',
    trustSupportTitle: '24/7 Support',
    trustSupportDesc: '24/7 support during your entire trip.',
    trustGlobalTitle: 'Global Love',
    trustGlobalDesc: 'Loved by travelers from over 20 countries worldwide.',

    rev1Quote: 'Our 6-day trip felt like it was planned by a friend who actually lives in Paris — not a travel agency. Every café recommendation in Le Marais was spot on!',
    rev1Plan: 'Classic Plan',
    rev1Date: 'Traveled Oct 2025',

    rev2Quote: 'The private tour of Versailles and Monet’s gardens in Giverny was the highlight of our honeymoon. Having a personal concierge on WhatsApp 24/7 gave us total peace of mind.',
    rev2Plan: 'Premium VIP Plan',
    rev2Date: 'Traveled Dec 2025',

    rev3Quote: 'As a solo female traveler on my first trip to Europe, the self-guided walking maps and safety tips were invaluable. I discovered local bakeries I never would have found.',
    rev3Plan: 'Discovery Plan',
    rev3Date: 'Traveled Jan 2026',

    rev4Quote: 'Exceptional service! Skip-the-line access at the Louvre saved us hours of waiting. The private wine tasting in Montmartre was unforgettable.',
    rev4Plan: 'Premium VIP Plan',
    rev4Date: 'Traveled Jan 2026',

    rev5Quote: 'Ronak and his team designed the perfect balance of iconic sights and relaxed neighborhood walks. Best travel planning service we have ever used!',
    rev5Plan: 'Classic Plan',
    rev5Date: 'Traveled Nov 2025',

    rev6Quote: 'From our airport transfer to our anniversary dinner at a hidden bistro near the Seine, everything was seamless. Highly recommended!',
    rev6Plan: 'Classic Plan',
    rev6Date: 'Traveled Dec 2025',

    rev7Quote: 'The 3-day Paris itinerary was beautifully structured. Not rushed, super easy to follow, and packed with insider local secrets.',
    rev7Plan: 'Discovery Plan',
    rev7Date: 'Traveled Sep 2025',

    rev8Quote: 'Worth every rupee and dollar. Having local experts handle bookings and transfers allowed us to just sit back and soak in Paris.',
    rev8Plan: 'Premium VIP Plan',
    rev8Date: 'Traveled Oct 2025',

    // Quote Calculator
    calcTitle: 'Calculate Your Custom Itinerary Estimate',
    calcDays: 'Trip Duration:',
    calcTravelers: 'Number of Travelers:',
    calcTotal: 'Estimated Package Total',
    calcSub: 'Includes hotels, skip-line passes & guide',
    lockEstimate: 'Lock in Estimate',

    // Contact Section
    contactTitle: 'Ready to Experience Paris?',
    contactSub: 'Send us a message or start a live consultation.',
    accepting2026: 'Accepting Bookings for 2026–27',
    founderRole: 'Founder & Travel Consultant',
    founderQuote: '"Our mission is to help you experience Paris as a local, with custom routes, handpicked hotels, and 24/7 support."',
    responseTime: 'We typically respond within 24 hours.',
    eiffelBadge: 'Eiffel Sunset & Sparkle Hour',
    eiffelTitle: 'Experience the Magic of Paris Illuminated',
    eiffelDesc: 'Private summit access, champagne toasts, and Seine river viewings curated by local expert guides.',
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
    wizTitle: 'Paris Custom Itinerary Builder',
    wizStepSub: 'Step {step} of 5 — Tailored in 60 seconds',
    wizSuccessTitle: 'Itinerary Request Submitted!',
    wizSuccessSub: 'Our Paris travel concierge has received your preferences and will send a custom proposal to',
    wizBackToSite: 'Back to Site',
    wizStep1Title: 'How long is your ideal trip to Paris?',
    wizStep2Title: 'Who will be traveling with you?',
    wizStep3Title: 'Select your top interests in Paris (Pick multiple)',
    wizStep4Title: 'What is your preferred comfort tier?',
    wizStep5Summary: 'Your Travel Summary:',
    wizLabelDuration: 'Duration:',
    wizLabelGroup: 'Group:',
    wizLabelInterests: 'Interests:',
    wizLabelTier: 'Tier:',
    wizBtnSubmit: 'Submit & Get Custom Itinerary',
    wizBtnBack: 'Back',
    wizBtnContinue: 'Continue',

    // WhatsApp Chat
    waConcierge: 'Paris Travel Concierge',
    waOnlineStatus: 'Online • Responds in ~5 minutes',
    waWelcomeMsg: 'Bonjour! 👋 How can we help you plan your ideal Paris itinerary today?',
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
    heroSubtitle: 'Des expériences parisiennes uniques — des monuments incontournables aux secrets bien gardés par les locaux.',
    planMyTrip: 'Créer Mon Voyage',
    statTravelers: 'Chaque voyage est conçu pour vous — votre rythme, vos intérêts, votre budget.',
    statConcierge: 'Dès votre arrivée jusqu’à votre départ, notre équipe est à votre écoute à tout moment.',
    tailorMadeItineraries: 'Itinéraires Sur Mesure',
    travelSupport247: 'Support Voyage 24/7',

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

    // Brand Badges
    badgeOfficialPartner: 'Partenaire Officiel',
    badgeFeatured: 'Recommandé',
    badgeTopPick: 'Choix des Voyageurs',
    badgeExcellence: 'Prix d\'Excellence',
    badge5Star: 'Noté 5 Étoiles',
    badgeHeritage: 'Partenaire Patrimoine',

    // District Guide
    districtBadge: 'Guide Interactif des Quartiers',
    districtTitle: 'Explorez les Arrondissements Mythiques de Paris',
    districtSub: 'Cliquez sur un quartier de la carte pour découvrir les spots photos secrets et nos recommandations.',
    distHighlightsLabel: 'Points Forts du Quartier :',
    distPhotoSpotLabel: 'Spot Photo Secret :',
    distBestTimeLabel: 'Meilleur Moment :',
    distMapPinboard: 'Carte Interactive de la Seine',

    // District 7th
    d7Name: '7e Arr. (Tour Eiffel & Invalides)',
    d7Arr: '7e Arrondissement',
    d7Vibe: 'Grandeur Iconique & Romance au Bord de Seine',
    d7Desc: 'Foyer de la dame de fer, d\'avenues arborées, de bistros étoilés et de grands musées le long de la Seine.',
    d7H1: 'Accès au Sommet de la Tour Eiffel',
    d7H2: 'Impressionnistes du Musée d’Orsay',
    d7H3: 'Balade Gourmande Rue Cler',
    d7Photo: 'Avenue de Camoëns & Pont de Bir-Hakeim',
    d7Time: 'Coucher de Soleil & Heure Scintillante (22h)',

    // District 4th
    d4Name: '4e Arr. (Le Marais & Place des Vosges)',
    d4Arr: '4e Arrondissement',
    d4Vibe: 'Hôtels Particuliers, Boutiques d\'Art & Cours Secrètes',
    d4Desc: 'Le quartier le plus vivant de Paris abritant de magnifiques palais aristocratiques du XVIIe siècle.',
    d4H1: 'Place des Vosges',
    d4H2: 'Maison de Victor Hugo',
    d4H3: 'Falafels et Pâtisseries du Quartier Juif',
    d4Photo: 'Rue des Rosiers & Cour du Commerce',
    d4Time: 'Café du Matin & Flânerie Dominicale',

    // District 1st
    d1Name: '1er Arr. (Louvre & Palais-Royal)',
    d1Arr: '1er Arrondissement',
    d1Vibe: 'Héritage Royal & Architecture Classique',
    d1Desc: 'Le cœur historique de la royauté française, abritant des galeries célèbres et des jardins magnifiques.',
    d1H1: 'Chefs-d\'œuvre du Louvre',
    d1H2: 'Colonnes du Palais-Royal',
    d1H3: 'Jardin des Tuileries',
    d1Photo: 'Colonnes de Buren du Palais-Royal',
    d1Time: 'Tôt le Matin (8h30 avant la foule)',

    // District 18th
    d18Name: '18e Arr. (Montmartre & Sacré-Cœur)',
    d18Arr: '18e Arrondissement',
    d18Vibe: 'Art Bohème, Ruelles Pavées & Vignes',
    d18Desc: 'La Butte des artistes où ont peint Picasso et Van Gogh, avec son charme de village et ses moulins.',
    d18H1: 'Panorama de la Basilique du Sacré-Cœur',
    d18H2: 'Peintres de la Place du Tertre',
    d18H3: 'Vignes de Montmartre',
    d18Photo: 'La Maison Rose & Square Marcel Bleustein',
    d18Time: 'Heure Dorée & Crépuscule',

    // District 6th
    d6Name: '6e Arr. (Saint-Germain-des-Prés)',
    d6Arr: '6e Arrondissement',
    d6Vibe: 'Cafés Littéraires, Jazz & Jardin du Luxembourg',
    d6Desc: 'L\'âme intellectuelle de Paris où Hemingway et Simone de Beauvoir débattaient en terrasse.',
    d6H1: 'Jardin du Luxembourg',
    d6H2: 'Café de Flore & Les Deux Magots',
    d6H3: 'Librairies Anciennes',
    d6Photo: 'Fontaine de Médicis au Jardin du Luxembourg',
    d6Time: 'Lecture de l\'Après-midi & Verre de Vin',

    // Services
    servicesBadge: 'Nos Prestations',
    servicesTitle: 'Des Expériences Conçues Pour Chaque Voyageur',
    learnMore: 'En Savoir Plus',

    serviceClassicTitle: 'Circuits Classiques de Paris',
    serviceClassicDesc: 'Tour Eiffel, Musée du Louvre, Notre-Dame et les incontournables avec billets coupe-file et historiens de\'art.',
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
    perTrip: 'par séjour',
    choosePlan: 'Choisir la Formule',

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

    // Testimonials & Trust
    testimonialsBadge: 'Témoignages & Avis Voyageurs',
    testimonialsTitle: 'Apprécié par les Voyageurs du Monde Entier',
    testimonialsSub: 'De vraies histoires de couples, familles et aventuriers solitaires ayant exploré Paris avec nous.',
    trustLocalTitle: 'Expertise Locale',
    trustLocalDesc: 'Une connaissance du terrain introuvable dans les guides.',
    trustCustomTitle: 'Itinéraires Personnalisés',
    trustCustomDesc: 'Des séjours 100% sur mesure, pas de circuits standardisés.',
    trustSupportTitle: 'Support 24/7',
    trustSupportDesc: 'Une assistance 24/7 durant tout votre voyage.',
    trustGlobalTitle: 'Reconnaissance Mondiale',
    trustGlobalDesc: 'Apprécié par des voyageurs de plus de 20 pays.',

    rev1Quote: 'Notre séjour de 6 jours donnait l’impression d’avoir été organisé par un ami vivant à Paris. Chaque recommandation de café dans Le Marais était parfaite !',
    rev1Plan: 'Formule Classique',
    rev1Date: 'Voyage en Oct 2025',

    rev2Quote: 'La visite privée de Versailles et des jardins de Monet à Giverny était le moment fort de notre lune de miel. Le concierge sur WhatsApp 24/7 nous a apporté une sérénité totale.',
    rev2Plan: 'Formule VIP',
    rev2Date: 'Voyage en Déc 2025',

    rev3Quote: 'Voyageant seule en Europe pour la première fois, les cartes d’itinéraires à pied et conseils de sécurité m’ont été d’une valeur inestimable. J’ai découvert des boulangeries locales uniques.',
    rev3Plan: 'Formule Découverte',
    rev3Date: 'Voyage en Janv 2026',

    rev4Quote: 'Un service exceptionnel ! L’accès coupe-file au Louvre nous a fait gagner des heures d’attente. La dégustation privée de vin à Montmartre était inoubliable.',
    rev4Plan: 'Formule VIP',
    rev4Date: 'Voyage en Janv 2026',

    rev5Quote: 'Ronak et son équipe ont conçu l’équilibre parfait entre monuments mythiques et balades relaxantes dans les quartiers. Le meilleur service de voyage que nous ayons utilisé !',
    rev5Plan: 'Formule Classique',
    rev5Date: 'Voyage en Nov 2025',

    rev6Quote: 'Du transfert aéroport jusqu’à notre dîner d’anniversaire dans un bistro secret près de la Seine, tout était parfait. Nous recommandons vivement !',
    rev6Plan: 'Formule Classique',
    rev6Date: 'Voyage en Déc 2025',

    rev7Quote: 'L’itinéraire de 3 jours à Paris était merveilleusement structuré. Sans précipitation, très facile à suivre et rempli de secrets locaux.',
    rev7Plan: 'Formule Découverte',
    rev7Date: 'Voyage en Sept 2025',

    rev8Quote: 'Chaque euro valait le coup. Avoir des experts locaux qui gèrent les réservations et transferts nous a permis de profiter pleinement de Paris.',
    rev8Plan: 'Formule VIP',
    rev8Date: 'Voyage en Oct 2025',

    // Quote Calculator
    calcTitle: 'Calculez l’Estimation de Votre Séjour Sur Mesure',
    calcDays: 'Durée du Séjour:',
    calcTravelers: 'Nombre de Voyageurs:',
    calcTotal: 'Estimation Totale du Séjour',
    calcSub: 'Hôtels, pass coupe-file & guide inclus',
    lockEstimate: 'Valider l’Estimation',

    // Contact Section
    contactTitle: 'Prêt à Découvrir Paris ?',
    contactSub: 'Envoyez-nous un message ou démarrez une consultation.',
    accepting2026: 'Réservations Ouvertes pour 2026–27',
    founderRole: 'Fondateur & Consultant Voyage',
    founderQuote: '"Notre mission est de vous faire vivre Paris comme un habitant, avec des parcours sur mesure et un accompagnement 24/7."',
    responseTime: 'Réponse habituelle sous 24h.',
    eiffelBadge: 'Coucher de Soleil & Heure Scintillante',
    eiffelTitle: 'Découvrez la Magie de Paris Illuminé',
    eiffelDesc: 'Accès privé au sommet, toast au champagne et croisière sur la Seine avec nos guides locaux.',
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
    wizTitle: 'Créateur d\'Itinéraire Paris Sur Mesure',
    wizStepSub: 'Étape {step} sur 5 — Conçu en 60 secondes',
    wizSuccessTitle: 'Demande d\'Itinéraire Envoyée !',
    wizSuccessSub: 'Notre concierge voyage à Paris a bien reçu vos préférences et vous enverra une proposition personnalisée à',
    wizBackToSite: 'Retour au Site',
    wizStep1Title: 'Quelle est la durée idéale de votre séjour ?',
    wizStep2Title: 'Qui voyage avec vous ?',
    wizStep3Title: 'Sélectionnez vos centres d\'intérêt à Paris',
    wizStep4Title: 'Quel est votre niveau de confort souhaité ?',
    wizStep5Summary: 'Résumé de Votre Voyage :',
    wizLabelDuration: 'Durée :',
    wizLabelGroup: 'Groupe :',
    wizLabelInterests: 'Intérêts :',
    wizLabelTier: 'Niveau :',
    wizBtnSubmit: 'Valider & Obtenir Mon Itinéraire',
    wizBtnBack: 'Retour',
    wizBtnContinue: 'Continuer',

    // WhatsApp Chat
    waConcierge: 'Concierge Voyage Paris',
    waOnlineStatus: 'En Ligne • Réponse sous ~5 minutes',
    waWelcomeMsg: 'Bonjour ! 👋 Comment pouvons-nous vous aider à créer votre séjour idéal à Paris ?',
    waTypeMsg: 'Écrivez votre message...',
    waStartChat: 'Démarrer la Discussion WhatsApp',
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
