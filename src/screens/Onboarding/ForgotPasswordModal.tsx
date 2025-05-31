import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Platform,
    StatusBar,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Typography } from '../../components/Typography';
import { colors } from '../../constant/theme/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ForgotPasswordModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export interface ForgotPasswordModalRef {
    reset: () => void;
}

interface ForgotPasswordData {
    identifier: string; // email or phone
    otp: string;
    newPin: string;
    confirmNewPin: string;
}

interface ValidationErrors {
    identifier?: string;
    otp?: string;
    newPin?: string;
    confirmNewPin?: string;
}

const ForgotPasswordModal = forwardRef<ForgotPasswordModalRef, ForgotPasswordModalProps>(
    ({ isVisible, onClose, onSuccess }, ref) => {
        const [currentStep, setCurrentStep] = useState<number>(1); // 1: Enter identifier, 2: OTP, 3: New PIN, 4: Success
        const [formData, setFormData] = useState<ForgotPasswordData>({
            identifier: '',
            otp: '',
            newPin: '',
            confirmNewPin: '',
        });
        const [errors, setErrors] = useState<ValidationErrors>({});
        const [loading, setLoading] = useState<boolean>(false);
        const [resendLoading, setResendLoading] = useState<boolean>(false);
        const [isEmailMode, setIsEmailMode] = useState<boolean>(true);
        const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

        // Animation refs
        const modalAnim = useRef(new Animated.Value(0)).current;
        const slideAnim = useRef(new Animated.Value(0)).current;
        const fadeAnim = useRef(new Animated.Value(0)).current;

        // Form refs
        const identifierRef = useRef<TextInput>(null);
        const otpRef = useRef<TextInput>(null);
        const newPinRef = useRef<TextInput>(null);
        const confirmNewPinRef = useRef<TextInput>(null);
        const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

        useImperativeHandle(ref, () => ({
            reset: () => {
                setCurrentStep(1);
                setFormData({
                    identifier: '',
                    otp: '',
                    newPin: '',
                    confirmNewPin: '',
                });
                setErrors({});
                setLoading(false);
                setResendLoading(false);
            },
        }));

        useEffect(() => {
            if (isVisible) {
                Animated.parallel([
                    Animated.timing(modalAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ]).start();
            } else {
                Animated.parallel([
                    Animated.timing(modalAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }, [isVisible]);

        useEffect(() => {
            if (isVisible) {
                Animated.spring(slideAnim, {
                    toValue: 1,
                    tension: 20,
                    friction: 7,
                    useNativeDriver: true,
                }).start();
            } else {
                slideAnim.setValue(0);
            }
        }, [currentStep, isVisible]);

        // Validation functions
        const validateEmail = (email: string): string => {
            if (!email) return 'Email address is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return 'Please enter a valid email address';
            return '';
        };

        const validatePhone = (phone: string): string => {
            if (!phone) return 'Phone number is required';
            if (phone.length !== 10) return 'Phone number must be exactly 10 digits';
            if (!/^\d{10}$/.test(phone)) return 'Phone number must contain only digits';
            return '';
        };

        const validateOTP = (otp: string): string => {
            if (!otp) return 'OTP is required';
            if (otp.length !== 6) return 'OTP must be exactly 6 digits';
            if (!/^\d{6}$/.test(otp)) return 'OTP must contain only numbers';
            return '';
        };

        const validatePin = (pin: string): string => {
            if (!pin) return 'PIN is required';
            if (pin.length !== 4) return 'PIN must be exactly 4 digits';
            if (!/^\d{4}$/.test(pin)) return 'PIN must contain only numbers';
            return '';
        };

        const validateConfirmPin = (confirmPin: string, pin: string): string => {
            if (!confirmPin) return 'Please confirm your PIN';
            if (confirmPin !== pin) return 'PINs do not match';
            return '';
        };

        // Handlers
        const handleIdentifierChange = (text: string): void => {
            setFormData(prev => ({ ...prev, identifier: text }));
            if (errors.identifier) {
                setErrors(prev => ({ ...prev, identifier: undefined }));
            }
        };

        const handleOTPChange = (text: string): void => {
            setFormData(prev => ({ ...prev, otp: text }));
            if (errors.otp) {
                setErrors(prev => ({ ...prev, otp: undefined }));
            }
        };

        const handleNewPinChange = (text: string): void => {
            setFormData(prev => ({ ...prev, newPin: text }));
            if (errors.newPin) {
                setErrors(prev => ({ ...prev, newPin: undefined }));
            }
        };

        const handleConfirmNewPinChange = (text: string): void => {
            setFormData(prev => ({ ...prev, confirmNewPin: text }));
            if (errors.confirmNewPin) {
                setErrors(prev => ({ ...prev, confirmNewPin: undefined }));
            }
        };

        const handleSendOTP = async (): Promise<void> => {
            const identifierError = isEmailMode 
                ? validateEmail(formData.identifier)
                : validatePhone(formData.identifier);

            if (identifierError) {
                setErrors({ identifier: identifierError });
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: identifierError,
                });
                return;
            }

            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                setCurrentStep(2);
                slideAnim.setValue(0);
                
                Toast.show({
                    type: 'success',
                    text1: 'OTP Sent',
                    text2: `Verification code sent to your ${isEmailMode ? 'email' : 'phone'}`,
                });
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Send OTP',
                    text2: 'Please try again later',
                });
            } finally {
                setLoading(false);
            }
        };

        const handleVerifyOTP = async (): Promise<void> => {
            const otpError = validateOTP(formData.otp);

            if (otpError) {
                setErrors({ otp: otpError });
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: otpError,
                });
                return;
            }

            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock validation
                const isValidOTP = formData.otp === '123456';
                
                if (isValidOTP) {
                    setCurrentStep(3);
                    slideAnim.setValue(0);
                } else {
                    setErrors({ otp: 'Invalid OTP. Please check and try again.' });
                    Toast.show({
                        type: 'error',
                        text1: 'Invalid OTP',
                        text2: 'Please check and try again',
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: 'Please try again later',
                });
            } finally {
                setLoading(false);
            }
        };

        const handleResetPin = async (): Promise<void> => {
            const newPinError = validatePin(formData.newPin);
            const confirmPinError = validateConfirmPin(formData.confirmNewPin, formData.newPin);

            const newErrors: ValidationErrors = {};
            if (newPinError) newErrors.newPin = newPinError;
            if (confirmPinError) newErrors.confirmNewPin = confirmPinError;

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                Toast.show({
                    type: 'error',
                    text1: 'Validation Error',
                    text2: 'Please fix the errors and try again',
                });
                return;
            }

            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                setCurrentStep(4);
                slideAnim.setValue(0);
                
                Toast.show({
                    type: 'success',
                    text1: 'PIN Reset Successful',
                    text2: 'Your PIN has been updated successfully',
                });
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Reset Failed',
                    text2: 'Please try again later',
                });
            } finally {
                setLoading(false);
            }
        };

        const handleResendOTP = async (): Promise<void> => {
            setResendLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                Toast.show({
                    type: 'success',
                    text1: 'OTP Resent',
                    text2: `New verification code sent to your ${isEmailMode ? 'email' : 'phone'}`,
                });
                
                setFormData(prev => ({ ...prev, otp: '' }));
                setErrors(prev => ({ ...prev, otp: undefined }));
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Resend OTP',
                    text2: 'Please try again later',
                });
            } finally {
                setResendLoading(false);
            }
        };

        const handleClose = (): void => {
            onClose();
            // Reset after animation completes
            setTimeout(() => {
                setCurrentStep(1);
                setFormData({
                    identifier: '',
                    otp: '',
                    newPin: '',
                    confirmNewPin: '',
                });
                setErrors({});
                setLoading(false);
            }, 300);
        };

        const handleSuccess = (): void => {
            onSuccess?.();
            handleClose();
        };

        // Step renderers
        const renderStep1 = (): React.ReactElement => (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                }}
            >
                <View style={{ marginBottom: 32, marginTop:-20 }}>
                    <Typography variant="bold" size={24} style={{ color: colors.text.primary, marginBottom: 8 }}>
                        Reset Your PIN
                    </Typography>
                    <Typography variant="regular" size={16} style={{ color: colors.text.secondary, lineHeight: 22 }}>
                        Enter your email or phone number to receive a verification code
                    </Typography>
                </View>

                <View style={{ marginBottom: 28 }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: colors.background,
                        borderRadius: 12,
                        padding: 6,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: colors.gray.light,
                    }}>
                        <TouchableOpacity
                            onPress={() => setIsEmailMode(true)}
                            style={{
                                flex: 1,
                                paddingVertical: 12,
                                borderRadius: 8,
                                backgroundColor: isEmailMode ? colors.white : 'transparent',
                                shadowColor: isEmailMode ? colors.shadowColor : 'transparent',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: isEmailMode ? 0.1 : 0,
                                shadowRadius: 4,
                                elevation: isEmailMode ? 3 : 0,
                                borderWidth: isEmailMode ? 1 : 0,
                                borderColor: isEmailMode ? colors.primary : 'transparent',
                            }}
                        >
                            <Typography
                                variant={isEmailMode ? 'semibold' : 'regular'}
                                size={14}
                                style={{
                                    color: isEmailMode ? colors.text.primary : colors.text.secondary,
                                    textAlign: 'center',
                                }}
                            >
                                Email
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsEmailMode(false)}
                            style={{
                                flex: 1,
                                paddingVertical: 12,
                                borderRadius: 8,
                                backgroundColor: !isEmailMode ? colors.white : 'transparent',
                                shadowColor: !isEmailMode ? colors.shadowColor : 'transparent',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: !isEmailMode ? 0.1 : 0,
                                shadowRadius: 4,
                                elevation: !isEmailMode ? 3 : 0,
                                borderWidth: !isEmailMode ? 1 : 0,
                                borderColor: !isEmailMode ? colors.primary : 'transparent',
                            }}
                        >
                            <Typography
                                variant={!isEmailMode ? 'semibold' : 'regular'}
                                size={14}
                                style={{
                                    color: !isEmailMode ? colors.text.primary : colors.text.secondary,
                                    textAlign: 'center',
                                }}
                            >
                                Phone
                            </Typography>
                        </TouchableOpacity>
                    </View>

                    <Input
                        ref={identifierRef}
                        type={isEmailMode ? "email" : "phone"}
                        label={isEmailMode ? "Email Address" : "Phone Number"}
                        value={formData.identifier}
                        onChangeText={handleIdentifierChange}
                        required
                        animatedLabel
                        variant="filled"
                        size="medium"
                        error={errors.identifier}
                        helperText={!errors.identifier ? 
                            (isEmailMode ? "Enter your registered email address" : "Enter your 10-digit phone number")
                            : undefined
                        }
                        keyboardType={isEmailMode ? "email-address" : "phone-pad"}
                        autoCapitalize={isEmailMode ? "none" : "characters"}
                        autoCorrect={false}
                        maxLength={isEmailMode ? undefined : 10}
                        disabled={loading}
                        containerStyle={{ marginBottom: 32 }}
                        onFocus={() => setKeyboardVisible(true)}
                        onBlur={() => setKeyboardVisible(false)}
                    />
                </View>

                <Button
                    title="Send Verification Code"
                    onPress={handleSendOTP}
                    gradient
                    size="large"
                    loading={loading}
                    disabled={loading}
                    style={{
                        shadowColor: colors.shadowColor,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                    }}
                />
            </Animated.View>
        );

        const renderStep2 = (): React.ReactElement => (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                }}
            >
                <View style={{ marginBottom: 32,marginTop:-20  }}>
                    <Typography variant="bold" size={24} style={{ color: colors.text.primary, marginBottom: 8 }}>
                        Enter Verification Code
                    </Typography>
                    <Typography variant="regular" size={16} style={{ color: colors.text.secondary, lineHeight: 22 }}>
                        We sent a 6-digit code to {formData.identifier}
                    </Typography>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Input
                        ref={otpRef}
                        type="text"
                        label="Verification Code"
                        value={formData.otp}
                        onChangeText={handleOTPChange}
                        required
                        animatedLabel
                        variant="filled"
                        size="medium"
                        error={errors.otp}
                        helperText={!errors.otp ? "Enter the 6-digit code" : undefined}
                        keyboardType="number-pad"
                        maxLength={6}
                        disabled={loading}
                        containerStyle={{ marginBottom: 16 }}
                        onFocus={() => setKeyboardVisible(true)}
                        onBlur={() => setKeyboardVisible(false)}
                    />

                    <TouchableOpacity
                        onPress={handleResendOTP}
                        disabled={resendLoading}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 8,
                        }}
                    >
                        <Typography
                            variant="semibold"
                            size={14}
                            style={{
                                color: resendLoading ? colors.text.secondary : colors.primary,
                                marginRight: 4,
                            }}
                        >
                            {resendLoading ? 'Sending...' : 'Resend Code'}
                        </Typography>
                        {!resendLoading && (
                            <MaterialIcons name="refresh" size={16} color={colors.primary} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <Button
                        title="Back"
                        onPress={() => setCurrentStep(1)}
                        variant="outline"
                        size="medium"
                        style={{ flex: 1 }}
                        disabled={loading}
                        startIcon="chevron-left"
                    />
                    <Button
                        title="Verify"
                        onPress={handleVerifyOTP}
                        gradient
                        size="medium"
                        style={{ flex: 1 }}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </Animated.View>
        );

        const renderStep3 = (): React.ReactElement => (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                }}
            >
                <View style={{ marginBottom: 32,marginTop:-20  }}>
                    <Typography variant="bold" size={24} style={{ color: colors.text.primary, marginBottom: 8 }}>
                        Create New PIN
                    </Typography>
                    <Typography variant="regular" size={16} style={{ color: colors.text.secondary, lineHeight: 22 }}>
                        Choose a secure 4-digit PIN for your account
                    </Typography>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <Input
                        ref={newPinRef}
                        type="password"
                        label="New PIN"
                        value={formData.newPin}
                        onChangeText={handleNewPinChange}
                        required
                        showPasswordToggle
                        animatedLabel
                        variant="filled"
                        size="medium"
                        error={errors.newPin}
                        helperText={!errors.newPin ? "Choose a secure 4-digit PIN" : undefined}
                        keyboardType="numeric"
                        maxLength={4}
                        disabled={loading}
                        containerStyle={{ marginBottom: 16 }}
                        onFocus={() => setKeyboardVisible(true)}
                        onBlur={() => setKeyboardVisible(false)}
                    />

                    <Input
                        ref={confirmNewPinRef}
                        type="password"
                        label="Confirm New PIN"
                        value={formData.confirmNewPin}
                        onChangeText={handleConfirmNewPinChange}
                        required
                        showPasswordToggle
                        animatedLabel
                        variant="filled"
                        size="medium"
                        error={errors.confirmNewPin}
                        success={!!(formData.newPin && formData.confirmNewPin && formData.newPin === formData.confirmNewPin && !errors.confirmNewPin)}
                        helperText={!errors.confirmNewPin ? "Confirm your 4-digit PIN" : undefined}
                        keyboardType="numeric"
                        maxLength={4}
                        disabled={loading}
                        containerStyle={{ marginBottom: 16 }}
                        onFocus={() => setKeyboardVisible(true)}
                        onBlur={() => setKeyboardVisible(false)}
                    />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.primary + '20',
                        padding: 12,
                        borderRadius: 8,
                    }}>
                        <MaterialIcons name="info" size={18} color={colors.primary} />
                        <Typography variant="regular" size={12} style={{
                            flex: 1,
                            marginLeft: 8,
                            color: colors.text.secondary
                        }}>
                            Your new PIN will be used to secure all transactions
                        </Typography>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <Button
                        title="Back"
                        onPress={() => setCurrentStep(2)}
                        variant="outline"
                        size="medium"
                        style={{ flex: 1 }}
                        disabled={loading}
                        startIcon="chevron-left"
                    />
                    <Button
                        title="Reset PIN"
                        onPress={handleResetPin}
                        gradient
                        size="medium"
                        style={{ flex: 1 }}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </Animated.View>
        );

        const renderStep4 = (): React.ReactElement => (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{
                        translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0],
                        }),
                    }],
                    alignItems: 'center',
                }}
            >
                <View style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: colors.success + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                }}>
                    <MaterialIcons name="check-circle" size={48} color={colors.success} />
                </View>

                <Typography variant="bold" size={24} style={{ color: colors.text.primary, marginBottom: 8, textAlign: 'center' }}>
                    PIN Reset Successful!
                </Typography>
                <Typography variant="regular" size={14} style={{ color: colors.text.secondary, textAlign: 'center', marginBottom: 32 }}>
                    Your PIN has been updated successfully. You can now use your new PIN to access your account.
                </Typography>

                <Button
                    title="Continue"
                    onPress={handleSuccess}
                    gradient
                    size="large"
                    style={{ width: '100%' }}
                />
            </Animated.View>
        );

        const getCurrentStepContent = (): React.ReactElement => {
            switch (currentStep) {
                case 1:
                    return renderStep1();
                case 2:
                    return renderStep2();
                case 3:
                    return renderStep3();
                case 4:
                    return renderStep4();
                default:
                    return renderStep1();
            }
        };

        return (
            <Modal
                visible={isVisible}
                transparent
                animationType="none"
                statusBarTranslucent={false}
                onRequestClose={handleClose}
            >
                <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" translucent={false} />
                
                <TouchableWithoutFeedback onPress={handleClose}>
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'flex-end',
                            opacity: modalAnim,
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={{
                                    backgroundColor: colors.white,
                                    borderTopLeftRadius: 24,
                                    borderTopRightRadius: 24,
                                    height: keyboardVisible && Platform.OS === 'android' ? '100%' : SCREEN_HEIGHT * 0.74,
                                    maxHeight: SCREEN_HEIGHT * 0.8,
                                    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
                                    transform: [{
                                        translateY: modalAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [SCREEN_HEIGHT, 0],
                                        }),
                                    }],
                                }}
                            >
                                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                                <View style={{ flex: 1 }}>
                                    {/* Modal Handle */}
                                    <View style={{
                                        alignItems: 'center',
                                        paddingVertical: 8,
                                    }}>
                                        <View style={{
                                            width: 40,
                                            height: 4,
                                            backgroundColor: colors.gray.light,
                                            borderRadius: 2,
                                        }} />
                                    </View>

                                    {/* Header */}
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        paddingVertical: 12,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.gray.light,
                                    }}>
                                        <Typography variant="bold" size={18} style={{ color: colors.text.primary }}>
                                            Forgot PIN
                                        </Typography>
                                        <TouchableOpacity onPress={handleClose}>
                                            <MaterialIcons name="close" size={24} color={colors.text.secondary} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Progress indicator */}
                                    {currentStep < 4 && (
                                        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                                            <View style={{
                                                height: 6,
                                                backgroundColor: colors.gray.light,
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                            }}>
                                                <Animated.View
                                                    style={{
                                                        height: '100%',
                                                        backgroundColor: colors.primary,
                                                        borderRadius: 3,
                                                        width: `${(currentStep / 3) * 100}%`,
                                                    }}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: 8,
                                            }}>
                                                <Typography
                                                    variant="regular"
                                                    size={12}
                                                    style={{
                                                        color: colors.text.secondary,
                                                    }}
                                                >
                                                    Step {currentStep} of 3
                                                </Typography>
                                                <Typography
                                                    variant="regular"
                                                    size={12}
                                                    style={{
                                                        color: colors.text.secondary,
                                                    }}
                                                >
                                                    {Math.round((currentStep / 3) * 100)}% Complete
                                                </Typography>
                                            </View>
                                        </View>
                                    )}

                                    {/* Content */}
                                    <KeyboardAwareScrollView
                                        ref={scrollViewRef}
                                        style={{ flex: 1 }}
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            paddingHorizontal: 20,
                                            paddingTop: 20,
                                            paddingBottom: 0, // Removed bottom padding
                                        }}
                                        keyboardShouldPersistTaps="handled"
                                        showsVerticalScrollIndicator={false}
                                        enableOnAndroid={true}
                                        enableAutomaticScroll={true}
                                        extraScrollHeight={Platform.select({ ios: 100, android: 50 })}
                                        extraHeight={Platform.select({ ios: 100, android: 0 })}
                                        enableResetScrollToCoords={true}
                                        resetScrollToCoords={{ x: 0, y: 0 }}
                                        keyboardOpeningTime={0}
                                        scrollToOverflowEnabled={false}
                                        onKeyboardWillShow={() => setKeyboardVisible(true)}
                                        onKeyboardWillHide={() => setKeyboardVisible(false)}
                                    >
                                        <View style={{ 
                                            flexGrow: 1, 
                                            paddingBottom: 20 // Added padding inside content
                                        }}>
                                            {getCurrentStepContent()}
                                        </View>
                                    </KeyboardAwareScrollView>
                                </View>
                                </SafeAreaView>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
);

ForgotPasswordModal.displayName = 'ForgotPasswordModal';

export default ForgotPasswordModal;