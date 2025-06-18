
export interface WizardStep {
  title: string;
  description: string;
  field: string;
}

export interface IndustryData {
  value: IndustryOption;
  name?: string;
}

export interface TeamData {
  action: TeamAction;
  teamName?: string;
}

export interface WizardData {
  industry: IndustryData | null;
  team: TeamData | null;
  volume: VolumeOption | null;
  referralSource: ReferralOption | null;
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

export type TeamAction = 
  | "create-team" 
  | "join-team";

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
  | "chat-gpt-perplexity"
  | "other";
