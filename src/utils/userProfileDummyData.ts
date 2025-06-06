import { colors } from "../constants/theme/colors";
import { IActivity, IBooking, IFollower, IFollowing, IInvite, IMarketplaceData, IPhoto } from "../types/userProfileTypes";
import { IAboutItem, IAccountSection, IQuickAction } from "../types/userSettingTypes";

// Dummy data (keeping the same as before)
export const dummyRecentBookings: IBooking[] = [
  {
    id: '1',
    agentName: 'Kwame\'s Mobile Money',
    serviceType: 'cash_out',
    amount: 500,
    date: '2025-05-28',
    time: '14:30',
    location: 'Nkrumah Circle',
    status: 'completed',
    createdAt: '2025-05-28T10:00:00Z',
  },
  {
    id: '2',
    agentName: 'Quick Cash Services',
    serviceType: 'cash_in',
    amount: 1000,
    date: '2025-05-29',
    time: '16:00',
    location: 'Accra, Tema Mall',
    status: 'pending',
    createdAt: '2025-05-27T15:30:00Z',
  },
  {
    id: '3',
    agentName: 'Omar Cash Services',
    serviceType: 'bill_payment',
    amount: 150,
    date: '2025-05-25',
    time: '11:00',
    location: 'Kaneshie Market',
    status: 'accepted',
    createdAt: '2025-05-23T09:15:00Z',
  },
];

export const dummyMarketplaceData: IMarketplaceData = {
  monthlyStats: {
    productsViewed: 127,
    inquiriesMade: 23,
    favoriteProducts: 45,
    agentsContacted: 12,
    timeSpent: '14h 32m',
    avgSessionTime: '12m 45s',
  },
  categoryBreakdown: [
    { category: 'Smartphones', views: 45, inquiries: 8, percentage: 35.4, color: colors.primary },
    { category: 'Laptops', views: 32, inquiries: 6, percentage: 25.2, color: colors.accent },
    { category: 'Tablets', views: 25, inquiries: 4, percentage: 19.7, color: colors.success },
    { category: 'Accessories', views: 15, inquiries: 3, percentage: 11.8, color: colors.warning },
    { category: 'Gaming', views: 10, inquiries: 2, percentage: 7.9, color: colors.error },
  ],
  recentlyViewed: [
    {
      id: 'p1',
      title: 'iPhone 13 Pro Max 256GB',
      agent: 'Kwame\'s Mobile Store',
      price: 3200,
      image: 'https://picsum.photos/100/100?random=10',
      viewedAt: '2 hours ago',
      inquired: true,
      favorited: true,
    },
    {
      id: 'p2', 
      title: 'Samsung Galaxy S24 Ultra',
      agent: 'Tech Hub Ghana',
      price: 2800,
      image: 'https://picsum.photos/100/100?random=11',
      viewedAt: '1 day ago',
      inquired: false,
      favorited: true,
    },
    {
      id: 'p3',
      title: 'MacBook Air M2 512GB', 
      agent: 'Digital Solutions',
      price: 4500,
      image: 'https://picsum.photos/100/100?random=12',
      viewedAt: '3 days ago',
      inquired: true,
      favorited: false,
    },
  ],
  searchHistory: [
    { term: 'iPhone 13', searches: 15, lastSearched: '2 hours ago' },
    { term: 'MacBook Air', searches: 8, lastSearched: '1 day ago' },
    { term: 'Samsung Galaxy', searches: 12, lastSearched: '2 days ago' },
    { term: 'iPad Pro', searches: 6, lastSearched: '4 days ago' },
    { term: 'AirPods', searches: 9, lastSearched: '1 week ago' },
  ],
};

export const dummyFollowers: IFollower[] = [
  { 
    id: 'f1', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=9', 
    verified: true, 
    mutual: 12, 
    following: true,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },
    { 
    id: 'f2', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=14', 
    verified: false, 
    mutual: 12, 
    following: false,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },  { 
    id: 'f3', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=11', 
    verified: true, 
    mutual: 12, 
    following: false,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: false,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },  { 
    id: 'f4', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=26', 
    verified: true, 
    mutual: 12, 
    following: false,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },  { 
    id: 'f5', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=19', 
    verified: true, 
    mutual: 12, 
    following: true,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },  { 
    id: 'f6', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=7', 
    verified: true, 
    mutual: 12, 
    following: false,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },  { 
    id: 'f7', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=6', 
    verified: true, 
    mutual: 12, 
    following: true,
    location: 'Accra, Tema',
    bio: 'Digital entrepreneur & tech enthusiast 🚀',
    followers: 2847,
    posts: 156,
    joinedDate: '2022-03-15',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Technology', 'Business', 'Travel'] 
  },
];

