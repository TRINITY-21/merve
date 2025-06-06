import { IAnalytics, IDuration, IPaymentMethod, IPromotionPlan } from "../types/promoteTypes";
import { IAgent, IReview } from "../types/reviewsTypes";

export const GHANA_LOCATIONS = {
  'Greater Accra': [
    'Accra', 'Tema', 'Kasoa', 'Madina', 'Adenta', 'Ashaiman', 'Teshie', 'Nungua',
    'Dansoman', 'Ablekuma', 'Ga East', 'Weija', 'Gbawe', 'Dome', 'Oyarifa'
  ],
  'Ashanti': [
    'Kumasi', 'Obuasi', 'Ejisu', 'Mampong', 'Konongo', 'Bekwai', 'Offinso',
    'Asante Mampong', 'Kuntanase', 'Juaso', 'Feyiase', 'Atwima Nwabiagya'
  ],
  'Western': [
    'Sekondi-Takoradi', 'Tarkwa', 'Prestea', 'Axim', 'Half Assini', 'Elubo',
    'Bogoso', 'Wassa Akropong', 'Dunkwa-on-Offin', 'Asankrangwa'
  ],
  'Central': [
    'Cape Coast', 'Winneba', 'Kasoa', 'Swedru', 'Elmina', 'Saltpond', 'Dunkwa',
    'Assin Fosu', 'Agona Swedru', 'Mankessim', 'Anomabo'
  ],
  'Volta': [
    'Ho', 'Keta', 'Aflao', 'Dzodze', 'Sogakope', 'Akatsi', 'Kpando', 'Hohoe',
    'Jasikan', 'Nkwanta', 'Kadjebi', 'Have'
  ],
  'Eastern': [
    'Koforidua', 'Akosombo', 'New Tafo', 'Akim Oda', 'Mpraeso', 'Begoro',
    'Somanya', 'Akropong', 'Asamankese', 'Kyebi', 'Abetifi'
  ],
  'Northern': [
    'Tamale', 'Yendi', 'Savelugu', 'Gushegu', 'Karaga', 'Tolon', 'Kumbungu',
    'Sagnarigu', 'Zabzugu', 'Tatale'
  ],
  'Upper East': [
    'Bolgatanga', 'Navrongo', 'Bawku', 'Paga', 'Zebilla', 'Sandema', 'Tongo',
    'Zuarungu', 'Garu', 'Tempane'
  ],
  'Upper West': [
    'Wa', 'Lawra', 'Jirapa', 'Tumu', 'Nadowli', 'Hamile', 'Kaleo', 'Funsi',
    'Sissala', 'Gwollu'
  ],
  'Brong-Ahafo': [
    'Sunyani', 'Techiman', 'Berekum', 'Dormaa Ahenkro', 'Nkoranza', 'Wenchi',
    'Kintampo', 'Atebubu', 'Sampa', 'Drobo'
  ],
  'Bono': [
    'Sunyani', 'Dormaa Ahenkro', 'Berekum', 'Wenchi', 'Drobo', 'Sampa',
    'Odumase', 'Nsawkaw', 'Yamfo', 'Suma Ahenkro'
  ],
  'Bono East': [
    'Techiman', 'Nkoranza', 'Kintampo', 'Atebubu', 'Yeji', 'Prang', 'Kwame Danso',
    'Kajaji', 'Jema', 'Tuobodom'
  ],
  'Ahafo': [
    'Goaso', 'Bechem', 'Kenyasi', 'Hwidiem', 'Kukuom', 'Mim', 'Acherensua',
    'Noberkaw', 'Sankore', 'Bomaa'
  ],
  'Oti': [
    'Dambai', 'Nkwanta', 'Kadjebi', 'Jasikan', 'Kete Krachi', 'Chinderi',
    'Worawora', 'Brewaniase', 'Papase', 'Santrokofi'
  ],
  'Savannah': [
    'Damongo', 'Bole', 'Sawla', 'Buipe', 'Yapei', 'Salaga', 'Bamboi',
    'Tuna', 'Larabanga', 'Banda Nkwanta'
  ],
  'North East': [
    'Nalerigu', 'Gambaga', 'Walewale', 'Chereponi', 'Yunyoo', 'Bunkpurugu',
    'Gushegu', 'Saboba', 'Wulensi', 'Karaga'
  ],
  'Western North': [
    'Wiawso', 'Sefwi Bekwai', 'Bibiani', 'Aowin', 'Juaboso', 'Bodi', 'Anhwiaso',
    'Akontombra', 'Enchi', 'Dadieso'
  ]
};



