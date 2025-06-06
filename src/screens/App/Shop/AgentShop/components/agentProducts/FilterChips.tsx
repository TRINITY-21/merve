import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IFilterChipsProps } from '../../../../../../types/agentProductTypes';

const FilterChips: React.FC<IFilterChipsProps> = ({
  filterOptions,
  selectedFilter,
  onFilterSelect,
}) => {
  return (
    <View className="bg-white py-4 border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-3">
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              className={`flex-row items-center rounded-full px-3 py-2 gap-2 border ${
                selectedFilter === filter.key 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'bg-gray-50 border-gray-200'
              }`}
              onPress={() => onFilterSelect(filter.key)}
              activeOpacity={0.8}
            >
              <Text className={`text-xs font-semibold ${
                selectedFilter === filter.key ? 'text-white' : 'text-gray-900'
              }`}>
                {filter.label}
              </Text>
              <View className={`rounded-full px-1.5 py-0.5 min-w-[20px] items-center ${
                selectedFilter === filter.key 
                  ? 'bg-white/30' 
                  : 'bg-gray-200'
              }`}>
                <Text className={`text-xs font-semibold ${
                  selectedFilter === filter.key ? 'text-white' : 'text-gray-600'
                }`}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterChips;