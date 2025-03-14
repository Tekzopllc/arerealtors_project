export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PropertyFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  price: string;
  description: string;
}

export interface SubmittedData {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  propertytype: string | null;
  budget: string | null;
  timeframe: string | null;
  transactionType: string | null;
}