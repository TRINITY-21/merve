import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IVendorHeaderProps } from '../../../../../types/vendorTypes';

const VendorHeader: React.FC<IVendorHeaderProps> = ({ title, onBack }) => {
  return (
    <LinearGradient
      colors={colors.gradient.primary}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 60 :10, // ~pt-12
        paddingHorizontal: 16, // px-4
        paddingBottom: 20, // pb-5
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.7}
        style={{
          marginRight: 12,
        }}
      >
        <Ionicons name="chevron-back" size={26} color={colors.white} />
      </TouchableOpacity>

      <Typography
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.white,
        }}
      >
        {title}
      </Typography>
    </LinearGradient>
  );
};

export default VendorHeader;
