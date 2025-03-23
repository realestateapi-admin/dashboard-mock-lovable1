
export interface PlanData {
  id: string;
  name: string;
  price: string;
  description: string;
  records: string;
  features: string[];
  popular?: boolean;
}

export interface AddOnData {
  id: string;
  name: string;
  description: string;
  prices: {
    [key: string]: string;
  };
}

export interface InvoiceData {
  id: string;
  date: string;
  amount: string;
  status: string;
  period: string;
}
