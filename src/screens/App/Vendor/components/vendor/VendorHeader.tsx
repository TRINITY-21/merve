// components/VendorHeader.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { IVendorHeaderProps } from '../../../../../types/vendorTypes';

const VendorHeader: React.FC<IVendorHeaderProps> = ({
  title,
  onBack,
}) => {
  return (
    <LinearGradient 
      colors={['#FFCC00', '#FFB300']} 
      className="flex-row items-center pt-12 px-4 pb-5"
    >
      <TouchableOpacity 
        onPress={onBack} 
        className="mr-3"
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={26} color="#F5F5F5" />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-[#F5F5F5]">
        {title}
      </Text>
    </LinearGradient>
  );
};

export default VendorHeader;