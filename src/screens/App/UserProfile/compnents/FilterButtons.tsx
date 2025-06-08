// components/FilterButtons.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common/Typography';
import { colors } from '../../../../constants/theme/colors';

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
              selectedFilter === filter ? 'shadow-lg' : ''
            }`}
            style={{
              backgroundColor: selectedFilter === filter ? colors.primary : colors.gray.light
            }}
            onPress={() => onFilterChange(filter)}
            activeOpacity={0.7}
          >
            <Typography 
              variant="bold" 
              size={12} 
              style={{ 
                color: selectedFilter === filter ? colors.white : colors.text.secondary,
                letterSpacing: 0.5
              }}
            >
              {filter}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};