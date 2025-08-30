export interface Network {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
  coverage: NetworkCoverage;
  features: NetworkFeature[];
  isActive: boolean;
  priority: number; // ترتيب العرض
  createdAt: Date;
  updatedAt: Date;
}

export interface NetworkCoverage {
  countries: string[];
  cities: string[];
  coverageType: 'nationwide' | 'regional' | 'local';
  coveragePercentage: number; // نسبة التغطية
}

export interface NetworkFeature {
  id: string;
  name: string;
  description: string;
  icon?: string;
  isAvailable: boolean;
}

export interface NetworkStats {
  networkId: string;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  customerCount: number;
}

export interface CreateNetworkRequest {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
  coverage: NetworkCoverage;
  features: string[]; // IDs of features
  priority?: number;
}

export interface UpdateNetworkRequest {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  supportEmail?: string;
  supportPhone?: string;
  coverage?: Partial<NetworkCoverage>;
  features?: string[];
  priority?: number;
  isActive?: boolean;
}

export interface NetworkFilter {
  isActive?: boolean;
  coverageType?: 'nationwide' | 'regional' | 'local';
  countries?: string[];
  cities?: string[];
  hasFeatures?: string[]; // feature IDs
}

export interface NetworkSearchParams {
  query?: string;
  filters?: NetworkFilter;
  sort?: NetworkSort;
  page?: number;
  limit?: number;
}

export interface NetworkSort {
  field: 'name' | 'priority' | 'createdAt' | 'totalProducts';
  direction: 'asc' | 'desc';
}

export interface NetworkSearchResult {
  networks: Network[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NetworkComparison {
  networks: Network[];
  comparisonFields: string[];
  comparisonData: Record<string, any>;
}

export interface NetworkReview {
  id: string;
  networkId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  pros?: string[];
  cons?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNetworkReviewRequest {
  networkId: string;
  rating: number;
  comment?: string;
  pros?: string[];
  cons?: string[];
}

export interface NetworkWithStats extends Network {
  stats: NetworkStats;
  reviews: NetworkReview[];
  averageRating: number;
  reviewCount: number;
}

export interface NetworkFeature {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: 'basic' | 'premium' | 'enterprise';
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNetworkFeatureRequest {
  name: string;
  description: string;
  icon?: string;
  category: 'basic' | 'premium' | 'enterprise';
}

export interface UpdateNetworkFeatureRequest {
  name?: string;
  description?: string;
  icon?: string;
  category?: 'basic' | 'premium' | 'enterprise';
  isAvailable?: boolean;
}