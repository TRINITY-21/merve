// components/FiltersPanel.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { IFiltersPanelProps } from '../../../../../types/favoriteProductTypes';
import { FilterSection, QuickFilter, RatingFilter } from './FilterSection';


export const FiltersPanel: React.FC<IFiltersPanelProps> = ({
  visible,
  filters,
  onFiltersChange,
  onClose,
}) => {
  const updateFilter = (key: keyof typeof filters, value: any): void => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearAllFilters = (): void => {
    onFiltersChange({
      inStock: false,
      verified: false,
      ratings: 0,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 bg-white mt-40 rounded-t-3xl">
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6">
            {/* Quick Filters */}
            <FilterSection title="Quick Filters">
              <View className="flex-row flex-wrap gap-3">
                <QuickFilter
                  label="In Stock Only"
                  isActive={filters.inStock}
                  onPress={() => updateFilter('inStock', !filters.inStock)}
                />
                <QuickFilter
                  label="Verified Stores"
                  isActive={filters.verified}
                  onPress={() => updateFilter('verified', !filters.verified)}
                />
              </View>
            </FilterSection>

            {/* Rating Filter */}
            <FilterSection title="Minimum Rating">
              <View className="gap-3">
                {[4, 3, 2, 1].map((rating) => (
                  <RatingFilter
                    key={rating}
                    rating={rating}
                    isActive={filters.ratings === rating}
                    onPress={() => updateFilter('ratings', filters.ratings === rating ? 0 : rating)}
                  />
                ))}
              </View>
            </FilterSection>
          </ScrollView>

          <View className="flex-row px-6 py-5 gap-3 border-t border-gray-200">
            <TouchableOpacity 
              className="flex-1 py-4 items-center bg-gray-50 rounded-2xl"
              onPress={clearAllFilters}
            >
              <Text className="text-base font-semibold text-gray-800">
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 py-4 items-center bg-primary rounded-2xl"
              onPress={onClose}
            >
              <Text className="text-base font-bold text-white">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};