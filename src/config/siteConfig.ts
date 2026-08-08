export const siteConfig = {
  brandName: 'Paris Travel Co.',
  tagline: 'Discover Paris, Beyond the Postcard',
  description:
    'Handcrafted Paris journeys — from iconic landmarks to hidden corners only locals know.',
  founder: {
    name: 'Ronak Jain R',
    role: 'Founder & Travel Consultant',
    email: 'ronakj303@gmail.com',
    initials: 'RJ',
    quote:
      'Our mission is to help you experience Paris as a local with custom routes and 24/7 support.',
  },
  contact: {
    email: 'ronakj303@gmail.com',
    whatsappNumber: '917892145475',
    whatsappFormatted: '+91 78921 45475',
    responseTime: 'We respond within 24 hours.',
    location: 'Paris, France',
  },
  domain: {
    url: 'https://paris-travel-co.vercel.app',
  },
  meta: {
    title: 'Paris Travel Co. | Handcrafted Paris Experiences & Bespoke Luxury Tours',
    description:
      'Plan your dream Paris vacation with personalized itineraries, skip-the-line museum passes, private Seine cruises, and 24/7 local concierge support.',
    keywords:
      'Paris travel, Paris itinerary planner, Eiffel tower tours, Louvre skip the line, Marais walking tour, Paris local guide, luxury Paris travel',
  },
} as const;

export type SiteConfig = typeof siteConfig;
