import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Button, Input } from '../../components/common';
import { LocationData, LocationPicker } from '../../components/common/LocationPicker';
import { Typography } from '../../components/common/Typography';
import { colors } from '../../constants/theme/colors';
import useStore from '../../store/useStore';
import { IAuthResult, IFormData, IRegisterData, OTPVerificationRef } from '../../types';
import OTPVerification from './OTPVerification';

interface StoreType {
    register: (data: IRegisterData) => IAuthResult;
}

type NavigationType = {
    goBack: () => void;
    navigate: (screen: string) => void;
};

interface ValidationErrors {
    name?: string;
    phone?: string;
    email?: string;
    location?: string;
    pin?: string;
    confirmPin?: string;
}

interface IFormDataWithLocation extends Omit<IFormData, 'location'> {
    location: LocationData | null;
}

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation() as NavigationType;
    const { register } = useStore() as StoreType;
    const [formData, setFormData] = useState<IFormDataWithLocation>({
        name: '',
        phone: '',
        email: '',
        location: null,
        pin: '',
        confirmPin: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showOTPVerification, setShowOTPVerification] = useState<boolean>(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const [otpError, setOtpError] = useState<string>('');

    const slideAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const nameRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const pinRef = useRef<TextInput>(null);
    const confirmPinRef = useRef<TextInput>(null);
    const otpRef = useRef<OTPVerificationRef>(null);

    const windowWidth = Dimensions.get('window').width;
    const cardWidth = Math.min(windowWidth - 32, 500); // Max width of 500

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            paddingHorizontal: 16,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.white + '30',
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
        },
        backButton: {
            marginRight: 10,
            marginBottom: Platform.OS === 'ios' ? 4 : -3,
        },
        progressBar: {
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 8,
        },
        progressFill: {
            height: '100%',
            backgroundColor: colors.white,
            borderRadius: 2,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        card: {
            width: cardWidth,
            backgroundColor: colors.white,
            borderRadius: 24,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 8,
        },
        cardHeader: {
            marginBottom: 30,
        },
        cardTitle: {
            color: colors.text.primary,
            marginBottom: 4,
        },
        cardSubtitle: {
            color: colors.text.secondary,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            marginTop: 30,
            borderTopWidth: 1,
            borderTopColor: colors.white + '30',
            marginBottom: 2,
        },
        footerText: {
            color: colors.text.light,
        },
        footerLink: {
            color: colors.white,
            textDecorationLine: 'underline',
        },
        infoBox: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary + '30',
            padding: 12,
            borderRadius: 8,
            marginBottom: 24,
        },
        infoText: {
            flex: 1,
            marginLeft: 8,
            color: colors.text.secondary,
        },
        buttonContainer: {
            flexDirection: 'row',
            gap: 16,
            marginTop: 24,
        },
        button: {
            flex: 1,
        },
    });

    useEffect(() => {
        fadeAnim.setValue(0);
        slideAnim.setValue(0);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        const focusInput = () => {
            if (currentStep === 1) {
                setTimeout(() => nameRef.current?.focus(), 100);
            } else if (currentStep === 2) {
                setTimeout(() => pinRef.current?.focus(), 100);
            }
        };

        TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
        focusInput();

    }, [currentStep, fadeAnim, slideAnim]);

    const validateName = (name: string): string => {
        if (!name.trim()) {
            return 'Full name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces';
        }
        return '';
    };

    const validatePhone = (phone: string): string => {
        if (!phone) {
            return 'Phone number is required';
        }
        if (phone.length !== 10) {
            return 'Phone number must be exactly 10 digits';
        }
        if (!/^\d{10}$/.test(phone)) {
            return 'Phone number must contain only digits';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email) {
            return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validateLocation = (location: LocationData | null): string => {
        if (!location) {
            return 'Please select your location';
        }
        if (!location.region || !location.town) {
            return 'Please select both region and town';
        }
        return '';
    };

    const validatePin = (pin: string): string => {
        if (!pin) {
            return 'PIN is required';
        }
        if (pin.length !== 4) {
            return 'PIN must be exactly 4 digits';
        }
        if (!/^\d{4}$/.test(pin)) {
            return 'PIN must contain only numbers';
        }
        return '';
    };

    const validateConfirmPin = (confirmPin: string, pin: string): string => {
        if (!confirmPin) {
            return 'Please confirm your PIN';
        }
        if (confirmPin !== pin) {
            return 'PINs do not match';
        }
        return '';
    };

    const clearStep2Data = (): void => {
        setFormData(prevData => ({
            ...prevData,
            pin: '',
            confirmPin: '',
        }));
        setErrors(prev => ({
            ...prev,
            pin: undefined,
            confirmPin: undefined,
        }));
        pinRef.current?.clear();
        confirmPinRef.current?.clear();
    };

    const handleNameChange = (text: string): void => {
        setFormData(prevData => ({ ...prevData, name: text }));
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: undefined }));
        }
    };

    const handlePhoneChange = (text: string): void => {
        setFormData(prevData => ({ ...prevData, phone: text }));
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: undefined }));
        }
    };

    const handleEmailChange = (text: string): void => {
        setFormData(prevData => ({ ...prevData, email: text }));
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handleLocationChange = (location: LocationData): void => {
        setFormData(prevData => ({ ...prevData, location }));
        if (errors.location) {
            setErrors(prev => ({ ...prev, location: undefined }));
        }
    };

    const handlePinChange = (text: string): void => {
        console.log('PIN changing to:', text);
        setFormData(prevData => ({ ...prevData, pin: text }));
        if (errors.pin) {
            setErrors(prev => ({ ...prev, pin: undefined }));
        }
    };

    const handleConfirmPinChange = (text: string): void => {
        console.log('Confirm PIN changing to:', text);
        setFormData(prevData => ({ ...prevData, confirmPin: text }));
        if (errors.confirmPin) {
            setErrors(prev => ({ ...prev, confirmPin: undefined }));
        }
    };

    const handleNext = (): void => {
        if (validateStep1()) {
            TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
            clearStep2Data();
            setCurrentStep(2);
        }
    };

    const handleRegister = async (): Promise<void> => {
        const pinError = validatePin(formData.pin);
        const confirmPinError = validateConfirmPin(formData.confirmPin, formData.pin);
        const newErrors: ValidationErrors = {};
        if (pinError) newErrors.pin = pinError;
        if (confirmPinError) newErrors.confirmPin = confirmPinError;
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fix the errors and try again',
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = register({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                pin: formData.pin,
                region: formData.location?.region,
                town: formData.location?.town,
                location: formData.location ? `${formData.location.town}, ${formData.location.region}` : '',
            } as IRegisterData);

            setLoading(false);

            if (result.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful!',
                    text2: 'Welcome to Peyba',
                });

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Registration Failed',
                    text2: result.error,
                });
            }
        }, 1500);
    };

    const goBackToStep1 = (): void => {
        TextInput.State.blurTextInput(TextInput.State.currentlyFocusedInput());
        setCurrentStep(1);
    };

    const validateStep1 = (): boolean => {
        const nameError = validateName(formData.name);
        const phoneError = validatePhone(formData.phone);
        const emailError = validateEmail(formData.email);
        const locationError = validateLocation(formData.location);

        const newErrors: ValidationErrors = {};
        if (nameError) newErrors.name = nameError;
        if (phoneError) newErrors.phone = phoneError;
        if (emailError) newErrors.email = emailError;
        if (locationError) newErrors.location = locationError;

        if (!isPhoneVerified) {
            newErrors.phone = newErrors.phone || 'Please verify your phone number';
        }

        setErrors(newErrors);

        const hasErrors = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fix the errors and try again',
            });
            return false;
        }

        console.log('Validation passed');
        return true;
    };

    const handlePhoneVerification = (): void => {
        const phoneError = validatePhone(formData.phone);
        if (phoneError) {
            setErrors(prev => ({ ...prev, phone: phoneError }));
            Toast.show({
                type: 'error',
                text1: 'Invalid Phone Number',
                text2: phoneError,
            });
            return;
        }

        setErrors(prev => ({ ...prev, phone: undefined }));
        setShowOTPVerification(true);
        setOtpError('');
    };

    const handleOTPVerifySuccess = async (otp: string): Promise<void> => {
        setOtpLoading(true);
        setOtpError('');
        try {
            console.log('Verifying OTP:', otp, 'for phone:', formData.phone);
            await new Promise(resolve => setTimeout(resolve, 2000));

            const isValidOTP = otp === '123456';

            if (isValidOTP) {
                setIsPhoneVerified(true);
                setShowOTPVerification(false);
                setOtpLoading(false);
                Toast.show({
                    type: 'success',
                    text1: 'Phone Verified!',
                    text2: 'Your phone number has been successfully verified',
                });
            } else {
                setOtpLoading(false);
                setOtpError('Invalid OTP. Please check and try again.');
                otpRef.current?.setError('Invalid OTP. Please check and try again.');
            }
        } catch (error) {
            setOtpLoading(false);
            setOtpError('Verification failed. Please try again.');
            otpRef.current?.setError('Verification failed. Please try again.');
        }
    };

    const handleOTPResend = async (): Promise<void> => {
        try {
            console.log('Resending OTP to:', formData.phone);
            await new Promise(resolve => setTimeout(resolve, 1000));
            Toast.show({
                type: 'success',
                text1: 'OTP Sent',
                text2: 'A new verification code has been sent to your phone',
            });
            setOtpError('');
            otpRef.current?.clearOTP();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Send OTP',
                text2: 'Please try again later',
            });
        }
    };

    const handleOTPClose = (): void => {
        setShowOTPVerification(false);
        setOtpError('');
    };

    const renderStep1 = (): React.ReactElement => (
        <Animated.View
            key="step1-content"
            style={[
                styles.card,
                {
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                }
            ]}
        >
            <View style={styles.cardHeader}>
                <Typography variant="bold" size={22} style={styles.cardTitle}>
                    Personal Information
                </Typography>
                <Typography variant="regular" size={14} style={styles.cardSubtitle}>
                    Let's get to know you
                </Typography>
            </View>
            {/* Form content */}
            <View>
                <Input
                    ref={nameRef}
                    key="name-input"
                    type="text"
                    label="Full Name"
                    value={formData.name}
                    onChangeText={handleNameChange}
                    required
                    animatedLabel
                    variant="filled"
                    size="medium"
                    error={errors.name}
                    helperText={!errors.name ? "Enter your first and last name" : undefined}
                    autoCapitalize="words"
                    disabled={loading}
                    containerStyle={{ marginBottom: 16 }}
                />
                <View style={{ marginBottom: 16 }}>
                    <Input
                        ref={phoneRef}
                        key="phone-input"
                        type="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChangeText={handlePhoneChange}
                        maxLength={10}
                        required
                        animatedLabel
                        showCharacterCount
                        variant="filled"
                        size="medium"
                        error={errors.phone}
                        success={isPhoneVerified}
                        helperText={
                            isPhoneVerified
                                ? "Phone number verified ✓"
                                : !errors.phone
                                    ? "Your 10-digit mobile number"
                                    : undefined
                        }
                        rightIcon={isPhoneVerified ? "verified" : undefined}
                        disabled={loading}
                        containerStyle={{ marginBottom: 8 }}
                    />
                    {!isPhoneVerified && formData.phone.length === 10 && !errors.phone && (
                        <TouchableOpacity
                            onPress={handlePhoneVerification}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                backgroundColor: colors.primary + '35',
                                borderRadius: 6,
                                marginTop: 4,
                            }}
                        >
                            <MaterialIcons name="sms" size={14} color={colors.primary} />
                            <Typography variant="semibold" size={12} style={{ color: colors.primary, marginLeft: 4 }}>
                                Verify Phone Number
                            </Typography>
                        </TouchableOpacity>
                    )}
                </View>
                <Input
                    ref={emailRef}
                    key="email-input"
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChangeText={handleEmailChange}
                    required
                    animatedLabel
                    variant="filled"
                    size="medium"
                    error={errors.email}
                    helperText={!errors.email ? "We'll send important updates here" : undefined}
                    disabled={loading}
                    autoComplete="email"
                />
                <LocationPicker
                    key="location-picker"
                    label="Location"
                    value={formData.location}
                    onLocationChange={handleLocationChange}
                    required
                    animatedLabel
                    variant="filled"
                    size="medium"
                    error={errors.location}
                    helperText={!errors.location ? "Select your region and town" : undefined}
                    disabled={loading}
                    containerStyle={{ marginBottom: 20, marginTop: 5 }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        gradient
                        size="large"
                        endIcon="chevron-right"
                        disabled={loading || !isPhoneVerified}
                        style={styles.button}
                    />
                </View>
            </View>
        </Animated.View>
    );

    const renderStep2 = (): React.ReactElement => (
        <Animated.View
            key="step2-content"
            style={[
                styles.card,
                {
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                }
            ]}
        >
            <View style={styles.cardHeader}>
                <Typography variant="bold" size={22} style={styles.cardTitle}>
                    Security Setup
                </Typography>
                <Typography variant="regular" size={14} style={styles.cardSubtitle}>
                    Create your secure PIN
                </Typography>
            </View>
            <View>
                <Input
                    ref={pinRef}
                    key="pin-input"
                    type="password"
                    label="Create PIN"
                    value={formData.pin}
                    onChangeText={handlePinChange}
                    maxLength={4}
                    required
                    showPasswordToggle
                    animatedLabel
                    variant="filled"
                    size="medium"
                    error={errors.pin}
                    helperText={!errors.pin ? "Choose a secure 4-digit PIN" : undefined}
                    keyboardType="numeric"
                    disabled={loading}
                    containerStyle={{ marginBottom: 20 }}
                />
                <Input
                    ref={confirmPinRef}
                    key="confirm-pin-input"
                    type="password"
                    label="Confirm PIN"
                    value={formData.confirmPin}
                    onChangeText={handleConfirmPinChange}
                    maxLength={4}
                    required
                    showPasswordToggle
                    animatedLabel
                    variant="filled"
                    size="medium"
                    error={errors.confirmPin}
                    success={!!(formData.pin && formData.confirmPin && formData.pin === formData.confirmPin && !errors.confirmPin)}
                    helperText={!errors.confirmPin ? "Confirm your 4-digit PIN" : undefined}
                    keyboardType="numeric"
                    disabled={loading}
                    containerStyle={{ marginBottom: 20 }}
                />
                <View style={styles.infoBox}>
                    <MaterialIcons name="info" size={18} color={colors.primary} />
                    <Typography variant="regular" size={12} style={styles.infoText}>
                        Your PIN will be used to login to your account.
                    </Typography>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Back"
                        onPress={goBackToStep1}
                        size="medium"
                        style={styles.button}
                        disabled={loading}
                        startIcon="chevron-left"
                        variant='outline'
                    />
                    <Button
                        title="Register"
                        onPress={handleRegister}
                        size="medium"
                        style={styles.button}
                        disabled={loading}
                        loading={loading}
                    />
                </View>
            </View>
        </Animated.View>
    );

    return (
        <LinearGradient
            colors={[colors.gradient.primary[1], colors.gradient.primary[0]]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor={colors.gradient.primary[1]} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <MaterialIcons name="chevron-left" size={28} color={colors.white} />
                        </TouchableOpacity>
                        <Typography variant="bold" size={20} style={{ color: colors.white }}>
                            Create Account
                        </Typography>
                    </View>
                    <View>
                        <View style={styles.progressBar}>
                            <Animated.View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${currentStep * 50}%`,
                                    }
                                ]}
                            />
                        </View>
                        <Typography
                            variant="regular"
                            size={12}
                            style={{
                                color: 'rgba(255,255,255,0.8)',
                                marginTop: 4
                            }}
                        >
                            Step {currentStep} of 2
                        </Typography>
                    </View>
                </View>
                <KeyboardAwareScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}
                    contentContainerStyle={styles.scrollContent}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableAutomaticScroll={true}
                    extraHeight={Platform.OS === 'ios' ? 50 : 20}
                    extraScrollHeight={Platform.OS === 'ios' ? 10 : 20}
                    enableResetScrollToCoords={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {currentStep === 1 ? renderStep1() : renderStep2()}
                    <View style={styles.footer}>
                        <Typography variant="regular" size={14} style={styles.footerText}>
                            Already have an account?{' '}
                        </Typography>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Typography variant="bold" size={14} style={styles.footerLink}>
                                Login
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
            <OTPVerification
                ref={otpRef}
                isVisible={showOTPVerification}
                phoneNumber={formData.phone}
                onClose={handleOTPClose}
                onVerifySuccess={handleOTPVerifySuccess}
                onResendOTP={handleOTPResend}
                loading={otpLoading}
                error={otpError}
            />
        </LinearGradient>
    );
};

export default RegisterScreen;