// components/HoursItem.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IHoursItemProps } from '../../../../../types/editProfileTypes';

export const HoursItem: React.FC<IHoursItemProps> = ({
  day,
  hours,
  onWorkingHoursChange,
}) => {
  return (
    <View className="mb-5 pb-4 border-b border-gray-200">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-base font-semibold text-gray-800">
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </Text>
        <Switch
          value={hours.isOpen}
          onValueChange={(value) => onWorkingHoursChange(day as any, 'isOpen', value)}
          trackColor={{ false: '#E0E0E0', true: '#FFCC00' }}
          thumbColor="white"
        />
      </View>
      
      {hours.isOpen && (
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-600 mb-2">
              Open
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-200 rounded-lg px-3 py-2.5">
              <Text className="text-base font-semibold text-gray-800">
                {hours.open}
              </Text>
              <MaterialIcons name="access-time" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-600 mb-2">
              Close
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between bg-gray-200 rounded-lg px-3 py-2.5">
              <Text className="text-base font-semibold text-gray-800">
                {hours.close}
              </Text>
              <MaterialIcons name="access-time" size={16} color="#757575" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};