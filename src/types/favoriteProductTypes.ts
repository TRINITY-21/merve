// types/favoritesInterfaces.ts
import { Animated } from 'react-native';

export interface IFavoriteProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  agent: IProductAgent;
  inStock: boolean;
  stockCount: number;
  discount?: number;
  isPromoted: boolean;
  tags: string[];
  rating: number;
  reviews: number;
  dateAdded: string;
  lastUpdated: string;
}

export interface IProductAgent {
  name: string;
  distance: number;
  rating: number;
  verified: boolean;
  location: string;
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

export interface IFilters {
  inStock: boolean;
  verified: boolean;
  ratings: number;
}

export interface IFavoritesHeaderProps {
  favoriteProducts: IFavoriteProduct[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBack: () => void;
  onClearAll: () => void;
}

export interface ICategoriesFilterProps {
  categories: ICategory[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface IToolbarProps {
  filteredCount: number;
  onSortPress: () => void;
  onFilterPress: () => void;
}

export interface IProductCardProps {
  product: IFavoriteProduct;
  index?: number;
  cardWidth?: number;
  onRemoveFavorite: (productId: string) => void;
  onProductPress: (productId: string) => void;
  fadeAnim?: Animated.Value; // Made optional since each card creates its own
  scrollY?: Animated.Value;
}

export interface ISortModalProps {
  visible: boolean;
  sortOptions: ISortOption[];
  selectedSort: string;
  onSortSelect: (sortKey: string) => void;
  onClose: () => void;
}

export interface IFiltersPanelProps {
  visible: boolean;
  filters: IFilters;
  onFiltersChange: (filters: IFilters) => void;
  onClose: () => void;
}

export interface IEmptyStateProps {
  onBrowsePress: () => void;
}

export interface IProductBadgesProps {
  product: IFavoriteProduct;
}

export interface IProductInfoProps {
  product: IFavoriteProduct;
}

export interface IQuickActionsProps {
  productId: string;
  onRemoveFavorite: (productId: string) => void;
  onShare: (productId: string) => void;
}

export interface IRatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export interface IStatsDisplayProps {
  totalItems: number;
  inStockItems: number;
  onSaleItems: number;
}

export interface IFilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface IQuickFilterProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export interface IRatingFilterProps {
  rating: number;
  isActive: boolean;
  onPress: () => void;
}

export interface IFavoritesScreenProps {
  navigation: any;
}

export type TSortKey = 'date_added' | 'price_low' | 'price_high' | 'rating' | 'distance' | 'name';
export type TCategoryKey = 'all' | 'phones' | 'accessories' | 'laptops' | 'furniture';

export interface IAnimationConfig {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  scaleAnim: Animated.Value;
  filterSlideAnim: Animated.Value;
}