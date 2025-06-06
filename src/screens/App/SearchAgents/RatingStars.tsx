// components/RatingStars.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IRatingStarsProps } from '../../../types/searchAgentTypes';

const RatingStars: React.FC<IRatingStarsProps> = ({
  rating,
  size = 14,
  showRatingText = false,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialIcons key={i} name="star" size={size} color="#FFCC00" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialIcons key="half" name="star-half" size={size} color="#FFCC00" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialIcons key={`empty-${i}`} name="star-border" size={size} color="#9E9E9E" />
      );
    }

    return stars;
  };

  return (
    <View className="flex-row items-center gap-0.5">
      <View className="flex-row gap-0.5">
        {renderStars()}
      </View>
      {showRatingText && (
        <Text className="text-xs text-[#757575] font-semibold ml-1.5">
          ({rating})
        </Text>
      )}
    </View>
  );
};

export default RatingStars;