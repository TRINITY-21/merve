import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

// Type definitions
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  elevated?: boolean;
  padding?: number;
  borderRadius?: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevated = true,
  padding = 16,
  borderRadius = 16,
  className = '',
}) => {
  // Base Tailwind classes
  const baseClasses = `bg-white my-2 mx-4 ${className}`;
  
  // Elevated shadow classes
  const elevatedClasses = elevated 
    ? 'shadow-lg shadow-black/10' 
    : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${elevatedClasses}`.trim();
  
  // Dynamic styles that can't be handled by Tailwind
  const dynamicStyles: ViewStyle = {
    padding,
    borderRadius,
  };
  
  // Combine dynamic styles with any additional styles passed in
  const combinedStyles: ViewStyle | ViewStyle[] = style 
    ? [dynamicStyles, style]
    : dynamicStyles;

  // Conditional rendering based on onPress prop
  if (onPress) {
    return (
      <TouchableOpacity
        className={cardClasses}
        style={combinedStyles}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={cardClasses}
      style={combinedStyles}
    >
      {children}
    </View>
  );
};

export default Card;