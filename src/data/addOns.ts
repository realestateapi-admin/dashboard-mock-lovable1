

import { AddOnData } from "@/types/billing";

export const addOns: AddOnData[] = [
  {
    id: "premium-avm",
    name: "Premium AVM",
    description: "Advanced automated valuation model for more accurate property estimates",
    prices: {
      starter: "$250",
      growth: "$500",
      pro: "$1,000",
      enterprise: "$2,500",
    },
    billingType: 'subscription',
    category: 'Property Data'
  },
  {
    id: "lien-search",
    name: "Involuntary Lien Search",
    description: "Search for liens against properties",
    prices: {
      starter: "$1 each",
      growth: "$0.75 each",
      pro: "$0.50 each",
      enterprise: "$0.40 each",
    },
    billingType: 'metered',
    category: 'Property Data'
  },
  {
    id: "mls-data",
    name: "MLS Data Access",
    description: "Access to real-time Multiple Listing Service data for your region",
    prices: {
      starter: "Contact Sales",
      growth: "Contact Sales",
      pro: "Contact Sales",
      enterprise: "Contact Sales",
    },
    billingType: 'subscription',
    category: 'Property Data',
    requiresApproval: true
  },
  {
    id: "skip-tracing",
    name: "Skip Tracing",
    description: "Locate contact information for property owners",
    prices: {
      starter: "$0.05 each",
      growth: "$0.05 each",
      pro: "$0.05 each",
      enterprise: "$0.05 each",
    },
    billingType: 'metered',
    category: 'Demographic Data'
  }
];

