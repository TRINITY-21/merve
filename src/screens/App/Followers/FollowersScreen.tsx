// FollowersManagementScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
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
import { Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { IAgent, IFilterOption, IFollower, IFollowersManagementScreenProps, TFilterKey, TTabType } from '../../../types/followersTypes';
import { followersData, followingData } from '../../../utils/followersData';
import { BulkActions } from './components/BulkActions';
import { FilterModal } from './components/FilterModal';
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


  const getFilterOptions = (): IFilterOption[] => {
    if (activeTab === 'followers') {
      return [
        // { key: 'all', label: 'All Followers', count: followersData.totalFollowers },
        // { key: 'following_back', label: 'Following Back', count: 186 },
        // { key: 'not_following_back', label: 'Not Following Back', count: 156 },
        { key: 'verified', label: 'Verified', count: 23 },
        // { key: 'customers', label: 'Customers', count: 234 },
        // { key: 'vip', label: 'VIP', count: 18 },
        { key: 'new', label: 'New (This Week)', count: 23 },
        { key: 'inactive', label: 'Inactive', count: 44 }
      ];
    } else {
      return [
        // { key: 'all', label: 'All Following', count: followingData.totalFollowing },
        // { key: 'agents', label: 'Agents', count: 85 },
        { key: 'verified', label: 'Verified', count: 45 },
        // { key: 'top_rated', label: 'Top Rated', count: 32 },
        { key: 'nearby', label: 'Nearby', count: 28 },
        // { key: 'available', label: 'Available Now', count: 18 },
        { key: 'new', label: 'New (This Week)', count: 8 },
        // { key: 'favorite', label: 'Favorites', count: 12 
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
      navigation.navigate('UserProfile', { userId: item.id });
      }}
      onSelect={() => handleItemSelect(item.id)}
      onAction={(action) => handleUserAction(action, item)}
      onMessage={() => navigation.navigate('Chat', { userId: item.id })}
      onMore={() => showActionSheet(item)}
      fadeAnim={fadeAnim}
    />
  );

  return (
    <View className="flex-1 bg-background">
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
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
                <View className="items-center justify-center py-40">
                  <MaterialIcons
                    // name={activeTab === 'requests' ? 'event-busy' : 'event-available'}
                    size={64}
                    color={colors.gray.medium}
                  />
                  <Typography className="text-lg font-bold mt-4 mb-2" style={{ color: colors.text.primary }}>
                    {activeTab ? 'No Customers' : 'No accepted bookings'}
                  </Typography>
                  <Typography variant='regular' size={14} className="text-sm text-center px-10" style={{ color: colors.text.secondary }}>
                    {activeTab 
                      ? 'New booking requests will appear here'
                      : 'Your accepted appointments will show here'
                    }
                  </Typography>
                </View>
              }
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