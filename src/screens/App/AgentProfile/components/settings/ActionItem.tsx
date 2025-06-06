// components/ActionItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IActionItemProps } from '../../../../../types/agentSettingsTypes';

const ActionItem: React.FC<IActionItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  iconColor = '#00BFA5',
}) => {
  return (
    <TouchableOpacity 
      className="flex-row items-center px-5 py-4 border-t border-gray-light"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialIcons name={icon as any} size={20} color={iconColor} />
      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold text-accent">
          {title}
        </Text>
        <Text className="text-xs text-text-secondary mt-0.5">
          {subtitle}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#757575" />
    </TouchableOpacity>
  );
};

export default ActionItem;