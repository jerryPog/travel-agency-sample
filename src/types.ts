export interface BannerConfig {
  navyTheme: 'midnight' | 'classic' | 'deep' | 'royal' | 'custom';
  customNavyColor: string;
  brandName: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  activeNav: string;
  cleanEnergyValue: string;
  cleanEnergyText: string;
  impactValue: string;
  impactText: string;
  fontFamily: 'sans' | 'jakarta' | 'dm';
  showCodeModal: boolean;
  isFullWidth: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
