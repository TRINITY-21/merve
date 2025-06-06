// components/StarRating.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IStarRatingProps } from '../../../../types/reviewsTypes';

const StarRating: React.FC<IStarRatingProps> = ({
  rating,
  size = 18,
  interactive = false,
  onRatingChange,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        interactive ? (
          <TouchableOpacity key={i} onPress={() => onRatingChange?.(i + 1)}>
            <MaterialIcons name="star" size={size} color="#FFCC00" />
          </TouchableOpacity>
        ) : (
          <MaterialIcons key={i} name="star" size={size} color="#FFCC00" />
        )
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialIcons key="half" name="star-half" size={size} color="#FFCC00" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      const starIndex = fullStars + (hasHalfStar ? 1 : 0) + i;
      stars.push(
        interactive ? (
          <TouchableOpacity key={`empty-${i}`} onPress={() => onRatingChange?.(starIndex + 1)}>
            <MaterialIcons name="star-border" size={size} color="#9E9E9E" />
          </TouchableOpacity>
        ) : (
          <MaterialIcons key={`empty-${i}`} name="star-border" size={size} color="#9E9E9E" />
        )
      );
    }
    return stars;
  };

  return (
    <View className={`flex-row items-center ${interactive ? 'gap-1' : 'gap-0.5'}`}>
      {renderStars()}
    </View>
  );
};

export default StarRating;