import clsx from 'clsx'; // For conditional Tailwind classes
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme/colors';

// Define the props for the Card component
interface CardProps {
  /**
   * The content to be rendered inside the card.
   */
  children: React.ReactNode;
  /**
   * Optional custom Tailwind CSS classes to apply to the card.
   */
  className?: string;
  /**
   * Function to be called when the card is pressed. Makes the card pressable.
   */
  onPress?: () => void;
  /**
   * If true, the card will have an elevated shadow effect. Defaults to true.
   */
  elevated?: boolean;
  /**
   * The padding around the content inside the card. Defaults to 16.
   */
  padding?: number;
  /**
   * The border radius of the card. Defaults to 16.
   */
  borderRadius?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onPress, 
  elevated = true,
  padding = 16,
  borderRadius = 16,
}) => {
  // Dynamically create Tailwind classes based on props
  const cardClasses = clsx(
    'bg-card', // Use the 'card' color from your palette
    'my-2', // Equivalent to marginVertical: 8
    'mx-4', // Equivalent to marginHorizontal: 16
    elevated && 'shadow-md', // Tailwind's shadow-md for elevation
    className // Allow for additional custom classes
  );

  // Convert padding and borderRadius to style objects for dynamic values
  const dynamicStyles = {
    padding: padding,
    borderRadius: borderRadius,
    // Apply custom shadow properties from your color palette if elevated
    ...(elevated && {
      shadowColor: colors.shadowColor,
      shadowOffset: colors.shadowOffset,
      shadowOpacity: colors.shadowOpacity,
      shadowRadius: colors.shadowRadius,
      elevation: 5, // Android elevation
    }),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        className={cardClasses}
        onPress={onPress}
        activeOpacity={0.9}
        style={dynamicStyles} // Apply dynamic styles directly
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={cardClasses} style={dynamicStyles}>
      {children}
    </View>
  );
};
