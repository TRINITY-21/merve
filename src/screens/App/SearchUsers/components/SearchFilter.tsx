// components/SearchFilters.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ISearchFiltersProps } from '../../../../types/searchUsersTypes';

const SearchFilters: React.FC<ISearchFiltersProps> = ({
  sortOptions,
  filterOptions,
  sortBy,
  sortOrder,
  selectedFilter,
  onSortChange,
  onSortOrderToggle,
  onFilterChange,
}) => {
  return (
    <View className="px-5 mb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2.5">
          {/* Sort Options */}
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`flex-row items-center px-3 py-2 rounded-2xl gap-1 shadow-sm ${
                sortBy === option.key 
                  ? 'bg-[#1E3A5F]' 
                  : 'bg-white'
              }`}
              onPress={() => {
                if (sortBy === option.key) {
                  onSortOrderToggle();
                } else {
                  onSortChange(option.key);
                }
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={14} 
                color={sortBy === option.key ? 'white' : '#757575'} 
              />
              <Text className={`text-xs font-semibold ${
                sortBy === option.key ? 'text-white' : 'text-[#757575]'
              }`}>
                {option.label}
              </Text>
              {sortBy === option.key && (
                <MaterialIcons 
                  name={sortOrder === 'asc' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                  size={14} 
                  color="white" 
                />
              )}
            </TouchableOpacity>
          ))}

          {/* Filter Options */}
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              className={`flex-row items-center px-3 py-2 rounded-2xl gap-1 shadow-sm`}
              style={{
                backgroundColor: selectedFilter === filter.key ? filter.color : 'white'
              }}
              onPress={() => onFilterChange(filter.key)}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name={filter.icon as any} 
                size={14} 
                color={selectedFilter === filter.key ? 'white' : '#757575'} 
              />
              <Text className={`text-xs font-semibold ${
                selectedFilter === filter.key ? 'text-white' : 'text-[#757575]'
              }`}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchFilters;