// components/InfoCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  View
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { IInfoCardProps } from '../../../../../types/editProfileTypes';

export const InfoCard: React.FC<IInfoCardProps> = ({ 
  title, 
  content, 
  icon = 'info' 
}) => {
  return (
    <View className="flex-row bg-teal-50 rounded-2xl p-4 mb-5 gap-3">
      <MaterialIcons name={icon as any} size={24} color="#00BFA5" />
      <View className="flex-1">
        <Typography variant='semibold' size={16} className="text-base font-bold text-gray-800 mb-1">
          {title}
        </Typography>
        <Typography variant='regular' size={12} className="text-sm text-gray-600 leading-5">
          {content}
        </Typography>
      </View>
    </View>
  );
};