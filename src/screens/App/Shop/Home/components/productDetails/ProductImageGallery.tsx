// components/productDetails/ProductImageGallery.tsx

import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProductImageGalleryProps {
  images: string[];
  selectedIndex: number;
  isPromoted?: boolean;
  discount?: number;
  isFavorite: boolean;
  onImagePress: () => void;
  onImageChange: (index: number) => void;
  onFavoritePress: () => void;
  onOptionsPress: () => void;
}

const { width } = Dimensions.get('window');

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
  const insets = useSafeAreaInsets();

  return (
    <View className="relative">
      {/* Main image */}
      <TouchableOpacity onPress={onImagePress} activeOpacity={0.9}>
        <Image
          source={{ uri: images[selectedIndex] }}
          style={{ width, height: width * 0.8 }}
          className="bg-gray-100"
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Badges positioned at top-left, same level as header buttons */}
      <View 
        className="absolute top-0 left-0 z-40"
        style={{ paddingTop: 50 + 12 }} // Same padding as header buttons would have
      >
        <View className="flex-row gap-2 px-5">
          {/* Featured badge */}
          {isPromoted && (
            <View className="bg-teal-500 px-3 py-1 rounded-full flex-row items-center">
              <Text className="text-white text-xs font-semibold mr-1">⭐</Text>
              <Text className="text-white text-xs font-semibold">Featured</Text>
            </View>
          )}
          
          {/* Discount badge */}
          {discount && (
            <View className="bg-red-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">-{discount}%</Text>
            </View>
          )}
        </View>
      </View>

      {/* Floating action buttons positioned at top-right */}
      <View 
        className="absolute top-0 right-0 z-40"
        style={{ paddingTop: 50 + 12 }} // Same padding as badges
      >
        <View className="flex-row gap-2 px-5">
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

      {/* Image pagination dots */}
      {images.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <View className="flex-row gap-2">
              {images.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onImageChange(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === selectedIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Thumbnail strip (if you want to show thumbnails) */}
      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onImageChange(index)}
              className={`mr-3 rounded-lg overflow-hidden ${
                index === selectedIndex ? 'border-2 border-yellow-500' : 'border border-gray-200'
              }`}
            >
              <Image
                source={{ uri: image }}
                className="w-16 h-16 bg-gray-100"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ProductImageGallery;