// TypeScript Interfaces
export interface IAgentLocation {
  address: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IAgentContact {
  phone: string;
  email: string;
  whatsapp: string;
}

export interface IAgentService {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  commission: string;
}

export interface IAgentStatistics {
  totalTransactions: number;
  totalVolume: string;
  monthlyEarnings: string;
  rating: number;
  totalReviews: number;
  profileViews: number;
  customerRetention: number;
  averageTransactionValue: string;
  followers: number;
  following: number;
  totalBookings: number;
}

export interface IFollower {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface IPendingInvite {
  id: string;
  phone: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined';
  sentDate: string;
}

export interface IRecentActivity {
  id: string;
  type: 'transaction' | 'review' | 'booking' | 'follow';
  title: string;
  amount?: string;
  customer: string;
  time: string;
  status?: string;
  transactionId?: string;
  rating?: number;
  comment?: string;
  action?: string;
}

export interface IReview {
  id: string;
  customer: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface IAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface IOperatingHours {
  [key: string]: {
    close: string;
    isClosed: boolean;
    open: string;
  };
}

export interface IAgentData {
  id: string;
  name: string;
  businessName: string;
  avatar: string;
  verified: boolean;
  agentCode: string;
  businessType: string;
  location: IAgentLocation;
  contact: IAgentContact;
  workingHours: { [key: string]: string };
  services: IAgentService[];
  statistics: IAgentStatistics;
  followers: IFollower[];
  pendingInvites: IPendingInvite[];
  recentActivities: IRecentActivity[];
  reviews: IReview[];
  about: string;
  achievements: IAchievement[];
  operatingHours: IOperatingHours;
  otp: string;
  phone: string;
  pin: string;
}

export interface IBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  amount: number;
  requestedDate: string;
  requestedTime: string;
  location: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  notes: string;
  urgency: 'normal' | 'high';
}

export interface IMarketplaceStats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalViews: number;
  totalInquiries: number;
  totalFavorites: number;
  customerReach: number;
  conversionRate: number;
  averageProductPrice: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface ICategoryBreakdown {
  category: string;
  count: number;
  views: number;
  inquiries: number;
  revenue: number;
  color: string;
}

export interface ITopProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  favorites: number;
  status: string;
  addedAt: string;
  trend: number;
}

export interface IRecentInquiry {
  id: string;
  customerName: string;
  productTitle: string;
  message: string;
  time: string;
  status: 'unread' | 'read' | 'replied';
  priority: 'normal' | 'high';
}

export interface ICustomerAnalytics {
  totalCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
  customerSatisfaction: number;
  repeatPurchaseRate: number;
}

export interface IMarketplaceData {
  monthlyStats: IMarketplaceStats;
  categoryBreakdown: ICategoryBreakdown[];
  topProducts: ITopProduct[];
  recentInquiries: IRecentInquiry[];
  customerAnalytics: ICustomerAnalytics;
}