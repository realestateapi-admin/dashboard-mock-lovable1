
import { PlanData, AddOnData, InvoiceData } from "@/types/billing";

// Mock invoice data
export const invoices: InvoiceData[] = [
  {
    id: "INV-001",
    date: "Nov 1, 2023",
    amount: "$99.00",
    status: "Paid",
    period: "Nov 1 - Nov 30, 2023"
  },
  {
    id: "INV-002",
    date: "Dec 1, 2023",
    amount: "$99.00",
    status: "Paid",
    period: "Dec 1 - Dec 31, 2023"
  },
  {
    id: "INV-003",
    date: "Jan 1, 2024",
    amount: "$99.00",
    status: "Paid",
    period: "Jan 1 - Jan 31, 2024"
  },
  {
    id: "INV-004",
    date: "Feb 1, 2024",
    amount: "$99.00",
    status: "Pending",
    period: "Feb 1 - Feb 29, 2024"
  }
];

// All plans including the free plan and enterprise plan (used internally)
export const allPlans: PlanData[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Try our API before committing",
    records: "5,000",
    features: [
      "Auto-Complete (limited)",
      "Property Search (limited)",
      "Property Detail"
    ],
    isFree: true,
  },
  {
    id: "starter",
    name: "Starter",
    price: "$699",
    description: "Perfect for indie developers and startups",
    records: "30,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps"
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,500",
    description: "For growing companies and small teams",
    records: "150,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Mapping pins (unlimited)"
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$3,000",
    description: "For established companies with higher volume needs",
    records: "400,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Address Verification Bulk",
      "Mapping pins (unlimited)",
      "Saved Search"
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs",
    records: "5,000,000+",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Property Detail Bulk",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Address Verification Bulk",
      "Mapping pins (unlimited)",
      "Saved Search",
      "Custom API quotas",
      "Dedicated support team",
      "SLA guarantees"
    ],
  },
];

// Plans shown on the signup flow (excludes the free plan and enterprise plan)
export const signupPlans: PlanData[] = allPlans.filter(plan => plan.id !== "enterprise" && plan.id !== "free");

// Plans shown on the billing page (excludes the free plan)
export const plans: PlanData[] = allPlans.filter(plan => plan.id !== "free");

// Annual plan prices (used for the annual billing calculation)
export const annualPlanPrices = {
  starter: "$599",
  growth: "$1,200",
  pro: "$2,500"
};

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
    id: "tech-support",
    name: "Tech Support",
    description: "Premium technical support package",
    prices: {
      starter: "$250/month",
      growth: "Included",
      pro: "Included",
      enterprise: "Included",
    },
    billingType: 'subscription',
    category: 'Support'
  },
  {
    id: "skip-tracing",
    name: "Skip Tracing",
    description: "Locate contact information for property owners",
    prices: {
      starter: "$0.08 each",
      growth: "$0.08 each",
      pro: "$0.08 each",
      enterprise: "$0.08 each",
    },
    billingType: 'metered',
    category: 'Demographic Data'
  }
];
