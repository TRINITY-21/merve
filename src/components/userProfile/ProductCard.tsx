// components/ProductCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme/colors';

interface Product {
  id: string;
  title: string;
  agent: string;
  price: number;
  image: string;
  viewedAt: string;
  inquired: boolean;
  favorited: boolean;
}

interface ProductCardProps {
  product: Product;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  fadeAnim,
  scaleAnim,
  onPress
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }]
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
    >
      <TouchableOpacity
        className="flex-row items-center p-4"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Image source={{ uri: product.image }} className="w-15 h-15 rounded-xl mr-4" />

        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 mb-1 tracking-wide" numberOfLines={1}>
            {product.title}
          </Text>
          <Text className="text-sm text-gray-600 mb-2 font-medium" numberOfLines={1}>
            {product.agent}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-extrabold text-yellow-500 tracking-wide">
              GHS {product.price.toLocaleString()}
            </Text>
            <Text className="text-xs text-gray-600 font-medium">{product.viewedAt}</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View 
            className={`w-6 h-6 rounded-xl items-center justify-center ${
              product.inquired ? 'bg-teal-500' : 'bg-gray-200'
            }`}
          >
            <MaterialIcons
              name="question-answer"
              size={12}
              color={product.inquired ? colors.white : colors.gray.medium}
            />
          </View>
          <View 
            className={`w-6 h-6 rounded-xl items-center justify-center ${
              product.favorited ? 'bg-red-500' : 'bg-gray-200'
            }`}
          >
            <MaterialIcons
              name="favorite"
              size={12}
              color={product.favorited ? colors.white : colors.gray.medium}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};