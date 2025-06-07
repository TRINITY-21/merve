import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';


import { ErrorBoundary } from '../components/common/ErrorBoundary';
import SplashScreen from '../screens/Intro/SplashScreen';
import useStore from '../store/useStore';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

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
      }, 100);
    }
  };

  const handleSplashFinish = (): void => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-yellow-400" />
    );
  }

  // For authenticated users 
  if (isAuthenticated) {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        {/* <SafeAreaView className="flex-1 bg-gray-50"> */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="MainTabs"
              options={{ gestureEnabled: false, headerShown: false }}
            >
              {() => <ErrorBoundary>
                <AppNavigator  />
                </ErrorBoundary>}
            </Stack.Screen>
          </Stack.Navigator>
        {/* </SafeAreaView> */}
      </>
    );
  }

  // For auth flow
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