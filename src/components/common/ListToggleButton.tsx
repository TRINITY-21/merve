import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GestureResponderEvent, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { Typography } from './Typography';

interface ListToggleButtonProps {
  toggleList: (event?: GestureResponderEvent) => void;
}

const ListToggleButton: React.FC<ListToggleButtonProps> = ({ toggleList }) => {
  return (
    <TouchableOpacity
      onPress={toggleList}
      activeOpacity={0.8}
      className={`absolute right-4 z-0 ${Platform.OS === 'ios' ? 'bottom-24' : 'bottom-20'} pb-2`}
    >
      <LinearGradient
        colors={colors.gradient.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 9999,
        } as ViewStyle}
      >
        <MaterialIcons name="list" size={20} color={colors.white} />
        <Typography
          variant="bold"
          size={13}
          className="text-white ml-1.5 tracking-wide"
        >
          List
        </Typography>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ListToggleButton;
