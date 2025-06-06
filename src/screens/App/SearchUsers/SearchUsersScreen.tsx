// screens/SearchUsersScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, FlatList, RefreshControl, View } from 'react-native';
import { REFRESH_TIMEOUT } from '../../../constants';
import { DUMMY_USERS, FILTER_OPTIONS, INITIAL_RECENT_SEARCHES, MAX_RECENT_SEARCHES, SORT_OPTIONS } from '../../../constants/searchUsersConstant';
import { FilterType, ISearchUsersScreenProps, IUser, SearchType, SortKey, SortOrder } from '../../../types/searchUsersTypes';
import { processUsers, updateRecentSearches } from '../../../utils/searchUsersUtils';
import EmptySearchState from './components/EmptySearchState';
import SearchFilters from './components/SearchFilter';
import SearchHeader from './components/SearchHeader';
import UserCard from './components/UserCard';


const SearchUsersScreen: React.FC<ISearchUsersScreenProps> = ({
  initialUsers = DUMMY_USERS,
  onUserPress,
  onFollowToggle,
}) => {
  const navigation = useNavigation();
  
  // State management
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT_SEARCHES);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Process users when search/filter/sort criteria change
  useEffect(() => {
    const processed = processUsers(
      users,
      searchQuery,
      searchType,
      selectedFilter,
      sortBy,
      sortOrder
    );
    setFilteredUsers(processed);
  }, [users, searchQuery, searchType, selectedFilter, sortBy, sortOrder]);

  // Event handlers
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => 
        updateRecentSearches(prev, query, MAX_RECENT_SEARCHES)
      );
    }
  };

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, REFRESH_TIMEOUT);
  };

  const handleSortChange = (sortKey: SortKey): void => {
    setSortBy(sortKey);
    setSortOrder('asc');
  };

  const handleSortOrderToggle = (): void => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (filter: FilterType): void => {
    setSelectedFilter(filter);
  };

  const handleUserPress = (user: IUser): void => {
    if (onUserPress) {
      onUserPress(user);
    } else {
      navigation.navigate('UserProfile' as never, { user } as never);
    }
  };

  const handleFollowToggle = (userId: string): void => {
    if (onFollowToggle) {
      onFollowToggle(userId);
    } else {
      // Default follow toggle logic
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, following: !user.following }
            : user
        )
      );
    }
  };

  const handleExplore = (): void => {
    Alert.alert('Explore', 'Explore suggestions feature coming soon!');
  };

  const renderUserCard = ({ item, index }: { item: IUser; index: number }) => (
    <UserCard
      user={item}
      index={index}
      fadeAnim={fadeAnim}
      slideAnim={slideAnim}
      scaleAnim={scaleAnim}
      onPress={handleUserPress}
      onFollowToggle={handleFollowToggle}
    />
  );

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <SearchHeader
        searchQuery={searchQuery}
        searchFocused={searchFocused}
        resultsCount={filteredUsers.length}
        onSearchChange={handleSearch}
        onSearchFocus={() => setSearchFocused(true)}
        onSearchBlur={() => setSearchFocused(false)}
        onClearSearch={() => setSearchQuery('')}
        onBack={() => navigation.goBack()}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <View className="flex-1 pt-2.5">
        <SearchFilters
          sortOptions={SORT_OPTIONS}
          filterOptions={FILTER_OPTIONS}
          sortBy={sortBy}
          sortOrder={sortOrder}
          selectedFilter={selectedFilter}
          onSortChange={handleSortChange}
          onSortOrderToggle={handleSortOrderToggle}
          onFilterChange={handleFilterChange}
        />
        
        <FlatList
          data={filteredUsers}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingHorizontal: 20, 
            paddingBottom: 20 
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#FFCC00']}
              tintColor="#FFCC00"
            />
          }
          ListEmptyComponent={() => (
            <EmptySearchState onExplore={handleExplore} />
          )}
        />
      </View>
    </View>
  );
};

export default SearchUsersScreen;