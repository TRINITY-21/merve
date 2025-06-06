// components/ProductCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IProductCardProps } from '../../../../../../types/marketplaceTypes';

const ProductCard: React.FC<IProductCardProps> = ({
  product,
  viewMode,
  cardWidth,
  onPress,
  onFavoritePress,
  onSharePress,
}) => {
  const handleFavorite = () => {
    onFavoritePress?.(product.id);
  };

  const handleShare = () => {
    onSharePress?.(product.id);
  };

  if (viewMode === 'list') {
    return (
      <View className="bg-white rounded-2xl mb-3 shadow-sm overflow-hidden">
        <TouchableOpacity
          className="flex-row p-3 items-stretch"
          onPress={() => onPress(product.id)}
          activeOpacity={0.9}
        >
          {/* Product Image - Left Side */}
          <View className="w-25 h-25 rounded-xl overflow-hidden bg-gray-light relative">
            <Image 
              source={{ uri: product.image }} 
              className="w-full h-full"
              resizeMode="cover"
            />
            
            {/* Badges */}
            <View className="absolute top-1.5 left-1.5 gap-1">
              {product.isPromoted && (
                <View className="flex-row items-center bg-accent rounded-lg px-1 py-0.5 gap-0.5">
                  <MaterialIcons name="star" size={8} color="#FFFFFF" />
                  <Text className="text-xs font-bold text-white">Featured</Text>
                </View>
              )}
              {product.discount && (
                <View className="bg-error rounded-md px-1 py-0.5">
                  <Text className="text-xs font-bold text-white">-{product.discount}%</Text>
                </View>
              )}
            </View>
          </View>

          {/* Product Info - Right Side */}
          <View className="flex-1 pl-3 justify-between">
            <View className="flex-1">
              <Text className="text-sm font-bold text-text-primary mb-1.5 leading-4" numberOfLines={2}>
                {product.title}
              </Text>

              {/* Price */}
              <View className="flex-row items-center gap-1.5 mb-2">
                <Text className="text-base font-extrabold text-primary">
                  GHS {product.price.toFixed(2)}
                </Text>
                {product.originalPrice && (
                  <Text className="text-xs text-text-secondary line-through">
                    GHS {product.originalPrice.toFixed(2)}
                  </Text>
                )}
              </View>
            </View>

            <View className="gap-1.5">
              {/* Agent & Rating */}
              <View className="flex-row justify-between items-center">
                <View className="flex-col gap-0.5 flex-1">
                  <View className="flex-row items-center gap-1">
                    <Text className="text-xs font-semibold text-text-secondary" numberOfLines={1}>
                      {product.agent.name}
                    </Text>
                    {product.agent.verified && (
                      <MaterialIcons name="verified" size={10} color="#00BFA5" />
                    )}
                  </View>
                  <Text className="text-xs text-text-secondary opacity-80" numberOfLines={1}>
                    {product.agent.location}
                  </Text>
                </View>
                <View className="flex-row items-center gap-0.5">
                  <MaterialIcons name="star" size={10} color="#FF9800" />
                  <Text className="text-xs font-semibold text-text-primary">{product.rating}</Text>
                </View>
              </View>

              {/* Distance & Stock */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-0.5">
                  <MaterialIcons name="location-on" size={10} color="#9E9E9E" />
                  <Text className="text-xs text-text-secondary">{product.agent.distance} km</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <View 
                    className={`w-1 h-1 rounded-full ${
                      product.inStock ? 'bg-success' : 'bg-error'
                    }`} 
                  />
                  <Text 
                    className={`text-xs font-semibold ${
                      product.inStock ? 'text-success' : 'text-error'
                    }`}
                  >
                    {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions - Top Right */}
          <View className="absolute top-2 right-2 gap-1.5">
            <TouchableOpacity 
              className="w-6 h-6 rounded-xl bg-white/90 items-center justify-center shadow-sm" 
              onPress={handleFavorite}
              activeOpacity={0.8}
            >
              <MaterialIcons name="favorite-border" size={14} color="#9E9E9E" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-6 h-6 rounded-xl bg-white/90 items-center justify-center shadow-sm" 
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <MaterialIcons name="share" size={14} color="#9E9E9E" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Grid View
  return (
    <View 
      className="bg-white rounded-3xl mb-4 shadow-md overflow-hidden"
      style={{ width: cardWidth }}
    >
      <TouchableOpacity
        className="flex-1"
        onPress={() => onPress(product.id)}
        activeOpacity={0.9}
      >
        {/* Product Image */}
        <View className="relative bg-gray-light">
          <Image 
            source={{ uri: product.image }} 
            className="w-full h-40"
            resizeMode="cover"
          />
          
          {/* Badges */}
          <View className="absolute top-3 left-3 gap-1.5">
            {product.isPromoted && (
              <View className="flex-row items-center bg-accent rounded-xl px-2 py-1 gap-1">
                <MaterialIcons name="star" size={10} color="#FFFFFF" />
                <Text className="text-xs font-bold text-white">Featured</Text>
              </View>
            )}
            {product.discount && (
              <View className="bg-error rounded-lg px-1.5 py-0.5">
                <Text className="text-xs font-bold text-white">-{product.discount}%</Text>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View className="absolute top-3 right-3 gap-2">
            <TouchableOpacity 
              className="w-8 h-8 rounded-2xl bg-black/50 items-center justify-center" 
              onPress={handleFavorite}
              activeOpacity={0.8}
            >
              <MaterialIcons name="favorite-border" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-8 h-8 rounded-2xl bg-black/50 items-center justify-center" 
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <MaterialIcons name="share" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Info */}
        <View className="p-4 flex-1">
          <Text className="text-base font-bold text-text-primary mb-2 leading-5" numberOfLines={2}>
            {product.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg font-extrabold text-primary">
              GHS {product.price.toFixed(2)}
            </Text>
            {product.originalPrice && (
              <Text className="text-sm text-text-secondary line-through">
                GHS {product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Agent & Rating */}
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-col gap-0.5 flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-xs font-semibold text-text-secondary" numberOfLines={1}>
                  {product.agent.name}
                </Text>
                {product.agent.verified && (
                  <MaterialIcons name="verified" size={12} color="#00BFA5" />
                )}
              </View>
              <Text className="text-xs text-text-secondary opacity-80" numberOfLines={1}>
                {product.agent.location}
              </Text>
            </View>
            <View className="flex-row items-center gap-0.5">
              <MaterialIcons name="star" size={12} color="#FF9800" />
              <Text className="text-xs font-semibold text-text-primary">{product.rating}</Text>
              <Text className="text-xs text-text-secondary">({product.reviews})</Text>
            </View>
          </View>

          {/* Distance & Stock */}
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-1">
              <MaterialIcons name="location-on" size={12} color="#9E9E9E" />
              <Text className="text-xs text-text-secondary">{product.agent.distance} km</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <View 
                className={`w-1.5 h-1.5 rounded-full ${
                  product.inStock ? 'bg-success' : 'bg-error'
                }`} 
              />
              <Text 
                className={`text-xs font-semibold ${
                  product.inStock ? 'text-success' : 'text-error'
                }`}
              >
                {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
              </Text>
            </View>
          </View>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <View className="flex-row gap-1.5 mb-3">
              {product.tags.slice(0, 2).map((tag) => (
                <View key={tag} className="bg-background rounded-lg px-2 py-1">
                  <Text className="text-xs font-semibold text-accent">{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;