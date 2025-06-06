import { Animated } from 'react-native';

// Core Data Types
export interface IProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  status: 'active' | 'draft' | 'paused' | 'out_of_stock';
  views: number;
  sales: number;
  revenue: number;
  favorites: number;
  stockCount: number;
  tags: string[];
  isPromoted: boolean;
  dateCreated: string;
  lastUpdated: string;
}

export interface IFilterOption {
  key: string;
  label: string;
  count: number;
}

export interface ISortOption {
  key: string;
  label: string;
  icon: string;
}

export interface IStatusOption {
  key: string;
  label: string;
  color: string;
  icon: string;
}

// Component Props Types
export interface IAgentProductsScreenProps {
  navigation?: any;
}

export interface IAgentProductsHeaderProps {
  navigation: any;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: IProduct[];
  scaleAnim: Animated.Value;
}

export interface IFilterChipsProps {
  filterOptions: IFilterOption[];
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

export interface IProductsToolbarProps {
  selectedProducts: string[];
  filteredProducts: IProduct[];
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onSortPress: () => void;
  onSelectAll: () => void;
  onBulkActions: () => void;
  onClearSelection: () => void;
}

export interface IProductCardProps {
  product: IProduct;
  viewMode: 'list' | 'grid';
  isSelected: boolean;
  showMenu: boolean;
  onPress: () => void;
  onLongPress: () => void;
  onMenuPress: () => void;
  onMenuAction: (action: string) => void;
  onSelectionToggle: () => void;
  fadeAnim: Animated.Value;
}

export interface IProductMenuProps {
  visible: boolean;
  viewMode: 'list' | 'grid';
  onAction: (action: string) => void;
}

export interface IEmptyStateProps {
  onAddProduct: () => void;
}

export interface ISortModalProps {
  visible: boolean;
  sortOptions: ISortOption[];
  selectedSort: string;
  onSelect: (sort: string) => void;
  onClose: () => void;
}

export interface IBulkActionsModalProps {
  visible: boolean;
  selectedCount: number;
  onAction: (action: string) => void;
  onClose: () => void;
}

export interface IStatusModalProps {
  visible: boolean;
  statusOptions: IStatusOption[];
  selectedProduct: IProduct | null;
  onStatusChange: (status: string) => void;
  onClose: () => void;
}

export interface IQuickStatsProps {
  products: IProduct[];
}

export interface ISearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface IViewToggleProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export interface IProductStatsProps {
  product: IProduct;
  variant?: 'normal' | 'small';
}

export interface IStatusBadgeProps {
  status: string;
  variant?: 'list' | 'grid';
}