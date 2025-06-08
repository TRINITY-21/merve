import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

export const useMapStatusBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle('dark-content');
  }, []);
}; 