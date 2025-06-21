import React from 'react';
import { View } from 'react-native';
import { Button, Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { ICTASectionProps } from '../../../../../types/vendorTypes';

const CTASection: React.FC<ICTASectionProps> = ({ onStartAsAgent }) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
      }}
    >
      <Button
        title="Start as an Agent"
        onPress={onStartAsAgent}
        size="large"
        icon="rocket-launch"
        iconPosition="left"
        style={{
          width: '100%',
          shadowColor: colors.shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 10,
        }}
      />

      <Typography
        style={{
          fontSize: 14,
          color: colors.text.secondary,
          marginTop: 16,
        }}
      >
        Free for the first month!
      </Typography>
    </View>
  );
};

export default CTASection;
