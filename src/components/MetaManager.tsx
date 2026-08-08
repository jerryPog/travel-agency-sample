import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const routeTitles: Record<string, { en: string; fr: string; descEn: string; descFr: string }> = {
  '/': {
    en: 'Paris Travel Co. | Bespoke Luxury Paris Travel & Private Jet Charters',
    fr: 'Paris Travel Co. | Voyages Sur Mesure à Paris et Jets Privés',
    descEn: 'Handcrafted luxury Paris itineraries, private tours, exclusive access, and 24/7 concierge.',
    descFr: 'Itinéraires de luxe à Paris faits main, visites privées et concierge 24/7.',
  },
  '/packages': {
    en: 'Luxury Tours & Pricing Packages | Paris Travel Co.',
    fr: 'Circuits de Luxe et Tarifs | Paris Travel Co.',
    descEn: 'Explore classic Paris tours, hidden gem itineraries, bespoke VIP experiences, and instant quote calculators.',
    descFr: 'Découvrez les circuits classiques, joyaux cachés et expériences VIP à Paris.',
  },
  '/custom-itinerary': {
    en: 'Interactive Itinerary Builder | Paris Travel Co.',
    fr: 'Planificateur d’Itinéraire Interactif | Paris Travel Co.',
    descEn: 'Build your custom Paris travel plan in under 60 seconds with our interactive wizard.',
    descFr: 'Créez votre plan de voyage personnalisé à Paris en moins de 60 secondes.',
  },
  '/about': {
    en: 'About Us & Our Story | Paris Travel Co.',
    fr: 'À Propos de Nous et Notre Histoire | Paris Travel Co.',
    descEn: 'Meet founder Ronak Jain R, explore our 5-star concierge team, and private jet luxury fleet.',
    descFr: 'Rencontrez le fondateur Ronak Jain R et notre équipe de conciergerie 5 étoiles.',
  },
  '/reviews': {
    en: 'Client Reviews & Travel Experience | Paris Travel Co.',
    fr: 'Avis Clients et Expériences | Paris Travel Co.',
    descEn: 'Read verified 5-star reviews from travelers who explored Paris with our private guides.',
    descFr: 'Lisez les avis 5 étoiles de nos voyageurs ayant exploré Paris avec nos guides.',
  },
  '/contact': {
    en: 'Contact Us & Direct Booking | Paris Travel Co.',
    fr: 'Contactez-nous et Réservation Directe | Paris Travel Co.',
    descEn: 'Get in touch with Ronak Jain R & team for direct Paris trip planning and inquiry.',
    descFr: 'Contactez Ronak Jain R et l’équipe pour planifier votre voyage à Paris.',
  },
};

export function MetaManager() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const metaInfo = routeTitles[pathname] || {
      en: '404 - Page Not Found | Paris Travel Co.',
      fr: '404 - Page Non Trouvée | Paris Travel Co.',
      descEn: 'The requested page could not be found.',
      descFr: 'La page demandée est introuvable.',
    };

    const isFr = language === 'fr';
    document.title = isFr ? metaInfo.fr : metaInfo.en;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', isFr ? metaInfo.descFr : metaInfo.descEn);
  }, [pathname, language]);

  return null;
}
