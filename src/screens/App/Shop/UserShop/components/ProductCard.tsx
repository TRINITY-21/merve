// components/ProductCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IProductCardGridProps } from '../../../../../types/favoriteProductTypes';
import { ProductBadges } from './ProductBadges';
import { ProductInfo } from './ProductInfo';
import { QuickActions } from './QuickActions';

export const ProductCard: React.FC<IProductCardGridProps> = ({
  product,
  viewMode,
  cardWidth,
  onRemoveFavorite,
  onProductPress,
  fadeAnim,
}) => {
  const handleRemoveFavorite = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onRemoveFavorite(product.id);
      fadeAnim.setValue(1);
    });
  };

  const handleShare = (): void => {
    // Handle share functionality
    console.log('Share product:', product.id);
  };

  if (viewMode === 'list') {
    return (
      <Animated.View 
        className="bg-white rounded-2xl mb-3 overflow-hidden shadow-sm"
        style={{
          opacity: fadeAnim,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <TouchableOpacity
          className="flex-row p-3 items-stretch"
          onPress={() => onProductPress(product.id)}
          activeOpacity={0.9}
        >
          {/* Product Image - Left Side */}
          <View className="w-25 h-25 rounded-xl overflow-hidden bg-gray-200 relative">
            <Image 
              source={{ uri: product.image }} 
              className="w-full h-full"
              style={{ resizeMode: 'cover' }}
            />
            <ProductBadges product={product} isListView />
          </View>

          {/* Product Info - Right Side */}
          <View className="flex-1 pl-3 justify-between">
            <ProductInfo product={product} isListView />
          </View>

          {/* Quick Actions - Top Right */}
          <QuickActions
            productId={product.id}
            onRemoveFavorite={handleRemoveFavorite}
            onShare={handleShare}
            isListView
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Grid View
  return (
    <Animated.View 
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      style={{
        width: cardWidth,
        opacity: fadeAnim,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <TouchableOpacity
        className="flex-1"
        onPress={() => onProductPress(product.id)}
        activeOpacity={0.9}
      >
        {/* Product Image */}
        <View className="relative bg-gray-200">
          <Image 
            source={{ uri: product.image }} 
            className="w-full h-40"
            style={{ resizeMode: 'cover' }}
          />
          <ProductBadges product={product} />
          <QuickActions
            productId={product.id}
            onRemoveFavorite={handleRemoveFavorite}
            onShare={handleShare}
          />
        </View>

        {/* Product Info */}
        <View className="p-4 flex-1">
          <ProductInfo product={product} />
          
          {/* Date Added */}
          <View className="flex-row items-center gap-1 mt-1">
            <MaterialIcons name="schedule" size={10} color="#9E9E9E" />
            <Text className="text-xs text-gray-500 italic">
              Added {new Date(product.dateAdded).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short' 
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};