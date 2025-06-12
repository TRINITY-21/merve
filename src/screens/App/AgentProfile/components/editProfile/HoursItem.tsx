// components/HoursItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Switch,
  TouchableOpacity,
  View
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IHoursItemProps } from '../../../../../types/editProfileTypes';

export const HoursItem: React.FC<IHoursItemProps> = ({
  day,
  hours,
  onWorkingHoursChange,
}) => {
  return (
    <View className="mb-5 pb-4 border-b border-gray-200">
      <View className="flex-row items-center justify-between mb-3">
        <Typography className="text-base font-semibold text-gray-800">
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </Typography>
        <Switch
          value={hours.isOpen}
          onValueChange={(value) => onWorkingHoursChange(day as any, 'isOpen', value)}
          trackColor={{ false: '#E0E0E0', true: colors.primary }}
          thumbColor="white"
        />
      </View>
      
      {hours.isOpen && (
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Typography variant='regular' size={12} className="text-xs font-semibold text-gray-600 mb-2">
              Open
            </Typography>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-200 rounded-lg px-3 py-2.5">
              <Typography variant='regular' size={12} className="text-base font-semibold text-gray-800">
                {hours.open}
              </Typography>
              <MaterialIcons name="access-time" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1">
            <Typography variant='regular' size={12} className="text-xs font-semibold text-gray-600 mb-2">
              Close
            </Typography>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-200 rounded-lg px-3 py-2.5">
              <Typography variant='regular' size={12} className="text-base font-semibold text-gray-800">
                {hours.close}
              </Typography>
              <MaterialIcons name="access-time" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};