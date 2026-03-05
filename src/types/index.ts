// ============================================================
// TypeScript types for Buscador de Repuestos Express
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  category?: Category;
  brand: string | null;
  compatible_models: string[];
  compatible_years: number[];
  price_usd: number;
  stock: number;
  sku: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Config {
  key: string;
  value: string;
  updated_at: string;
}

export interface SearchParams {
  q?: string;
  category?: string;
  model?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
