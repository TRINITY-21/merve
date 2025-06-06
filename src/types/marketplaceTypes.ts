// types/marketplace.ts

export interface IAgent {
  name: string;
  distance: number;
  rating: number;
  verified: boolean;
  location: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  agent: IAgent;
  inStock: boolean;
  stockCount: number;
  discount?: number;
  isPromoted: boolean;
  tags: string[];
  rating: number;
  reviews: number;
  lastUpdated: string;
}

export interface ICategory {
  key: string;
  label: string;
  icon: string;
  count: number;
}

export interface ISortOption {
  key: string;
  label: string;
  icon: string;
}

export interface ISelectedFilters {
  inStock: boolean;
  verified: boolean;
  openNow: boolean;
  ratings: number;
}

export interface IGhanaLocation {
  region: string;
  cities: string[];
}

export interface IMarketplaceHeaderProps {
  selectedLocation: string;
  showMap: boolean;
  searchQuery: string;
  radius: number;
  onLocationPress: () => void;
  onMapToggle: () => void;
  onSearchChange: (query: string) => void;
  onRadiusChange: (radius: number) => void;
  onBack: () => void;
  onFavoritesPress: () => void;
}

export interface ICategoriesSectionProps {
  categories: ICategory[];
  selectedCategory: string;
  onCategorySelect: (categoryKey: string) => void;
}

export interface IToolbarProps {
  resultCount: number;
  viewMode: 'grid' | 'list';
  onSortPress: () => void;
  onFilterPress: () => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export interface IProductCardProps {
  product: IProduct;
  viewMode: 'grid' | 'list';
  cardWidth?: number;
  onPress: (productId: string) => void;
  onFavoritePress?: (productId: string) => void;
  onSharePress?: (productId: string) => void;
}

export interface ISortModalProps {
  visible: boolean;
  sortOptions: ISortOption[];
  selectedSort: string;
  onClose: () => void;
  onSortSelect: (sortKey: string) => void;
}

export interface IFiltersPanelProps {
  visible: boolean;
  selectedFilters: ISelectedFilters;
  priceRange: [number, number];
  onClose: () => void;
  onFiltersChange: (filters: ISelectedFilters) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export interface ILocationModalProps {
  visible: boolean;
  locations: IGhanaLocation[];
  selectedLocation: string;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
}

export interface IMarketplaceScreenProps {
  navigation: any;
  route?: {
    params?: any;
  };
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'relevance' | 'distance' | 'price_low' | 'price_high' | 'rating' | 'newest';