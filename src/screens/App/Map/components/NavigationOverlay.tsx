// components/map/NavigationOverlay.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';

export interface NavigationStats {
  distance: number;
  time: number;
}

interface NavigationOverlayProps {
  visible: boolean;
  progress?: number;
  stats?: NavigationStats;
  distanceTraveled?: number;
  onStop: () => void;
  title?: string;
  showProgress?: boolean;
  position?: 'top' | 'bottom';
  compact?: boolean;
}

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  visible,
  progress = 0,
  stats,
  distanceTraveled = 0,
  onStop,
  title = 'Navigation Active',
  showProgress = true,
  position = 'top',
  compact = false
}) => {
  if (!visible) return null;

  const positionClass = position === 'top' 
    ? Platform.OS === 'ios' ? 'top-28' : 'top-16'
    : Platform.OS === 'ios' ? 'bottom-28' : 'bottom-16';

  return (
    <View className={`absolute left-4 right-4 z-50 ${positionClass}`}>
      <View className={`bg-blue-500 bg-opacity-95 rounded-2xl shadow-lg ${compact ? 'p-3' : 'p-4'}`}>
        <View className="flex-row justify-between items-center mb-2">
          <Typography 
            variant="bold" 
            size={compact ? 14 : 16} 
            className="text-white"
          >
            {title}
          </Typography>
          <TouchableOpacity
            onPress={onStop}
            className="w-7 h-7 rounded-full bg-white bg-opacity-20 items-center justify-center"
          >
            <MaterialIcons name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        {showProgress && (
          <View className="my-3">
            <View className="h-1.5 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <View
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
            <Typography 
              variant="semibold" 
              size={12} 
              className="text-white text-center mt-1"
            >
              {progress.toFixed(0)}% Complete
            </Typography>
          </View>
        )}

        {/* Navigation Stats */}
        {stats && stats.time > 0 && (
          <View className="flex-row justify-around">
            <View className="flex-row items-center">
              <MaterialIcons name="schedule" size={18} color={colors.white} />
              <Typography 
                variant="semibold" 
                size={compact ? 12 : 14} 
                className="text-white ml-1"
              >
                {stats.time} min
              </Typography>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="straighten" size={18} color={colors.white} />
              <Typography 
                variant="semibold" 
                size={compact ? 12 : 14} 
                className="text-white ml-1"
              >
                {stats.distance.toFixed(1)} km
              </Typography>
            </View>
            {showProgress && (
              <View className="flex-row items-center">
                <MaterialIcons name="trending-up" size={18} color={colors.white} />
                <Typography 
                  variant="semibold" 
                  size={compact ? 12 : 14} 
                  className="text-white ml-1"
                >
                  {distanceTraveled.toFixed(1)} km done
                </Typography>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};