
import { PlanData } from "@/types/billing";

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
