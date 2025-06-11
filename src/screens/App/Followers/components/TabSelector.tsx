// components/TabSelector.tsx
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const TabSelector: React.FC<ITabSelectorProps> = ({
  activeTab,
  followersCount,
  followingCount,
  onTabChange,
}) => {
  return (
    <View className="flex-row bg-white/15 rounded-2xl pt-4 mb-4">
      <TouchableOpacity 
        className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl gap-2 ${
          activeTab === 'followers' ? 'bg-white' : ''
        }`}
        onPress={() => onTabChange('followers')}
        activeOpacity={0.8}
      >
        <Text className={`text-sm font-bold ${
          activeTab === 'followers' ? 'text-[#1E3A5F]' : 'text-[#1E3A5F]/70'
        }`}>
          Customers
        </Text>
        <View className="bg-[#1E3A5F]/20 rounded-2xl px-1.5 py-0.5 min-w-5 items-center">
          <Text className="text-xs font-bold text-[#1E3A5F]">
            {followersCount}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl gap-2 ${
          activeTab === 'following' ? 'bg-white' : ''
        }`}
        onPress={() => onTabChange('following')}
        activeOpacity={0.8}
      >
        <Text className={`text-sm font-bold ${
          activeTab === 'following' ? 'text-[#1E3A5F]' : 'text-[#1E3A5F]/70'
        }`}>
          Invited Customers
        </Text>
        <View className="bg-[#1E3A5F]/20 rounded-2xl px-1.5 py-0.5 min-w-5 items-center">
          <Text className="text-xs font-bold text-[#1E3A5F]">
            {followingCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// components/SearchBar.tsx
import { MaterialIcons } from '@expo/vector-icons';
import {
  Platform,
  TextInput
} from 'react-native';

export const SearchBar: React.FC<ISearchBarProps> = ({
  searchQuery,
  activeTab,
  onSearchChange,
}) => {
  return (
    <View className={`flex-row items-center bg-white rounded-2xl px-4 gap-3 mb-0 ${
      Platform.OS === 'ios' ? 'py-3' : 'py-0'
    }`}>
      <MaterialIcons name="search" size={20} color="#757575" />
      <TextInput
        className="flex-1 text-base text-[#1E3A5F]"
        placeholder={`Search customers...`}
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor="#9E9E9E"
      />
      {searchQuery !== '' && (
        <TouchableOpacity onPress={() => onSearchChange('')}>
          <MaterialIcons name="clear" size={20} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// components/StatsRow.tsx
import React from 'react';
import { ISearchBarProps, IStatsRowProps, ITabSelectorProps } from '../../../../types/followersTypes';

export const StatsRow: React.FC<IStatsRowProps> = ({
  activeTab,
  followersData,
  followingData,
}) => {
  const stats = activeTab === 'followers' ? [
    { number: followersData.totalFollowers, label: 'Total' },
    { number: followersData.newThisWeek, label: 'New This Week' },
    { number: followersData.activeFollowers, label: 'Active' },
    { number: followersData.mutualConnections, label: 'Mutual' },
  ] : [
    { number: followingData.totalFollowing, label: 'Total' },
    { number: followingData.newThisWeek, label: 'New This Week' },
    { number: followingData.activeAgents, label: 'Active' },
    { number: followingData.verifiedAgents, label: 'Verified' },
  ];

  return (
    <View className="flex-row justify-between bg-white/15 rounded-2xl p-2.5 -mb-2.5">
      {stats.map((stat, index) => (
        <View key={index} className="items-center flex-1">
          <Text className="text-sm font-extrabold text-[#1E3A5F] mb-1">
            {stat.number}
          </Text>
          <Text className="text-xs text-[#1E3A5F]/80">
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
};