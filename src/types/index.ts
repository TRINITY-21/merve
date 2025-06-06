import { LocationData } from '../components/common/LocationPicker';

// Base interfaces
export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface ITransaction {
  id: string;
  type: 'Send Money' | 'Bill Payment' | 'Received' | 'Cash Out' | 'Top Up';
  amount: string;
  date: string;
}

export interface IUser {
  id: string;
  phone?: string;
  pin?: string;
  name: string;
  email?: string;
  transactions?: ITransaction[];
  avatar: string;
  isAgent?: boolean;
  agentId?: string;
}

export interface IAgent {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  distance: number;
  status: 'open' | 'closed';
  services: ('cash_in' | 'cash_out' | 'airtime' | 'bill_payment')[];
  provider: 'mtn' | 'vodafone' | 'airteltigo';
  rating: number;
  cashAvailable: boolean;
  networks?: string[];
  location?: ILocation;
  isOpen?: boolean;
  createdAt?: string;
}

export interface IMedia {
  uri: string;
  type: 'image' | 'video';
}

export interface IPostReactions {
  like: number;
  love?: number;
  helpful?: number;
}

export interface IPostUser {
  name: string;
  avatar: string;
}

export interface IReply {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface IComment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  replies: IReply[];
}

export interface IPost {
  id: string;
  userId: string;
  timestamp: string;
  text: string;
  media?: IMedia | null;
  likes: number;
  comments: number;
  reactions: IPostReactions;
  user: IPostUser;
  postType?: string;
}

// Activity related types
export interface IActivity {
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

export interface IActivitiesData {
  totalActivities: number;
  todayActivities: number;
  thisWeekActivities: number;
  activities: IActivity[];
}

// Vendor and business types
export interface IWeeklyData {
  day: string;
  cashIn: number;
  cashOut: number;
}

export interface IVendorStats {
  dailyCashIn: number;
  dailyCashOut: number;
  totalCustomers: number;
  averageTransaction: number;
  weeklyData: IWeeklyData[];
}

// Dashboard types
export interface IDashboardOverview {
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

export interface IDashboardTrends {
  views: number[];
  inquiries: number[];
  revenue: number[];
}

export interface ITopProduct {
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

export interface IProductCategory {
  name: string;
  count: number;
  views: number;
  color: string;
  percentage: number;
}

export interface IRecentActivity {
  id: number;
  type: 'inquiry' | 'view' | 'favorite' | 'visit';
  product: string;
  time: string;
  user: string;
}

export interface IGeographyData {
  region: string;
  products: number;
  views: number;
  inquiries: number;
  percentage: number;
}

export interface IDashboardData {
  overview: IDashboardOverview;
  trends: IDashboardTrends;
  topProducts: ITopProduct[];
  categories: IProductCategory[];
  recentActivity: IRecentActivity[];
  geography: IGeographyData[];
}

export interface IProduct {
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

// API Result types
export interface IAuthResult {
  success: boolean;
  error?: string;
}

export interface IPostResult {
  success: boolean;
  error?: string;
  post?: IPost;
}

export interface ICommentResult {
  success: boolean;
  error?: string;
  comment?: IComment;
}

export interface IReplyResult {
  success: boolean;
  error?: string;
  reply?: IReply;
}

// Input types for forms/registration
export interface IAgentRegistrationData {
  id?: string;
  name: string;
  address?: string;
  networks?: string[];
  services?: ('cash_in' | 'cash_out' | 'airtime' | 'bill_payment')[];
  location?: ILocation;
  isOpen?: boolean;
  provider?: 'mtn' | 'vodafone' | 'airteltigo';
}

export interface IPostData {
  text: string;
  media?: IMedia | null;
  postType?: string;
}

export interface IUserRegistrationData {
  name: string;
  phone: string;
  pin: string;
  email?: string;
}

export interface IUserUpdateData {
  name?: string;
  email?: string;
  avatar?: string;
}

// Store state interfaces
export interface IStoreState {
  // Auth state
  isAuthenticated: boolean;
  currentUser: IUser | null;

  // Users data
  users: IUser[];

  // User data (simplified, currentUser holds more detail)
  user: {
    name: string;
    isVendor: boolean;
  };

