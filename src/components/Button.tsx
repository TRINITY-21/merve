import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../constant/theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  startIcon?: keyof typeof MaterialIcons.glyphMap;
  endIcon?: keyof typeof MaterialIcons.glyphMap;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  startIconStyle?: StyleProp<TextStyle>;
  endIconStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  startIconSize?: number;
  endIconSize?: number;
  iconColor?: string;
  startIconColor?: string;
  endIconColor?: string;
  loading?: boolean;
  gradient?: boolean;
  fullWidth?: boolean;
}

const sizes = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    subtitleFontSize: 11,
    iconSize: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    subtitleFontSize: 12,
    iconSize: 18,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    subtitleFontSize: 14,
    iconSize: 20,
  },
};

const Button: React.FC<ButtonProps> = ({
  title,
  subtitle,
  icon,
  iconPosition = 'left',
  startIcon,
  endIcon,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  subtitleStyle,
  iconStyle,
  startIconStyle,
  endIconStyle,
  iconSize,
  startIconSize,
  endIconSize,
  iconColor,
  startIconColor,
  endIconColor,
  loading = false,
  disabled = false,
  gradient = false,
  fullWidth = false,
  ...props
}) => {
  const { paddingVertical, paddingHorizontal, fontSize, subtitleFontSize } = sizes[size];
  const adjustedPaddingVertical = subtitle ? paddingVertical + 4 : paddingVertical;

  const colorsByVariant = {
    primary: {
      text: colors.white,
      subtitleText: 'rgba(255, 255, 255, 0.9)',
      background: colors.primary,
      backgroundActive: '#e6b800',
      border: 'transparent',
      gradientColors: colors.gradient.primary as [ColorValue, ColorValue],
    },
    secondary: {
      text: colors.secondary,
      subtitleText: 'rgba(30, 58, 95, 0.8)',
      background: colors.secondaryLight,
      backgroundActive: '#dce3f0',
      border: 'transparent',
      gradientColors: colors.gradient.secondary as [ColorValue, ColorValue],
    },
    outline: {
      text: colors.secondary,
      subtitleText: 'rgba(30, 58, 95, 0.7)',
      background: 'transparent',
      backgroundActive: 'rgba(30, 58, 95, 0.1)',
      border: colors.gray.light,
      gradientColors: ['transparent', 'transparent'] as [ColorValue, ColorValue],
    },
  };

  const currentColors = colorsByVariant[variant];

  const resolvedStartIcon = startIcon || (icon && iconPosition === 'left' ? icon : undefined);
  const resolvedEndIcon = endIcon || (icon && iconPosition === 'right' ? icon : undefined);

  const defaultIconSize = iconSize || sizes[size].iconSize;
  const resolvedStartIconSize = startIconSize || (icon && iconPosition === 'left' ? iconSize : undefined) || defaultIconSize;
  const resolvedEndIconSize = endIconSize || (icon && iconPosition === 'right' ? iconSize : undefined) || defaultIconSize;

  // Decide where to show the loading spinner
  let showSpinnerOn: 'start' | 'end' | null = null;
  if (loading) {
    if (resolvedStartIcon) showSpinnerOn = 'start';
    else if (resolvedEndIcon) showSpinnerOn = 'end';
    else showSpinnerOn = 'start';
  }

  const renderIcon = (
    iconName: keyof typeof MaterialIcons.glyphMap | undefined,
    position: 'start' | 'end'
  ) => {
    const isStart = position === 'start';
    const currentIconSize = isStart ? resolvedStartIconSize : resolvedEndIconSize;

    let iconColorToUse = currentColors.text;
    if (isStart && startIconColor) iconColorToUse = startIconColor;
    else if (!isStart && endIconColor) iconColorToUse = endIconColor;
    else if (iconColor) iconColorToUse = iconColor;

    let iconStyleToUse: StyleProp<TextStyle> = {
      marginHorizontal: 8,
      marginTop: subtitle ? -2 : 0,
    };

    if (isStart && startIconStyle) {
      iconStyleToUse = [iconStyleToUse, startIconStyle];
    } else if (!isStart && endIconStyle) {
      iconStyleToUse = [iconStyleToUse, endIconStyle];
    } else if (iconStyle) {
      iconStyleToUse = [iconStyleToUse, iconStyle];
    }

    if (loading && showSpinnerOn === position) {
      return (
        <ActivityIndicator
          color={iconColorToUse}
          style={iconStyleToUse}
          size="small"
        />
      );
    }

    if (iconName) {
      return (
        <MaterialIcons
          name={iconName}
          size={currentIconSize}
          color={iconColorToUse}
          style={iconStyleToUse}
        />
      );
    }

    return null;
  };

  const startIconElement = renderIcon(resolvedStartIcon, 'start');
  const endIconElement = renderIcon(resolvedEndIcon, 'end');

  const textContent = (
    <View style={{
      flex: (resolvedStartIcon || resolvedEndIcon) ? 0 : 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text
        style={[
          {
            color: currentColors.text,
            fontSize,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: subtitle ? 2 : 0,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            {
              color: currentColors.subtitleText,
              fontSize: subtitleFontSize,
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: subtitleFontSize * 1.2,
              opacity: 0.9,
            },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );

  const content = (
    <View style={{
      flexDirection: 'row',
      alignItems: subtitle ? 'flex-start' : 'center',
      justifyContent: 'center',
      minHeight: subtitle ? resolvedStartIconSize + 4 : resolvedStartIconSize,
    }}>
      {startIconElement}
      {textContent}
      {endIconElement}
    </View>
  );

const commonStyles = {
  paddingVertical: adjustedPaddingVertical,
  paddingHorizontal,
  borderRadius: 12,
  minHeight: subtitle ? 56 : size === 'large' ? 52 : size === 'medium' ? 48 : 40,
};

  if (gradient && variant !== 'outline') {
    return (
      <TouchableOpacity
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[{ borderRadius: 12 }, style]}
        {...props}
      >
        <LinearGradient
          colors={currentColors.gradientColors}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            ...commonStyles,
            opacity: disabled ? 0.6 : 1,
            justifyContent: 'center',
          }}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          ...commonStyles,
          backgroundColor: disabled ? colors.gray.light : currentColors.background,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: currentColors.border,
          opacity: disabled ? 0.6 : 1,
          justifyContent: 'center',
        },
        style,
        fullWidth && { width: '100%' },
      ]}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
};

export default Button;
