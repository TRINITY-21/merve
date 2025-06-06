// components/ProductImageGallery.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IProductImageGalleryProps } from '../../../../../../types/productDetailsTypes';

const { width: screenWidth } = Dimensions.get('window');

const ProductImageGallery: React.FC<IProductImageGalleryProps> = ({
  images,
  selectedIndex,
  isPromoted,
  discount,
  isFavorite,
  onImagePress,
  onImageChange,
  onFavoritePress,
  onOptionsPress,
}) => {
  return (
    <View className="relative h-96">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          onImageChange(index);
        }}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={{ width: screenWidth }}
            className="h-96"
            onPress={onImagePress}
            activeOpacity={0.9}
          >
            <Image 
              source={{ uri: image }} 
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Image Indicators */}
      <View className="absolute bottom-5 left-0 right-0 flex-row justify-center gap-2">
        {images.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-sm ${
              selectedIndex === index 
                ? 'w-6 bg-white' 
                : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </View>

      {/* Badges */}
      <View className="absolute top-15 left-5 gap-2">
        {isPromoted && (
          <View className="flex-row items-center bg-accent rounded-xl px-2 py-1 gap-1">
            <MaterialIcons name="star" size={12} color="#FFFFFF" />
            <Text className="text-xs font-bold text-white">Featured</Text>
          </View>
        )}
        {discount && (
          <View className="bg-error rounded-lg px-2 py-1">
            <Text className="text-xs font-bold text-white">-{discount}%</Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View className="absolute top-15 right-5 gap-2">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          onPress={onFavoritePress}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={isFavorite ? "favorite" : "favorite-border"} 
            size={20} 
            color={isFavorite ? '#F44336' : '#FFFFFF'} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          onPress={onOptionsPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="more-vert" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductImageGallery;