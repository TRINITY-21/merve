// components/ProductInfo.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, View } from 'react-native';
import { IProductInfoProps } from '../../../../../../types/productDetailsTypes';

const ProductInfo: React.FC<IProductInfoProps> = ({
  product,
  fadeAnim,
  slideAnim,
}) => {
  return (
    <Animated.View 
      className="bg-white rounded-t-3xl -mt-6 pt-6 px-5"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      {/* Product Header */}
      <View className="mb-4">
        <Text className="text-2xl font-extrabold text-text-primary leading-8 mb-2">
          {product.title}
        </Text>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="star" size={16} color="#FF9800" />
            <Text className="text-sm font-semibold text-text-primary">{product.rating}</Text>
            <Text className="text-sm text-text-secondary">({product.totalReviews} reviews)</Text>
          </View>
          <View className="w-px h-4 bg-gray-light" />
          <Text className="text-sm text-text-secondary">{product.views} views</Text>
        </View>
      </View>

      {/* Price Section */}
      <View className="mb-4">
        <View className="flex-row items-center gap-3 mb-1">
          <Text className="text-3xl font-black text-primary">
            GHS {product.price.toFixed(2)}
          </Text>
          {product.originalPrice && (
            <Text className="text-lg text-text-secondary line-through">
              GHS {product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        {product.discount && (
          <Text className="text-sm text-success font-semibold">
            You save GHS {(product.originalPrice! - product.price).toFixed(2)}
          </Text>
        )}
      </View>

      {/* Stock Section */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-2">
          <View 
            className={`w-2 h-2 rounded-full ${
              product.inStock ? 'bg-success' : 'bg-error'
            }`} 
          />
          <Text 
            className={`text-sm font-semibold ${
              product.inStock ? 'text-success' : 'text-error'
            }`}
          >
            {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
          </Text>
        </View>
        <Text className="text-sm text-text-secondary">
          Condition: {product.condition}
        </Text>
      </View>

      {/* Tags Section */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {product.tags.map((tag) => (
          <View key={tag} className="bg-background rounded-2xl px-3 py-1.5">
            <Text className="text-xs font-semibold text-accent">{tag}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default ProductInfo;