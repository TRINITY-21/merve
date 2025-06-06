import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IEmptyStateProps } from '../../../../../types/agentProductTypes';

const EmptyState: React.FC<IEmptyStateProps> = ({ onAddProduct }) => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <MaterialIcons name="inventory" size={64} color={colors.gray.medium} />
      
      <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
        No products found
      </Text>
      
      <Text className="text-sm text-gray-600 text-center mb-6">
        Try adjusting your search or filters
      </Text>
      
      <TouchableOpacity 
        className="flex-row items-center bg-primary rounded-2xl px-5 py-3 gap-2"
        onPress={onAddProduct}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={20} color={colors.white} />
        <Text className="text-sm font-semibold text-white">
          Add Your First Product
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;