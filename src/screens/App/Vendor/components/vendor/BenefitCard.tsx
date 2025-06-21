import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IBenefitCardProps } from '../../../../../types/vendorTypes';

const BenefitCard: React.FC<IBenefitCardProps> = ({ benefit }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.07,
        // shadowRadius: 10,
        // elevation: 4,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}
      >
        <MaterialIcons
          name={benefit.icon as any}
          size={24}
          color={colors.primary}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text.primary,
            marginBottom: 4,
          }}
        >
          {benefit.title}
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: colors.text.secondary,
            lineHeight: 20,
          }}
        >
          {benefit.desc}
        </Typography>
      </View>
    </View>
  );
};

export default BenefitCard;
