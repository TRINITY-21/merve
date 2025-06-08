import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Platform, View } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { IconButton } from './IconButton';
import { Typography } from './Typography';

export type HeaderProps = {
  title: string;
  leftIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  rightIcons?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color?: string;
    badge?: number;
  }[];
  animatedValue?: Animated.Value;
  barStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
  titleColor?: string;
  iconBackgroundColor?: string;
  withShadow?: boolean;
  statusBarTranslucent?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcons = [],
  animatedValue = new Animated.Value(1),
  barStyle = 'dark-content',
  backgroundColor = colors.primary,
  titleColor = colors.secondary,
  iconBackgroundColor = 'rgba(255, 255, 255, 0.1)',
  withShadow = true,
  statusBarTranslucent = false,
}) => {
  return (
    <>
    
      {/* <StatusBar 
        barStyle={barStyle} 
        translucent={statusBarTranslucent} 
        backgroundColor="dark-content" 
      /> */}
      
      <Animated.View 
        style={[
          { transform: [{ scale: animatedValue }] },
          withShadow && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }
        ]}
      >
          <View className={`${Platform.OS === 'ios' ? 'pt-14' : 'pt-0'} pl-2 pr-5`}>
            <View className="flex-row items-center justify-between h-14">
              {/* Left Icon (conditionally rendered) */}
              {leftIcon ? (
                <IconButton
                  iconName={leftIcon.name}
                  iconSize={24}
                  buttonSize={38}
                  borderRadius={19}
                  backgroundColor={iconBackgroundColor}
                  iconColor={leftIcon.color || titleColor}
                  onPress={leftIcon.onPress}
                />
              ) : (
                <View className="w-10" /> // Spacer when no left icon
              )}

              {/* Title */}
              <Typography 
                className="text-xl flex-1 text-center mx-4"
                style={{ color: titleColor }}
                numberOfLines={1}
                variant="bold"
                size={20}
              >
                {title}
              </Typography>

              {/* Right Icons */}
              <View className="flex-row" style={{ gap: 10 }}>
                {rightIcons.map((icon, index) => (
                  <IconButton
                    key={`right-icon-${index}`}
                    iconName={icon.name}
                    iconSize={20}
                    buttonSize={38}
                    borderRadius={19}
                    backgroundColor={iconBackgroundColor}
                    iconColor={icon.color || titleColor}
                    onPress={icon.onPress}
                    // badge={icon.badge}
                  />
                ))}
                
                {/* Add empty view if no right icons to balance layout */}
                {rightIcons.length === 0 && <View className="w-10" />}
              </View>
            </View>
          </View>
      </Animated.View>
    </>
  );
};