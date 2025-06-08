// components/BenefitsSection.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { IBenefitsSectionProps } from '../../../../../types/vendorTypes';
import BenefitCard from './BenefitCard';


const BenefitsSection: React.FC<IBenefitsSectionProps> = ({ benefits }) => {
  return (
    <View className="px-4 py-4">
      <Text className="text-xl font-semibold text-[#212121] mb-4">
        Why Join Peyba?
      </Text>
      
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index} 
          benefit={benefit} 
          index={index} 
        />
      ))}
    </View>
  );
};

export default BenefitsSection;