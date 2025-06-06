import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../../../../../constants/theme/colors';
import { IProductsToolbarProps } from '../../../../../../types/agentProductTypes';
import ViewToggle from './ViewToggle';

const ProductsToolbar: React.FC<IProductsToolbarProps> = ({
  selectedProducts,
  filteredProducts,
  viewMode,
  onViewModeChange,
  onSortPress,
  onSelectAll,
  onBulkActions,
  onClearSelection,
}) => {
  const hasSelection = selectedProducts.length > 0;

  return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-200">
      <View className="flex-1">
        {hasSelection ? (
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={onClearSelection} activeOpacity={0.8}>
              <MaterialIcons name="close" size={20} color={colors.gray.dark} />
            </TouchableOpacity>
            <Text className="text-sm font-semibold text-gray-900">
              {selectedProducts.length} selected
            </Text>
          </View>
        ) : (
          <Text className="text-sm font-semibold text-gray-600">
            {filteredProducts.length} products
          </Text>
        )}
      </View>
      
      <View className="flex-row items-center gap-4">
        {hasSelection ? (
          <TouchableOpacity 
            className="flex-row items-center bg-gray-50 rounded-xl px-3 py-2 gap-1.5"
            onPress={onBulkActions}
            activeOpacity={0.8}
          >
            <MaterialIcons name="more-vert" size={18} color={colors.gray.dark} />
            <Text className="text-xs font-semibold text-gray-900">Actions</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity 
              className="flex-row items-center bg-gray-50 rounded-xl px-3 py-2 gap-1.5"
              onPress={onSortPress}
              activeOpacity={0.8}
            >
              <MaterialIcons name="sort" size={18} color={colors.gray.dark} />
              <Text className="text-xs font-semibold text-gray-900">Sort</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row items-center bg-gray-50 rounded-xl px-3 py-2 gap-1.5"
              onPress={onSelectAll}
              activeOpacity={0.8}
            >
              <MaterialIcons name="select-all" size={18} color={colors.gray.dark} />
              <Text className="text-xs font-semibold text-gray-900">Select</Text>
            </TouchableOpacity>

            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ProductsToolbar;