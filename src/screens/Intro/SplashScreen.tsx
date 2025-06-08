// src/screens/SplashScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../components/common/Typography';
import { colors } from '../../constants/theme/colors';

interface ISplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<ISplashScreenProps> = ({ onFinish }) => {
    const insets = useSafeAreaInsets();

    const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
    const scaleAnim = useRef<Animated.Value>(new Animated.Value(0.3)).current;
    const rotateAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start(() => {
                if (typeof onFinish === 'function') {
                    onFinish();
                }
            });
        }, 2500);

        return () => clearTimeout(timer);
    }, [onFinish, fadeAnim, scaleAnim, rotateAnim]);

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
                hidden={false}
            />

            <View style={{
                flex: 1,
                marginTop: Platform.OS === 'android' ? -insets.top : 0,
            }}>
                <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                    }}
                >
                    {/* Logo Container */}
                    <Animated.View
                        style={{
                            marginBottom: 48,
                            opacity: fadeAnim,
                            transform: [
                                { scale: scaleAnim },
                                {
                                    rotate: rotateAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        }}
                    >
                        <View
                            style={{
                                width: 160,
                                height: 160,
                                borderRadius: 80,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 10,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                elevation: 0,
                            }}
                        >
                            <MaterialIcons
                                name="account-balance-wallet"
                                size={80}
                                color="white"
                            />
                        </View>
                    </Animated.View>

                    {/* Text Container */}
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Typography
                            variant="bold"
                            style={{
                                fontSize: 48,
                                color: 'white',
                                marginBottom: 8,
                                textAlign: 'center',
                                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                                textShadowOffset: { width: 2, height: 2 },
                                textShadowRadius: 5,
                            }}
                        >
                            Peyba
                        </Typography>

                        <Typography
                            variant="medium"
                            style={{
                                fontSize: 18,
                                color: 'rgba(255,255,255,0.9)',
                                textAlign: 'center',
                            }}
                        >
                            Go Get Your MoMo!
                        </Typography>
                    </Animated.View>

                    {/* Footer */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: Math.max(48, insets.bottom + 20),
                            opacity: fadeAnim,
                        }}
                    >
                        <Typography
                            variant="regular"
                            style={{
                                fontSize: 14,
                                color: 'rgba(255,255,255,0.7)',
                                textAlign: 'center',
                            }}
                        >
                            Powered by Trinity
                        </Typography>
                    </Animated.View>
                </LinearGradient>
            </View>
        </>
    );
};

export default SplashScreen;