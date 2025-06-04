// components/FilterButtons.tsx
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FilterButtonsProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  selectedFilter,
  onFilterChange
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
      <View className="flex-row gap-3 px-1 py-1">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-5 py-3 rounded-2xl shadow-sm ${
              selectedFilter === filter ? 'bg-yellow-500 shadow-lg' : 'bg-slate-100'
            }`}
            onPress={() => onFilterChange(filter)}
            activeOpacity={0.7}
          >
            <Text 
              className={`font-bold text-xs tracking-wide ${
                selectedFilter === filter ? 'text-white' : 'text-gray-600'
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};