// constants/chatConstants.ts

export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  TYPING_DELAY: 1000,
  AGENT_RESPONSE_DELAY: 2000,
  VIBRATION_DURATION: 50,
  SWIPE_THRESHOLD: 50,
  SCROLL_THRESHOLD: 100,
} as const;

export const QUICK_REPLIES = [
  'Thanks! 👍',
  'Sure, I\'ll check',
  'Give me a moment',
  'Perfect!',
  'On my way',
] as const;

export const EMOJI_REACTIONS = [
  '❤️', 
  '👍', 
  '😂', 
  '😮', 
  '😢', 
  '🙏'
] as const;

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  VOICE: 'voice',
  FILE: 'file',
} as const;

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
} as const;

export const CHAT_COLORS = {
  USER_MESSAGE: '#FFCC00',
  AGENT_MESSAGE: 'rgba(255, 255, 255, 0.95)',
  BACKGROUND: ['#f5f7fa', '#c3cfe2'],
  HEADER: ['#FFCC00', '#FFB300'],
  PRIMARY: '#FFCC00',
  SECONDARY: '#1E3A5F',
  ACCENT: '#00BFA5',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#E0E0E0',
    MEDIUM: '#9E9E9E',
    DARK: '#616161',
  },
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
} as const;

export const ANIMATION_CONFIG = {
  SPRING: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  TIMING: {
    duration: 300,
  },
  FADE: {
    duration: 200,
  },
} as const;

export const KEYBOARD_CONFIG = {
  IOS_OFFSET: 90,
  ANDROID_OFFSET: 0,
} as const;



// constants/favoritesConstants.ts

export const FAVORITES_CONFIG = {
  GRID_COLUMNS: 2,
  CARD_MARGIN: 16,
  REFRESH_DELAY: 2000,
  ANIMATION_DURATION: 300,
  FILTER_SLIDE_DURATION: 300,
} as const;

export const SORT_OPTIONS = [
  { key: 'date_added', label: 'Recently Added', icon: 'schedule' },
  { key: 'price_low', label: 'Price: Low to High', icon: 'trending-up' },
  { key: 'price_high', label: 'Price: High to Low', icon: 'trending-down' },
  { key: 'rating', label: 'Highest Rated', icon: 'grade' },
  { key: 'distance', label: 'Nearest First', icon: 'location-on' },
  { key: 'name', label: 'Name A-Z', icon: 'sort-by-alpha' },
] as const;

export const CATEGORY_ICONS = {
  all: 'apps',
  phones: 'smartphone',
  accessories: 'headphones',
  laptops: 'laptop',
  furniture: 'chair',
  electronics: 'devices',
  clothing: 'checkroom',
  books: 'menu-book',
  sports: 'sports-soccer',
  beauty: 'spa',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export const FILTER_RATINGS = [4, 3, 2, 1] as const;

export const DEFAULT_FILTERS = {
  inStock: false,
  verified: false,
  ratings: 0,
} as const;

export const FAV_ANIMATION_CONFIG = {
  FADE: {
    duration: 800,
    useNativeDriver: true,
  },
  SLIDE: {
    tension: 20,
    friction: 7,
    useNativeDriver: true,
  },
  SCALE: {
    tension: 25,
    friction: 8,
    useNativeDriver: true,
  },
  FILTER_SLIDE: {
    duration: 300,
    useNativeDriver: true,
  },
} as const;

export const FAVORITES_COLORS = {
  PRIMARY: '#FFCC00',
  SECONDARY: '#1E3A5F',
  ACCENT: '#00BFA5',
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#E0E0E0',
    MEDIUM: '#9E9E9E',
    DARK: '#616161',
  },
  BACKGROUND: '#F5F5F5',
  CARD: '#FFFFFF',
  SHADOW: {
    LIGHT: 'rgba(0, 0, 0, 0.1)',
    MEDIUM: 'rgba(0, 0, 0, 0.2)',
    DARK: 'rgba(0, 0, 0, 0.3)',
  },
} as const;








// constants/followersConstants.ts

export const FOLLOWERS_CONFIG = {
  REFRESH_DELAY: 2000,
  ANIMATION_DURATION: 1000,
  TAB_ANIMATION_TENSION: 20,
  TAB_ANIMATION_FRICTION: 7,
  HEADER_ANIMATION_TENSION: 25,
  HEADER_ANIMATION_FRICTION: 8,
} as const;

