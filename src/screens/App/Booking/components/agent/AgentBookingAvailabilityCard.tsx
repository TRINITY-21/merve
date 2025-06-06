
// AvailabilityCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Switch, Text, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';

interface AvailabilityCardProps {
  isAvailable: boolean;
  onToggle: (value: boolean) => void;
}

export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  isAvailable,
  onToggle
}) => (
  <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/10 elevation-2">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 gap-3">
        <MaterialIcons 
          name={isAvailable ? 'check-circle' : 'cancel'} 
          size={24} 
          color={isAvailable ? colors.success : colors.error} 
        />
        <View>
          <Text className="text-base font-bold mb-0.5" style={{ color: colors.text.primary }}>
            {isAvailable ? 'Currently Available' : 'Currently Unavailable'}
          </Text>
          <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
            {isAvailable ? 'Accepting new bookings' : 'Not accepting bookings'}
          </Text>
        </View>
      </View>
      <Switch
        value={isAvailable}
        onValueChange={onToggle}
        trackColor={{ false: colors.gray.light, true: colors.success + '40' }}
        thumbColor={isAvailable ? colors.success : colors.gray.medium}
      />
    </View>
  </View>
);