
// WorkingHoursCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IWorkingHours } from '../../../../../types/agentBookingTypes';

interface WorkingHoursCardProps {
  workingHours: IWorkingHours;
  onStartTimePress: () => void;
  onEndTimePress: () => void;
}

export const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({
  workingHours,
  onStartTimePress,
  onEndTimePress
}) => (
  <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/10 elevation-2">
    <View className="flex-row gap-3">
      <TouchableOpacity 
        className="flex-1 flex-row items-center bg-gray-100 rounded-xl p-3 gap-2"
        onPress={onStartTimePress}
      >
        <MaterialIcons name="access-time" size={20} color={colors.accent} />
        <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
          Start: {workingHours.start}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="flex-1 flex-row items-center bg-gray-100 rounded-xl p-3 gap-2"
        onPress={onEndTimePress}
      >
        <MaterialIcons name="access-time" size={20} color={colors.accent} />
        <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
          End: {workingHours.end}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
