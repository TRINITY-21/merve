// components/GradientButton.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  gradientColors?: [string, string];
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  icon,
  iconPosition = 'right',
  gradientColors = colors.gradient.primary,
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 'py-2 px-4';
      case 'large': return 'py-4 px-8';
      default: return 'py-3 px-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 22;
      default: return 18;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className="w-full"
    >
      <LinearGradient
        colors={disabled || loading ? [colors.gray.medium, colors.gray.dark] : gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`rounded-xl flex-row items-center justify-center ${getSize()} ${disabled ? 'opacity-80' : ''}`}
      >
        {loading ? (
          <Text className={`text-white font-bold ${getTextSize()}`}>
            Loading...
          </Text>
        ) : (
          <View className="flex-row items-center">
            {icon && iconPosition === 'left' && (
              <MaterialIcons 
                name={icon as any} 
                size={getIconSize()} 
                color={colors.white} 
                style={{ marginRight: 8 }} 
              />
            )}
            <Text className={`text-white font-bold ${getTextSize()}`}>
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <MaterialIcons 
                name={icon as any} 
                size={getIconSize()} 
                color={colors.white} 
                style={{ marginLeft: 8 }} 
              />
            )}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};