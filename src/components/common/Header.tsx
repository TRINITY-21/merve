import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StatusBar,
  TextInput,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme/colors';
import { IconButton } from './IconButton';
import { Typography } from './Typography';

export type HeaderSize = 'compact' | 'default' | 'large';
export type HeaderVariant = 'solid' | 'gradient' | 'blur' | 'transparent';
export type HeaderAnimation = 'fade' | 'slide' | 'scale' | 'none';

export interface HeaderAction {
  name: keyof typeof MaterialIcons.glyphMap; // Use outlined versions (e.g., 'settings-outlined', 'notifications-none')
  onPress: () => void;
  color?: string;
  badge?: number;
  disabled?: boolean;
  loading?: boolean;
}

export interface HeaderSearchConfig {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: (text: string) => void;
  autoFocus?: boolean;
  enabled?: boolean;
}

export interface HeaderProps {
  // Core
  title: string;
  subtitle?: string;
  
  // Navigation
  leftIcon?: HeaderAction;
  rightIcons?: HeaderAction[];
  
  // Search
  search?: HeaderSearchConfig;
  
  // Appearance
  size?: HeaderSize;
  variant?: HeaderVariant;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  iconBackgroundColor?: string; // Set to 'transparent' for outlined icons (default)
  
  // Effects
  withShadow?: boolean;
  withBorder?: boolean;
  blurIntensity?: number;
  gradientColors?: string[];
  
  // States
  loading?: boolean;
  progress?: number; // 0-1 for progress bar
  
  // Animation
  animation?: HeaderAnimation;
  animationDuration?: number;
  
  // Layout
  fixed?: boolean;
  height?: number;
  zIndex?: number;
  
  // Status Bar
  statusBarStyle?: 'light-content' | 'dark-content' | 'auto';
  statusBarHidden?: boolean;
  
  // Custom Content
  customContent?: React.ReactNode;
  
  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}

const HEADER_HEIGHTS = {
  compact: 44,
  default: 56,
  large: 72,
};

