import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { colors } from '../constant/theme/colors'; // Your provided color palette

// Define the shape of the props for the IconButton
interface IconButtonProps extends TouchableOpacityProps {
  /**
   * The name of the MaterialIcons glyph to display.
   * @example "close", "settings", "arrow-back"
   */
  icon: keyof typeof MaterialIcons.glyphMap;
  /**
   * Visual style variant of the button.
   * - 'primary': Solid primary background.
   * - 'secondary': Solid secondary background.
   * - 'outline': Transparent background with a border.
   * - 'ghost': Transparent background, no border (subtle).
   * - 'circular-primary': Primary background with a primary circle border.
   * - 'circular-secondary': Secondary background with a secondary circle border.
   * - 'translucent-white': Semi-transparent white background, specifically for styles like your backButton. (NEW)
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'circular-primary' | 'circular-secondary' | 'translucent-white';
  /**
   * Size of the button and icon.
   * - 'small': Compact size (e.g., 36x36).
   * - 'medium': Standard size (e.g., 44x44, or can be customized to 40x40 via style).
   * - 'large': Larger size (e.g., 52x52).
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom style for the TouchableOpacity container.
   * Use this to override default dimensions (like making 'medium' exactly 40x40).
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom color for the icon. Overrides variant's default icon color.
   */
  iconColor?: string;
  /**
   * Custom size for the icon. Overrides variant's default icon size.
   */
  iconSize?: number;
  /**
   * If true, shows a loading spinner instead of the icon.
   */
  loading?: boolean;
  /**
   * If true, the button is disabled and non-interactive.
   */
  disabled?: boolean;
}

// Define default sizes for IconButton (padding, icon size, minimum touchable dimension)
const iconButtonSizes = {
  small: {
    padding: 8,
    iconSize: 18,
    minDimension: 36, // This results in a 36x36 px button
  },
  medium: {
    padding: 10,
    iconSize: 24, // Original requested icon size for back button
    minDimension: 44, // This results in a 44x44 px button by default
  },
  large: {
    padding: 12,
    iconSize: 28,
    minDimension: 52,
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost', // Default to 'ghost' if no variant is specified
  size = 'medium', // Default size
  style,
  iconColor,
  iconSize,
  loading = false,
  disabled = false,
  ...props // Allows passing other TouchableOpacityProps like `onPress`, `activeOpacity` etc.
}) => {
  const { padding, iconSize: defaultIconSize, minDimension } = iconButtonSizes[size];

  // Define colors and styles based on the chosen variant
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      backgroundColorActive: colors.primary, // Use a solid color for active
      borderColor: 'transparent',
      borderWidth: 0,
      iconColor: colors.white,
    },
    secondary: {
      backgroundColor: colors.secondaryLight,
      backgroundColorActive: '#dce3f0', // Slightly darker secondary light on press
      borderColor: 'transparent',
      borderWidth: 0,
      iconColor: colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      backgroundColorActive: 'rgba(30, 58, 95, 0.1)', // Light overlay on press
      borderColor: colors.gray.light,
      borderWidth: 1,
      iconColor: colors.secondary,
    },
    ghost: {
      backgroundColor: 'transparent',
      backgroundColorActive: 'rgba(0,0,0,0.05)', // Very subtle overlay on press
      borderColor: 'transparent',
      borderWidth: 0,
      iconColor: colors.text.secondary, // Default icon color for ghost
    },
    'circular-primary': {
      backgroundColor: colors.primary, // Using primary for solid fill
      backgroundColorActive: colors.glow, // A more vibrant primary on press
      borderColor: colors.primary,
      borderWidth: 1.5, // Slightly thicker border
      iconColor: colors.white, // White icon on primary fill
    },
    'circular-secondary': {
      backgroundColor: colors.secondary, // Using secondary for solid fill
      backgroundColorActive: colors.secondaryLight, // Lighter secondary on press
      borderColor: colors.secondary,
      borderWidth: 1.5,
      iconColor: colors.white, // White icon on secondary fill
    },
    // --- Specific Translucent White Variant ---
    'translucent-white': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)', // The exact translucent white background
      backgroundColorActive: 'rgba(255, 255, 255, 0.25)', // More opaque on press
      borderColor: 'transparent', // No border
      borderWidth: 0,
      iconColor: colors.secondary, // Your specified icon color for the back button
    },
  };

  const currentVariantStyles = variantStyles[variant];

  // Determine the final icon size and color, allowing props to override variant defaults
  const resolvedIconSize = iconSize || defaultIconSize;
  const resolvedIconColor = iconColor || currentVariantStyles.iconColor;

  return (
    <TouchableOpacity
      disabled={disabled || loading} // Disable button if `disabled` or `loading`
      activeOpacity={props.activeOpacity || 0.7} // Use passed activeOpacity or default
      style={[
        {
          borderRadius: minDimension / 2, // Ensures a perfect circle based on calculated minDimension
          width: minDimension, // Ensure it's a square
          height: minDimension, // Ensure it's a square
          padding: padding, // Padding around the icon
          backgroundColor: disabled ? colors.gray.light : currentVariantStyles.backgroundColor, // Disabled color
          borderWidth: currentVariantStyles.borderWidth,
          borderColor: currentVariantStyles.borderColor,
          opacity: disabled ? 0.6 : 1, // Visual feedback for disabled state
          alignItems: 'center', // Center content horizontally
          justifyContent: 'center', // Center content vertically
        } as ViewStyle, // Explicitly cast to ViewStyle for clarity and type safety
        style, // Allow custom styles passed via prop to override defaults (e.g., width/height for 40x40)
      ]}
      {...props} // Spread any other TouchableOpacityProps
    >
      {loading ? (
        // Show ActivityIndicator if loading
        <ActivityIndicator color={resolvedIconColor} size="small" />
      ) : (
        // Show MaterialIcons icon
        <MaterialIcons
          name={icon}
          size={resolvedIconSize}
          color={resolvedIconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;