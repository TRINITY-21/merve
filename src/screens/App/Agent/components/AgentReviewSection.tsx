
// ReviewsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { JSX } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';
import { IAgentData } from '../../../../types/agentProfileTypes';

interface ReviewsSectionProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
  renderStars: (rating: number) => JSX.Element[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  navigation,
  renderStars
}) => (
  <Animated.View
    className="px-4 mb-4"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <View className="flex-row justify-between items-center py-1.5 mb-3">
      <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
        Recent Reviews
      </Text>
      <TouchableOpacity
        className="flex-row items-center gap-1 mt-2"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ReviewsScreen')}
      >
        <Text className="text-xs font-bold" style={{ color: colors.primary }}>
          View All
        </Text>
        <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>

    <View className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/8 elevation-8">
      {agentData.reviews.map((review) => (
        <View key={review.id} className="p-4 border-b border-black/6">
          <View className="flex-row items-center mb-2 gap-3">
            <Image
              source={{ uri: review.avatar }}
              className="w-9 h-9 rounded-2xl border-2"
              style={{ borderColor: colors.primary }}
            />
            <View className="flex-1">
              <Text className="text-base font-bold mb-0.5" style={{ color: colors.text.primary }}>
                {review.customer}
              </Text>
              <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
                {review.date}
              </Text>
            </View>
            {review.verified && (
              <MaterialIcons name="verified" size={16} color={colors.accent} />
            )}
          </View>
          <View className="flex-row items-center gap-2 mb-2">
            <View className="flex-row gap-0.5">
              {renderStars(review.rating)}
            </View>
          </View>
          <Text className="text-xs leading-4 font-medium" style={{ color: colors.text.primary }}>
            {review.comment}
          </Text>
        </View>
      ))}
    </View>
  </Animated.View>
);
