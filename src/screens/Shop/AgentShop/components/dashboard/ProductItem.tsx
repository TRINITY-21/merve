import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';

interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  favorites: number;
  trend: number;
}

interface IProductItemProps {
  item: IProduct;
  navigation: any;
}

const ProductItem: React.FC<IProductItemProps> = ({ item, navigation }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return `GHS ${amount.toLocaleString()}`;
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-2 flex-row items-center shadow-sm shadow-black/10 elevation-4"
      onPress={() => navigation.navigate('ProductAnalyticsScreen', { product: item })}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.image }} 
        className="w-15 h-15 rounded-lg mr-4" 
        style={{ width: 60, height: 60 }}
      />
      <View className="flex-1">
        <Text 
          className="text-base font-semibold text-gray-900 mb-1" 
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text className="text-sm font-bold text-secondary mb-2">
          {formatCurrency(item.price)}
        </Text>
        <View className="flex-row gap-4">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="visibility" size={12} color={colors.gray.medium} />
            <Text className="text-xs text-gray-500">{formatNumber(item.views)}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="question-answer" size={12} color={colors.gray.medium} />
            <Text className="text-xs text-gray-500">{item.inquiries}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="favorite" size={12} color={colors.gray.medium} />
            <Text className="text-xs text-gray-500">{item.favorites}</Text>
          </View>
        </View>
      </View>
      <View className="items-center gap-0.5">
        <MaterialIcons 
          name={item.trend >= 0 ? "trending-up" : "trending-down"} 
          size={16} 
          color={item.trend >= 0 ? colors.success : colors.error} 
        />
        <Text className={`text-xs font-semibold ${
          item.trend >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {Math.abs(item.trend)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;