  // Agents
  agents: IAgent[];
  selectedAgent: IAgent | null;

  // Agent registration
  pendingAgent: IAgent | null;
  otp: string | null;

  // UI State
  isLoading: boolean;
  isVendor: boolean;

  // Posts and Comments State
  posts: IPost[];
  comments: Record<string, IComment[]>;
}

export interface IStoreActions {
  // Auth Actions
  login: (phone: string, pin: string) => IAuthResult;
  register: (userData: IUserRegistrationData) => IAuthResult;
  updateUser: (userData: IUserUpdateData) => void;
  logout: () => void;
  setAuthenticated: (authenticated: boolean) => void;

  // Agent Actions
  sendOTP: (phone: string) => IAuthResult;
  verifyOTP: (inputOTP: string) => IAuthResult;
  agentRegistration: (agentData: IAgentRegistrationData) => IAgent;
  updateAgent: (agentId: string, updates: Partial<IAgent>) => void;

  // Other Actions
  setSelectedAgent: (agent: IAgent | null) => void;
  toggleVendorMode: () => void;
  updateAgentStatus: (agentId: string, status: 'open' | 'closed') => void;

  // Post Actions
  createPost: (postData: IPostData) => IPostResult;
  addComment: (postId: string, commentText: string) => ICommentResult;
  addReply: (postId: string, parentCommentId: string, replyText: string) => IReplyResult;
  getUserById: (userId: string) => IUser | undefined;
}

export type IStore = IStoreState & IStoreActions;


// Intro Slider interfaces
export interface IIntroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').MaterialIcons.glyphMap;
  gradient: [string, string];
  pattern: 'circles' | 'waves' | 'dots';
}

export type TIntroSlides = IIntroSlide[];

export type AppStackParamList = {
  MainTabs: undefined;
  Auth: undefined;
  IntroSlider: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Map:undefined;
  Feed:undefined;
  Profile:undefined;
  PostDetailsScreen: { postId: string };
  ProductDetailsScreen: { productId: string };
  AgentsProfileScreen: { agentId?: string }

}


export type AuthStackParamList = {
    IntroSlider: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

export interface IFormData {
  name: string;
  phone: string;
  email: string;
  location: LocationData | null;
  pin: string;
  confirmPin: string;
}

export interface IRegisterData {
  name: string;
  phone: string;
  email: string;
  pin: string;
  location: LocationData | "";
}

export interface OTPVerificationProps {
  isVisible: boolean;
  phoneNumber: string;
  onClose: () => void;
  onVerifySuccess: (otp: string) => void;
  onResendOTP: () => void;
  loading?: boolean;
  error?: string;
}

export interface OTPVerificationRef {
  clearOTP: () => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

// Types
export interface IBaseNotification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
  actionType?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface IFollowNotification extends IBaseNotification {
  type: 'follow';
  avatar: string;
  userId: string;
  userName: string;
  userVerified: boolean;
}

export interface ITransactionNotification extends IBaseNotification {
  type: 'transaction';
  avatar: string;
  amount: number;
  transactionId: string;
  transactionType: 'credit' | 'debit';
}

export interface ISocialNotification extends IBaseNotification {
  type: 'like' | 'comment';
  avatar: string;
  postImage?: string;
  postTitle?: string;
  likesCount?: number;
  commentText?: string;
}

export interface ISystemNotification extends IBaseNotification {
  type: 'system' | 'security' | 'update' | 'promotion' | 'achievement';
  icon: string;
  discount?: string;
  validUntil?: string;
  location?: string;
  device?: string;
  achievementName?: string;
  rewardPoints?: number;
  version?: string;
  features?: string[];
}

export interface IAgentNotification extends IBaseNotification {
  type: 'agent';
  avatar: string;
  agentName: string;
  distance: string;
  rating: number;
}

export type INotification = 
  | IFollowNotification 
  | ITransactionNotification 
  | ISocialNotification 
  | ISystemNotification 
  | IAgentNotification;

export interface IFilterOption {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface INotificationGroup {
  today: INotification[];
  yesterday: INotification[];
  thisWeek: INotification[];
  older: INotification[];
}


