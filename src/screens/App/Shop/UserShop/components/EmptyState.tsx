// components/EmptyState.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IEmptyStateProps } from '../../../../../types/favoriteProductTypes';

export const EmptyState: React.FC<IEmptyStateProps> = ({
  onBrowsePress,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <MaterialIcons name="favorite-border" size={80} color="#9E9E9E" />
      <Text className="text-2xl font-bold text-gray-800 mt-5 mb-2">
        No favorites yet
      </Text>
      <Text className="text-base text-gray-600 text-center leading-6 mb-8">
        Start adding products to your favorites to see them here
      </Text>
      <TouchableOpacity 
        className="flex-row items-center bg-primary rounded-2xl px-6 py-4 gap-2 shadow-lg"
        onPress={onBrowsePress}
        activeOpacity={0.8}
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <MaterialIcons name="explore" size={20} color="white" />
        <Text className="text-base font-bold text-white">
          Browse Marketplace
        </Text>
      </TouchableOpacity>
    </View>
  );
};