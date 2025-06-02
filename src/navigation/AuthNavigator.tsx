import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/ HomeScreen';
import IntroSliderScreen from '../screens/Intro/IntroSliderScreen';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import RegisterScreen from '../screens/Onboarding/RegisterScreen';
import { AuthStackParamList } from '../types';

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
    StackScreenProps<AuthStackParamList, Screen>;

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
                            gestureEnabled: false,
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