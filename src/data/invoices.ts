
import { InvoiceData } from "@/types/billing";

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
