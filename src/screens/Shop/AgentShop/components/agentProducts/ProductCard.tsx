import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IProductCardProps } from '../../../../../types/agentProductTypes';
import ProductMenu from './ProductMenu';
import ProductStats from './ProductStats';
import StatusBadge from './StatusBadge';

const { width: screenWidth } = Dimensions.get('window');

const ProductCard: React.FC<IProductCardProps> = ({
  product,
  viewMode,
  isSelected,
  showMenu,
  onPress,
  onLongPress,
  onMenuPress,
  onMenuAction,
  onSelectionToggle,
  fadeAnim,
}) => {
  if (viewMode === 'list') {
    return (
      <Animated.View 
        className={`bg-white rounded-2xl mb-3 shadow-sm shadow-black/5 elevation-4 relative ${
          isSelected ? 'border-2 border-blue-500' : ''
        }`}
        style={{ opacity: fadeAnim }}
      >
        <TouchableOpacity
          className="flex-row p-3 items-center"
          onPress={onPress}
          onLongPress={onLongPress}
          activeOpacity={0.9}
        >
          {/* Selection Checkbox */}
          <TouchableOpacity 
            className="mr-3"
            onPress={onSelectionToggle}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name={isSelected ? "check-box" : "check-box-outline-blank"} 
              size={20} 
              color={isSelected ? colors.accent : colors.gray.medium} 
            />
          </TouchableOpacity>

          {/* Product Image */}
          <View className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 mr-3 relative">
            <Image 
              source={{ uri: product.image }} 
              className="w-full h-full"
              style={{ resizeMode: 'cover' }}
            />
            
            <StatusBadge status={product.status} variant="list" />

            {product.isPromoted && (
              <View className="absolute bottom-1 left-1 bg-blue-500 rounded-lg w-4 h-4 items-center justify-center">
                <MaterialIcons name="star" size={10} color={colors.white} />
              </View>
            )}
          </View>

          {/* Product Info */}
          <View className="flex-1">
            <View className="mb-2">
              <Text className="text-sm font-bold text-gray-900 mb-1" numberOfLines={2}>
                {product.title}
              </Text>
              
              <View className="flex-row items-center gap-2">
                <Text className="text-base font-extrabold text-primary">
                  GHS {product.price.toFixed(2)}
                </Text>
                {product.originalPrice && (
                  <Text className="text-xs text-gray-500 line-through">
                    GHS {product.originalPrice.toFixed(2)}
                  </Text>
                )}
              </View>
            </View>

            <ProductStats product={product} variant="normal" />

            <View className="gap-0.5">
              <Text className="text-xs font-semibold text-green-500">
                Revenue: GHS {product.revenue.toFixed(2)}
              </Text>
              <Text className="text-xs text-gray-500">
                Updated {product.lastUpdated}
              </Text>
            </View>
          </View>

          {/* Actions Menu */}
          <TouchableOpacity 
            className="p-2"
            onPress={onMenuPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="more-vert" size={20} color={colors.gray.medium} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Product Menu */}
        {showMenu && (
          <ProductMenu
            visible={showMenu}
            viewMode="list"
            onAction={onMenuAction}
          />
        )}
      </Animated.View>
    );
  }

  // Grid View
  const cardWidth = (screenWidth - 52) / 2;
  
  return (
    <Animated.View 
      className={`bg-white rounded-2xl mb-4 shadow-sm shadow-black/5 elevation-6 overflow-visible relative ${
        isSelected ? 'border-2 border-blue-500' : ''
      }`}
      style={{ width: cardWidth, opacity: fadeAnim }}
    >
      <TouchableOpacity
        className="overflow-hidden rounded-2xl"
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.9}
      >
        {/* Product Image */}
        <View className="relative bg-gray-200">
          <Image 
            source={{ uri: product.image }} 
            className="w-full h-35"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Selection Checkbox */}
          <TouchableOpacity 
            className="absolute top-2 left-2 z-10"
            onPress={onSelectionToggle}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name={isSelected ? "check-box" : "check-box-outline-blank"} 
              size={20} 
              color={isSelected ? colors.accent : colors.white} 
            />
          </TouchableOpacity>

          <StatusBadge status={product.status} variant="grid" />

          {product.isPromoted && (
            <View className="absolute bottom-2 left-2 bg-blue-500 rounded-lg w-5 h-5 items-center justify-center">
              <MaterialIcons name="star" size={12} color={colors.white} />
            </View>
          )}

          {/* Menu Button */}
          <TouchableOpacity 
            className="absolute top-2 right-8 w-7 h-7 rounded-full bg-black/50 items-center justify-center"
            onPress={onMenuPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="more-vert" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View className="p-3">
          <Text className="text-sm font-bold text-gray-900 mb-2" numberOfLines={2}>
            {product.title}
          </Text>

          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-base font-extrabold text-primary">
              GHS {product.price.toFixed(2)}
            </Text>
            {product.originalPrice && (
              <Text className="text-xs text-gray-500 line-through">
                GHS {product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>

          <ProductStats product={product} variant="small" />

          <Text className="text-xs font-semibold text-green-500 mt-2">
            GHS {product.revenue.toFixed(2)} revenue
          </Text>
        </View>
      </TouchableOpacity>

      {/* Product Menu for Grid */}
      {showMenu && (
        <ProductMenu
          visible={showMenu}
          viewMode="grid"
          onAction={onMenuAction}
        />
      )}
    </Animated.View>
  );
};

export default ProductCard;