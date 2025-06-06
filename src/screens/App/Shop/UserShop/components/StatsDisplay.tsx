// components/StatsDisplay.tsx
import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { IStatsDisplayProps } from '../../../../../types/favoriteProductTypes';

export const StatsDisplay: React.FC<IStatsDisplayProps> = ({
  totalItems,
  inStockItems,
  onSaleItems,
}) => {
  return (
    <View className="flex-row items-center justify-center bg-white/15 rounded-2xl py-3 px-5 gap-5">
      <View className="items-center">
        <Text className="text-xl font-black text-[#1E3A5F] mb-0.5">
          {totalItems}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          Saved Items
        </Text>
      </View>
      
      <View className="w-px h-7.5 bg-white/30" />
      
      <View className="items-center">
        <Text className="text-xl font-black text-[#1E3A5F] mb-0.5">
          {inStockItems}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          In Stock
        </Text>
      </View>
      
      <View className="w-px h-7.5 bg-white/30" />
      
      <View className="items-center">
        <Text className="text-xl font-black text-[#1E3A5F] mb-0.5">
          {onSaleItems}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          On Sale
        </Text>
      </View>
    </View>
  );
};