import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { ActivityIndicator, ColorValue, StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme/colors';

export type IconButtonProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  iconColor?: ColorValue;
  iconStyle?: StyleProp<ViewStyle>;
  buttonSize?: number;
  backgroundColor?: ColorValue;
  backgroundOpacity?: number;
  borderRadius?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: ColorValue;
  pulseAnimation?: boolean;
  rotateAnimation?: boolean;
  rotateDegrees?: number;
  scaleAnimation?: boolean;
  scaleValue?: number;
  pressedScaleValue?: number;
  pressedOpacity?: number;
  borderWidth?: number;
  borderColor?: ColorValue;
  shadow?: boolean;
  shadowColor?: ColorValue;
  shadowOpacity?: number;
  shadowRadius?: number;
  testID?: string;
  accessibilityLabel?: string;
  hitSlop?: TouchableOpacityProps['hitSlop'];
  style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;

export const IconButton: React.FC<IconButtonProps> = memo(({
  iconName,
  iconSize = 24,
  iconColor = {colors: colors.secondary},
  iconStyle,
  buttonSize = 30,
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  backgroundOpacity = 1,
  borderRadius = 20,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  loadingColor,
  pulseAnimation = false,
  rotateAnimation = false,
  rotateDegrees = 90,
  scaleAnimation = false,
  scaleValue = 1,
  pressedScaleValue = 0.9,
  pressedOpacity = 0.7,
  borderWidth = 0,
  borderColor,
  shadow = false,
  shadowColor = 'black',
  shadowOpacity = 0.2,
  shadowRadius = 3,
  testID,
  accessibilityLabel,
  hitSlop,
  style,
  ...rest
}) => {
  const loadingColorResolved = loadingColor || iconColor;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      width: buttonSize,
      height: buttonSize,
      borderRadius,
      backgroundColor,
      opacity: backgroundOpacity,
      borderWidth,
      borderColor,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transform: [{ scale: scaleValue }],
    },
    shadow && {
      shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity,
      shadowRadius,
      elevation: shadow ? 4 : 0,
    },
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      activeOpacity={pressedOpacity}
      testID={testID}
      accessibilityLabel={accessibilityLabel || iconName}
      accessibilityRole="button"
      hitSlop={hitSlop || { top: 10, bottom: 10, left: 10, right: 10 }}
      {...rest}
    >
      <View style={containerStyle}>
        {loading ? (
          <ActivityIndicator size="small" color={loadingColorResolved as string} />
        ) : (
          <MaterialIcons
            name={iconName}
            size={iconSize}
            color={disabled ? `${iconColor as string}80` : iconColor as string}
            style={[
              iconStyle,
              rotateAnimation && { transform: [{ rotate: `${rotateDegrees}deg` }] },
              pulseAnimation && { transform: [{ scale: 1.1 }] },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});
