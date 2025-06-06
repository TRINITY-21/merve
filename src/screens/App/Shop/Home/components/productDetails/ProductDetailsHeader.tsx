// components/ProductDetailsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Platform, StatusBar, TouchableOpacity, View } from 'react-native';

interface IProductDetailsHeaderProps {
  productTitle: string;
  isFavorite: boolean;
  headerOpacity: any;
  onBack: () => void;
  onFavoritePress: () => void;
  onOptionsPress: () => void;
}

const ProductDetailsHeader: React.FC<IProductDetailsHeaderProps> = ({
  productTitle,
  isFavorite,
  headerOpacity,
  onBack,
  onFavoritePress,
  onOptionsPress,
}) => {
  return (
    <Animated.View 
      className="absolute top-0 left-0 right-0 z-50"
      style={{ opacity: headerOpacity }}
    >
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-12' : 'pt-8'} pb-4`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
            onPress={onBack}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Animated.Text 
            className="flex-1 text-center text-lg font-bold text-white px-5"
            style={{ opacity: headerOpacity }}
            numberOfLines={1}
          >
            {productTitle || 'Product Details'}
          </Animated.Text>
          
          <View className="flex-row gap-2">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
              onPress={onOptionsPress}
              activeOpacity={0.8}
            >
              <MaterialIcons name="more-vert" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
              onPress={onFavoritePress}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={isFavorite ? "favorite" : "favorite-border"} 
                size={24} 
                color={isFavorite ? '#F44336' : '#FFFFFF'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default ProductDetailsHeader;