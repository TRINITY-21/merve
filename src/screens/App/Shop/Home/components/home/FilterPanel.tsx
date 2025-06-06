// components/FiltersPanel.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { IFiltersPanelProps } from '../../../../../../types/marketplaceTypes';
interface IFiltersPanelInternalProps extends IFiltersPanelProps {
  slideAnim: Animated.Value;
}

const FiltersPanel: React.FC<IFiltersPanelInternalProps> = ({
  visible,
  selectedFilters,
  priceRange,
  slideAnim,
  onClose,
  onFiltersChange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  const handleQuickFilterToggle = (filterKey: keyof typeof selectedFilters) => {
    onFiltersChange({
      ...selectedFilters,
      [filterKey]: !selectedFilters[filterKey],
    });
  };

  const handleRatingFilter = (rating: number) => {
    onFiltersChange({
      ...selectedFilters,
      ratings: selectedFilters.ratings === rating ? 0 : rating,
    });
  };

  const handleClearAll = () => {
    onClearFilters();
    onPriceRangeChange([0, 1000]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <Animated.View 
          className="flex-1 bg-white mt-25 rounded-t-3xl"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-light">
            <Text className="text-xl font-bold text-text-primary">Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6">
            {/* Quick Filters */}
            <View className="py-5 border-b border-gray-light">
              <Text className="text-base font-semibold text-text-primary mb-4">
                Quick Filters
              </Text>
              <View className="flex-row flex-wrap gap-3">
                <TouchableOpacity 
                  className={`rounded-full px-4 py-2.5 border ${
                    selectedFilters.inStock
                      ? 'bg-accent border-accent'
                      : 'bg-background border-gray-light'
                  }`}
                  onPress={() => handleQuickFilterToggle('inStock')}
                >
                  <Text 
                    className={`text-sm font-semibold ${
                      selectedFilters.inStock 
                        ? 'text-white' 
                        : 'text-text-primary'
                    }`}
                  >
                    In Stock Only
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className={`rounded-full px-4 py-2.5 border ${
                    selectedFilters.verified
                      ? 'bg-accent border-accent'
                      : 'bg-background border-gray-light'
                  }`}
                  onPress={() => handleQuickFilterToggle('verified')}
                >
                  <Text 
                    className={`text-sm font-semibold ${
                      selectedFilters.verified 
                        ? 'text-white' 
                        : 'text-text-primary'
                    }`}
                  >
                    Verified Stores
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Price Range */}
            <View className="py-5 border-b border-gray-light">
              <Text className="text-base font-semibold text-text-primary">
                Price Range: GHS {priceRange[0]} - GHS {priceRange[1]}
              </Text>
              {/* Price range slider would be implemented here */}
              <View className="mt-4 p-4 bg-background rounded-xl">
                <Text className="text-sm text-text-secondary text-center">
                  Price slider component would go here
                </Text>
              </View>
            </View>

            {/* Rating Filter */}
            <View className="py-5 border-b border-gray-light">
              <Text className="text-base font-semibold text-text-primary mb-4">
                Minimum Rating
              </Text>
              <View className="gap-3">
                {[4, 3, 2, 1].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    className={`flex-row items-center py-3 px-4 rounded-xl gap-3 ${
                      selectedFilters.ratings === rating 
                        ? 'bg-accent' 
                        : 'bg-background'
                    }`}
                    onPress={() => handleRatingFilter(rating)}
                  >
                    <View className="flex-row gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcons
                          key={i}
                          name="star"
                          size={14}
                          color={i < rating ? '#FF9800' : '#E0E0E0'}
                        />
                      ))}
                    </View>
                    <Text 
                      className={`text-sm font-semibold ${
                        selectedFilters.ratings === rating 
                          ? 'text-white' 
                          : 'text-text-primary'
                      }`}
                    >
                      {rating}+ Stars
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="flex-row px-6 py-5 gap-3 border-t border-gray-light">
            <TouchableOpacity 
              className="flex-1 py-4 items-center bg-background rounded-2xl"
              onPress={handleClearAll}
            >
              <Text className="text-base font-semibold text-text-primary">Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 py-4 items-center bg-primary rounded-2xl"
              onPress={onClose}
            >
              <Text className="text-base font-bold text-white">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FiltersPanel;