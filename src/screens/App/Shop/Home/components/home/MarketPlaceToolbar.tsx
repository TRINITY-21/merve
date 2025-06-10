// components/MarketplaceToolbar.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IToolbarProps } from '../../../../../../types/marketplaceTypes';

const MarketplaceToolbar: React.FC<IToolbarProps> = ({
  resultCount,
  viewMode,
  onSortPress,
  onFilterPress,
  onViewModeChange,
}) => {


  return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-light">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-text-secondary">
          {resultCount} products found
        </Text>
      </View>
      
      <View className="flex-row items-center gap-4">
        <TouchableOpacity 
          className="flex-row items-center gap-1.5 px-3 py-2 bg-background rounded-xl"
          onPress={onSortPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="sort" size={18} color="#212121" />
          <Text className="text-xs font-semibold text-text-primary">Sort</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center gap-1.5 px-3 py-2 bg-background rounded-xl"
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="tune" size={18} color="#212121" />
          <Text className="text-xs font-semibold text-text-primary">Filter</Text>
        </TouchableOpacity>

        <View className="flex-row bg-background rounded-xl p-0.5">
          <TouchableOpacity
            className={`w-8 h-8 rounded-lg items-center justify-center ${
              viewMode === 'grid' 
                ? 'bg-white shadow-sm' 
                : ''
            }`}
            onPress={() => onViewModeChange('grid')}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="grid-view" 
              size={16} 
              color={viewMode === 'grid' ? '#00BFA5' : '#9E9E9E'} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-8 h-8 rounded-lg items-center justify-center ${
              viewMode === 'list' 
                ? 'bg-white shadow-sm' 
                : ''
            }`}
            onPress={() => onViewModeChange('list')}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name="view-list" 
              size={16} 
              color={viewMode === 'list' ? '#00BFA5' : '#9E9E9E'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MarketplaceToolbar;