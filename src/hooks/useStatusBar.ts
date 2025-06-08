import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { colors } from '../constants/theme/colors';

interface UseStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  translucent?: boolean;
}

export const useStatusBar = ({
  backgroundColor = colors.background,
  barStyle = 'dark-content',
  translucent = false,
}: UseStatusBarProps = {}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setTranslucent(translucent);
    }
    StatusBar.setBarStyle(barStyle);
  }, [backgroundColor, barStyle, translucent]);
}; 