// components/productDetails/LoadingState.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

const { width } = Dimensions.get('window');

export const LoadingState: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Shimmer animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const ShimmerBox: React.FC<{ width: number; height: number; borderRadius?: number }> = ({ 
    width: boxWidth, 
    height, 
    borderRadius = 8 
  }) => (
    <View
      style={{
        width: boxWidth,
        height,
        backgroundColor: '#F1F5F9',
        borderRadius,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          transform: [{ translateX: shimmerTranslate }],
        }}
      />
    </View>
  );

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        opacity: fadeAnim,
      }}
    >
      {/* Header skeleton */}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <ShimmerBox width={24} height={24} borderRadius={12} />
        <ShimmerBox width={120} height={20} />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ShimmerBox width={24} height={24} borderRadius={12} />
          <ShimmerBox width={24} height={24} borderRadius={12} />
        </View>
      </View>

      {/* Image skeleton */}
      <View style={{ height: 300, marginHorizontal: 20, marginVertical: 20 }}>
        <ShimmerBox width={width - 40} height={300} borderRadius={16} />
      </View>

      {/* Content skeleton */}
      <View style={{ paddingHorizontal: 20, gap: 16 }}>
        {/* Title */}
        <ShimmerBox width={width - 40} height={24} />
        <ShimmerBox width={width - 100} height={20} />
        
        {/* Price */}
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <ShimmerBox width={80} height={28} />
          <ShimmerBox width={60} height={20} />
        </View>

        {/* Rating */}
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <ShimmerBox width={100} height={16} />
          <ShimmerBox width={80} height={16} />
        </View>

        {/* Description lines */}
        <View style={{ gap: 8, marginTop: 12 }}>
          <ShimmerBox width={width - 40} height={16} />
          <ShimmerBox width={width - 80} height={16} />
          <ShimmerBox width={width - 60} height={16} />
        </View>

        {/* Tabs skeleton */}
        <View style={{ 
          flexDirection: 'row', 
          gap: 20, 
          marginTop: 20, 
          paddingVertical: 16,
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9'
        }}>
          <ShimmerBox width={80} height={20} />
          <ShimmerBox width={60} height={20} />
          <ShimmerBox width={70} height={20} />
          <ShimmerBox width={50} height={20} />
        </View>
      </View>

      {/* Loading text */}
      <View
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: colors.text.secondary,
            fontWeight: '500',
          }}
        >
          Loading product details...
        </Text>
      </View>
    </Animated.View>
  );
};