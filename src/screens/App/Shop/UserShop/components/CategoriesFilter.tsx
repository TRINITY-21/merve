// components/CategoriesFilter.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ICategoriesFilterProps } from '../../../../../types/favoriteProductTypes';

export const CategoriesFilter: React.FC<ICategoriesFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  if (categories.length <= 1) return null;
  
  return (
    <View className="bg-white py-4 border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-3">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              className={`items-center bg-gray-50 rounded-2xl px-4 py-3 min-w-20 border ${
                selectedCategory === category.key 
                  ? 'bg-teal-500 border-teal-500' 
                  : 'border-gray-200'
              }`}
              onPress={() => onCategorySelect(category.key)}
              activeOpacity={0.8}
            >
              <View className="mb-2">
                <MaterialIcons 
                  name={category.icon as any} 
                  size={20} 
                  color={selectedCategory === category.key ? '#00BFA5' : '#9E9E9E'} 
                />
              </View>
              <Text className={`text-xs font-semibold mb-0.5 ${
                selectedCategory === category.key ? 'text-white' : 'text-gray-800'
              }`}>
                {category.label}
              </Text>
              <Text className={`text-xs ${
                selectedCategory === category.key ? 'text-white/80' : 'text-gray-600'
              }`}>
                {category.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};