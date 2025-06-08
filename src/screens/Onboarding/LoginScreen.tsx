import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { Button, Input } from '../../components/common';
import { Typography } from '../../components/common/Typography';
import { colors } from '../../constants/theme/colors';
import useStore from '../../store/useStore';
import ForgotPasswordModal, { ForgotPasswordModalRef } from './ForgotPasswordModal';

interface LoginResult {
    success: boolean;
    error?: string;
}

interface StoreType {
    login: (phone: string, pin: string) => LoginResult;
}

type NavigationType = {
    navigate: (screen: string) => void;
};

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationType>();
    const { login } = useStore() as StoreType;

    const [phone, setPhone] = useState<string>('');
    const [pin, setPin] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [phoneError, setPhoneError] = useState<string>('');
    const [pinError, setPinError] = useState<string>('');
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const phoneRef = useRef<TextInput>(null);
    const pinRef = useRef<TextInput>(null);
    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
    const forgotPasswordRef = useRef<ForgotPasswordModalRef>(null);


    const handleForgotPasswordOpen = (): void => {
        setShowForgotPassword(true);
    };

    const handleForgotPasswordClose = (): void => {
        setShowForgotPassword(false);
        forgotPasswordRef.current?.reset();
    };

    const handleForgotPasswordSuccess = (): void => {
        Toast.show({
            type: 'success',
            text1: 'PIN Reset Complete',
            text2: 'You can now login with your new PIN',
        });
        // Clear the current login form
        setPhone('');
        setPin('');
        setPhoneError('');
        setPinError('');
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const shake = (): void => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const validatePhone = (phoneNumber: string): string => {
        if (!phoneNumber) {
            return 'Phone number is required';
        }
        if (phoneNumber.length !== 10) {
            return 'Phone number must be 10 digits';
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            return 'Phone number must contain only digits';
        }
        return '';
    };

    const validatePin = (pinValue: string): string => {
        if (!pinValue) {
            return 'PIN is required';
        }
        if (pinValue.length !== 4) {
            return 'PIN must be 4 digits';
        }
        if (!/^\d{4}$/.test(pinValue)) {
            return 'PIN must contain only digits';
        }
        return '';
    };

    const handlePhoneChange = (text: string): void => {
        setPhone(text);
        if (phoneError) {
            setPhoneError('');
        }
    };

    const handlePinChange = (text: string): void => {
        setPin(text);
        if (pinError) {
            setPinError('');
        }
    };

    const handleLogin = async (): Promise<void> => {
        const phoneValidationError = validatePhone(phone);
        const pinValidationError = validatePin(pin);

        setPhoneError(phoneValidationError);
        setPinError(pinValidationError);

        if (phoneValidationError || pinValidationError) {
            shake();
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fix the errors and try again',
            });
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = login(phone, pin);
            setLoading(false);

            if (result.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome Back!',
                    text2: 'Login successful',
                });
            } else {
                shake();
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: result.error,
                });
            }
        }, 1500);
    };

    const handleBiometricLogin = (): void => {
        Toast.show({
            type: 'info',
            text1: 'Biometric Login',
            text2: 'Coming soon!',
        });
    };

    const navigateToRegister = (): void => {
        navigation.navigate('Register');
    };

    return (
        <LinearGradient
            colors={[colors.gradient.accent[1], colors.gradient.accent[0]]}
            style={{ flex: 1 }}
        >
            <KeyboardAwareScrollView
                style={{ flex: 1, backgroundColor: 'transparent' }}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 0 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableAutomaticScroll={true}
                extraHeight={Platform.OS === 'ios' ? 10 : 10}
                extraScrollHeight={Platform.OS === 'ios' ? 10 : 20}
                enableResetScrollToCoords={true}
                keyboardShouldPersistTaps="handled"
            >

                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={[
                            {
                                paddingHorizontal: 16,
                                opacity: fadeAnim,
                                transform: [
                                    {
                                        translateY: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        {/* Logo Container */}
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                            <View
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 60,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <MaterialIcons name="account-balance-wallet" size={60} color={colors.white} />
                            </View>
                            <Typography
                                variant="bold"
                                size={42}
                                style={{ color: colors.white, marginBottom: 8 }}
                            >
                                MoMoGo
                            </Typography>
                            <Typography
                                variant="regular"
                                size={16}
                                style={{ color: 'rgba(255,255,255,0.8)' }}
                            >
                                Your Mobile Money Companion
                            </Typography>
                        </View>

                        {/* Form Container */}
                        <Animated.View
                            style={[
                                {
                                    transform: [{ translateX: shakeAnimation }],
                                    backgroundColor: colors.white,
                                    borderRadius: 20,
                                    padding: 20,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 10,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 20,
                                },
                            ]}
                        >
                            {/* Phone Input */}
                            <Input
                                ref={phoneRef}
                                type="phone"
                                label="Phone Number"
                                value={phone}
                                onChangeText={handlePhoneChange}
                                maxLength={10}
                                required
                                animatedLabel
                                showCharacterCount
                                variant="filled"
                                size="large"
                                error={phoneError}
                                helperText={!phoneError ? "Enter your 10-digit phone number" : undefined}
                                onSubmitEditing={() => pinRef.current?.focus()}
                                disabled={loading}
                                containerStyle={{ marginBottom: 20 }}
                            />

                            {/* PIN Input */}
                            <Input
                                ref={pinRef}
                                type="password"
                                label="PIN"
                                value={pin}
                                onChangeText={handlePinChange}
                                maxLength={4}
                                required
                                showPasswordToggle
                                keyboardType="numeric"
                                variant="filled"
                                size="large"
                                error={pinError}
                                helperText={!pinError ? "Enter your secure 4-digit PIN" : undefined}
                                onSubmitEditing={handleLogin}
                                disabled={loading}
                                loading={loading}
                                containerStyle={{ marginBottom: 0 }}
                            />

                            {/* Forgot PIN */}
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end', marginBottom: 10, marginTop: 20 }}
                                onPress={handleForgotPasswordOpen}
                            >
                                <Typography
                                    variant="semibold"
                                    size={14}
                                    style={{ color: colors.secondary }}
                                >
                                    Forgot PIN?
                                </Typography>
                            </TouchableOpacity>

                            {/* Login Button */}
                            <Button
                                title="Login"
                                onPress={handleLogin}
                                gradient
                                size="large"
                                style={{ 
                                    marginBottom: 10,
                                    backgroundColor: colors.accent,
                                    borderColor: colors.accent
                                }}
                                textStyle={{ color: colors.white }}
                                startIconColor={colors.white}
                                disabled={loading}
                                loading={loading}
                                startIcon='login'
                                variant="outline"
                            />

                            {/* OR Divider */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <View style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: colors.gray.light
                                }} />
                                <Typography
                                    variant="regular"
                                    size={14}
                                    style={{
                                        color: colors.gray.medium,
                                        marginHorizontal: 10
                                    }}
                                >
                                    OR
                                </Typography>
                                <View style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: colors.gray.light
                                }} />
                            </View>

                            {/* Biometric Button */}
                            <Button
                                title="Login with Fingerprint"
                                icon="fingerprint"
                                variant="outline"
                                size="large"
                                style={{
                                    borderColor: colors.gray.medium,
                                    backgroundColor: colors.gray.light
                                }}
                                textStyle={{ color: colors.white }}
                                onPress={handleBiometricLogin}
                            />
                        </Animated.View>

                        {/* Footer */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 20
                        }}>
                            <Typography
                                variant="regular"
                                size={16}
                                style={{ color: colors.white }}
                            >
                                Don't have an account?{' '}
                            </Typography>
                            <TouchableOpacity onPress={navigateToRegister}>
                                <Typography
                                    variant="bold"
                                    size={16}
                                    style={{
                                        color: colors.white,
                                        textDecorationLine: 'underline'
                                    }}

                                >
                                    Register Now
                                </Typography>
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <ForgotPasswordModal
                ref={forgotPasswordRef}
                isVisible={showForgotPassword}
                onClose={handleForgotPasswordClose}
                onSuccess={handleForgotPasswordSuccess}
            />
        </LinearGradient>
    );
};

export default LoginScreen;