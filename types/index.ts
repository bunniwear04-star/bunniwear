export interface ProductVariant {
  name: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
  basePrice: number;
  image: string;
  variants: ProductVariant[];
  features: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerInfo {
  name: string;
  company?: string;
  taxId?: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
}

export interface QuotationDetails {
  quoteNumber: string;
  date: string;
  validUntil: string;
  customer: CustomerInfo;
  includeVat: boolean;
  vatRate: number;
  discount: number;
}