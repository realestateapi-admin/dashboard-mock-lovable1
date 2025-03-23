
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

export const plans: PlanData[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$599",
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
    price: "$1,200",
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
    price: "$2,500",
    description: "For established companies with higher volume needs",
    records: "250,000",
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
    price: "$10,000",
    description: "For large organizations with complex needs",
    records: "5,000,000",
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
      "Saved Search"
    ],
  },
];

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
    billingType: 'subscription'
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
    billingType: 'metered'
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
    billingType: 'subscription'
  }
];
