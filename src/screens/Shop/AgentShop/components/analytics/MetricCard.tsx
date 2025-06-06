// components/MetricCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IMetricCardProps } from '../../../../../types/analyticTypes';

const MetricCard: React.FC<IMetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = '#FFCC00' 
}) => {
  return (
    <View className="bg-white rounded-xl p-4 flex-1 shadow-sm">
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: color + '20' }}
      >
        <MaterialIcons name={icon as any} size={24} color={color} />
      </View>
      
      <View className="flex-1">
        <Text className="text-xs text-gray-500 mb-1">{title}</Text>
        <Text className="text-2xl font-extrabold text-gray-900 mb-1">{value}</Text>
        
        {change !== undefined && (
          <View className="flex-row items-center">
            <MaterialIcons 
              name={change >= 0 ? "trending-up" : "trending-down"} 
              size={14} 
              color={change >= 0 ? '#4CAF50' : '#F44336'} 
            />
            <Text 
              className="text-xs font-semibold ml-1"
              style={{ color: change >= 0 ? '#4CAF50' : '#F44336' }}
            >
              {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MetricCard;