// types/followersInterfaces.ts
import { Animated } from 'react-native';

export interface IFollower {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  isFollowingBack: boolean;
  followedDate: string;
  lastActive: string;
  transactionHistory: number;
  totalSpent: string;
  location: string;
  mutualFollowers: number;
  engagement: 'high' | 'medium' | 'low';
  tags?: string[];
  phone: string;
  email: string;
  type: 'user';
}

export interface IAgent {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  isAgent: boolean;
  followedDate: string;
  lastActive: string;
  businessType: string;
  location: string;
  rating: number;
  totalTransactions: number;
  services: string[];
  workingHours: string;
  tags?: string[];
  phone: string;
  email: string;
  type: 'agent';
  agentCode: string;
}

export interface IFollowersData {
  totalFollowers: number;
  newThisWeek: number;
  activeFollowers: number;
  mutualConnections: number;
  followers: IFollower[];
}

export interface IFollowingData {
  totalFollowing: number;
  newThisWeek: number;
  activeAgents: number;
  verifiedAgents: number;
  following: IAgent[];
}

export interface IFilterOption {
  key: string;
  label: string;
  count: number;
}

export interface IFollowersHeaderProps {
  activeTab: TTabType;
  searchQuery: string;
  isSelectionMode: boolean;
  followersData: IFollowersData;
  followingData: IFollowingData;
  onBack: () => void;
  onTabChange: (tab: TTabType) => void;
  onSearchChange: (query: string) => void;
  onSelectionModeToggle: () => void;
  onFilterPress: () => void;
  headerScaleAnim: Animated.Value;
}

export interface ITabSelectorProps {
  activeTab: TTabType;
  followersCount: number;
  followingCount: number;
  onTabChange: (tab: TTabType) => void;
}

export interface IStatsRowProps {
  activeTab: TTabType;
  followersData: IFollowersData;
  followingData: IFollowingData;
}

export interface IFilterChipsProps {
  selectedFilter: string;
  filterOptions: IFilterOption[];
  onFilterSelect: (filter: string) => void;
}

export interface IBulkActionsProps {
  isVisible: boolean;
  selectedCount: number;
  activeTab: TTabType;
  onBulkAction: (action: string) => void;
}

export interface IFollowerCardProps {
  follower: IFollower;
  isSelectionMode: boolean;
  isSelected: boolean;
  onPress: () => void;
  onSelect: () => void;
  onFollowBack: () => void;
  onMessage: () => void;
  onMore: () => void;
  fadeAnim: Animated.Value;
}

export interface IAgentCardProps {
  agent: IAgent;
  isSelectionMode: boolean;
  isSelected: boolean;
  onPress: () => void;
  onSelect: () => void;
  onUnfollow: () => void;
  onMessage: () => void;
  onMore: () => void;
  fadeAnim: Animated.Value;
}

export interface IUserCardProps {
  item: IFollower | IAgent;
  isSelectionMode: boolean;
  isSelected: boolean;
  activeTab: TTabType;
  onPress: () => void;
  onSelect: () => void;
  onAction: (action: string) => void;
  onMessage: () => void;
  onMore: () => void;
  fadeAnim: Animated.Value;
}

export interface IFilterModalProps {
  visible: boolean;
  activeTab: TTabType;
  selectedFilter: string;
  filterOptions: IFilterOption[];
  onClose: () => void;
  onFilterSelect: (filter: string) => void;
}

export interface IEmptyStateProps {
  activeTab: TTabType;
  searchQuery: string;
}

export interface IEngagementIndicatorProps {
  engagement: 'high' | 'medium' | 'low';
}

export interface IRatingIndicatorProps {
  rating: number;
}

export interface IUserStatsProps {
  item: IFollower | IAgent;
  activeTab: TTabType;
}

export interface IUserTagsProps {
  tags?: string[];
  itemType?: 'follower' | 'agent';
}

export interface IUserActionsProps {
  item: IFollower | IAgent;
  activeTab: TTabType;
  onAction: (action: string) => void;
  onMessage: () => void;
  onMore: () => void;
}

export interface IFollowersManagementScreenProps {
  navigation: any;
}

export type TTabType = 'followers' | 'following';
export type TEngagementLevel = 'high' | 'medium' | 'low';
export type TFilterKey = 'all' | 'following_back' | 'not_following_back' | 'verified' | 'customers' | 'vip' | 'new' | 'inactive' | 'agents' | 'top_rated' | 'nearby' | 'available' | 'favorite';
export type TUserType = 'user' | 'agent';

export interface IActionSheetOption {
  title: string;
  action: string;
  destructive?: boolean;
  icon?: string;
}

export interface IFollowerActionSheetProps {
  follower: IFollower;
  onAction: (action: string, follower: IFollower) => void;
}

export interface IAgentActionSheetProps {
  agent: IAgent;
  onAction: (action: string, agent: IAgent) => void;
}

export interface ISearchBarProps {
  searchQuery: string;
  activeTab: TTabType;
  onSearchChange: (query: string) => void;
}