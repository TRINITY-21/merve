// FollowersSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

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
     <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
        Recent Customers
      </Typography>
      <TouchableOpacity
        className="flex-row items-center gap-1 mt-2"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Followers')}
      >
         <Typography variant="semibold" size={12} style={{ color: colors.accent, letterSpacing: 0 }}>
          View All
        </Typography>
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
            <Typography variant="semibold" size={10} style={{ color: colors.text.secondary, letterSpacing: 0.5 }}
            numberOfLines={1}>
            
              {follower.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </Animated.View>
);