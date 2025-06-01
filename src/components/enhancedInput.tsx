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
// Assuming these are defined in your project
import { colors } from '../constant/theme/colors';
import { Typography } from './Typography';

// Re-defining FieldConfig to include relevant InputProps
export interface FieldConfig {
  name: string; // Used for internal state management in a form wrapper
  label?: string; // Made optional as it's optional in your Input
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'phone' | 'number' | 'multiline' | 'search' | 'url'; // Added from your Input
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  autoComplete?: TextInputProps['autoComplete']; // From original EnhancedInputProps
  required?: boolean;
  validation?: (value: string) => string | undefined; // For a form wrapper
  icon?: React.ReactNode; // Original EnhancedInputProps left icon
  rightIcon?: React.ReactNode; // Original EnhancedInputProps right icon
  disabled?: boolean;
  editable?: boolean;
  helperText?: string; // Now mapping to helperText
  
  // New props from your Input component
  leftIconName?: keyof typeof MaterialIcons.glyphMap; // Renamed to avoid conflict with existing 'icon'
  rightIconName?: keyof typeof MaterialIcons.glyphMap; // Renamed to avoid conflict with existing 'rightIcon'
  onRightIconPress?: () => void;
  success?: boolean; // Directly from InputProps
  warning?: string; // Directly from InputProps
  loading?: boolean; // Directly from InputProps
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  showCharacterCount?: boolean;
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: 'small' | 'medium' | 'large';
  animatedLabel?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
}

// Enhanced Input Component Props - combines FieldConfig and state management props
export interface EnhancedInputProps extends Omit<TextInputProps, 'style'>, FieldConfig {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput>; // Original EnhancedInputProps ref
  
  // Error/Touched state specific to this component's usage
  error?: string; // From EnhancedInput, overrides general Input error if present
  touched?: boolean; // New from EnhancedInput, crucial for error display timing

  // Styling props (overriding FieldConfig if more specific is provided)
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle; // Original EnhancedInputProps
  inputStyle?: TextStyle;
  errorStyle?: TextStyle; // Original EnhancedInputProps
  helperTextStyle?: TextStyle; // Original EnhancedInputProps (now applies to helperText/warning/success)

  // Border colors specific to the original EnhancedInput's visual feedback
  focusedBorderColor?: string; // Applies if variant is 'outlined' or 'underlined'
  errorBorderColor?: string; // Applies if variant is 'outlined' or 'underlined'
  successBorderColor?: string; // Applies if variant is 'outlined' or 'underlined'
  showSuccessIndicator?: boolean; // Original EnhancedInput (now integrated with 'success' prop)
}

