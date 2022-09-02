export interface Pricing {
  price: string;
  title: string;
  text: string;
  features: string[];
}

export interface Prices {
  id: number;
  isActive: boolean;
  productId: number;
  price: string;
}

export interface Product {
  id: number;
  sitesCount: number;
  name: string;
  prices: Prices[];
}

export interface Code {
  id: number;
  code: string;
  origin: string | null;
  status: string;
  subscribeId: number;
  userId: number;
}

export interface Subscribe {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  product: Product;
  codes: Code[];
}
