
export type IndustryOption = "real-estate" | "proptech" | "fintech" | "home-services" | "lead-generation" | "e-commerce" | "other";
export type VolumeOption = "under-2k" | "2k-30k" | "30k-150k" | "150k-400k" | "400k-plus";
export type ReferralOption = "google" | "reddit" | "sourceforgeg2" | "podcast" | "industry-magazine" | "friend" | "other";

export interface WizardData {
  industry: IndustryOption | null;
  volume: VolumeOption | null;
  referralSource: ReferralOption | null;
}

export interface WizardStep {
  title: string;
  description: string;
  field: keyof WizardData;
}
