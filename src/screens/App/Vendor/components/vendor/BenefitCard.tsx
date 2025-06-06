// components/BenefitCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IBenefitCardProps } from '../../../../../types/vendorTypes';

const BenefitCard: React.FC<IBenefitCardProps> = ({ benefit, index }) => {
  return (
    <View className="bg-white flex-row mb-1 p-5 mx-0 rounded-2xl shadow-sm">
      <View className="w-14 h-14 rounded-2xl bg-[#FFCC00]/20 items-center justify-center">
        <MaterialIcons 
          name={benefit.icon as any} 
          size={32} 
          color="#FFCC00" 
        />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-base font-semibold text-[#212121]">
          {benefit.title}
        </Text>
        <Text className="text-sm text-[#757575] mt-1">
          {benefit.desc}
        </Text>
      </View>
    </View>
  );
};

export default BenefitCard;