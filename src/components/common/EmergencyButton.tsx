import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Platform,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/theme/colors';
import { Typography } from './Typography';


interface EmergencyButtonProps {
  quickCash: {
    show: (event?: GestureResponderEvent) => void;
  };
  setShowUrgentSheet: (value: boolean) => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ quickCash,setShowUrgentSheet }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.6,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <TouchableOpacity
      onPress={() => {quickCash.show; setShowUrgentSheet(true);}}
      activeOpacity={0.85}
      className={`absolute left-1.5 z-0 ${Platform.OS === 'ios' ? 'bottom-24' : 'bottom-20'} pb-2`}
    >
      <LinearGradient
        colors={[colors.error, colors.error, colors.error]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 9999,
        } as ViewStyle}
      >
        <MaterialIcons name="crisis-alert" size={20} color={colors.white} />
        <Typography
          variant="bold"
          size={12}
          className="text-white ml-1.5 tracking-wide"
        >
          Live Agents
        </Typography>
        <Animated.View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 8,
            backgroundColor: colors.vendor.mtn,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EmergencyButton;