export const dummyFollowing: IFollowing[] = [
  { id: 'g1', name: 'Tech Insider', username: '@techinsider', avatar: 'https://i.pravatar.cc/150?img=7', verified: true, category: 'Accra, Tema', followers: '2.4M' },
  { id: 'g2', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Kumasi', followers: '1.8M' },
  { id: 'g3', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Accra', followers: '30M' },
  { id: 'g5', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Sunyani', followers: '1K' },
  { id: 'g6', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Volta', followers: '1.8M' },
  { id: 'g7', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Takoradi', followers: '1.8M' },
  { id: 'g8', name: 'Food Network', username: '@foodnetwork', avatar: 'https://i.pravatar.cc/150?img=8', verified: true, category: 'Accra', followers: '1.8M' },

];

export const dummyActivities: IActivity[] = [
  {  
    id: 'a1', 
    type: 'Follow', 
    date: '2025-05-24', 
    amount: '', 
    icon: 'star', 
    color: colors.warning,
    description: 'You followed @KwameIsHere',
    time: '10:30 AM'
  },
  { 
    id: 'a2', 
    type: 'Pin', 
    date: '2025-05-22', 
    amount: '', 
    icon: 'trending-up', 
    color: colors.success,
    description: 'You pinned @GodswayAgents222',
    time: '2:15 PM'
  },
    { 
    id: 'a3', 
    type: 'Saved', 
    date: '2025-05-22', 
    amount: '', 
    icon: 'save', 
    color: colors.success,
    description: 'You pinned @GodswayAgents222',
    time: '2:15 PM'
  },  { 
    id: 'a4', 
    type: 'shop', 
    date: '2025-05-22', 
    amount: '', 
    icon: 'shop', 
    color: colors.secondary,
    description: 'You pinned @GodswayAgents222',
    time: '2:15 PM'
  },  { 
    id: 'a5', 
    type: 'Following', 
    date: '2025-05-22', 
    amount: '', 
    icon: 'group', 
    color: colors.primary,
    description: 'You pinned @GodswayAgents222',
    time: '2:15 PM'
  },  { 
    id: 'a6', 
    type: 'Pin', 
    date: '2025-05-22', 
    amount: '', 
    icon: 'trending-up', 
    color: colors.success,
    description: 'You pinned @GodswayAgents222',
    time: '2:15 PM'
  },
];

export const dummyInvites: IInvite[] = [
  { id: 'inv1', phone: '+233 24 555 0001', name: 'John Doe', status: 'pending', sentDate: '2025-05-25' },
  { id: 'inv2', phone: '+233 24 555 0002', name: 'Jane Smith', status: 'accepted', sentDate: '2025-05-24' },
  { id: 'inv3', phone: '+233 24 555 0003', name: 'Mike Johnson', status: 'declined', sentDate: '2025-05-23' },
  { id: 'inv4', phone: '+233 24 555 0003', name: 'Kofi Johnson', status: 'declined', sentDate: '2025-05-23' },
  { id: 'inv5', phone: '+233 24 555 0003', name: 'John Johnson', status: 'declined', sentDate: '2025-05-23' },
  { id: 'inv6', phone: '+233 24 555 0003', name: 'Mike Johnson', status: 'declined', sentDate: '2025-05-23' },
  { id: 'inv7', phone: '+233 24 555 0003', name: 'Estel Johnson', status: 'accepted', sentDate: '2025-05-23' },

];

export const dummyPhotos: IPhoto[] = Array.from({ length: 15 }, (_, i) => ({
  id: `p${i + 1}`,
  uri: `https://picsum.photos/300/300?random=${i + 20}`,
  category: ['Nature', 'Urban', 'Portrait', 'Food', 'Travel'][i % 5],
  likes: Math.floor(Math.random() * 800) + 200,
  date: `2025-05-${Math.floor(Math.random() * 25) + 1}`,
  title: ['Sunset Views', 'City Life', 'Portrait Session', 'Food Art', 'Adventure'][i % 5]
}));



export const accountSections: IAccountSection[] = [
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      color: colors.secondary,
      expandable: true,
      items: [
        { id: 'account-info', title: 'Account Information', icon: 'person', action: 'navigate', screen: 'UserAccountInfo' },
        { id: 'security', title: 'Security & Privacy', icon: 'security', action: 'navigate', screen: 'Security', badge: 'New' },
        { id: 'payment-methods', title: 'Payment Methods', icon: 'payment', action: 'navigate', screen: 'PaymentMethods' },
        { id: 'preferences', title: 'App Preferences', icon: 'tune', action: 'navigate', screen: 'Preferences' },
        { id: 'language', title: 'Language & Region', icon: 'language', action: 'navigate', screen: 'Language', subtitle: 'English (Ghana)' },
        { id: 'backup', title: 'Backup & Sync', icon: 'backup', action: 'navigate', screen: 'Backup' },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications',
      color: colors.warning,
      expandable: true,
      items: [
        { id: 'push-notif', title: 'Push Notifications', icon: 'notifications-active', action: 'toggle', key: 'pushNotifications' },
        { id: 'email-notif', title: 'Email Notifications', icon: 'email', action: 'toggle', key: 'emailNotifications' },
        { id: 'sms-notif', title: 'SMS Notifications', icon: 'sms', action: 'toggle', key: 'smsNotifications' },
        { id: 'transaction-alerts', title: 'Transaction Alerts', icon: 'account-balance-wallet', action: 'toggle', key: 'transactionAlerts' },
        { id: 'social-updates', title: 'Social Updates', icon: 'people', action: 'toggle', key: 'socialUpdates' },
        { id: 'promo-offers', title: 'Promotional Offers', icon: 'local-offer', action: 'toggle', key: 'promotionalOffers' },
      ],
    },
    {
      id: 'agent',
      title: 'Agent Services', 
      icon: 'store',
      color: colors.accent,
      expandable: true,
      items: [
        { id: 'become-agent', title: 'Become an Agent', icon: 'business', action: 'navigate', screen: 'Vendor', highlight: true },
        { id: 'agent-dashboard', title: 'Agent Dashboard', icon: 'dashboard', action: 'navigate', screen: 'AgentDashboard' },
        { id: 'agent-earnings', title: 'Earnings & Reports', icon: 'assessment', action: 'navigate', screen: 'AgentEarnings' },
        { id: 'agent-support', title: 'Agent Support', icon: 'support-agent', action: 'navigate', screen: 'AgentSupport' },
        { id: 'commission-rates', title: 'Commission Rates', icon: 'trending-up', action: 'navigate', screen: 'CommissionRates' },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: 'privacy-tip',
      color: colors.error,
      expandable: true,
      items: [
        { id: 'profile-visibility', title: 'Profile Visibility', icon: 'visibility', action: 'toggle', key: 'profileVisibility' },
        { id: 'location-sharing', title: 'Location Sharing', icon: 'location-on', action: 'toggle', key: 'locationSharing' },
        { id: 'activity-status', title: 'Activity Status', icon: 'circle', action: 'toggle', key: 'activityStatus' },
        { id: 'contact-sync', title: 'Contact Sync', icon: 'contacts', action: 'toggle', key: 'contactSync' },
        { id: 'data-download', title: 'Download My Data', icon: 'download', action: 'navigate', screen: 'DataDownload' },
        { id: 'delete-account', title: 'Delete Account', icon: 'delete-forever', action: 'navigate', screen: 'DeleteAccount', warning: true },
      ],
    },
  ];

export const quickActions: IQuickAction[] = [
    { id: 'my-profile', title: 'My Profile', icon: 'person-outline', action: 'navigate', screen: 'UserProfile', color: colors.primary },
    { id: 'help-support', title: 'Help & Support', icon: 'help-outline', action: 'navigate', screen: 'Support', color: colors.accent },
    { id: 'rate-us', title: 'Rate Us', icon: 'star-outline', action: 'rate', color: colors.warning },
    { id: 'invite-friends', title: 'Invite Friends', icon: 'share', action: 'share', color: colors.success },
  ];

 export const aboutItems: IAboutItem[] = [
    { id: 'about-app', title: 'About App', icon: 'info-outline', action: 'navigate', screen: 'About', subtitle: 'Version 2.1.0' },
    { id: 'terms-service', title: 'Terms of Service', icon: 'description', action: 'navigate', screen: 'Terms' },
    { id: 'privacy-policy', title: 'Privacy Policy', icon: 'policy', action: 'navigate', screen: 'PrivacyPolicy' },
    { id: 'licenses', title: 'Open Source Licenses', icon: 'code', action: 'navigate', screen: 'Licenses' },
  ];