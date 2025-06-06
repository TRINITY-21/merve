// components/ProductSpecifications.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { IProductSpecificationsProps } from '../../../../../../types/productDetailsTypes';

const ProductSpecifications: React.FC<IProductSpecificationsProps> = ({
  specifications,
}) => {
  return (
    <View className="bg-white px-5 py-5">
      {Object.entries(specifications).map(([key, value]) => (
        <View 
          key={key} 
          className="flex-row justify-between items-center py-3 border-b border-gray-light"
        >
          <Text className="text-sm text-text-secondary flex-1">
            {key}
          </Text>
          <Text className="text-sm font-semibold text-text-primary flex-1 text-right">
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ProductSpecifications;