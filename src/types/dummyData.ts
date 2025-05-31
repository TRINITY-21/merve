// src/types/dummyData.ts

export interface DummyAgent {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  status: 'open' | 'closed';
  services: ('cash_in' | 'cash_out' | 'airtime' | 'bill_payment')[];
  provider: 'mtn' | 'vodafone' | 'airteltigo';
  rating: number;
  cashAvailable: boolean;
}

export interface Activity {
  id: string;
  type: 'transaction' | 'social' | 'account' | 'system' | 'agent' | 'achievement';
  category: 'financial' | 'social' | 'account' | 'system' | 'business' | 'gamification';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'new' | 'warning' | 'info' | 'achievement';
  icon: string;
  iconColor: string;
  
  // Transaction specific
  amount?: string;
  agent?: string;
  agentAvatar?: string;
  transactionId?: string;
  vendor?: string;
  billNumber?: string;
  phoneNumber?: string;
  transferId?: string;
  dataAmount?: string;
  recipient?: string;
  recipientAvatar?: string;
  
  // Social specific
  user?: string;
  userAvatar?: string;
  postId?: string;
  userId?: string;
  comment?: string;
  rating?: number;
  review?: string;
  shareCount?: number;
  
  // System specific
  device?: string;
  location?: string;
  version?: string;
  
  // Achievement specific
  badge?: string;
  milestone?: number;
}

export interface ActivitiesData {
  totalActivities: number;
  todayActivities: number;
  thisWeekActivities: number;
  activities: Activity[];
}

export interface WeeklyData {
  day: string;
  cashIn: number;
  cashOut: number;
}

export interface VendorStats {
  dailyCashIn: number;
  dailyCashOut: number;
  totalCustomers: number;
  averageTransaction: number;
  weeklyData: WeeklyData[];
}

export interface DashboardOverview {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalViews: number;
  totalInquiries: number;
  totalFavorites: number;
  agentVisits: number;
  conversionRate: number;
  averageViewTime: string;
  revenueThisMonth: number;
  growthRate: number;
}

export interface DashboardTrends {
  views: number[];
  inquiries: number[];
  revenue: number[];
}

export interface TopProduct {
  id: number;
  title: string;
  image: string;
  views: number;
  inquiries: number;
  favorites: number;
  price: number;
  status: 'active' | 'inactive' | 'draft';
  trend: number;
}

export interface ProductCategory {
  name: string;
  count: number;
  views: number;
  color: string;
  percentage: number;
}

export interface RecentActivity {
  id: number;
  type: 'inquiry' | 'view' | 'favorite' | 'visit';
  product: string;
  time: string;
  user: string;
}

export interface GeographyData {
  region: string;
  products: number;
  views: number;
  inquiries: number;
  percentage: number;
}

export interface DashboardData {
  overview: DashboardOverview;
  trends: DashboardTrends;
  topProducts: TopProduct[];
  categories: ProductCategory[];
  recentActivity: RecentActivity[];
  geography: GeographyData[];
}

export interface MockProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'phones' | 'accessories' | 'laptops' | 'furniture' | string;
  status: 'active' | 'out_of_stock' | 'draft' | 'paused';
  condition: 'new' | 'like-new' | 'used' | 'refurbished';
  stockCount: number;
  views: number;
  favorites: number;
  sales: number;
  revenue: number;
  rating: number;
  reviews: number;
  dateCreated: string;
  lastUpdated: string;
  isPromoted: boolean;
  isDraft: boolean;
  tags: string[];
}
