// components/ToggleItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Switch,
  View
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IToggleItemProps } from '../../../../../types/editProfileTypes';

export const ToggleItem: React.FC<IToggleItemProps> = ({ data }) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center flex-1 gap-3">
        <MaterialIcons 
          name={data.icon as any} 
          size={20} 
          color={data.iconColor} 
        />
        <Typography variant="regular" size={14} className="text-base font-semibold text-gray-800">
          {data.label}
        </Typography>
      </View>
      <Switch
        value={data.value}
        onValueChange={data.onValueChange}
        trackColor={{ false: '#E0E0E0', true: colors.primary }}
        thumbColor="white"
      />
    </View>
  );
};