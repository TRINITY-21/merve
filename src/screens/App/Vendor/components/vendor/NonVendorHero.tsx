import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { INonVendorHeroProps } from '../../../../../types/vendorTypes';

const NonVendorHero: React.FC<INonVendorHeroProps> = ({ onGetStarted }) => {
  return (
    <LinearGradient
      colors={colors.gradient.primary}
      style={{
        margin: 8,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
      }}
    >
      <MaterialIcons name="store" size={64} color={colors.white} />
      
      <Typography variant='bold'
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: colors.white,
          marginTop: 16,
        }}
      >
        Become a MoMo Agent
      </Typography>
      
      <Typography
        style={{
          fontSize: 16,
          color: colors.white,
          opacity: 0.9,
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        Join thousands of agents and grow your business with Peyba
      </Typography>
    </LinearGradient>
  );
};

export default NonVendorHero;
