import { colors } from "../constants/theme/colors";
import { IActivity, IBooking, IFollower, IFollowing, IInvite, IMarketplaceData, IPhoto } from "../types/userProfileTypes";

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