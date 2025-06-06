

// types/SearchUsers.types.ts

export type SearchType = 'all' | 'name' | 'location' | 'username';
export type SortKey = 'name' | 'followers' | 'mutual' | 'joinedDate' | 'location';
export type SortOrder = 'asc' | 'desc';
export type FilterType = 'all' | 'verified' | 'following' | 'followers';

export interface IUser {
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

export interface ISortOption {
  key: SortKey;
  label: string;
  icon: string;
}

export interface IFilterOption {
  key: FilterType;
  label: string;
  icon: string;
  color: string;
}

export interface ISearchUsersScreenProps {
  initialUsers?: IUser[];
  onUserPress?: (user: IUser) => void;
  onFollowToggle?: (userId: string) => void;
}

export interface ISearchHeaderProps {
  searchQuery: string;
  searchFocused: boolean;
  resultsCount: number;
  onSearchChange: (query: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onClearSearch: () => void;
  onBack: () => void;
  onToggleFilters: () => void;
}

export interface ISearchFiltersProps {
  sortOptions: ISortOption[];
  filterOptions: IFilterOption[];
  sortBy: SortKey;
  sortOrder: SortOrder;
  selectedFilter: FilterType;
  onSortChange: (sortKey: SortKey) => void;
  onSortOrderToggle: () => void;
  onFilterChange: (filter: FilterType) => void;
}

export interface IUserCardProps {
  user: IUser;
  index: number;
  fadeAnim: any;
  slideAnim: any;
  scaleAnim: any;
  onPress: (user: IUser) => void;
  onFollowToggle: (userId: string) => void;
}

export interface IUserStatsProps {
  followers: number;
  posts: number;
  mutual: number;
}

export interface IUserInterestsProps {
  interests: string[];
  maxVisible?: number;
}

export interface IEmptySearchStateProps {
  onExplore?: () => void;
}

export interface ISearchUtilsReturn {
  filteredUsers: IUser[];
  handleSearch: (query: string) => void;
  handleSort: (sortKey: SortKey) => void;
  handleFilter: (filter: FilterType) => void;
}