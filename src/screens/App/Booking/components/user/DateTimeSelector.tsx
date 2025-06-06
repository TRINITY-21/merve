
// DateTimeSelector.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';

interface DateTimeSelectorProps {
    selectedDate: Date;
    selectedTime: Date;
    onDatePress: () => void;
    onTimePress: () => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
    selectedDate,
    selectedTime,
    onDatePress,
    onTimePress
}) => (
    <View className="mb-6">
        <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
            Date & Time
        </Text>
        <View className="flex-row gap-3">
            <TouchableOpacity
                className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm shadow-black/10 elevation-2 gap-2"
                onPress={onDatePress}
                activeOpacity={0.7}
            >
                <MaterialIcons name="event" size={20} color={colors.accent} />
                <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {selectedDate.toLocaleDateString()}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm shadow-black/10 elevation-2 gap-2"
                onPress={onTimePress}
                activeOpacity={0.7}
            >
                <MaterialIcons name="access-time" size={20} color={colors.accent} />
                <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {selectedTime.toTimeString().slice(0, 5)}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);
