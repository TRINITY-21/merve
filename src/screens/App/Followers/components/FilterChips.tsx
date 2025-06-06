// components/FilterChips.tsx
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IFilterChipsProps } from '../../../../types/followersTypes';

export const FilterChips: React.FC<IFilterChipsProps> = ({
  selectedFilter,
  filterOptions,
  onFilterSelect,
}) => {
  return (
    <View className="bg-white py-3 border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-3">
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`flex-row items-center rounded-2xl px-4 py-2 gap-2 ${
                selectedFilter === option.key 
                  ? 'bg-[#1E3A5F]' 
                  : 'bg-gray-50'
              }`}
              onPress={() => onFilterSelect(option.key)}
              activeOpacity={0.8}
            >
              <Text className={`text-sm font-semibold ${
                selectedFilter === option.key 
                  ? 'text-white' 
                  : 'text-gray-800'
              }`}>
                {option.label}
              </Text>
              <View className={`rounded-2xl px-1.5 py-0.5 min-w-5 items-center ${
                selectedFilter === option.key 
                  ? 'bg-white/15' 
                  : 'bg-gray-200'
              }`}>
                <Text className={`text-xs font-bold ${
                  selectedFilter === option.key 
                    ? 'text-white' 
                    : 'text-gray-600'
                }`}>
                  {option.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};