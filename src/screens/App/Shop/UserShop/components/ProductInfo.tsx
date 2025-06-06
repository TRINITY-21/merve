// components/ProductInfo.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { IProductInfoProps } from '../../../../../types/favoriteProductTypes';

export const ProductInfo: React.FC<IProductInfoProps> = ({
  product,
  isListView = false,
}) => {
  if (isListView) {
    return (
      <View className="flex-1">
        {/* Title and Price */}
        <View className="flex-1">
          <Text className="text-sm font-bold text-gray-800 mb-1.5 leading-tight" numberOfLines={2}>
            {product.title}
          </Text>

          <View className="flex-row items-center gap-1.5 mb-2">
            <Text className="text-base font-extrabold text-[#FFCC00]">
              GHS {product.price.toFixed(2)}
            </Text>
            {product.originalPrice && (
              <Text className="text-xs text-gray-600 line-through">
                GHS {product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
        </View>

        {/* Agent & Rating */}
        <View className="flex-row justify-between items-center mb-1.5">
          <View className="flex-col gap-0.5 flex-1">
            <View className="flex-row items-center gap-1">
              <Text className="text-xs font-semibold text-gray-600" numberOfLines={1}>
                {product.agent.name}
              </Text>
              {product.agent.verified && (
                <MaterialIcons name="verified" size={10} color="#00BFA5" />
              )}
            </View>
            <Text className="text-xs text-gray-500 opacity-80" numberOfLines={1}>
              {product.agent.location}
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5">
            <MaterialIcons name="star" size={10} color="#FF9800" />
            <Text className="text-xs font-semibold text-gray-800">{product.rating}</Text>
          </View>
        </View>

        {/* Distance & Stock */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-0.5">
            <MaterialIcons name="location-on" size={10} color="#9E9E9E" />
            <Text className="text-xs text-gray-600">{product.agent.distance} km</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <View className={`w-1 h-1 rounded-full ${
              product.inStock ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <Text className={`text-xs font-semibold ${
              product.inStock ? 'text-green-500' : 'text-red-500'
            }`}>
              {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // Grid view
  return (
    <>
      <Text className="text-base font-bold text-gray-800 mb-2 leading-5" numberOfLines={2}>
        {product.title}
      </Text>

      {/* Price */}
      <View className="flex-row items-center gap-2 mb-3">
        <Text className="text-lg font-extrabold text-[#FFCC00]">
          GHS {product.price.toFixed(2)}
        </Text>
        {product.originalPrice && (
          <Text className="text-sm text-gray-600 line-through">
            GHS {product.originalPrice.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Agent & Rating */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-col gap-0.5 flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xs font-semibold text-gray-600" numberOfLines={1}>
              {product.agent.name}
            </Text>
            {product.agent.verified && (
              <MaterialIcons name="verified" size={12} color="#00BFA5" />
            )}
          </View>
          <Text className="text-xs text-gray-500 opacity-80" numberOfLines={1}>
            {product.agent.location}
          </Text>
        </View>
        <View className="flex-row items-center gap-0.5">
          <MaterialIcons name="star" size={12} color="#FF9800" />
          <Text className="text-xs font-semibold text-gray-800">{product.rating}</Text>
          <Text className="text-xs text-gray-600">({product.reviews})</Text>
        </View>
      </View>

      {/* Distance & Stock */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="location-on" size={12} color="#9E9E9E" />
          <Text className="text-xs text-gray-600">{product.agent.distance} km</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className={`w-1.5 h-1.5 rounded-full ${
            product.inStock ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <Text className={`text-xs font-semibold ${
            product.inStock ? 'text-green-500' : 'text-red-500'
          }`}>
            {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
          </Text>
        </View>
      </View>
    </>
  );
};