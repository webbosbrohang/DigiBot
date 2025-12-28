
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
}

export type FilterType = string;
