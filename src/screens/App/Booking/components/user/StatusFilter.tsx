import React from 'react';
import { ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { Typography } from '../../../../../components/common';
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
  onStatusChange,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="px-5 mb-2"
    contentContainerStyle={{ gap: 10, alignItems: 'center' }}
  >
    {filters.map((filter) => {
      const isSelected = selectedStatus === filter.key;

      const baseStyle: ViewStyle = {
        borderColor: filter.color,
        backgroundColor: isSelected ? filter.color : colors.white,
        minHeight: 34, // locks vertical height
        justifyContent: 'center',
        alignItems: 'center',
      };

      return (
        <TouchableOpacity
          key={filter.key}
          onPress={() => onStatusChange(filter.key)}
          activeOpacity={0.8}
          className="px-4 rounded-xl border mb-4 mt-1"
          style={baseStyle}
        >
          <Typography variant='semibold' size={12}
            className="text-sm font-medium text-center"
            style={{
              color: isSelected ? colors.white : colors.text.secondary,
              lineHeight: 18, // lock line height for consistency
            }}
          >
            {filter.label}
          </Typography>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);
