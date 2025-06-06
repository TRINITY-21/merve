// components/NonVendorHero.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { INonVendorHeroProps } from '../../../../../types/vendorTypes';

const NonVendorHero: React.FC<INonVendorHeroProps> = ({ onGetStarted }) => {
  return (
    <LinearGradient
      colors={['#FFCC00', '#FFB300']}
      className="m-2 p-5 rounded-2xl items-center"
    >
      <MaterialIcons name="store" size={64} color="white" />
      <Text className="text-2xl font-bold text-white mt-4">
        Become a MoMo Agent
      </Text>
      <Text className="text-base text-white opacity-90 text-center mt-2">
        Join thousands of agents and grow your business with MoMoGo
      </Text>
    </LinearGradient>
  );
};

export default NonVendorHero;