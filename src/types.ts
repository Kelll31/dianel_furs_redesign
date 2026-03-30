export interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  category: string;
  size: "small" | "medium" | "large";
  tags: string[];
  colors: string[];
  availableSizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface LookbookItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
}
