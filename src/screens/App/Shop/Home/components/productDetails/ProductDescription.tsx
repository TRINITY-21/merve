// components/ProductDescription.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IProductDescriptionProps } from '../../../../../../types/productDetailsTypes';

const ProductDescription: React.FC<IProductDescriptionProps> = ({
  description,
  showFull,
  onToggle,
}) => {
  return (
    <View className="bg-white px-5 py-5">
      <Text 
        className="text-base leading-6 text-text-primary mb-3"
        numberOfLines={showFull ? undefined : 4}
      >
        {description}
      </Text>
      <TouchableOpacity
        className="flex-row items-center gap-1 self-start"
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Text className="text-sm font-semibold text-accent">
          {showFull ? 'Read less' : 'Read more'}
        </Text>
        <MaterialIcons 
          name={showFull ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={16} 
          color="#00BFA5" 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductDescription;