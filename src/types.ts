export const BRAND_LOGO_URL = '/assets/aistudio/image_f6d29c4f.png';

export type ProductCategory = 'tortas' | 'alfajores' | 'bocaditos' | 'salados';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  badge?: string;
  unit: string;
  imageUrl: string;
  portions?: string;
  featured?: boolean;
  averageRating?: number;
  ratingCount?: number;
}

export interface ProductRating {
  productId: string;
  rating: number; // 1 to 5 stars
  comment?: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  age: string;
}

export type MainViewTab = 'postres' | 'calificar' | 'cotizador' | 'contacto';
