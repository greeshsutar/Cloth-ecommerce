export interface ColorOption {
  name: string;
  hex: string;
}

export type DressSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  tag?: string;
  overline?: string;
  price: number;
  mrp: number;
  category: 'Gowns' | 'Dresses' | 'Ethnic' | 'Occasion' | 'Bridal';
  occasion: 'Wedding & Bridal' | 'Evening Soirée' | 'Casual Resort' | 'Festive Ethnic';
  fabric: string;
  description: string;
  details: string[];
  care: string;
  sizes: DressSize[];
  colors: ColorOption[];
  images: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  accentColor?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: DressSize;
  selectedColor: ColorOption;
  quantity: number;
}

export interface ShowcaseLook {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  mrp: number;
  fabric: string;
  description: string;
  accentColor: string;
  accentBg: string;
  image: string;
  secondaryImage: string;
  sizes: DressSize[];
  colors: ColorOption[];
  productRefId: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  count: string;
  category: string;
  span?: string;
}

export interface LookbookImage {
  id: string;
  title: string;
  caption: string;
  image: string;
  aspect: string;
  season: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  dressPurchased: string;
  avatar: string;
  silhouette: string;
}
