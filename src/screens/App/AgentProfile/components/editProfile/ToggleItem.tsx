// components/ToggleItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Switch,
    Text,
    View,
} from 'react-native';
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
        <Text className="text-base font-semibold text-gray-800">
          {data.label}
        </Text>
      </View>
      <Switch
        value={data.value}
        onValueChange={data.onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#FFCC00' }}
        thumbColor="white"
      />
    </View>
  );
};