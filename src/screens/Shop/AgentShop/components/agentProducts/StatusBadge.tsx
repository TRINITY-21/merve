import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { colors } from '../../../../../constants/theme/colors';
import { IStatusBadgeProps } from '../../../../../types/agentProductTypes';

const StatusBadge: React.FC<IStatusBadgeProps> = ({ 
  status, 
  variant = 'list' 
}) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return colors.success;
      case 'paused': return colors.warning;
      case 'draft': return colors.gray.medium;
      case 'out_of_stock': return colors.error;
      default: return colors.gray.medium;
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'active': return 'Active';
      case 'paused': return 'Paused';
      case 'draft': return 'Draft';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const positionClass = variant === 'grid' 
    ? 'absolute top-2 right-2' 
    : 'absolute top-1 right-1';

  return (
    <View 
      className={`${positionClass} rounded-lg px-1.5 py-0.5`}
      style={{ backgroundColor: getStatusColor(status) }}
    >
      <Text className="text-xs font-bold text-white">
        {getStatusLabel(status)}
      </Text>
    </View>
  );
};

export default StatusBadge;