import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Animated,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { colors } from '../constant/theme/colors';
import { Typography } from './Typography';

type IconName = keyof typeof MaterialIcons.glyphMap;

export interface InputProps extends Omit<TextInputProps, 'style'> {
  // Basic Props
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  
  // Input Types
  type?: 'text' | 'email' | 'password' | 'phone' | 'numeric' | 'search' | 'url';
  
  // Icons
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  
  // Validation
  error?: string;
  success?: boolean;
  warning?: string;
  required?: boolean;
  
  // States
  disabled?: boolean;
  loading?: boolean;
  
  // Features
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  
  // Styling
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  
  // Animation
  animatedLabel?: boolean;
  
  // Helper text
  helperText?: string;
  
  // Auto features
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoFocus?: boolean;
  
  // Keyboard
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  
  // Events
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

const Input = forwardRef<TextInput, InputProps>(({
  // Basic Props
  label,
  placeholder,
  value = '',
  onChangeText,
  
  // Input Types
  type = 'text',
  
  // Icons
  leftIcon,
  rightIcon,
  onRightIconPress,
  
  // Validation
  error,
  success = false,
  warning,
  required = false,
  
  // States
  disabled = false,
  loading = false,
  
  // Features
  showClearButton = false,
  showPasswordToggle,
  maxLength,
  showCharacterCount = false,
  
  // Styling
  variant = 'filled',
  size = 'medium',
  containerStyle,
  inputStyle,
  
  // Animation
  animatedLabel = true,
  
  // Helper text
  helperText,
  
  // Auto features
  autoCapitalize,
  autoCorrect = true,
  autoFocus = false,
  
  // Keyboard
  keyboardType,
  returnKeyType = 'default',
  
  // Events
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
  
  // Auto-configure based on type
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
  
  // Forward ref methods to internal ref
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
  
  // Get size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: 20,
          fontSize: 18,
        };
      default: // medium
        return {
          height: 48,
          paddingHorizontal: 16,
          fontSize: 16,
        };
    }
  };
  
  // Get variant-based styles
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
      default: // filled
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
  
  const getIconColor = () => {
    if (disabled) return colors.gray.medium;
    if (error) return colors.error;
    if (success) return colors.success;
    if (warning) return colors.warning;
    if (isFocused) return colors.primary;
    return colors.gray.medium;
  };
  
  const getTextColor = () => {
    if (disabled) return colors.gray.medium;
    return colors.text.primary;
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
    
    // Clear button
    if ((showClearButton || config.showClearButton) && internalValue && !disabled) {
      icons.push(
        <TouchableOpacity
          key="clear"
          onPress={handleClear}
          style={{ marginLeft: 8 }}
        >
          <MaterialIcons 
            name="clear" 
            size={20} 
            color={colors.gray.medium} 
          />
        </TouchableOpacity>
      );
    }
    
    // Password toggle
    if ((showPasswordToggle || config.showPasswordToggle) && type === 'password') {
      icons.push(
        <TouchableOpacity
          key="password-toggle"
          onPress={togglePasswordVisibility}
          style={{ marginLeft: 8 }}
        >
          <MaterialIcons 
            name={isPasswordVisible ? 'visibility' : 'visibility-off'} 
            size={20} 
            color={getIconColor()} 
          />
        </TouchableOpacity>
      );
    }
    
    // Loading indicator
    if (loading) {
      icons.push(
        <View key="loading" style={{ marginLeft: 8 }}>
          <MaterialIcons 
            name="refresh" 
            size={20} 
            color={colors.primary} 
          />
        </View>
      );
    }
    
    // Custom right icon
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
            size={20} 
            color={getIconColor()} 
          />
        </TouchableOpacity>
      );
    }
    
    return icons.length > 0 ? (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icons}
      </View>
    ) : null;
  };
  
  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {/* Animated Label */}
      {label && animatedLabel && (
        <Animated.View
          style={{
            position: 'absolute',
            left: (config.leftIcon || leftIcon) ? 40 : 16,
            zIndex: 1,
            transform: [
              {
                translateY: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [sizeStyles.height / 2 - 8, -8],
                }),
              },
              {
                scale: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.85],
                }),
              },
            ],
          }}
        >
          <TouchableOpacity
            onPress={focusInput}
            activeOpacity={1}
            style={{
              backgroundColor: variant === 'filled' ? colors.gray.light : colors.white,
              paddingHorizontal: 4,
            }}
          >
            <Typography 
              variant="medium" 
              size={14} 
              style={{ 
                color: error 
                  ? colors.error 
                  : isFocused 
                  ? colors.primary 
                  : colors.gray.medium 
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
            marginBottom: 8
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
            ...sizeStyles,
            ...variantStyles,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {/* Left Icon */}
        {(config.leftIcon || leftIcon) && (
          <MaterialIcons 
            name={config.leftIcon || leftIcon!} 
            size={20} 
            color={getIconColor()} 
            style={{ marginRight: 12 }}
          />
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
        {renderRightIcons()}
      </TouchableOpacity>
      
      {/* Helper Text and Character Count */}
      {renderHelperText()}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;