export const ENGAGEMENT_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export const USER_TYPES = {
  USER: 'user',
  AGENT: 'agent',
} as const;

export const TAB_TYPES = {
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
} as const;

export const FILTER_KEYS = {
  ALL: 'all',
  FOLLOWING_BACK: 'following_back',
  NOT_FOLLOWING_BACK: 'not_following_back',
  VERIFIED: 'verified',
  CUSTOMERS: 'customers',
  VIP: 'vip',
  NEW: 'new',
  INACTIVE: 'inactive',
  AGENTS: 'agents',
  TOP_RATED: 'top_rated',
  NEARBY: 'nearby',
  AVAILABLE: 'available',
  FAVORITE: 'favorite',
} as const;

export const ACTION_TYPES = {
  FOLLOW_BACK: 'follow_back',
  UNFOLLOW: 'unfollow',
  REMOVE: 'remove',
  BLOCK: 'block',
  VIEW_PROFILE: 'view_profile',
  MESSAGE: 'message',
  CALL: 'call',
  DIRECTIONS: 'directions',
  FAVORITE: 'favorite',
  NOTIFY: 'notify',
} as const;

export const BULK_ACTIONS = {
  FOLLOWERS: [
    { action: 'Follow Back', icon: 'person-add' },
    { action: 'Remove', icon: 'person-remove' },
    { action: 'Block', icon: 'block' },
  ],
  FOLLOWING: [
    { action: 'Unfollow', icon: 'person-remove' },
    { action: 'Add to Favorites', icon: 'favorite' },
    { action: 'Notify', icon: 'notifications' },
  ],
} as const;

export const RATING_COLORS = {
  EXCELLENT: '#4CAF50', // 4.5+
  GOOD: '#FFCC00',      // 4.0+
  FAIR: '#FF9800',      // 3.5+
  POOR: '#F44336',      // Below 3.5
} as const;

export const ENGAGEMENT_COLORS = {
  HIGH: '#4CAF50',
  MEDIUM: '#FF9800',
  LOW: '#F44336',
} as const;

export const FOLLOWERS_COLORS = {
  PRIMARY: '#FFCC00',
  SECONDARY: '#1E3A5F',
  ACCENT: '#00BFA5',
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: {
    LIGHT: '#E0E0E0',
    MEDIUM: '#9E9E9E',
    DARK: '#616161',
  },
  BACKGROUND: '#F5F5F5',
  CARD: '#FFFFFF',
  SHADOW: {
    LIGHT: 'rgba(0, 0, 0, 0.1)',
    MEDIUM: 'rgba(0, 0, 0, 0.2)',
    DARK: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

export const FOLLOWER_ANIMATION_CONFIG = {
  FADE: {
    duration: 1000,
    useNativeDriver: true,
  },
  SLIDE: {
    tension: 20,
    friction: 7,
    useNativeDriver: true,
  },
  SCALE: {
    tension: 25,
    friction: 8,
    useNativeDriver: true,
  },
  TAB_SLIDE: {
    tension: 20,
    friction: 7,
    useNativeDriver: true,
  },
} as const;



// constants/PromoteProduct.constants.ts

export const PROMOTION_PLANS: IPromotionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    icon: 'trending-up',
    color: '#00BFA5',
    description: 'Get your product noticed with basic promotion',
    features: [
      'Featured in search results',
      '2x more visibility',
      'Priority in category listings',
      'Basic analytics dashboard'
    ],
    pricing: {
      7: 15,
      14: 25,
      30: 45
    },
    estimatedViews: {
      7: '500-800',
      14: '1,200-2,000',
      30: '3,000-5,000'
    },
    badge: null
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    icon: 'star',
    color: '#FF9800',
    description: 'Maximum exposure with premium placement',
    features: [
      'Homepage featured section',
      '5x more visibility',
      'Push notifications to interested users',
      'Advanced analytics & insights',
      'Social media cross-promotion',
      'Priority customer support'
    ],
    pricing: {
      7: 35,
      14: 60,
      30: 100
    },
    estimatedViews: {
      7: '1,500-2,500',
      14: '3,500-6,000',
      30: '8,000-15,000'
    },
    badge: 'Most Popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plus',
    icon: 'business-center',
    color: '#FFCC00',
    description: 'Complete marketing solution for serious sellers',
    features: [
      'All Premium features',
      '10x more visibility',
      'Dedicated account manager',
      'Custom promotion campaigns',
      'Multi-platform advertising',
      'Professional photography service',
      'SEO optimization',
      'Performance guarantee'
    ],
    pricing: {
      7: 75,
      14: 130,
      30: 220
    },
    estimatedViews: {
      7: '3,000-5,000',
      14: '7,000-12,000',
      30: '20,000-35,000'
    },
    badge: 'Best Value'
  }
];

