// components/ProductInfo.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../components/common/Typography';
import { IProductInfoProps } from '../../../../../types/favoriteProductTypes';

export const ProductInfo: React.FC<IProductInfoProps> = ({
  product,
  isListView = false,
}) => {
  // Grid view
  return (
    <>
      <Typography variant="bold" size={16} className="text-gray-800 mb-2 leading-5" numberOfLines={2}>
        {product.title}
      </Typography>

      {/* Price */}
      <View className="flex-row items-center gap-2 mb-3">
        <Typography variant="bold" size={18} className="text-[#FFCC00]">
          GHS {product.price.toFixed(2)}
        </Typography>
        {product.originalPrice && (
          <Typography variant="regular" size={14} className="text-gray-600 line-through">
            GHS {product.originalPrice.toFixed(2)}
          </Typography>
        )}
      </View>

      {/* Agent & Rating */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-col gap-0.5 flex-1">
          <View className="flex-row items-center gap-1.5">
            <Typography variant="semibold" size={12} className="text-gray-600" numberOfLines={1}>
              {product.agent.name}
            </Typography>
            {product.agent.verified && (
              <MaterialIcons name="verified" size={12} color="#00BFA5" />
            )}
          </View>
          <Typography variant="regular" size={12} className="text-gray-500 opacity-80" numberOfLines={1}>
            {product.agent.location}
          </Typography>
        </View>
        <View className="flex-row items-center gap-0.5">
          <MaterialIcons name="star" size={12} color="#FF9800" />
          <Typography variant="semibold" size={12} className="text-gray-800">{product.rating}</Typography>
          <Typography variant="regular" size={12} className="text-gray-600">({product.reviews})</Typography>
        </View>
      </View>

      {/* Distance & Stock */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <MaterialIcons name="location-on" size={12} color="#757575" />
          <Typography variant="regular" size={12} className="text-gray-600">
            {product.agent.distance}km away
          </Typography>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className={`w-1.5 h-1.5 rounded-full ${
            product.inStock ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <Typography variant="semibold" size={12} className={product.inStock ? 'text-green-500' : 'text-red-500'}>
            {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
          </Typography>
        </View>
      </View>
    </>
  );
};