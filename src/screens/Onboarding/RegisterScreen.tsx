import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LocationPicker, { LocationData } from '../../components/LocationPicker';
import { Typography } from '../../components/Typography';
import { colors } from '../../constant/theme/colors';
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

    // Form refs for navigation
    const nameRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const pinRef = useRef<TextInput>(null);
    const confirmPinRef = useRef<TextInput>(null);
    const otpRef = useRef<OTPVerificationRef>(null);

    useEffect(() => {
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
    }, [currentStep, fadeAnim, slideAnim]);

    // Validation functions
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
    };

    // Individual form data handlers with proper field isolation
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
        console.log('PIN changing to:', text); // Debug log
        setFormData(prevData => ({ ...prevData, pin: text }));
        if (errors.pin) {
            setErrors(prev => ({ ...prev, pin: undefined }));
        }
    };


    const handleConfirmPinChange = (text: string): void => {
        console.log('Confirm PIN changing to:', text); // Debug log
        setFormData(prevData => ({ ...prevData, confirmPin: text }));
        if (errors.confirmPin) {
            setErrors(prev => ({ ...prev, confirmPin: undefined }));
        }
    };

    const handleNext = (): void => {
        console.log('Next button pressed');
        if (validateStep1()) {
            console.log('Moving to Step 2');
            clearStep2Data();
            setCurrentStep(2);
            fadeAnim.setValue(0);
            slideAnim.setValue(0);
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
                // Include location data if needed
                region: formData.location?.region,
                town: formData.location?.town,
                fullLocation: formData.location ? `${formData.location.town}, ${formData.location.region}` : '',
            } as IRegisterData);

            setLoading(false);

            if (result.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful!',
                    text2: 'Welcome to MoMoGo',
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
        setCurrentStep(1);
        fadeAnim.setValue(0);
        slideAnim.setValue(0);
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

            const isValidOTP = otp === '123456'; // Mock validation

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
            style={[{
                backgroundColor: colors.white,
                borderRadius: 24,
                padding: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 8,
                opacity: fadeAnim,
                transform: [{
                    translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                    }),
                }],
            }]}
        >
            <View style={{ marginBottom: 25 }}>
                <Typography variant="bold" size={22} style={{ color: colors.text.primary, marginBottom: 4 }}>
                    Personal Information
                </Typography>
                <Typography variant="regular" size={14} style={{ color: colors.text.secondary }}>
                    Let's get to know you
                </Typography>
            </View>

            {/* Form content */}
            <View>
                <Input
                    ref={nameRef}
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
                                backgroundColor: colors.primary + '15',
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
                    containerStyle={{ marginBottom: 0 }}
                />

                {/* Button positioned to avoid keyboard */}
                <View style={{ marginTop: 24 }}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        gradient
                        size="large"
                        endIcon="chevron-right"
                        disabled={loading || !isPhoneVerified}
                    />
                </View>
            </View>
        </Animated.View>
    );

    const renderStep2 = (): React.ReactElement => (
        <Animated.View
            style={[{
                backgroundColor: colors.white,
                borderRadius: 24,
                padding: 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 8,
                opacity: fadeAnim,
                transform: [{
                    translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0],
                    }),
                }],
            }]}
        >
            <View style={{ marginBottom: 20 }}>
                <Typography variant="bold" size={22} style={{ color: colors.text.primary, marginBottom: 4 }}>
                    Security Setup
                </Typography>
                <Typography variant="regular" size={14} style={{ color: colors.text.secondary }}>
                    Create your secure PIN
                </Typography>
            </View>

            {/* Form inputs section */}
            <View>
                <Input
                    ref={pinRef}
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
                    containerStyle={{ marginBottom: 16 }}
                />

                <Input
                    ref={confirmPinRef}
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

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.primary + '20',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 24,
                }}>
                    <MaterialIcons name="info" size={18} color={colors.primary} />
                    <Typography variant="regular" size={12} style={{
                        flex: 1,
                        marginLeft: 8,
                        color: colors.text.secondary
                    }}>
                        Your PIN will be used to login to your account.
                    </Typography>
                </View>
            </View>

            {/* Buttons section */}
            <View>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <Button
                        title="Back"
                        onPress={goBackToStep1}
                        size="medium"
                        style={{ flex: 1 }}
                        disabled={loading}
                        startIcon="chevron-left"
                        variant='outline'
                    />

                    <Button
                        title="Register"
                        onPress={handleRegister}
                        size="medium"
                        style={{ flex: 1 }}
                        disabled={loading}
                        loading={loading}
                    />
                </View>
            </View>
        </Animated.View>
    );

    return (
        <LinearGradient
            colors={[colors.gradient.primary[0], colors.gradient.primary[1]]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" backgroundColor={colors.gradient.primary[0]} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255,255,255,0.1)',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginRight: 20 }}
                        >
                            <MaterialIcons name="chevron-left" size={28} color={colors.white} />
                        </TouchableOpacity>
                        <Typography variant="bold" size={18} style={{ color: colors.white }}>
                            Create Account
                        </Typography>
                    </View>

                    <View style={{ paddingHorizontal: 0 }}>
                        <View style={{
                            height: 4,
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            borderRadius: 2,
                            overflow: 'hidden',
                            marginBottom: 8
                        }}>
                            <Animated.View
                                style={[{
                                    height: '100%',
                                    backgroundColor: colors.white,
                                    borderRadius: 2,
                                    width: `${currentStep * 50}%`,
                                }]}
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
                    style={{ flex: 1, backgroundColor: 'transparent', 
                        paddingHorizontal: 16, 
                        paddingVertical: 10

                     }} // Set a background color for the scroll view
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 0 }} // Add padding here
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableAutomaticScroll={true}
                    extraHeight={Platform.OS === 'ios' ? 50 : 20} // Adjust extra height for iOS/Android
                    extraScrollHeight={Platform.OS === 'ios' ? 10 : 20} // Adjust extra scroll height
                    enableResetScrollToCoords={true}
                    keyboardShouldPersistTaps="handled" // Important for inputs to stay focused
                    showsVerticalScrollIndicator={false}
                >
                    <View> 
                        {currentStep === 1 ? renderStep1() : renderStep2()}
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 20,
                        marginTop: 30, 
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(255,255,255,0.1)',
                    }}>
                        <Typography
                            variant="regular"
                            size={14}
                            style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                            Already have an account?{' '}
                        </Typography>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Typography
                                variant="bold"
                                size={14}
                                style={{
                                    color: colors.white,
                                    textDecorationLine: 'underline',
                                }}
                            >
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