export interface Pricing {
  price: string;
  title: string;
  text: string;
  features: string[];
}

export interface IProduct {
  id: number;
  sitesCount: number;
  name: string;
  prices: IPrices[];
}

export interface IPrices {
  id: number;
  isActivate: boolean;
  productId: number;
  price: string;
}
