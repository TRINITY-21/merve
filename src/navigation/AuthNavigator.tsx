// src/navigation/AuthNavigator.tsx
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/ HomeScreen';
import IntroSliderScreen from '../screens/Intro/IntroSliderScreen';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';

// Type definitions for authentication flow
export type AuthStackParamList = {
    IntroSlider: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
    StackScreenProps<AuthStackParamList, Screen>;

// Props interface for AuthNavigator component
interface AuthNavigatorProps {
    showIntro: boolean;
}

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ showIntro }) => {
    return (
        <Stack.Navigator
            initialRouteName={showIntro ? 'IntroSlider' : 'Login'}
            screenOptions={{
                headerShown: false,
                // Custom slide-in animation from right
                cardStyleInterpolator: ({ current, layouts }) => ({
                    cardStyle: {
                        transform: [
                            {
                                translateX: current.progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [layouts.screen.width, 0],
                                }),
                            },
                        ],
                    },
                }),
                // Alternative: Use predefined animations
                // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

                // Animation timing configuration
                transitionSpec: {
                    open: {
                        animation: 'timing',
                        config: {
                            duration: 300,
                        },
                    },
                    close: {
                        animation: 'timing',
                        config: {
                            duration: 250,
                        },
                    },
                },
            }}
        >
            {showIntro && (
                <>
                    <Stack.Screen
                        name="IntroSlider"
                        component={IntroSliderScreen}
                        options={{
                            // Custom options for intro slider if needed
                            gestureEnabled: false, // Disable swipe back gesture
                        }}
                    />

                </>
            )}

            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />

             <Stack.Screen
                name="Home"
                component={HomeScreen}
            />


        </Stack.Navigator>
    );
};

export default AuthNavigator;
