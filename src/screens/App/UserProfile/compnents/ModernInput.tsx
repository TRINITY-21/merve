// components/ProfessionalCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';

export interface ProfessionalCardProps {
  label: string;
  value: string;
  icon: string;
  onPress?: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  label,
  value,
  icon,
  onPress,
}) => {
  const CardContent = () => (
    <View className="flex-row items-center bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-200/50 mb-3">
      <View className="w-11 h-11 rounded-xl bg-white/80 items-center justify-center mr-3 shadow-sm">
        <MaterialIcons name={icon as any} size={20} color={colors.primary} />
      </View>
      
      <View className="flex-1">
        <Text className="text-xs font-medium text-slate-600 mb-0.5 uppercase tracking-wide">
          {label}
        </Text>
        <Text className="text-base font-semibold text-slate-800">
          {value || 'Not specified'}
        </Text>
      </View>
      
      {onPress && (
        <MaterialIcons 
          name="chevron-right" 
          size={20} 
          color={colors.gray.medium} 
        />
      )}
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