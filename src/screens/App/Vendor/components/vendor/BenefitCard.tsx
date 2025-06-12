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
        marginBottom: 8,
        marginHorizontal: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 0,
        gap: 12,
        padding: 16,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 20,
          backgroundColor: colors.secondary + '33', // 20% opacity
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons
          name={benefit.icon as any}
          size={24}
          color={colors.secondary}
        />
      </View>

      <View style={{ flex: 1, }}>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#212121',
          }}
        >
          {benefit.title}
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: '#757575',
            marginTop: 4,
          }}
        >
          {benefit.desc}
        </Typography>
      </View>
    </View>
  );
};

export default BenefitCard;
