// components/SettingItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { ISettingItemProps } from '../../../../../types/agentSettingsTypes';

const SettingItem: React.FC<ISettingItemProps> = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 border-t border-gray-light">
      <View className="flex-row items-center flex-1">
        <MaterialIcons name={icon as any} size={20} color="#757575" />
        <View className="ml-4 flex-1">
          <Text className="text-base font-semibold text-text-primary">
            {title}
          </Text>
          <Text className="text-xs text-text-secondary mt-0.5">
            {subtitle}
          </Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#FFCC00' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
};

export default SettingItem;