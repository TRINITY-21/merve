
// StatusFilters.tsx
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IStatusFilter } from '../../../../../types/BookingTypes';

interface StatusFiltersProps {
    filters: IStatusFilter[];
    selectedStatus: string;
    onStatusChange: (status: string) => void;
}

export const StatusFilters: React.FC<StatusFiltersProps> = ({
    filters,
    selectedStatus,
    onStatusChange
}) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 mb-0"
        contentContainerStyle={{ gap: 10 }}
    >
        {filters.map((filter) => (
            <TouchableOpacity
                key={filter.key}
                className="px-4 py-2 rounded-2xl border-2 bg-white"
                style={{
                    borderColor: filter.color,
                    backgroundColor: selectedStatus === filter.key ? filter.color : colors.white
                }}
                onPress={() => onStatusChange(filter.key)}
                activeOpacity={0.7}
            >
                <Text
                    className="text-xs font-semibold"
                    style={{
                        color: selectedStatus === filter.key ? colors.white : colors.text.secondary
                    }}
                >
                    {filter.label}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);
