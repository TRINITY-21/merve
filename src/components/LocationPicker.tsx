// components/LocationPicker.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { GHANA_LOCATIONS } from '../constant/index';
import { colors } from '../constant/theme/colors';
import { Typography } from './Typography';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export interface LocationData {
  region: string;
  town: string;
}

export interface LocationPickerProps {
  label?: string;
  value?: LocationData | null;
  onLocationChange?: (location: LocationData) => void;
  error?: string;
  success?: boolean;
  warning?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  animatedLabel?: boolean;
}

type PickerStep = 'region' | 'town';

const LocationPicker = forwardRef<View, LocationPickerProps>(({
  label = 'Location',
  value,
  onLocationChange,
  error,
  success = false,
  warning,
  required = false,
  disabled = false,
  placeholder = '',
  helperText,
  variant = 'filled',
  size = 'medium',
  containerStyle,
  animatedLabel = true,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<PickerStep>('region');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;
  const slideAnimation = useRef(new Animated.Value(screenHeight)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animatedLabel) {
      Animated.timing(labelAnimation, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, value, animatedLabel, labelAnimation]);

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

  const getIconColor = () => {
    if (disabled) return colors.gray.medium;
    if (error) return colors.error;
    if (success) return colors.success;
    if (warning) return colors.warning;
    if (isFocused) return colors.secondary;
    return colors.gray.medium;
  };

  const openPicker = () => {
    if (disabled) return;

    setIsFocused(true);
    setIsOpen(true);
    setCurrentStep('region');
    setSelectedRegion('');

    Animated.parallel([
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closePicker = () => {
    setIsFocused(false);

    // Animate out
    Animated.parallel([
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnimation, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
      setCurrentStep('region');
      setSelectedRegion('');
    });
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setCurrentStep('town');
  };

  const handleTownSelect = (town: string) => {
    const newLocation: LocationData = {
      region: selectedRegion,
      town: town,
    };
    onLocationChange?.(newLocation);
    closePicker();
  };

  const goBackToRegions = () => {
    setCurrentStep('region');
    setSelectedRegion('');
  };

  const getDisplayValue = () => {
    if (!value) return '';
    return `${value.town}, ${value.region}`;
  };

  const renderHelperText = () => {
    const text = error || warning || helperText;
    if (!text) return null;

    const textColor = error
      ? colors.error
      : warning
        ? colors.warning
        : colors.text.secondary;

    return (
      <View style={{
        marginTop: 4,
        paddingHorizontal: 4,
      }}>
        <Typography
          variant="regular"
          size={12}
          style={{ color: textColor }}
        >
          {text}
        </Typography>
      </View>
    );
  };

  const renderHeader = (title: string, showBack: boolean = false) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray.light,
      backgroundColor: colors.white,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {showBack && (
          <TouchableOpacity
            onPress={goBackToRegions}
            style={{
              marginRight: 12,
              padding: 4,
            }}
          >
            <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Typography variant="bold" size={18} style={{ color: colors.text.primary }}>
            {title}
          </Typography>
          {showBack && selectedRegion && (
            <Typography variant="regular" size={14} style={{ color: colors.text.secondary }}>
              {selectedRegion} Region
            </Typography>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={closePicker}
        style={{
          padding: 4,
        }}
      >
        <MaterialIcons name="close" size={24} color={colors.gray.medium} />
      </TouchableOpacity>
    </View>
  );

  const renderRegionList = () => {
    const regions = Object.keys(GHANA_LOCATIONS);

    return (
      <View style={{ flex: 1 }}>
        {renderHeader('Select Region')}

        <FlatList
          data={regions}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          bounces={true}
          style={{ flex: 1, backgroundColor: colors.white }}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 40 : 60,
            paddingTop: 8,
            flexGrow: 1,
          }}
          renderItem={({ item: region }) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.gray.light + '30',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.white,
              }}
              onPress={() => handleRegionSelect(region)}
              activeOpacity={0.7}
            >
              <Typography
                variant="medium"
                size={16}
                style={{ color: colors.text.primary }}
              >
                {region}
              </Typography>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={colors.gray.medium}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderTownList = () => {
    const towns = GHANA_LOCATIONS[selectedRegion as keyof typeof GHANA_LOCATIONS] || [];

    return (
      <View style={{ flex: 1 }}>
        {renderHeader('Select Town', true)}

        <FlatList
          data={towns}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          bounces={true}
          style={{ flex: 1, backgroundColor: colors.white }}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 40 : 60,
            paddingTop: 8,
            flexGrow: 1,
          }}
          renderItem={({ item: town }) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.gray.light + '30',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.white,
              }}
              onPress={() => handleTownSelect(town)}
              activeOpacity={0.7}
            >
              <Typography
                variant="medium"
                size={16}
                style={{ color: colors.text.primary }}
              >
                {town}
              </Typography>
              <MaterialIcons
                name="location-on"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]} ref={ref}>
      {/* Animated Label */}
      {label && animatedLabel && (
        <Animated.View
          style={{
            position: 'absolute',
            left: 48,
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
          <View style={{
            backgroundColor: variant === 'filled' ? colors.gray.light : colors.white,
            paddingHorizontal: 4,
          }}>
            <Typography
              variant="medium"
              size={14}
              style={{
                color: error
                  ? colors.error
                  : isFocused
                    ? colors.secondary
                    : colors.gray.medium
              }}
            >
              {label}{required && ' *'}
            </Typography>
          </View>
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
        onPress={openPicker}
        disabled={disabled}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            ...sizeStyles,
            ...variantStyles,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        activeOpacity={0.7}
      >
        {/* Location Icon */}
        <MaterialIcons
          name="location-on"
          size={20}
          color={getIconColor()}
          style={{ marginRight: 12 }}
        />

        {/* Display Value */}
        <View style={{ flex: 1 }}>
          {getDisplayValue() ? (
            <Typography
              variant="regular"
              size={sizeStyles.fontSize}
              style={{ color: colors.text.primary }}
            >
              {getDisplayValue()}
            </Typography>
          ) : (
            <Typography
              variant="regular"
              size={sizeStyles.fontSize}
              style={{ color: colors.gray.medium }}
            >
              {!animatedLabel || !isFocused ? placeholder : ''}
            </Typography>
          )}
        </View>

        {/* Dropdown Icon */}
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={getIconColor()}
        />
      </TouchableOpacity>

      {/* Helper Text */}
      {renderHelperText()}

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isOpen}
        animationType="none"
        transparent
        onRequestClose={closePicker}
        statusBarTranslucent
      >
        {/* Overlay */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: overlayAnimation,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={closePicker}
          />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: screenHeight * 0.8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: 16,
            transform: [
              {
                translateY: slideAnimation,
              },
            ],
          }}
        >
          {/* Handle Bar */}
          <View style={{
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor: colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
            <View style={{
              width: 40,
              height: 4,
              backgroundColor: colors.gray.light,
              borderRadius: 2,
            }} />
          </View>

          {/* Content */}
          <View style={{ flex: 1 }}>
            {currentStep === 'region' ? renderRegionList() : renderTownList()}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
});

LocationPicker.displayName = 'LocationPicker';

export default LocationPicker;