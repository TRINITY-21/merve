// constants/SearchUsers.constants.ts

import { IFilterOption, ISortOption, IUser } from "../types/searchUsersTypes";

export const DUMMY_USERS: IUser[] = [
  { 
    id: 'f1', 
    name: 'Emma Wilson', 
    username: '@emmawilson', 
    avatar: 'https://i.pravatar.cc/150?img=19', 
    verified: true, 
    mutual: 12, 
    following: false,
    location: 'Accra, Ghana',
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
    name: 'James Miller', 
    username: '@jamesmiller', 
    avatar: 'https://i.pravatar.cc/150?img=22', 
    verified: false, 
    mutual: 8, 
    following: true,
    location: 'Kumasi, Ghana',
    bio: 'Photographer capturing life\'s moments 📸',
    followers: 1532,
    posts: 289,
    joinedDate: '2023-01-20',
    isOnline: false,
    lastSeen: '2 hours ago',
    interests: ['Photography', 'Art', 'Nature']
  },
  { 
    id: 'f3', 
    name: 'Sophie Chen', 
    username: '@sophiechen', 
    avatar: 'https://i.pravatar.cc/150?img=31', 
    verified: true, 
    mutual: 15, 
    following: false,
    location: 'Cape Coast, Ghana',
    bio: 'Food blogger & chef extraordinaire 👩‍🍳',
    followers: 5629,
    posts: 432,
    joinedDate: '2021-11-08',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Food', 'Cooking', 'Travel']
  },
  { 
    id: 'f4', 
    name: 'David Brown', 
    username: '@davidbrown', 
    avatar: 'https://i.pravatar.cc/150?img=14', 
    verified: false, 
    mutual: 3, 
    following: true,
    location: 'Tamale, Ghana',
    bio: 'Fitness coach helping you reach your goals 💪',
    followers: 892,
    posts: 178,
    joinedDate: '2023-05-12',
    isOnline: false,
    lastSeen: '1 day ago',
    interests: ['Fitness', 'Health', 'Sports']
  },
  { 
    id: 'f5', 
    name: 'Maria Garcia', 
    username: '@mariagarcia', 
    avatar: 'https://i.pravatar.cc/150?img=52', 
    verified: true, 
    mutual: 22, 
    following: false,
    location: 'Tema, Ghana',
    bio: 'Fashion designer & style influencer ✨',
    followers: 8347,
    posts: 621,
    joinedDate: '2021-07-22',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Fashion', 'Design', 'Art']
  },
  { 
    id: 'f6', 
    name: 'Alex Johnson', 
    username: '@alexjohnson', 
    avatar: 'https://i.pravatar.cc/150?img=16', 
    verified: false, 
    mutual: 5, 
    following: true,
    location: 'Ho, Ghana',
    bio: 'Music producer & sound engineer 🎵',
    followers: 1247,
    posts: 94,
    joinedDate: '2022-12-03',
    isOnline: false,
    lastSeen: '5 hours ago',
    interests: ['Music', 'Audio', 'Technology']
  },
  { 
    id: 'f7', 
    name: 'Sarah Ahmed', 
    username: '@sarahmed', 
    avatar: 'https://i.pravatar.cc/150?img=25', 
    verified: true, 
    mutual: 18, 
    following: false,
    location: 'Bolgatanga, Ghana',
    bio: 'Environmental activist & researcher 🌍',
    followers: 3456,
    posts: 267,
    joinedDate: '2022-09-14',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Environment', 'Research', 'Sustainability']
  },
  { 
    id: 'f8', 
    name: 'Michael Asante', 
    username: '@mikeasante', 
    avatar: 'https://i.pravatar.cc/150?img=33', 
    verified: false, 
    mutual: 7, 
    following: true,
    location: 'Sunyani, Ghana',
    bio: 'Software developer building the future 💻',
    followers: 2134,
    posts: 145,
    joinedDate: '2023-02-28',
    isOnline: false,
    lastSeen: '3 hours ago',
    interests: ['Programming', 'Technology', 'Innovation']
  },
  { 
    id: 'f9', 
    name: 'Grace Osei', 
    username: '@graceosei', 
    avatar: 'https://i.pravatar.cc/150?img=47', 
    verified: true, 
    mutual: 31, 
    following: false,
    location: 'Koforidua, Ghana',
    bio: 'Doctor & healthcare advocate 👩‍⚕️',
    followers: 6789,
    posts: 234,
    joinedDate: '2021-04-18',
    isOnline: true,
    lastSeen: 'Active now',
    interests: ['Healthcare', 'Medicine', 'Wellness']
  },
  { 
    id: 'f10', 
    name: 'Kwame Nkrumah', 
    username: '@kwamenk', 
    avatar: 'https://i.pravatar.cc/150?img=41', 
    verified: false, 
    mutual: 4, 
    following: true,
    location: 'Wa, Ghana',
    bio: 'History teacher & cultural enthusiast 📚',
    followers: 567,
    posts: 89,
    joinedDate: '2023-06-10',
    isOnline: false,
    lastSeen: '1 day ago',
    interests: ['History', 'Culture', 'Education']
  },
];

export const SORT_OPTIONS: ISortOption[] = [
  { key: 'name', label: 'Name', icon: 'sort-by-alpha' }, 
  { key: 'followers', label: 'Followers', icon: 'people' },
  { key: 'mutual', label: 'Mutual Pins', icon: 'group' },
  { key: 'joinedDate', label: 'Recently Joined', icon: 'schedule' },
  { key: 'location', label: 'Location', icon: 'location-on' },
];

export const FILTER_OPTIONS: IFilterOption[] = [
  { key: 'all', label: 'All Users', icon: 'people', color: '#9E9E9E' },
  { key: 'verified', label: 'Verified', icon: 'verified', color: '#00BFA5' },
  { key: 'following', label: 'Following', icon: 'person-add', color: '#4CAF50' },
  { key: 'followers', label: 'Followers', icon: 'group', color: '#FFCC00' },
];

export const INITIAL_RECENT_SEARCHES: string[] = ['@emmawilson', 'Accra', 'Sophie Chen'];

export const REFRESH_TIMEOUT = 2000;

export const MAX_RECENT_SEARCHES = 5;

