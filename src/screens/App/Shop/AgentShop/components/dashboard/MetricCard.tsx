import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

const { width: screenWidth } = Dimensions.get('window');

interface IMetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: string;
  color?: string;
  onPress?: () => void;
}

const MetricCard: React.FC<IMetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = colors.primary, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 shadow-sm shadow-black/10 elevation-4"
      style={{ width: (screenWidth - 52) / 2 }}
      onPress={onPress}
      activeOpacity={0.8}
    >
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
          <View className="flex-row items-center gap-1">
            <MaterialIcons 
              name={change >= 0 ? "trending-up" : "trending-down"} 
              size={14} 
              color={change >= 0 ? colors.success : colors.error} 
            />
            <Text className={`text-xs font-semibold ${
              change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MetricCard;