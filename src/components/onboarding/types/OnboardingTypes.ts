
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
