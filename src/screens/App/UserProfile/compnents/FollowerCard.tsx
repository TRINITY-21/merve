// components/ProfessionalFollowerCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Typography } from '../../../../components/common/Typography';
import { colors } from '../../../../constants/theme/colors';
import { IFollower } from '../../../../types/userProfileTypes';

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
  fadeAnim?: SharedValue<number>;
  slideAnim?: SharedValue<number>;
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
        bg: colors.gray.light,
        textColor: colors.text.secondary,
        borderColor: colors.gray.light,
        icon: 'check'
      };
    }
    return {
      text: 'Follow',
      bg: colors.primary,
      textColor: colors.white,
      borderColor: 'transparent',
      icon: 'person-add'
    };
  };

  const buttonConfig = getFollowButtonConfig(follower.following);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim?.value ?? 1,
      transform: slideAnim ? [
        {
          translateX: slideAnim.value * (index % 2 === 0 ? -0.4 : 0.4),
        },
      ] : [],
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, { marginBottom: 12 }]}
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
                <Typography variant="bold" size={16} style={{ color: colors.text.primary, marginRight: 8 }}>
                  {follower.name}
                </Typography>
                {follower.verified && (
                  <MaterialIcons name="verified" size={16} color={colors.primary} />
                )}
              </View>
              
              <Typography variant="medium" size={14} style={{ color: colors.text.secondary }}>
                @{follower.username}
              </Typography>
              
              {/* Mutual Connections */}
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="people" size={14} color={colors.text.secondary} />
                <Typography variant="medium" size={12} style={{ color: colors.text.secondary, marginLeft: 4 }}>
                  {follower.mutual} mutual connections
                </Typography>
              </View>
              
              {/* Location */}
              <View className="flex-row items-center mt-1">
                <MaterialIcons name="location-on" size={14} color={colors.text.secondary} />
                <Typography 
                  variant="medium" 
                  size={12} 
                  style={{ color: colors.text.secondary, marginLeft: 4, flex: 1 }} 
                  numberOfLines={1}
                >
                  {follower.location}
                </Typography>
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
              <Typography 
                variant="semibold" 
                size={14} 
                style={{ color: buttonConfig.textColor, marginLeft: 4 }}
              >
                {buttonConfig.text}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Indicator */}
        {onCardPress && (
          <View className="bg-slate-50 px-5 py-2 flex-row items-center justify-center border-t border-slate-100">
            <Typography variant="medium" size={12} style={{ color: colors.text.secondary, marginRight: 4 }}>
              Tap to view profile
            </Typography>
            <MaterialIcons name="chevron-right" size={14} color={colors.text.secondary} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};