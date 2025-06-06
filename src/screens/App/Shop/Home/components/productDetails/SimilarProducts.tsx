// components/SimilarProducts.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ISimilarProductsProps } from '../../../../../../types/productDetailsTypes';

const SimilarProducts: React.FC<ISimilarProductsProps> = ({
  products,
  visible,
  onClose,
  onProductPress,
}) => {
  if (!visible) return null;

  return (
    <View className="bg-background py-5">
      <View className="flex-row justify-between items-center px-5 mb-4">
        <Text className="text-lg font-bold text-text-primary">Similar Products</Text>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.8}
        >
          <MaterialIcons name="close" size={20} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-3">
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="w-40 bg-white rounded-xl p-3 shadow-sm"
              onPress={() => onProductPress(product.id)}
              activeOpacity={0.9}
            >
              <Image 
                source={{ uri: product.image }} 
                className="w-full h-30 rounded-lg mb-2"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text 
                  className="text-xs font-semibold text-text-primary mb-1 leading-4" 
                  numberOfLines={2}
                >
                  {product.title}
                </Text>
                <Text className="text-sm font-bold text-primary mb-1">
                  GHS {product.price.toFixed(2)}
                </Text>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="star" size={12} color="#FF9800" />
                  <Text className="text-xs text-text-secondary">{product.rating}</Text>
                  {product.agent.verified && (
                    <MaterialIcons name="verified" size={10} color="#00BFA5" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SimilarProducts;