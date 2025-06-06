import { Animated } from 'react-native';

// Dashboard Types
export interface IDashboardData {
  overview: IOverviewData;
  categories: ICategory[];
  recentActivity: IActivity[];
  topProducts: IProduct[];
  trends: ITrends;
}

export interface IOverviewData {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalViews: number;
  totalInquiries: number;
  agentVisits: number;
}

export interface ICategory {
  name: string;
  count: number;
  views: number;
  percentage: number;
  color: string;
}

export interface IActivity {
  id: number;
  type: 'inquiry' | 'view' | 'favorite' | 'visit';
  user: string;
  product: string;
  time: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  favorites: number;
  trend: number;
}

export interface ITrends {
  views: number[];
  revenue?: number[];
}

// Component Props Types
export interface ITimeframe {
  key: string;
  label: string;
  value: string;
}

export interface ITab {
  key: string;
  label: string;
  icon: string;
}

export interface IMetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: string;
  color?: string;
  onPress?: () => void;
}

export interface IProductItemProps {
  item: IProduct;
  navigation: any;
}

export interface IActivityItemProps {
  item: IActivity;
}

export interface ICollapsibleHeaderProps {
  scrollY: Animated.Value;
  navigation: any;
  dashboardData: IDashboardData;
  selectedTimeframe: string;
  timeframes: ITimeframe[];
  setShowTimeframeModal: (show: boolean) => void;
  headerHeight: any;
  HEADER_MAX_HEIGHT: number;
  HEADER_MIN_HEIGHT: number;
  HEADER_SCROLL_DISTANCE: number;
}

export interface IDashboardTabsProps {
  headerHeight: any;
  tabs: ITab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface ITimeframeModalProps {
  visible: boolean;
  timeframes: ITimeframe[];
  selectedTimeframe: string;
  onSelect: (timeframe: string) => void;
  onClose: () => void;
}

export interface IOverviewTabProps {
  dashboardData: IDashboardData;
}

export interface IProductsTabProps {
  dashboardData: IDashboardData;
  navigation: any;
}

export interface IDashboardProps {
  navigation: any;
}

// Analytics Types
export interface IRegionData {
  region: string;
  products: number;
  views: number;
  inquiries: number;
  percentage: number;
}

// Insights Types
export interface IRecommendation {
  id: number;
  icon: string;
  title: string;
  description: string;
  actionText: string;
  color: string;
}

export interface IMarketTrend {
  id: number;
  icon: string;
  text: string;
  trendIcon: string;
  trendColor: string;
}

export interface IScoreItem {
  icon: string;
  text: string;
  type: 'success' | 'warning' | 'error';
}