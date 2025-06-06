import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';
import { IProductStatsProps } from '../../../../../../types/agentProductTypes';

const ProductStats: React.FC<IProductStatsProps> = ({ 
  product, 
  variant = 'normal' 
}) => {
  const iconSize = variant === 'small' ? 10 : 12;
  const textSize = variant === 'small' ? 'text-xs' : 'text-xs';

  return (
    <View className="flex-row gap-3 mb-2">
      <View className="flex-row items-center gap-1">
        <MaterialIcons name="visibility" size={iconSize} color={colors.gray.medium} />
        <Text className={`${textSize} text-gray-500`}>{product.views}</Text>
      </View>
      
      <View className="flex-row items-center gap-1">
        <MaterialIcons name="favorite" size={iconSize} color={colors.gray.medium} />
        <Text className={`${textSize} text-gray-500`}>{product.favorites}</Text>
      </View>
      
      <View className="flex-row items-center gap-1">
        <MaterialIcons name="shopping-cart" size={iconSize} color={colors.gray.medium} />
        <Text className={`${textSize} text-gray-500`}>{product.sales}</Text>
      </View>
      
      <View className="flex-row items-center gap-1">
        <MaterialIcons name="inventory" size={iconSize} color={colors.gray.medium} />
        <Text className={`${textSize} text-gray-500`}>{product.stockCount}</Text>
      </View>
    </View>
  );
};

export default ProductStats;