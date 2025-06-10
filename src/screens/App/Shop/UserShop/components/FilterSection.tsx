// components/QuickFilter.tsx
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export const FilterSection: React.FC<IFilterSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="py-5 border-b border-gray-200">
      <Text className="text-base font-semibold text-gray-800 mb-4">
        {title}
      </Text>
      {children}
    </View>
  );
};


export const QuickFilter: React.FC<IQuickFilterProps> = ({
  label,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      className={`rounded-2xl px-4 py-2.5 border ${
        isActive 
          ? 'bg-teal-500 border-teal-500' 
          : 'bg-gray-50 border-gray-200'
      }`}
      onPress={onPress}
    >
      <Text className={`text-sm font-semibold ${
        isActive ? 'text-white' : 'text-gray-800'
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// components/RatingFilter.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

import { colors } from '../../../../../constants/theme/colors';
import { IFilterSectionProps, IQuickFilterProps, IRatingFilterProps } from '../../../../../types/favoriteProductTypes';

export const RatingFilter: React.FC<IRatingFilterProps> = ({
  rating,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center py-3 px-4 rounded-xl gap-3 ${
        isActive ? 'bg-teal-500' : 'bg-gray-50'
      }`}
      onPress={onPress}
    >
      <View className="flex-row gap-0.5">
        {[...Array(5)].map((_, i) => (
          <MaterialIcons
            key={i}
            name="star"
            size={14}
            color={i < rating ? colors.accent : colors.gray.light}
          />
        ))}
      </View>
      <Text className={`text-sm font-semibold ${
        isActive ? 'text-white' : 'text-gray-800'
      }`}>
        {rating}+ Stars
      </Text>
    </TouchableOpacity>
  );
};