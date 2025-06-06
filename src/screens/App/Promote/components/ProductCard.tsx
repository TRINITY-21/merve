// components/ProductCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    Text,
    View,
} from 'react-native';
import { IProductCardProps } from '../../../../types/promoteTypes';

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      className="bg-white mx-5 mt-5 rounded-2xl p-4 flex-row shadow-lg"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
      }}
    >
      <Image 
        source={{ uri: product.image }} 
        className="w-20 h-20 rounded-xl mr-4" 
      />
      
      <View className="flex-1">
        <Text 
          className="text-base font-bold text-[#212121] mb-1 leading-5"
          numberOfLines={2}
        >
          {product.title}
        </Text>
        
        <Text className="text-lg font-extrabold text-[#FFCC00] mb-2">
          GHS {product.price.toFixed(2)}
        </Text>
        
        <View className="flex-row gap-4">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="visibility" size={14} color="#757575" />
            <Text className="text-xs text-[#757575]">
              {product.currentViews} views
            </Text>
          </View>
          
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="favorite" size={14} color="#757575" />
            <Text className="text-xs text-[#757575]">
              {product.currentSaves} saves
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default ProductCard;