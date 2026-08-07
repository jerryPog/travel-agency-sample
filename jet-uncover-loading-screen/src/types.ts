export type JetLivery = 'pearl_gold' | 'stealth_black' | 'midnight_blue' | 'crimson_carbon';

export type UncoverStyle = 'direct_wipe' | 'cloud_part' | 'heat_distortion' | 'shockwave';

export interface LoaderConfig {
  duration: number; // in seconds, default 2.0
  jetLivery: JetLivery;
  uncoverStyle: UncoverStyle;
  enableSound: boolean;
  showContrails: boolean;
  showCloudEffects: boolean;
  customBrandName: string;
  customHeroTitle: string;
  customHeroSubtitle: string;
  customPrimaryColor: string;
}

export interface JetDetails {
  name: string;
  range: string;
  speed: string;
  passengers: number;
  hourlyRate: string;
  imageSeed: string;
}
