// FollowersManagementScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActionSheetIOS,
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Platform,
    RefreshControl,
    View
} from 'react-native';
import { IAgent, IFollower, IFollowersData, IFollowersManagementScreenProps, TFilterKey, TTabType } from '../../../types/followersTypes';
import { BulkActions } from './components/BulkActions';
import { FilterChips } from './components/FilterChips';
import { EmptyState, FilterModal } from './components/FilterModal';
import { FollowersHeader } from './components/FollowersHeader';
import { UserCard } from './components/UserCard';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FollowersScreen: React.FC<IFollowersManagementScreenProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<TFilterKey>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TTabType>('followers');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;
  const tabSlideAnim = useRef(new Animated.Value(0)).current;

  // Mock data
  const followersData: IFollowersData = {
    totalFollowers: 342,
    newThisWeek: 23,
    activeFollowers: 298,
    mutualConnections: 45,
    followers: [
      {
        id: 'f1',
        name: 'Emma Wilson',
        username: '@emma_wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        verified: false,
        isFollowingBack: true,
        followedDate: '2025-05-25',
        lastActive: '2 hours ago',
        transactionHistory: 15,
        totalSpent: 'GH₵ 1,250',
        location: 'Accra, Ghana',
        mutualFollowers: 5,
        engagement: 'high' as const,
        tags: ['customer', 'active'],
        phone: '+233 24 111 0001',
        email: 'emma.wilson@email.com',
        type: 'user' as const
      },
      {
        id: 'f2',
        name: 'James Miller',
        username: '@james_miller',
        avatar: 'https://i.pravatar.cc/150?img=2',
        verified: true,
        isFollowingBack: false,
        followedDate: '2025-05-24',
        lastActive: '1 day ago',
        transactionHistory: 8,
        totalSpent: 'GH₵ 850',
        location: 'Kumasi, Ghana',
        mutualFollowers: 12,
        engagement: 'medium' as const,
        tags: ['customer', 'verified'],
        phone: '+233 24 222 0002',
        email: 'james.miller@email.com',
        type: 'user' as const
      }
    ]
  };

  const followingData: IFollowingData = {
    totalFollowing: 125,
    newThisWeek: 8,
    activeAgents: 98,
    verifiedAgents: 45,
    following: [
      {
        id: 'a1',
        name: 'Johnson Mobile Money',
        username: '@johnson_momo',
        avatar: 'https://i.pravatar.cc/150?img=9',
        verified: true,
        isAgent: true,
        followedDate: '2025-05-20',
        lastActive: 'Online',
        businessType: 'Mobile Money Agent',
        location: 'Independence Avenue, Accra',
        rating: 4.8,
        totalTransactions: 2847,
        services: ['Cash In', 'Cash Out', 'Bill Payment', 'Airtime'],
        workingHours: '8:00 AM - 8:00 PM',
        tags: ['top-rated', 'verified', '24/7'],
        phone: '+233 24 123 4567',
        email: 'johnson@momo.com',
        type: 'agent' as const,
        agentCode: 'MTN-ACC-12345'
      },
      {
        id: 'a2',
        name: 'Accra Money Center',
        username: '@accra_money',
        avatar: 'https://i.pravatar.cc/150?img=10',
        verified: true,
        isAgent: true,
        followedDate: '2025-05-18',
        lastActive: '30 minutes ago',
        businessType: 'Financial Services',
        location: 'Osu, Accra',
        rating: 4.6,
        totalTransactions: 1923,
        services: ['Money Transfer', 'Bill Payment', 'Forex'],
        workingHours: '9:00 AM - 6:00 PM',
        tags: ['trusted', 'verified'],
        phone: '+233 24 234 5678',
        email: 'info@accramoney.com',
        type: 'agent' as const,
        agentCode: 'MTN-ACC-23456'
      }
    ]
  };

  const getFilterOptions = (): IFilterOption[] => {
    if (activeTab === 'followers') {
      return [
        { key: 'all', label: 'All Followers', count: followersData.totalFollowers },
        { key: 'following_back', label: 'Following Back', count: 186 },
        { key: 'not_following_back', label: 'Not Following Back', count: 156 },
        { key: 'verified', label: 'Verified', count: 23 },
        { key: 'customers', label: 'Customers', count: 234 },
        { key: 'vip', label: 'VIP', count: 18 },
        { key: 'new', label: 'New (This Week)', count: 23 },
        { key: 'inactive', label: 'Inactive', count: 44 }
      ];
    } else {
      return [
        { key: 'all', label: 'All Following', count: followingData.totalFollowing },
        { key: 'agents', label: 'Agents', count: 85 },
        { key: 'verified', label: 'Verified', count: 45 },
        { key: 'top_rated', label: 'Top Rated', count: 32 },
        { key: 'nearby', label: 'Nearby', count: 28 },
        { key: 'available', label: 'Available Now', count: 18 },
        { key: 'new', label: 'New (This Week)', count: 8 },
        { key: 'favorite', label: 'Favorites', count: 12 }
      ];
    }
  };

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(headerScaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Tab switch animation
    Animated.spring(tabSlideAnim, {
      toValue: activeTab === 'followers' ? 0 : 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
    
    // Reset selection when switching tabs
    setSelectedItems([]);
    setIsSelectionMode(false);
    setSelectedFilter('all');
  }, [activeTab]);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleItemSelect = (itemId: string): void => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleBulkAction = (action: string): void => {
    Alert.alert(
      `${action} Selected`,
      `Are you sure you want to ${action.toLowerCase()} ${selectedItems.length} ${activeTab === 'followers' ? 'followers' : 'agents'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action, onPress: () => {
          console.log(`${action} bulk action:`, selectedItems);
          setSelectedItems([]);
          setIsSelectionMode(false);
        }}
      ]
    );
  };

  const handleUserAction = (action: string, user: IFollower| IAgent): void => {
    switch (action) {
      case 'follow_back':
        Alert.alert('Follow Back', 'Are you sure you want to follow this user back?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Follow', onPress: () => console.log('Following back:', user.id) }
        ]);
        break;
      case 'unfollow':
        Alert.alert('Unfollow', 'Are you sure you want to unfollow this agent?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Unfollow', style: 'destructive', onPress: () => console.log('Unfollowing:', user.id) }
        ]);
        break;
      case 'remove':
        Alert.alert('Remove Follower', 'Are you sure you want to remove this follower?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => console.log('Removing:', user.id) }
        ]);
        break;
      case 'block':
        Alert.alert('Block User', 'Are you sure you want to block this user?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Block', style: 'destructive', onPress: () => console.log('Blocking:', user.id) }
        ]);
        break;
      default:
        console.log('Action:', action, user.id);
    }
  };

  const showActionSheet = (user: IFollower | IAgent): void => {
    const isFollower = user.type === 'user';
    const options = isFollower 
      ? ['View Profile', 'Send Message', 'Call', 'Remove Follower', 'Block', 'Cancel']
      : ['View Profile', 'Send Message', 'Call Agent', 'Get Directions', 'Add to Favorites', 'Unfollow', 'Cancel'];

    const destructiveButtonIndex = isFollower ? [3, 4] : [5];
    const cancelButtonIndex = options.length - 1;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, destructiveButtonIndex, cancelButtonIndex },
        (buttonIndex) => {
          if (buttonIndex === cancelButtonIndex) return;
          
          const actions = isFollower 
            ? ['view_profile', 'message', 'call', 'remove', 'block']
            : ['view_profile', 'message', 'call', 'directions', 'favorite', 'unfollow'];
          
          if (buttonIndex < actions.length) {
            if (actions[buttonIndex] === 'view_profile') {
              navigation.navigate(isFollower ? 'UserProfile' : 'AgentProfile', { 
                [isFollower ? 'userId' : 'agentId']: user.id 
              });
            } else if (actions[buttonIndex] === 'message') {
              navigation.navigate('Chat', { userId: user.id });
            } else {
              handleUserAction(actions[buttonIndex], user);
            }
          }
        }
      );
    } else {
      const alertOptions = isFollower ? [
        { text: 'View Profile', onPress: () => navigation.navigate('UserProfile', { userId: user.id }) },
        { text: 'Send Message', onPress: () => navigation.navigate('Chat', { userId: user.id }) },
        { text: 'Remove Follower', onPress: () => handleUserAction('remove', user), style: 'destructive' },
        { text: 'Block', onPress: () => handleUserAction('block', user), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ] : [
        { text: 'View Profile', onPress: () => navigation.navigate('AgentProfile', { agentId: user.id }) },
        { text: 'Send Message', onPress: () => navigation.navigate('Chat', { userId: user.id }) },
        { text: 'Add to Favorites', onPress: () => handleUserAction('favorite', user) },
        { text: 'Unfollow', onPress: () => handleUserAction('unfollow', user), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ];

      Alert.alert(user.name, 'Choose an action', alertOptions as any);
    }
  };

  const getFilteredData = (): (IFollower | IAgent)[] => {
    const data = activeTab === 'followers' ? followersData.followers : followingData.following;
    let filtered = data;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter based on active tab
    if (activeTab === 'followers') {
      const followers = filtered as IFollower[];
      switch (selectedFilter) {
        case 'following_back':
          filtered = followers.filter(f => f.isFollowingBack);
          break;
        case 'not_following_back':
          filtered = followers.filter(f => !f.isFollowingBack);
          break;
        case 'verified':
          filtered = followers.filter(f => f.verified);
          break;
        case 'customers':
          filtered = followers.filter(f => f.tags?.includes('customer'));
          break;
        case 'vip':
          filtered = followers.filter(f => f.tags?.includes('vip'));
          break;
        case 'new':
          filtered = followers.filter(f => f.tags?.includes('new'));
          break;
        case 'inactive':
          filtered = followers.filter(f => f.engagement === 'low');
          break;
      }
    } else {
      const agents = filtered as IAgent[];
      switch (selectedFilter) {
        case 'agents':
          filtered = agents.filter(f => f.isAgent);
          break;
        case 'verified':
          filtered = agents.filter(f => f.verified);
          break;
        case 'top_rated':
          filtered = agents.filter(f => f.rating >= 4.5);
          break;
        case 'nearby':
          filtered = agents.filter(f => f.location.includes('Accra'));
          break;
        case 'available':
          filtered = agents.filter(f => f.lastActive === 'Online' || f.lastActive.includes('minutes'));
          break;
        case 'new':
          filtered = agents.filter(f => f.tags?.includes('new'));
          break;
        case 'favorite':
          filtered = agents.filter(f => f.tags?.includes('favorite'));
          break;
      }
    }

    return filtered;
  };

  const filteredData = getFilteredData();
  const filterOptions = getFilterOptions();

  const renderUserCard = ({ item }: { item: IFollower | IAgent }) => (
    <UserCard
      item={item}
      isSelectionMode={isSelectionMode}
      isSelected={selectedItems.includes(item.id)}
      activeTab={activeTab}
      onPress={() => {
        if (isSelectionMode) {
          handleItemSelect(item.id);
        } else {
          navigation.navigate(
            item.type === 'user' ? 'ProfileScreen' : 'AgentsProfileScreen', 
            { [item.type === 'user' ? 'userId' : 'agentId']: item.id }
          );
        }
      }}
      onSelect={() => handleItemSelect(item.id)}
      onAction={(action) => handleUserAction(action, item)}
      onMessage={() => navigation.navigate('Chat', { userId: item.id })}
      onMore={() => showActionSheet(item)}
      fadeAnim={fadeAnim}
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FollowersHeader
        activeTab={activeTab}
        searchQuery={searchQuery}
        isSelectionMode={isSelectionMode}
        followersData={followersData}
        followingData={followingData}
        onBack={() => navigation.goBack()}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
        onSelectionModeToggle={() => setIsSelectionMode(!isSelectionMode)}
        onFilterPress={() => setShowFilterModal(true)}
        headerScaleAnim={headerScaleAnim}
      />
      
      <FilterChips
        selectedFilter={selectedFilter}
        filterOptions={filterOptions}
        onFilterSelect={setSelectedFilter}
      />
      
      <BulkActions
        isVisible={isSelectionMode && selectedItems.length > 0}
        selectedCount={selectedItems.length}
        activeTab={activeTab}
        onBulkAction={handleBulkAction}
      />
      
      <FlatList
        data={filteredData}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FFCC00']}
            tintColor="#FFCC00"
          />
        }
        ListEmptyComponent={() => (
          <EmptyState activeTab={activeTab} searchQuery={searchQuery} />
        )}
      />

      <FilterModal
        visible={showFilterModal}
        activeTab={activeTab}
        selectedFilter={selectedFilter}
        filterOptions={filterOptions}
        onClose={() => setShowFilterModal(false)}
        onFilterSelect={(filter) => {
          setSelectedFilter(filter as TFilterKey);
          setShowFilterModal(false);
        }}
      />
    </View>
  );
};

export default FollowersScreen;