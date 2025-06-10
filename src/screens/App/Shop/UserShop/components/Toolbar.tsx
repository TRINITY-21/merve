// components/Toolbar.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IToolbarProps } from '../../../../../types/favoriteProductTypes';

export const Toolbar: React.FC<IToolbarProps> = ({
  filteredCount,
  onSortPress,
  onFilterPress,
}) => {
  return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-200">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-600">
          {filteredCount} items
        </Text>
      </View>
      
      <View className="flex-row items-center gap-4">
        <TouchableOpacity 
          className="flex-row items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl"
          onPress={onSortPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="sort" size={18} color="#212121" />
          <Text className="text-xs font-semibold text-gray-800">Sort</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl"
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="tune" size={18} color="#212121" />
          <Text className="text-xs font-semibold text-gray-800">Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};