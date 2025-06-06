// FollowersSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';
import { IAgentData } from '../../../../types/agentProfileTypes';

interface FollowersSectionProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
}

export const FollowersSection: React.FC<FollowersSectionProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  navigation
}) => (
  <Animated.View
    className="p-4 bg-white rounded-2xl mx-4 mb-4 shadow-sm shadow-black/8 elevation-8"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <View className="flex-row justify-between items-center py-1.5 mb-3">
      <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
        Recent Followers
      </Text>
      <TouchableOpacity
        className="flex-row items-center gap-1 mt-2"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('FollowersManagementScreen')}
      >
        <Text className="text-xs font-bold" style={{ color: colors.primary }}>
          View All
        </Text>
        <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-3 px-1">
        {agentData.followers.map((follower) => (
          <TouchableOpacity key={follower.id} className="items-center w-16" activeOpacity={0.8}>
            <View className="relative mb-1.5">
              <Image
                source={{ uri: follower.avatar }}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm shadow-black/10 elevation-8"
              />
              {follower.verified && (
                <View className="absolute -top-0.5 -right-0.5 bg-white rounded-lg p-0.5">
                  <MaterialIcons name="verified" size={10} color={colors.accent} />
                </View>
              )}
            </View>
            <Text
              className="text-xs font-semibold text-center"
              style={{ color: colors.text.primary }}
              numberOfLines={1}
            >
              {follower.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </Animated.View>
);