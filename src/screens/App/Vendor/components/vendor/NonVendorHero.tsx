import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { INonVendorHeroProps } from '../../../../../types/vendorTypes';

const NonVendorHero: React.FC<INonVendorHeroProps> = ({ onGetStarted }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        marginHorizontal: 20,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary + '20',
          borderRadius: 30,
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <MaterialIcons name="store" size={32} color={colors.primary} />
      </View>
      
      <Typography variant='bold'
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: colors.text.primary,
          textAlign: 'center',
        }}
      >
        Become a MoMo Agent
      </Typography>
      
      <Typography
        style={{
          fontSize: 16,
          color: colors.text.secondary,
          textAlign: 'center',
          marginTop: 8,
          lineHeight: 24,
        }}
      >
        Join thousands of agents and grow your business with Peyba
      </Typography>
    </View>
  );
};

export default NonVendorHero;
