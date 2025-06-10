// components/ProfessionalStatsCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
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
    <View className="bg-white rounded-2xl p-6 mb-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-1">
          <Typography className="text-lg text-slate-800 mb-1" variant="semibold" size={16}>
            {title}
          </Typography>
          {subtitle && (
            <Typography className="text-sm text-slate-500" variant="medium" size={14}>
              {subtitle}
            </Typography>
          )}
        </View>
        {onPress && (
          <MaterialIcons name="chevron-right" size={20} color="#94a3b8" />
        )}
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between w-full">
        {stats.map((stat, index) => (
          <View key={index} className="items-center">
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
            <Typography 
              className="text-xl mb-1" 
              variant="bold"
              size={20}
              style={{ color: stat.color || '#0f172a' }}
            >
              {stat.value}
            </Typography>

            {/* Label */}
            <Typography className="text-xs text-slate-600 text-center leading-4" variant="medium" size={12}>
              {stat.label}
            </Typography>

            {/* Trend */}
            {stat.trend && stat.trendValue && (
              <View className="flex-row items-center mt-1">
                <MaterialIcons 
                  name={getTrendIcon(stat.trend) as any} 
                  size={12} 
                  color={getTrendColor(stat.trend)} 
                />
                <Typography 
                  className="text-xs ml-1"
                  variant="semibold"
                  size={12}
                  style={{ color: getTrendColor(stat.trend) }}
                >
                  {stat.trendValue}
                </Typography>
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
