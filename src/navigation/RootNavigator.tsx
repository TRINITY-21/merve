// src/navigation/RootNavigator.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screen imports
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// Store import
import SplashScreen from '../screens/Intro/SplashScreen';
import useStore from '../store/useStore';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, setAuthenticated } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    checkAppStatus(); 
  }, []);  

  const checkAppStatus = async (): Promise<void> => { 
    try {
      const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
      const token = await AsyncStorage.getItem('authToken');
      
      setShowIntro(hasSeenIntro !== 'true');
      setAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking app status:', error);
      setShowIntro(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  };

  const handleSplashFinish = (): void => {
    setShowSplash(false);
  };

  // Full screen components (no SafeAreaView)
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-yellow-400" />
    );
  }

  // For authenticated users - use SafeAreaView for regular app screens
  if (isAuthenticated) {
    return (
      <>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="white" 
          translucent={false}
        />
        <SafeAreaView className="flex-1 bg-gray-50">
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="MainTabs" 
              component={AppNavigator}
              options={{ gestureEnabled: false }}
            />
            {/* Add your other authenticated screens here as you create them */}
          </Stack.Navigator>
        </SafeAreaView>
      </>
    );
  }

  // For auth flow - no SafeAreaView to allow full screen intro/auth screens
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Auth" 
        options={{ headerShown: false }}
      > 
        {() => <AuthNavigator showIntro={showIntro} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;