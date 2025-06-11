// components/FollowersHeader.tsx
import React from 'react';
import {
  Animated,
  View
} from 'react-native';
import { Header } from '../../../../components/common';
import { IFollowersHeaderProps } from '../../../../types/followersTypes';
import { SearchBar, TabSelector } from './TabSelector';

export const FollowersHeader: React.FC<IFollowersHeaderProps> = ({
  activeTab,
  searchQuery,
  isSelectionMode,
  followersData,
  followingData,
  onBack,
  onTabChange,
  onSearchChange,
  onSelectionModeToggle,
  onFilterPress,
  headerScaleAnim,
}) => {
  return (
    <Animated.View 
      className="shadow-lg shadow-black/30 z-10"
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // elevation: 8,
        transform: [{ scale: headerScaleAnim }]
      }}
    >

        <View className="px-5">
       

          <Header title='Customers'
            leftIcon={{
              name: 'chevron-left',
              onPress: onBack,
            }}
            rightIcons={[
              {
                name: 'filter-list',
                onPress: onFilterPress,
              },
             
            ]}
          />

          {/* Tab Selector */}
        <View className="mt-0">
           <TabSelector
            activeTab={activeTab}
            followersCount={followersData.totalFollowers}
            followingCount={followingData.totalFollowing}
            onTabChange={onTabChange}
          />

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            activeTab={activeTab}
            onSearchChange={onSearchChange}
          />
          </View>

        </View>
    </Animated.View>
  );
};