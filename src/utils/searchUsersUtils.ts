// utils/SearchUsers.utils.ts

import { FilterType, IUser, SearchType, SortKey, SortOrder } from "../types/searchUsersTypes";

/**
 * Filter users based on search query and search type
 */
export const filterUsersBySearch = (
  users: IUser[], 
  searchQuery: string, 
  searchType: SearchType
): IUser[] => {
  if (!searchQuery.trim()) return users;

  const query = searchQuery.toLowerCase();
  
  return users.filter(user => {
    switch (searchType) {
      case 'name':
        return user.name.toLowerCase().includes(query);
      case 'location':
        return user.location.toLowerCase().includes(query);
      case 'username':
        return user.username.toLowerCase().includes(query);
      default:
        return (
          user.name.toLowerCase().includes(query) ||
          user.location.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.bio.toLowerCase().includes(query)
        );
    }
  });
};

/**
 * Filter users based on filter type
 */
export const filterUsersByType = (users: IUser[], filterType: FilterType): IUser[] => {
  switch (filterType) {
    case 'verified':
      return users.filter(user => user.verified);
    case 'following':
      return users.filter(user => user.following);
    case 'followers':
      return users.filter(user => !user.following);
    default:
      return users;
  }
};

/**
 * Sort users based on sort key and order
 */
export const sortUsers = (users: IUser[], sortBy: SortKey, sortOrder: SortOrder): IUser[] => {
  return [...users].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'joinedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

/**
 * Process and filter all users based on search, filter, and sort criteria
 */
export const processUsers = (
  users: IUser[],
  searchQuery: string,
  searchType: SearchType,
  filterType: FilterType,
  sortBy: SortKey,
  sortOrder: SortOrder
): IUser[] => {
  let filtered = filterUsersBySearch(users, searchQuery, searchType);
  filtered = filterUsersByType(filtered, filterType);
  return sortUsers(filtered, sortBy, sortOrder);
};

/**
 * Update recent searches list
 */
export const updateRecentSearches = (
  currentSearches: string[], 
  newSearch: string, 
  maxSearches: number = 5
): string[] => {
  const trimmedSearch = newSearch.trim();
  if (!trimmedSearch || currentSearches.includes(trimmedSearch)) {
    return currentSearches;
  }
  
  return [trimmedSearch, ...currentSearches.slice(0, maxSearches - 1)];
};

/**
 * Format follower count for display
 */
export const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Format last seen text
 */
export const formatLastSeen = (lastSeen: string, isOnline: boolean): string => {
  if (isOnline) return 'Active now';
  return lastSeen;
};

/**
 * Get user display interests with overflow handling
 */
export const getDisplayInterests = (interests: string[], maxVisible: number = 3) => {
  const visible = interests.slice(0, maxVisible);
  const remaining = interests.length - maxVisible;
  
  return {
    visibleInterests: visible,
    remainingCount: remaining > 0 ? remaining : 0,
    hasMore: remaining > 0
  };
};

/**
 * Validate search query
 */
export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length >= 1;
};

/**
 * Get search result summary text
 */
export const getResultsSummary = (count: number): string => {
  return `${count} ${count === 1 ? 'user' : 'users'} found`;
};