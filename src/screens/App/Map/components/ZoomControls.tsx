// components/map/ZoomControls.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';


interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  style?: any;
  position?: 'right' | 'left';
  top?: number;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  style,
  position = 'right',
  top
}) => {
  const positionClass = position === 'right' ? 'right-4' : 'left-4';
  const topClass = top ? `top-[${top}px]` : Platform.OS === 'ios' ? 'top-64' : 'top-48';

  return (
    <View 
      className={`absolute z-40 flex-col ${positionClass} ${topClass}`}
      style={style}
    >
      <TouchableOpacity
        className="w-11 h-11 rounded-full bg-white items-center justify-center mb-2 shadow-md border border-gray-100"
        onPress={onZoomIn}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        className="w-11 h-11 rounded-full bg-white items-center justify-center mb-2 shadow-md border border-gray-100"
        onPress={onZoomOut}
        activeOpacity={0.7}
      >
        <MaterialIcons name="remove" size={24} color={colors.text.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        className="w-11 h-11 rounded-full bg-yellow-400 items-center justify-center shadow-md border border-gray-100"
        onPress={onResetZoom}
        activeOpacity={0.7}
      >
        <MaterialIcons name="my-location" size={20} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};