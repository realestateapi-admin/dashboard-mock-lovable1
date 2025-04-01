
export interface WizardStep {
  title: string;
  description: string;
  field: string;
}

export interface WizardData {
  industry: string | null;
  volume: string | null;
  referralSource: string | null;
  creditCardInfo: any | null;
}

// Define the specific string literal types for each option
export type IndustryOption = 
  | "real-estate" 
  | "proptech" 
  | "fintech" 
  | "home-services" 
  | "lead-generation" 
  | "e-commerce" 
  | "other";

export type VolumeOption = 
  | "under-2k" 
  | "2k-30k" 
  | "30k-150k" 
  | "150k-400k" 
  | "400k-plus";

export type ReferralOption = 
  | "google" 
  | "reddit" 
  | "sourceforgeg2" 
  | "podcast" 
  | "industry-magazine" 
  | "friend" 
  | "other";