export const EnhancedInput = forwardRef<TextInput, EnhancedInputProps>(({
  // FieldConfig props
  name, // Not directly used by the component, but useful for parent forms
  label,
  placeholder,
  type = 'text',
  keyboardType,
  secureTextEntry,
  multiline,
  numberOfLines,
  maxLength,
  autoCapitalize,
  autoCorrect = true, // Default from your Input
  autoComplete,
  required = false,
  icon, // ReactNode left icon from original EnhancedInput
  rightIcon, // ReactNode right icon from original EnhancedInput
  disabled = false,
  editable = true, // Default from original EnhancedInput
  helperText,
  
  // State management props from original EnhancedInput
  value,
  error, // This error takes precedence
  touched, // Determines when error/success states are visually applied
  onChangeText,
  onBlur,
  onFocus,
  onSubmitEditing,
  inputRef, // Original ref prop

  // Styling/Behavior props from your Input component
  leftIconName, // MaterialIcons name
  rightIconName, // MaterialIcons name
  onRightIconPress,
  success: propSuccess = false, // Renamed to avoid conflict with propSuccess to distinguish from error-driven success
  warning,
  loading = false,
  showClearButton = false,
  showPasswordToggle, // If undefined, will be determined by type 'password'
  showCharacterCount = false,
  variant = 'filled',
  size = 'medium',
  containerStyle,
  inputStyle,
  animatedLabel = true,
  returnKeyType = 'default',

  // Border colors and styles from original EnhancedInput
  focusedBorderColor = '#3b82f6',
  errorBorderColor = '#ef4444',
  successBorderColor = '#10b981',
  showSuccessIndicator = true,
  labelStyle, // Applied to Typography label
  errorStyle, // Applied to Typography error
  helperTextStyle, // Applied to Typography helper/warning text

  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Use internal value for TextInput, but prioritize external value for updates
  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  
  const internalRef = useRef<TextInput>(null);
  const labelAnimation = useRef(new Animated.Value(value || isFocused ? 1 : 0)).current;
  // borderAnimation is only truly effective for 'outlined' or 'underlined' variants
  const borderAnimation = useRef(new Animated.Value(0)).current; 
  
  // Expose internal ref functions if a ref is passed from the parent
  useImperativeHandle(ref || inputRef, () => internalRef.current!, [internalRef]);

  // Auto-configure based on type (merged with original config and MaterialIcons)
  const getInputConfig = () => {
    let currentKeyboardType: KeyboardTypeOptions | undefined = keyboardType;
    let currentAutoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined = autoCapitalize;
    let currentAutoCorrect: boolean = autoCorrect;
    let currentSecureTextEntry: boolean | undefined = secureTextEntry;
    let currentLeftIconName: keyof typeof MaterialIcons.glyphMap | undefined = leftIconName;
    let currentShowPasswordToggle: boolean | undefined = showPasswordToggle;
    let currentShowClearButton: boolean = showClearButton;

    switch (type) {
      case 'email':
        currentKeyboardType = 'email-address';
        currentAutoCapitalize = 'none';
        currentAutoCorrect = false;
        currentLeftIconName = currentLeftIconName || 'email';
        break;
      case 'password':
        currentSecureTextEntry = !isPasswordVisible;
        currentAutoCapitalize = 'none';
        currentAutoCorrect = false;
        currentLeftIconName = currentLeftIconName || 'lock';
        currentShowPasswordToggle = showPasswordToggle !== false; // Default to true if not explicitly false
        break;
      case 'phone':
        currentKeyboardType = 'phone-pad';
        currentLeftIconName = currentLeftIconName || 'phone';
        break;
      case 'number': // Original EnhancedInput type
        currentKeyboardType = 'numeric';
        break;
      case 'number': // From your Input type
        currentKeyboardType = 'numeric';
        break;
      case 'search':
        currentLeftIconName = currentLeftIconName || 'search';
        currentShowClearButton = showClearButton !== false; // Default to true if not explicitly false
        break;
      case 'url':
        currentKeyboardType = 'url';
        currentAutoCapitalize = 'none';
        currentAutoCorrect = false;
        break;
      case 'multiline': // Original EnhancedInput type
        multiline = true;
        break;
      default:
        // Use provided values or defaults
        break;
    }

    return {
      keyboardType: currentKeyboardType,
      autoCapitalize: currentAutoCapitalize,
      autoCorrect: currentAutoCorrect,
      secureTextEntry: currentSecureTextEntry,
      leftIconName: currentLeftIconName,
      showPasswordToggle: currentShowPasswordToggle,
      showClearButton: currentShowClearButton,
    };
  };
  
  const config = getInputConfig();
  
  // Animation for label and border
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
    internalRef.current?.focus(); // Keep focus after clearing
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // Determine success state based on external 'error' and 'touched'
  const isSuccess = showSuccessIndicator && !error && touched && !!internalValue && propSuccess;

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
          height: multiline ? (numberOfLines ? numberOfLines * 20 + 28 : 100) : 48, // Adjusted for multiline
          paddingHorizontal: 16,
          fontSize: 16,
          paddingTop: multiline ? 12 : 0, // Ensure vertical padding for multiline
          paddingBottom: multiline ? 12 : 0,
        };
    }
  };
  
  // Get variant-based styles
  const getVariantStyles = () => {
    const baseStyle = {
      borderRadius: variant === 'underlined' ? 0 : 12,
    };

    let borderColor = colors.gray.light; // Default border color
    if (error && touched) {
      borderColor = errorBorderColor; // External error takes precedence
    } else if (isSuccess) {
      borderColor = successBorderColor;
    } else if (warning) {
      borderColor = colors.warning; // Your original warning color
    } else if (isFocused) {
      borderColor = focusedBorderColor;
    }

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: borderColor,
        };
      case 'underlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor: borderColor,
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
    if (error && touched) return errorBorderColor; // Match error border color
    if (isSuccess) return successBorderColor; // Match success border color
    if (warning) return colors.warning;
    if (isFocused) return focusedBorderColor;
    return colors.gray.medium;
  };
  
  const getTextColor = () => {
    if (disabled) return colors.gray.medium;
    return colors.text.primary;
  };
  
  const renderHelperText = () => {
    const message = (error && touched) ? error : (warning ? warning : helperText);
    if (!message && !showCharacterCount) return null;
    
    const textColor = (error && touched)
      ? errorBorderColor
      : warning
      ? colors.warning
      : (helperTextStyle?.color || colors.text.secondary); // Use helperTextStyle color if provided

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        paddingHorizontal: 4,
      }}>
        {message ? (
          <Typography 
            variant="regular" 
            size={12} 
            style={[{ color: textColor, flex: 1 }, error && touched ? errorStyle : helperTextStyle]}
          >
            {message}
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
    if (config.showClearButton && internalValue && !disabled) {
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
    if (config.showPasswordToggle) {
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
            name="refresh" // Use refresh or ActivityIndicator
            size={20} 
            color={colors.primary} 
          />
          {/* Or <ActivityIndicator color={colors.primary} /> if you prefer */}
        </View>
      );
    }
    
    // Custom MaterialIcons right icon
    if (rightIconName && !loading) { // Prioritize MaterialIcons if both are provided
      icons.push(
        <TouchableOpacity
          key="right-icon-name"
          onPress={onRightIconPress}
          style={{ marginLeft: 8 }}
          disabled={!onRightIconPress}
        >
          <MaterialIcons 
            name={rightIconName} 
            size={20} 
            color={getIconColor()} 
          />
        </TouchableOpacity>
      );
    }

    // Custom React.ReactNode right icon (from original EnhancedInputProps)
    if (rightIcon && !rightIconName && !loading) {
      icons.push(
        <View key="right-icon-node" style={{ marginLeft: 8 }}>
          {rightIcon}
        </View>
      );
    }

    // Success indicator for original EnhancedInputProps
    if (!rightIcon && !rightIconName && !loading && isSuccess) {
      icons.push(
        <View key="success-indicator" style={{ marginLeft: 8 }}>
          <MaterialIcons name="check-circle" size={20} color={successBorderColor} />
        </View>
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
            left: (config.leftIconName || icon) ? 48 : 16, // Adjust based on which icon is present
            zIndex: 1,
            transform: [
              {
                translateY: labelAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [sizeStyles.height / 2 - (multiline ? 12 : 8), -8], // Adjust for multiline
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
              style={[{ 
                color: (error && touched)
                  ? errorBorderColor
                  : isFocused 
                  ? focusedBorderColor 
                  : colors.gray.medium 
              }, labelStyle]} // Apply labelStyle
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
          style={[{ 
            color: colors.text.primary, 
            marginBottom: 8 
          }, labelStyle]} // Apply labelStyle
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
            minHeight: multiline ? (numberOfLines ? numberOfLines * 20 + 28 : 100) : sizeStyles.height, // Ensure minHeight for multiline
          },
        ]}
      >
        {/* Left Icon (MaterialIcons) */}
        {config.leftIconName && (
          <MaterialIcons 
            name={config.leftIconName} 
            size={20} 
            color={getIconColor()} 
            style={{ marginLeft: sizeStyles.paddingHorizontal, marginRight: 12 }}
          />
        )}
        {/* Left Icon (React.ReactNode) */}
        {icon && !config.leftIconName && (
          <View style={{ marginLeft: sizeStyles.paddingHorizontal, marginRight: 12 }}>
            {icon}
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
              paddingVertical: 0, // Reset default padding
              textAlignVertical: multiline ? 'top' : 'center', // Align text to top for multiline
            },
            inputStyle,
            multiline && { height: sizeStyles.height } // Apply fixed height for multiline if needed
          ]}
          placeholder={(!animatedLabel || !isFocused || internalValue) ? placeholder : ''}
          placeholderTextColor={colors.gray.medium}
          value={internalValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          editable={editable && !disabled && !loading} // Combined editable logic
          maxLength={maxLength}
          secureTextEntry={config.secureTextEntry}
          keyboardType={keyboardType || config.keyboardType}
          autoCapitalize={autoCapitalize || config.autoCapitalize}
          autoCorrect={autoCorrect && config.autoCorrect !== false}
          autoFocus={rest.autoFocus || false} // Use rest.autoFocus if present
          returnKeyType={returnKeyType}
          multiline={multiline || type === 'multiline'} // Ensure multiline works for type 'multiline'
          numberOfLines={numberOfLines}
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

EnhancedInput.displayName = 'EnhancedInput';