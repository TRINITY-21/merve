import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Animated,
    Keyboard,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { colors } from '../../constants/theme/colors';

export interface SearchInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

interface SearchInputProps extends Omit<TextInputProps, 'style' | 'onFocus' | 'onBlur'> {
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  visible?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: keyof typeof MaterialIcons.glyphMap | null;
  iconColor?: string;
  showClearButton?: boolean;
  animationDuration?: number;
  debounceDelay?: number;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(({
  value,
  onChangeText,
  onSearch,
  onClear,
  placeholder = 'Search...',
  visible = true,
  loading = false,
  containerStyle,
  inputStyle,
  icon = 'search',
  iconColor = colors.gray.medium,
  showClearButton = true,
  animationDuration = 300,
  debounceDelay = 300, // Default debounce delay
  leftAdornment,
  rightAdornment,
  ...textInputProps
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedHeight = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const animatedOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const inputRef = useRef<TextInput>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    },
    clear: () => {
      handleClear();
    },
  }));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: visible ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: visible ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, animationDuration]);

  const handleTextChange = useCallback((text: string) => {
    onChangeText(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (debounceDelay > 0) {
      debounceTimeout.current = setTimeout(() => {
        if (text.trim()) {
          onSearch?.(text.trim());
        }
      }, debounceDelay);
    } else {
      if (text.trim()) {
        onSearch?.(text.trim());
      }
    }
  }, [onChangeText, onSearch, debounceDelay]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    onChangeText('');
    onClear?.();
    inputRef.current?.focus(); 
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };

  const handleSubmitEditing = () => {
    if (value.trim()) {
      onSearch?.(value.trim());
    }
    Keyboard.dismiss();
  };

  const containerHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50], 
  });

  const borderColor = isFocused ? colors.gray.light : 'transparent'; 
  const shadowOpacity = isFocused ? 0.15 : 0.08;

  return ( 
    <Animated.View
      style={[
        {
          height: containerHeight,
          opacity: animatedOpacity,
        },
        containerStyle,
      ]}
      pointerEvents={visible ? 'auto' : 'none'} 
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 28,
            paddingHorizontal: 16,
            paddingVertical: 8, 
            borderWidth: 2,
            borderColor,
            shadowColor: colors.shadow.light,
            shadowOffset: {
              width: 0,
              height: 2,
            }, 
            shadowOpacity,
            shadowRadius: 8, 
            elevation: 4,
            minHeight: 48, 
          },
        ]}
      >
        {leftAdornment || (icon && (
          <MaterialIcons
            name={loading ? 'hourglass-empty' : icon}
            size={22}
            color={isFocused ? colors.secondary : iconColor}
            style={{ marginRight: 12 }}
          />
        ))}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[
            {
              flex: 1,
              fontSize: 13, 
              fontWeight: '500', 
              color: colors.gray.dark,
              letterSpacing: 0.3, 
              paddingVertical: 0, 
            },      
            inputStyle,
          ]}
          placeholder={placeholder} 
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={handleTextChange}   
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}  
          accessibilityLabel={placeholder}
          accessibilityRole="search"
          {...textInputProps}
        />

        {/* Right Adornment / Clear Button */}
        {rightAdornment || (showClearButton && value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={{
              padding: 4,
              marginLeft: 8,
            }}
            activeOpacity={0.7}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <MaterialIcons
              name="clear"
              size={20}
              color={colors.gray.medium}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
});