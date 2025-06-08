// TypeScript interfaces (keeping the same as before)
export interface IUser {
  name: string;
  phone: string;
  email: string;
}

export interface IBooking {
  id: string;
  agentName: string;
  serviceType: 'cash_out' | 'cash_in' | 'bill_payment' | 'airtime';
  amount: number;
  date: string;
  time: string;
  location: string;
  status: 'completed' | 'pending' | 'accepted' | 'cancelled' | 'declined';
  createdAt: string;
}

export interface IPhoto {
  id: string;
  uri: string;
  category: string;
  likes: number;
  date: string;
  title: string;
}

export interface IFollower {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  mutual: number;
  following: boolean;
  location: string;
  bio: string;
  followers: number;
  posts: number;
  joinedDate: string;
  isOnline: boolean;
  lastSeen: string;
  interests: string[];
}

export interface IFollowing {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  category: string;
  followers: string;
}

export interface IActivity {
  id: string;
  type: string;
  date: string;
  amount: string;
  icon: string;
  color: string;
  description: string;
  time: string;
}

export interface IInvite {
  id: string;
  phone: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined';
  sentDate: string;
}

export interface IProduct {
  id: string;
  title: string;
  agent: string;
  price: number;
  images: string[];
  viewedAt: string;
  inquired: boolean;
  favorited: boolean;
}

export interface ICategoryBreakdown {
  category: string;
  views: number;
  inquiries: number;
  percentage: number;
  color: string;
}

export interface ISearchHistory {
  term: string;
  searches: number;
  lastSearched: string;
}

export interface IMarketplaceData {
  monthlyStats: {
    productsViewed: number;
    inquiriesMade: number;
    favoriteProducts: number;
    agentsContacted: number;
    timeSpent: string;
    avgSessionTime: string;
    purchases: number;
  };
  categoryBreakdown: ICategoryBreakdown[];
  recentlyViewed: IProduct[];
  searchHistory: ISearchHistory[];
  recentActivity: {
    id: string;
    title: string;
    description: string;
    time: string;
    status: 'completed' | 'pending' | 'accepted' | 'cancelled' | 'declined';
  }[];
  recommendedProducts: IProduct[];
}

export interface IRoute {
  key: string;
  title: string;
}
