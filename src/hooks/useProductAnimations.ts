import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useProductAnimations = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const chatSheetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]); // Add dependencies to useEffect

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateChatSheet = (toValue: number, callback?: () => void) => {
    Animated.spring(chatSheetAnim, {
      toValue,
      tension: 20,
      friction: 8,
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    fadeAnim,
    slideAnim,
    scaleAnim,
    scrollY,
    chatSheetAnim,
    headerOpacity,
    animateChatSheet,
  };
};