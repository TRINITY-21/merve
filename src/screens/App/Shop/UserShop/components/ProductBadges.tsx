// components/ProductBadges.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { IProductBadgesProps } from '../../../../../types/favoriteProductTypes';

export const ProductBadges: React.FC<IProductBadgesProps> = ({
  product,
  isListView = false,
}) => {
  const badgeSize = isListView ? 'small' : 'normal';
  
  return (
    <View className={`absolute gap-1 ${
      isListView ? 'top-1.5 left-1.5' : 'top-3 left-3'
    }`}>
      {product.isPromoted && (
        <View className={`flex-row items-center bg-teal-500 rounded-lg gap-1 ${
          isListView 
            ? 'px-1 py-0.5' 
            : 'px-2 py-1'
        }`}>
          <MaterialIcons 
            name="star" 
            size={isListView ? 8 : 10} 
            color="white" 
          />
          <Text className={`font-bold text-white ${
            isListView ? 'text-xs' : 'text-xs'
          }`}>
            {isListView ? 'Featured' : 'Featured'}
          </Text>
        </View>
      )}
      
      {product.discount && (
        <View className={`bg-red-500 rounded-md ${
          isListView 
            ? 'px-1 py-0.5' 
            : 'px-1.5 py-0.5'
        }`}>
          <Text className={`font-bold text-white ${
            isListView ? 'text-xs' : 'text-xs'
          }`}>
            -{product.discount}%
          </Text>
        </View>
      )}
    </View>
  );
};