export const DURATIONS: IDuration[] = [
  { days: 7, label: '1 Week', discount: 0 },
  { days: 14, label: '2 Weeks', discount: 10 },
  { days: 30, label: '1 Month', discount: 20 }
];

export const PAYMENT_METHODS: IPaymentMethod[] = [
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: 'phone-android',
    description: 'MTN, Vodafone, AirtelTigo',
    popular: true
  },
  {
    id: 'bank_card',
    name: 'Bank Card',
    icon: 'credit-card',
    description: 'Visa, Mastercard, Verve',
    popular: false
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: 'account-balance',
    description: 'Direct bank transfer',
    popular: false
  },
  {
    id: 'wallet',
    name: 'Wallet Balance',
    icon: 'account-balance-wallet',
    description: 'Use your wallet balance',
    popular: false
  }
];

export const MOCK_ANALYTICS: IAnalytics = {
  currentPeriod: {
    views: 247,
    saves: 18,
    inquiries: 12,
    shares: 5
  },
  projected: {
    views: 1850,
    saves: 128,
    inquiries: 89,
    shares: 35
  }
};

// Step constants
export const STEPS = {
  PLAN_SELECTION: 1,
  DURATION_SELECTION: 2,
  REVIEW_CONFIRM: 3
} as const;

// Visibility multipliers
export const VISIBILITY_MULTIPLIERS = {
  basic: '2x',
  premium: '5x',
  enterprise: '10x'
} as const;



// constants/Reviews.constants.ts

export const FIXED_AGENT_TO_REVIEW: IAgent= {
  id: 'fixed_agent_001',
  name: 'Main Branch Agent',
  type: 'Agent',
  avatar: 'https://i.pravatar.cc/150?img=30'
};

export const INITIAL_RECEIVED_REVIEWS: IReview[] = [
  {
    id: 'rev1',
    reviewerName: 'Kwame Mensah',
    reviewerType: 'User',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    comment: 'Excellent service! Very professional and helpful with my cash-out. The agent was quick, courteous, and made the entire process seamless. Highly recommend!',
    date: '2025-05-25',
    verified: true,
    entityType: 'Agent',
    reply: null,
    helpfulCount: 12,
    notHelpfulCount: 1
  },
  {
    id: 'rev2',
    reviewerName: 'Ama Boateng',
    reviewerType: 'User',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4,
    comment: 'Good overall, but transaction was a bit slow during peak hours. The service quality is decent though.',
    date: '2025-05-23',
    verified: true,
    entityType: 'Agent',
    reply: {
      agentName: 'Your Business Name',
      date: '2025-05-24',
      comment: 'Apologies for the delay during peak hours. We are working to improve our service speed. Thank you for your feedback!'
    },
    helpfulCount: 8,
    notHelpfulCount: 2
  },
  {
    id: 'rev3',
    reviewerName: 'John Doe',
    reviewerType: 'User',
    avatar: 'https://i.pravatar.cc/150?img=13',
    rating: 3,
    comment: 'Customer service was okay, but I had to wait a while for assistance. Could be better.',
    date: '2025-05-20',
    verified: false,
    entityType: 'Agent',
    reply: null,
    helpfulCount: 5,
    notHelpfulCount: 4
  },
];

export const INITIAL_GIVEN_REVIEWS: IReview[] = [
  {
    id: 'giv1',
    reviewedName: 'QuickPay Agent (Accra Mall)',
    reviewedType: 'Agent',
    avatar: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    comment: 'Super fast and friendly service! Always my go-to for transactions.',
    date: '2025-05-18',
    verified: true,
    entityId: 'agent_quickpay',
    reply: {
      agentName: 'QuickPay Agent',
      date: '2025-05-19',
      comment: 'Thank you for your kind words! We appreciate your business.'
    },
    helpfulCount: 15,
    notHelpfulCount: 0
  },
];

export const REFRESH_TIMEOUT = 2000;



