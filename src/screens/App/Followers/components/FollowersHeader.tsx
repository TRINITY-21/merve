// components/FollowersHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IFollowersHeaderProps } from '../../../../types/followersTypes';
import { SearchBar, StatsRow, TabSelector } from './TabSelector';

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
        elevation: 8,
        transform: [{ scale: headerScaleAnim }]
      }}
    >
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-2.5'} pb-5 rounded-b-0`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onBack}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-extrabold text-[#1E3A5F] text-center flex-1">
              {activeTab === 'followers' ? 'Followers' : 'Following'}
            </Text>
            
            <View className="flex-row gap-2.5">
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
                onPress={onSelectionModeToggle}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={isSelectionMode ? "close" : "checklist"} 
                  size={20} 
                  color="#1E3A5F" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
                onPress={onFilterPress}
                activeOpacity={0.7}
              >
                <MaterialIcons name="filter-list" size={20} color="#1E3A5F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Selector */}
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

          {/* Stats Row */}
          <StatsRow
            activeTab={activeTab}
            followersData={followersData}
            followingData={followingData}
          />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};