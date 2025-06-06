// components/TypingIndicator.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { ITypingIndicatorProps } from '../../../../types/chatTypes';

export const TypingIndicator: React.FC<ITypingIndicatorProps> = ({ isVisible }) => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      dot1.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1
      );
      dot2.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 200 }),
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1
      );
      dot3.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 400 }),
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1
      );
    }
  }, [isVisible]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(dot1.value, [0, 1], [0.8, 1.2]) }],
    opacity: interpolate(dot1.value, [0, 1], [0.4, 1]),
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(dot2.value, [0, 1], [0.8, 1.2]) }],
    opacity: interpolate(dot2.value, [0, 1], [0.4, 1]),
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(dot3.value, [0, 1], [0.8, 1.2]) }],
    opacity: interpolate(dot3.value, [0, 1], [0.4, 1]),
  }));

  if (!isVisible) return null;

  return (
    <View className="flex-row items-center py-2">
      <Animated.View 
        style={dot1Style}
        className="w-2 h-2 rounded-full bg-gray-500 mx-0.5"
      />
      <Animated.View 
        style={dot2Style}
        className="w-2 h-2 rounded-full bg-gray-500 mx-0.5"
      />
      <Animated.View 
        style={dot3Style}
        className="w-2 h-2 rounded-full bg-gray-500 mx-0.5"
      />
    </View>
  );
};