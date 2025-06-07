// components/ProfessionalStatsCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';

interface StatItem {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

interface ProfessionalStatsCardProps {
  title: string;
  subtitle?: string;
  stats: StatItem[];
  onPress?: () => void;
}

export const ProfessionalStatsCard: React.FC<ProfessionalStatsCardProps> = ({ 
  title, 
  subtitle,
  stats, 
  onPress 
}) => {
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '#10b981'; // green
      case 'down': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'trending-flat';
    }
  };

  const CardContent = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-800 mb-1">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-slate-500 font-medium">
              {subtitle}
            </Text>
          )}
        </View>
        {onPress && (
          <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
        )}
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between">
        {stats.map((stat, index) => (
          <View key={index} className="flex-1 items-center">
            {/* Icon */}
            {stat.icon && (
              <View className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center mb-2">
                <MaterialIcons 
                  name={stat.icon as any} 
                  size={20} 
                  color={stat.color || colors.primary} 
                />
              </View>
            )}

            {/* Value */}
            <Text 
              className="text-xl font-bold mb-1" 
              style={{ color: stat.color || '#0f172a' }}
            >
              {stat.value}
            </Text>

            {/* Label */}
            <Text className="text-xs text-slate-600 font-medium text-center leading-4">
              {stat.label}
            </Text>

            {/* Trend */}
            {stat.trend && stat.trendValue && (
              <View className="flex-row items-center mt-1">
                <MaterialIcons 
                  name={getTrendIcon(stat.trend) as any} 
                  size={12} 
                  color={getTrendColor(stat.trend)} 
                />
                <Text 
                  className="text-xs font-semibold ml-1"
                  style={{ color: getTrendColor(stat.trend) }}
                >
                  {stat.trendValue}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};
