import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { ICTASectionProps } from '../../../../../types/vendorTypes';

const CTASection: React.FC<ICTASectionProps> = ({ onStartAsAgent }) => {
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={onStartAsAgent}
        activeOpacity={0.8}
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <LinearGradient
          colors={colors.gradient.primary} // Assuming this is your primary gradient
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 24,
            gap: 8,
          }}
        >
          <MaterialIcons name="rocket-launch" size={20} color={colors.white} />
          <Typography variant='bold'
            style={{
              fontSize: 18,
              color: colors.white,
            }}
          >
            Start as an Agent
          </Typography>
        </LinearGradient>
      </TouchableOpacity>

      <Typography
        style={{
          fontSize: 14,
          color: colors.text.secondary,
          marginTop: 12,
        }}
      >
        Free for the first month!
      </Typography>
    </View>
  );
};

export default CTASection;
