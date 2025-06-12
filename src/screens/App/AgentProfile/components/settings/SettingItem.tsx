// components/SettingItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Switch, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
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
        <MaterialIcons name={icon as any} size={20} color={colors.gradient.dark[0]} />
        <View className="ml-4 flex-1">
          <Typography variant="regular" size={14} className="text-base font-semibold text-text-primary">
            {title}
          </Typography>
          <Typography variant="regular" size={12} className="text-xs text-text-secondary mt-0.5">
            {subtitle}
          </Typography>
        </View>
      </View>

      {Platform.OS === 'ios' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.gray.light, true: colors.accent }}
          thumbColor={colors.white}
        />
      ) :
        <TouchableOpacity
          onPress={() => onValueChange(!value)}
          activeOpacity={0.7}
        >

          <View
            className="w-14 h-8 rounded-2xl p-1 justify-center"
            style={{ backgroundColor: value ? colors.accent : colors.gray.light }}

          >
            <View
              className={`w-6 h-6 rounded-xl bg-white shadow-md shadow-black/20 elevation-3 ${value ? 'self-end' : 'self-start'
                }`}
            />
          </View>

        </TouchableOpacity>

      }
    </View>
  );
};

export default SettingItem;