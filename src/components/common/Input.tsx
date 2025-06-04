import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  Platform,
  ReturnKeyTypeOptions,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants/theme/colors';
import { Typography } from './Typography';

type IconName = keyof typeof MaterialIcons.glyphMap;

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'phone' | 'numeric' | 'search' | 'url';
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  error?: string;
  success?: boolean;
  warning?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  animatedLabel?: boolean;
  helperText?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  placeholder,
  value = '',
  onChangeText,
  type = 'text',
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  success = false,
  warning,
  required = false,
  disabled = false,
  loading = false,
  showClearButton = false,
  showPasswordToggle,
  maxLength,
  showCharacterCount = false,
  variant = 'filled',
  size = 'medium',
  containerStyle,
  inputStyle,
  animatedLabel = true,
  helperText,
  autoCapitalize,
  autoCorrect = true,
  autoFocus = false,
  keyboardType,
  returnKeyType = 'default',
  onFocus,
  onBlur,
  onSubmitEditing,

  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const internalRef = useRef<TextInput>(null);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const getInputConfig = () => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address' as KeyboardTypeOptions,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
          leftIcon: leftIcon || ('email' as IconName),
        };
      case 'password':
        return {
          secureTextEntry: !isPasswordVisible,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
          leftIcon: leftIcon || ('lock' as IconName),
          showPasswordToggle: showPasswordToggle !== false,
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad' as KeyboardTypeOptions,
          leftIcon: leftIcon || ('phone' as IconName),
        };
      case 'numeric':
        return {
          keyboardType: 'numeric' as KeyboardTypeOptions,
        };
      case 'search':
        return {
          leftIcon: leftIcon || ('search' as IconName),
          showClearButton: showClearButton !== false,
        };
      case 'url':
        return {
          keyboardType: 'url' as KeyboardTypeOptions,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
        };
      default:
        return {
          leftIcon,
        };
    }
  };

  const config = getInputConfig();

  useImperativeHandle(ref, () => internalRef.current!, []);

  useEffect(() => {
    if (animatedLabel) {
      Animated.timing(labelAnimation, {
        toValue: isFocused || internalValue ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(borderAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, internalValue, animatedLabel, labelAnimation, borderAnimation]);

  const focusInput = () => {
    internalRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setInternalValue('');
    onChangeText?.('');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getSizeStyles = () => {
    const isIOS = Platform.OS === 'ios';

    switch (size) {
      case 'small':
        return {
          height: 40,
          paddingHorizontal: 12,
          fontSize: 14,
          iconSize: 18,
          iconMargin: 8,
          textVerticalOffset: isIOS ? -1 : 0,
          labelVerticalOffset: isIOS ? 1 : 0,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: 20,
          fontSize: 18,
          iconSize: 24,
          iconMargin: 16,
          textVerticalOffset: isIOS ? -1 : 0,
          labelVerticalOffset: isIOS ? 3 : 0,
        };
      default:
        return {
          height: 48,
          paddingHorizontal: 16,
          fontSize: 16,
          iconSize: 20,
          iconMargin: 12,
          textVerticalOffset: isIOS ? -1 : 0,
          labelVerticalOffset: isIOS ? 1 : 0,
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyle = {
      borderRadius: variant === 'underlined' ? 0 : 12,
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: error
            ? colors.error
            : success
              ? colors.success
              : warning
                ? colors.warning
                : isFocused
                  ? colors.primary
                  : colors.gray.light,
        };
      case 'underlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor: error
            ? colors.error
            : success
              ? colors.success
              : warning
                ? colors.warning
                : isFocused
                  ? colors.primary
                  : colors.gray.light,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: disabled
            ? colors.gray.light + '50'
            : colors.gray.light,
          borderWidth: 0,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const hasLeftIcon = !!(config.leftIcon || leftIcon);
  const iconTotalWidth = hasLeftIcon ? sizeStyles.iconSize + sizeStyles.iconMargin : 0;
  const labelLeftPosition = sizeStyles.paddingHorizontal + iconTotalWidth;

  const getIconColor = () => {
    if (disabled) return colors.gray.medium;
    if (error) return colors.error;
    if (success) return colors.success;
    if (warning) return colors.warning;
    if (isFocused) return colors.secondary;
    return colors.gray.medium;
  };

  const getTextColor = () => {
    if (disabled) return colors.gray.medium;
    return colors.text.primary;
  };

  const getLabelBackgroundColor = () => {
    switch (variant) {
      case 'outlined':
        return colors.white;
      case 'underlined':
        return 'transparent';
      default:
        return colors.gray.light;
    }
  };

  const renderHelperText = () => {
    const text = error || warning || helperText;
    if (!text && !showCharacterCount) return null;

    const textColor = error
      ? colors.error
      : warning
        ? colors.warning
        : colors.text.secondary;

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        paddingHorizontal: 4,
      }}>
        {text ? (
          <Typography
            variant="regular"
            size={12}
            style={{ color: textColor, flex: 1 }}
          >
            {text}
          </Typography>
        ) : <View style={{ flex: 1 }} />}

        {showCharacterCount && maxLength && (
          <Typography
            variant="regular"
            size={12}
            style={{
              color: internalValue.length > maxLength * 0.8
                ? colors.warning
                : colors.text.secondary
            }}
          >
            {internalValue.length}/{maxLength}
          </Typography>
        )}
      </View>
    );
  };

  const renderRightIcons = () => {
    const icons = [];

    if ((showClearButton || config.showClearButton) && internalValue && !disabled) {
      icons.push(
        <TouchableOpacity
          key="clear"
          onPress={handleClear}
          style={{ marginLeft: 8 }}
        >
          <MaterialIcons
            name="clear"
            size={sizeStyles.iconSize}
            color={colors.gray.medium}
          />
        </TouchableOpacity>
      );
    }

    if ((showPasswordToggle || config.showPasswordToggle) && type === 'password') {
      icons.push(
        <TouchableOpacity
          key="password-toggle"
          onPress={togglePasswordVisibility}
          style={{ marginLeft: 8 }}
        >
          <MaterialIcons
            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
            size={sizeStyles.iconSize}
            color={getIconColor()}
          />
        </TouchableOpacity>
      );
    }

    if (loading) {
      icons.push(
        <View key="loading" style={{ marginLeft: 8 }}>
          <MaterialIcons
            name="refresh"
            size={sizeStyles.iconSize}
            color={colors.primary}
          />
        </View>
      );
    }

    if (rightIcon && !loading) {
      icons.push(
        <TouchableOpacity
          key="right-icon"
          onPress={onRightIconPress}
          style={{ marginLeft: 8 }}
          disabled={!onRightIconPress}
        >
          <MaterialIcons
            name={rightIcon}
            size={sizeStyles.iconSize}
            color={getIconColor()}
          />
        </TouchableOpacity>
      );
    }

    return icons.length > 0 ? icons : null;
  };

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {/* Animated Label */}
      {label && animatedLabel && (
        <Animated.View
          style={{
            position: 'absolute',
            left: labelLeftPosition,
            zIndex: 1,
            transform: [
              {
                translateY: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    (sizeStyles.height / 2) - 10 + sizeStyles.labelVerticalOffset,
                    -10 + sizeStyles.labelVerticalOffset
                  ],
                }),
              },
              {
                scale: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.85],
                }),
              },
            ],
            transformOrigin: 'left center',
          }}
        >
          <TouchableOpacity
            onPress={focusInput}
            activeOpacity={1}
            style={{
              backgroundColor: getLabelBackgroundColor(),
              paddingHorizontal: 4,
              paddingVertical: Platform.OS === 'ios' ? 1 : 0,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="medium"
              size={14}
              style={{
                color: error
                  ? colors.error
                  : isFocused
                    ? colors.secondary
                    : colors.gray.medium,
                lineHeight: Platform.OS === 'ios' ? 16 : undefined,
              }}
            >
              {label}{required && ' *'}
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Static Label */}
      {label && !animatedLabel && (
        <Typography
          variant="medium"
          size={14}
          style={{
            color: colors.text.primary,
            marginBottom: 8,
            marginLeft: 2,
          }}
        >
          {label}{required && ' *'}
        </Typography>
      )}

      {/* Input Container */}
      <TouchableOpacity
        onPress={focusInput}
        activeOpacity={1}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: sizeStyles.height,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            ...variantStyles,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {/* Left Icon */}
        {hasLeftIcon && (
          <View style={{
            marginRight: sizeStyles.iconMargin,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            paddingTop: Platform.OS === 'ios' ? 1 : 0,
          }}>
            <MaterialIcons
              name={config.leftIcon || leftIcon!}
              size={sizeStyles.iconSize}
              color={getIconColor()}
            />
          </View>
        )}

        {/* Text Input */}
        <TextInput
          ref={internalRef}
          style={[
            {
              flex: 1,
              fontSize: sizeStyles.fontSize,
              color: getTextColor(),
              paddingVertical: 0,
              textAlignVertical: Platform.OS === 'ios' ? 'center' : 'center',
              includeFontPadding: false,
              lineHeight: Platform.OS === 'ios' ? sizeStyles.fontSize * 1.2 : undefined,
              paddingTop: Platform.OS === 'ios' ? sizeStyles.textVerticalOffset : 0,
            },
            inputStyle,
          ]}
          placeholder={!animatedLabel || !isFocused ? placeholder : ''}
          placeholderTextColor={colors.gray.medium}
          value={internalValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={!disabled && !loading}
          maxLength={maxLength}
          secureTextEntry={config.secureTextEntry}
          keyboardType={keyboardType || config.keyboardType}
          autoCapitalize={autoCapitalize || config.autoCapitalize}
          autoCorrect={autoCorrect && config.autoCorrect !== false}
          autoFocus={autoFocus}
          returnKeyType={returnKeyType}
          {...rest}
        />

        {/* Right Icons */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingTop: Platform.OS === 'ios' ? 1 : 0,
        }}>
          {renderRightIcons()}
        </View>
      </TouchableOpacity>

      {/* Helper Text and Character Count */}
      {renderHelperText()}
    </View>
  );
});