// components/EngagementIndicator.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const EngagementIndicator: React.FC<IEngagementIndicatorProps> = ({ engagement }) => {
  const getEngagementColor = () => {
    switch (engagement) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <View className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white ${getEngagementColor()}`} />
  );
};

// components/RatingIndicator.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

export const RatingIndicator: React.FC<IRatingIndicatorProps> = ({ rating }) => {
  const getRatingColor = () => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-yellow-500';
    if (rating >= 3.5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <View className={`absolute -bottom-0.5 -right-0.5 flex-row items-center px-1.5 py-0.5 rounded-2xl gap-0.5 ${getRatingColor()}`}>
      <MaterialIcons name="star" size={10} color="white" />
      <Text className="text-xs font-bold text-white">
        {rating}
      </Text>
    </View>
  );
};


export const UserStats: React.FC<IUserStatsProps> = ({ item, activeTab }) => {
  if (activeTab === 'followers') {
    const follower = item as IFollower;
    return (
      <View className="flex-row gap-4 mb-1.5 flex-wrap">
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="swap-horiz" size={14} color="#00BFA5" />
          <Text className="text-xs text-gray-600 font-semibold">
            {follower.transactionHistory}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="account-balance-wallet" size={14} color="#FFCC00" />
          <Text className="text-xs text-gray-600 font-semibold">
            {follower.totalSpent}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="people" size={14} color="#9E9E9E" />
          <Text className="text-xs text-gray-600 font-semibold">
            {follower.mutualFollowers}
          </Text>
        </View>
      </View>
    );
  } else {
    const agent = item as IAgent;
    return (
      <View className="flex-row gap-4 mb-1.5 flex-wrap">
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="business" size={14} color="#00BFA5" />
          <Text className="text-xs text-gray-600 font-semibold">
            {agent.businessType}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="access-time" size={14} color="#FFCC00" />
          <Text className="text-xs text-gray-600 font-semibold">
            {agent.workingHours}
          </Text>
        </View>
      </View>
    );
  }
};

// components/UserTags.tsx


export const UserTags: React.FC<IUserTagsProps> = ({ tags, itemType }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <View className="flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <View key={tag} className="bg-gray-100 rounded-lg px-1.5 py-0.5">
          <Text className="text-xs text-gray-600 font-semibold">
            {tag}
          </Text>
        </View>
      ))}
    </View>
  );
};

import { IAgent, IEngagementIndicatorProps, IFollower, IRatingIndicatorProps, IUserActionsProps, IUserStatsProps, IUserTagsProps } from '../../../../types/followersTypes';

export const UserActions: React.FC<IUserActionsProps> = ({
  item,
  activeTab,
  onAction,
  onMessage,
  onMore,
}) => {
  const isFollower = item.type === 'user';
  const follower = item as IFollower;

  return (
    <View className="items-center gap-2 ml-2">
      {isFollower && !follower.isFollowingBack && (
        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-teal-500 items-center justify-center"
          onPress={() => onAction('follow_back')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="person-add" size={16} color="white" />
        </TouchableOpacity>
      )}
      
      {!isFollower && (
        <TouchableOpacity 
          className="w-8 h-8 rounded-full bg-red-500 items-center justify-center"
          onPress={() => onAction('unfollow')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="person-remove" size={16} color="white" />
        </TouchableOpacity>
      )}
      
      <TouchableOpacity 
        className="w-8 h-8 rounded-full bg-teal-100 items-center justify-center"
        onPress={onMessage}
        activeOpacity={0.8}
      >
        <MaterialIcons name="message" size={16} color="#00BFA5" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
        onPress={onMore}
        activeOpacity={0.8}
      >
        <MaterialIcons name="more-vert" size={16} color="#9E9E9E" />
      </TouchableOpacity>
    </View>
  );
};