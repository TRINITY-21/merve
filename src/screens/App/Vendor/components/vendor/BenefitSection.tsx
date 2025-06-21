// components/BenefitsSection.tsx
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IBenefitsSectionProps } from '../../../../../types/vendorTypes';
import BenefitCard from './BenefitCard';


const BenefitsSection: React.FC<IBenefitsSectionProps> = ({ benefits }) => {
  return (
    <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
      <Typography style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 20,
      }}>
        Why Join Peyba?
      </Typography>
      
      <View style={{ gap: 16 }}>
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index} 
            benefit={benefit} 
            index={index} 
          />
        ))}
      </View>
    </View>
  );
};

export default BenefitsSection;