const SEARCH_HEIGHT = 36;

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcons = [],
  search,
  size = 'default',
  variant = 'solid',
  backgroundColor = colors.primary,
  titleColor = colors.secondary,
  subtitleColor = colors.gray.dark,
  iconBackgroundColor = 'transparent', // Now transparent by default for cleaner outlined icons
  withShadow = true,
  withBorder = false,
  blurIntensity = 10,
  gradientColors,
  loading = false,
  progress,
  animation = 'fade',
  animationDuration = 300,
  fixed = true,
  height,
  zIndex = 1000,
  statusBarStyle = 'dark-content',
  statusBarHidden = false,
  customContent,
  accessibilityLabel,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(search?.value || '');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Calculate dimensions
  const baseHeight = height || HEADER_HEIGHTS[size];
  const searchHeight = search?.enabled ? SEARCH_HEIGHT + 12 : 0;
  const totalHeight = baseHeight + searchHeight + (subtitle ? 20 : 0);
  const adjustedTopPadding = Math.max(0, insets.top - 15); // Reduce by 8px for tighter positioning below status bar
  const headerHeight = totalHeight + adjustedTopPadding;

  // Initialize animations
  useEffect(() => {
    const animations = [];
    
    if (animation === 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'slide') {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  }, [animation, animationDuration]);

  // Progress animation
  useEffect(() => {
    if (progress !== undefined) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  // Get animation transform
  const getAnimationStyle = () => {
    switch (animation) {
      case 'fade':
        return { opacity: fadeAnim };
      case 'slide':
        return { transform: [{ translateY: slideAnim }] };
      case 'scale':
        return { transform: [{ scale: scaleAnim }] };
      default:
        return {};
    }
  };

  // Get background style based on variant
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'gradient':
        return {
          backgroundColors:[backgroundColor, backgroundColor],
        };
      case 'blur':
        return {
          backgroundColor: `${backgroundColor}80`, // 50% opacity
        };
      case 'transparent':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor,
        };
    }
  };

  // Handle search
  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    search?.onChangeText?.(text);
  };

  const handleSearchSubmit = () => {
    search?.onSubmit?.(searchValue);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    search?.onFocus?.();
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    search?.onBlur?.();
  };

  // Render search bar
  const renderSearchBar = () => {
    if (!search?.enabled) return null;

    return (
      <View className="px-4 pb-3">
        <View 
          className={`flex-row items-center px-3 rounded-lg ${
            searchFocused ? 'bg-white/20' : 'bg-white/10'
          }`}
          style={{ height: SEARCH_HEIGHT }}
        >
          <MaterialIcons 
            name="search" 
            size={20} 
            color={titleColor} 
            style={{ opacity: 0.7 }}
          />
          <TextInput
            className="flex-1 ml-2"
            placeholder={search.placeholder || 'Search...'}
            placeholderTextColor={`${titleColor}70`}
            value={searchValue}
            onChangeText={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoFocus={search.autoFocus}
            style={{ 
              color: titleColor,
              fontSize: 16,
            }}
          />
          {searchValue.length > 0 && (
            <Pressable onPress={() => handleSearchChange('')}>
              <MaterialIcons 
                name="close" 
                size={18} 
                color={titleColor} 
                style={{ opacity: 0.7 }}
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  // Render action button
  const renderAction = (action: HeaderAction, index: number) => {
    return (
      <View key={`action-${index}`} className="relative">
        <IconButton
          iconName={action.name}
          iconSize={size === 'compact' ? 20 : size === 'large' ? 28 : 20}
          buttonSize={size === 'compact' ? 32 : size === 'large' ? 24 : 38}
          borderRadius={size === 'compact' ? 16 : size === 'large' ? 22 : 19}
          backgroundColor="transparent"
          iconColor={action.disabled ? `${titleColor}50` : (action.color || titleColor)}
          onPress={action.onPress}
          disabled={action.disabled}
        />
        
        {/* Badge */}
        {action.badge && action.badge > 0 && (
          <View 
            className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center"
          >
            <Typography 
              size={10} 
              style={{ color: 'white' }}
              variant="bold"
            >
              {action.badge > 99 ? '99+' : action.badge}
            </Typography>
          </View>
        )}
        
        {/* Loading indicator */}
        {action.loading && (
          <View className="absolute inset-0 items-center justify-center">
            <ActivityIndicator size="small" color={titleColor} />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      {/* Status Bar */}
      <StatusBar 
        barStyle={'dark-content'}
        hidden={statusBarHidden}
        backgroundColor={backgroundColor}
      />

              {/* <StatusBar barStyle="dark-content" backgroundColor={colors.primary} /> */}

      
      
      {/* Header Container */}
      <Animated.View
        style={[
          {
            position: fixed ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            right: 0,
            zIndex,
            height: headerHeight,
            paddingTop: adjustedTopPadding,
          },
          getBackgroundStyle(),
          getAnimationStyle(),
          withShadow && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          },
          withBorder && {
            borderBottomWidth: 1,
            borderBottomColor: `${titleColor}20`,
          }
        ]}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {/* Progress Bar */}
        {progress !== undefined && (
          <Animated.View
            className="absolute bottom-0 left-0 h-0.5"
            style={{
              backgroundColor: titleColor,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        )}
        
        {/* Main Header Content */}
        <View className="flex-1 justify-center">
          {customContent ? (
            customContent
          ) : (
            <>
              {/* Title Row */}
              <View className="flex-row items-center justify-between px-4">
                {/* Left Icon */}
                {leftIcon ? (
                  <View className="relative">
                    <IconButton
                      iconName={leftIcon.name}
                      iconSize={size === 'compact' ? 20 : size === 'large' ? 28 : 24}
                      buttonSize={size === 'compact' ? 32 : size === 'large' ? 44 : 38}
                      borderRadius={size === 'compact' ? 16 : size === 'large' ? 22 : 19}
                      backgroundColor="transparent"
                      iconColor={leftIcon.disabled ? `${titleColor}50` : (leftIcon.color || titleColor)}
                      onPress={leftIcon.onPress}
                      disabled={leftIcon.disabled}
                    />
                  </View>
                ) : (
                  <View style={{ width: size === 'compact' ? 32 : size === 'large' ? 44 : 38 }} />
                )}

                {/* Title & Subtitle */}
                <View className="flex-1 items-center mx-4">
                  <Typography 
                    className={`text-center ${
                      size === 'compact' ? 'text-lg' : 
                      size === 'large' ? 'text-2xl' : 'text-xl'
                    }`}
                    style={{ color: titleColor }}
                    numberOfLines={1}
                    variant="bold"
                  >
                    {title}
                  </Typography>
                  
                  {subtitle && (
                    <Typography 
                      className="text-center text-sm mt-0.5"
                      style={{ color: subtitleColor }}
                      numberOfLines={1}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </View>

                {/* Right Icons */}
                <View className="flex-row" style={{ gap: 8 }}>
                  {rightIcons.map((icon, index) => renderAction(icon, index))}
                  
                  {/* Loading indicator for header */}
                  {loading && (
                    <View className="w-10 h-10 items-center justify-center">
                      <ActivityIndicator size="small" color={titleColor} />
                    </View>
                  )}
                  
                  {/* Spacer if no right icons */}
                  {rightIcons.length === 0 && !loading && (
                    <View style={{ width: size === 'compact' ? 32 : size === 'large' ? 44 : 38 }} />
                  )}
                </View>
              </View>
              
              {/* Search Bar */}
              {renderSearchBar()}
            </>
          )}
        </View>
      </Animated.View>
      
      {/* Spacer for fixed positioning */}
      {fixed && <View style={{ height: headerHeight }} />}
    </>
  );
};

// Export additional utilities
export const useHeaderHeight = (
  size: HeaderSize = 'default',
  hasSearch = false,
  hasSubtitle = false,
  customHeight?: number
) => {
  const insets = useSafeAreaInsets();
  const baseHeight = customHeight || HEADER_HEIGHTS[size];
  const searchHeight = hasSearch ? SEARCH_HEIGHT + 12 : 0;
  const subtitleHeight = hasSubtitle ? 20 : 0;
  const adjustedTopPadding = Math.max(0, insets.top - 8); // Consistent with header component
  
  return baseHeight + searchHeight + subtitleHeight + adjustedTopPadding;
};

// Default export for convenience
export default Header;