// components/ActivityCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../../../constants/theme/colors';

interface Activity {
  id: string;
  type: string;
  date: string;
  amount: string;
  icon: string;
  color: string;
  description: string;
  time: string;
}

interface ActivityCardProps {
  activity: Activity;
  fadeAnim: SharedValue<number>;
  slideAnim: SharedValue<number>;
  index: number;
  isLast?: boolean;
  onPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  fadeAnim,
  slideAnim,
  index,
  isLast = false,
  onPress
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [
      {
        translateY: interpolate(
          slideAnim.value,
          [0, 50],
          [0, index * 5]
        )
      }
    ]
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="flex-row mb-5"
    >
      <View className="items-center mr-5 relative">
        <LinearGradient
          colors={[activity.color, activity.color + '80']}
          className="w-11 h-11 rounded-3xl items-center justify-center shadow-lg"
        >
          <MaterialIcons name={activity.icon as any} size={22} color={colors.white} />
        </LinearGradient>
        {!isLast && (
          <View className="absolute top-11 left-5 w-0.5 h-10 bg-slate-300 rounded-full" />
        )}
      </View>

      <TouchableOpacity 
        className="flex-1 bg-white rounded-2xl p-4 shadow-md" 
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-base font-extrabold text-gray-900 mb-2 tracking-wide">
              {activity.type}
            </Text>
            <Text className="text-sm text-gray-600 leading-5 mb-3 font-medium">
              {activity.description}
            </Text>
            <View className="flex-row gap-3">
              <Text className="text-xs text-gray-600 font-semibold tracking-wide">
                {activity.date}
              </Text>
              <Text className="text-xs text-gray-600 font-medium">
                {activity.time}
              </Text>
            </View>
          </View>
          {activity.amount && (
            <View className="items-end">
              <Text 
                className="text-base font-black tracking-wide" 
                style={{ color: activity.color }}
              >
                {activity.amount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};