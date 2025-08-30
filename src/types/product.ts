export interface Network {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  networkId: string;
  network: Network;
  price: number;
  duration: number; // المدة بالأيام
  dataLimit?: string; // حد البيانات (مثل "غير محدود" أو "10GB")
  features: string[]; // المميزات
  isActive: boolean;
  stock: number; // المخزون المتاح
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  products: Product[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  networkId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  dataLimit?: string;
  isActive?: boolean;
}

export interface ProductSort {
  field: 'price' | 'duration' | 'createdAt' | 'name';
  direction: 'asc' | 'desc';
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  networkId: string;
  price: number;
  duration: number;
  dataLimit?: string;
  features: string[];
  stock: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  networkId?: string;
  price?: number;
  duration?: number;
  dataLimit?: string;
  features?: string[];
  stock?: number;
  isActive?: boolean;
}

export interface ProductSearchParams {
  query?: string;
  filters?: ProductFilter;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductReviewRequest {
  productId: string;
  rating: number;
  comment?: string;
}

export interface ProductWithReviews extends Product {
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
}