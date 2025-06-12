
// DateTimeSelector.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
    <View className="mb-4">
        <Typography  variant="semibold" size={14} className="text-base font-bold" style={{ color: colors.text.primary }}>
            Date & Time
        </Typography>
        <View className="flex-row gap-3">
            <TouchableOpacity
                className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm shadow-black/10 elevation-2 gap-2"
                onPress={onDatePress}
                activeOpacity={0.7}
            >
                <MaterialIcons name="event" size={20} color={colors.accent} />
                <Typography variant="regular" size={12} className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {selectedDate.toLocaleDateString()}
                </Typography>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-4 shadow-sm shadow-black/10 elevation-2 gap-2"
                onPress={onTimePress}
                activeOpacity={0.7}
            >
                <MaterialIcons name="access-time" size={20} color={colors.accent} />
                <Typography variant="regular" size={12} className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                    {selectedTime.toTimeString().slice(0, 5)}
                </Typography>
            </TouchableOpacity>
        </View>
    </View>
);
