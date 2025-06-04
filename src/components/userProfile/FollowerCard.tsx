// components/ProfessionalFollowerCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { IFollower } from '../../types/userProfileTypes';

interface Follower {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  mutual: number;
  following: boolean;
  location: string;
}

interface FollowerCardProps {
  follower: IFollower;
  fadeAnim?: Animated.Value;
  slideAnim?: Animated.Value;
  index?: number;
  onFollowPress?: (follower: Follower) => void;
  onCardPress?: (follower: Follower) => void;
}

export const FollowerCard: React.FC<FollowerCardProps> = ({
  follower,
  fadeAnim,
  slideAnim,
  index = 0,
  onFollowPress,
  onCardPress
}) => {
  const getFollowButtonConfig = (isFollowing: boolean) => {
    if (isFollowing) {
      return {
        text: 'Following',
        bg: '#f1f5f9',
        textColor: '#475569',
        borderColor: '#e2e8f0',
        icon: 'check'
      };
    }
    return {
      text: 'Follow',
      bg: colors.primary,
      textColor: colors.secondary,
      borderColor: 'transparent',
      icon: 'person-add'
    };
  };

  const buttonConfig = getFollowButtonConfig(follower.following);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim || 1,
        transform: slideAnim ? [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [0, index % 2 === 0 ? -20 : 20],
            }),
          },
        ] : [],
      }}
      className="mb-3"
    >
      <TouchableOpacity
        onPress={() => onCardPress?.(follower)}
        activeOpacity={0.7}
        className="bg-white rounded-2xl shadow-sm border border-slate-100"
      >
        <View className="p-5">
          <View className="flex-row items-center">
            {/* Avatar Section */}
            <View className="mr-4 relative">
              <View className="w-14 h-14 rounded-full overflow-hidden bg-slate-100">
                <Image 
                  source={{ uri: follower.avatar }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              
              {/* Online Status */}
              <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
              
              {/* Verified Badge */}
              {follower.verified && (
                <View className="absolute -top-1 -right-1 bg-gray-100 rounded-full p-1">
                  <MaterialIcons name="verified" size={12} color={colors.primary} />
                </View>
              )}
            </View>

            {/* User Info */}
            <View className="flex-1 mr-3">
              <View className="flex-row items-center mb-1">
                <Text className="font-bold text-base text-slate-800 mr-2">
                  {follower.name}
                </Text>
                {follower.verified && (
                  <MaterialIcons name="verified" size={16} color={colors.primary} />
                )}
              </View>
              
              <Text className="text-sm text-slate-500 font-medium">
                @{follower.username}
              </Text>
              
              {/* Mutual Connections */}
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="people" size={14} color="#64748b" />
                <Text className="text-xs text-slate-600 ml-1 font-medium">
                  {follower.mutual} mutual connections
                </Text>
              </View>
              
              {/* Location */}
              <View className="flex-row items-center mt-1">
                <MaterialIcons name="location-on" size={14} color="#64748b" />
                <Text 
                  className="text-xs text-slate-600 ml-1 font-medium flex-1" 
                  numberOfLines={1}
                >
                  {follower.location}
                </Text>
              </View>
            </View>

            {/* Follow Button */}
            <TouchableOpacity
              onPress={() => onFollowPress?.(follower)}
              activeOpacity={0.8}
              className="px-4 py-2 rounded-xl flex-row items-center"
              style={{ 
                backgroundColor: buttonConfig.bg,
                borderWidth: 1,
                borderColor: buttonConfig.borderColor
              }}
            >
              <MaterialIcons 
                name={buttonConfig.icon as any} 
                size={16} 
                color={buttonConfig.textColor}
              />
              <Text 
                className="font-semibold text-sm ml-1"
                style={{ color: buttonConfig.textColor }}
              >
                {buttonConfig.text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Indicator */}
        {onCardPress && (
          <View className="bg-slate-50 px-5 py-2 flex-row items-center justify-center border-t border-slate-100">
            <Text className="text-xs text-slate-600 font-medium mr-1">
              Tap to view profile
            </Text>
            <MaterialIcons name="chevron-right" size={14} color="#64748b" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};