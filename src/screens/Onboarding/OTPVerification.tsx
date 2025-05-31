// components/OTPVerification.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import Button from '../../components/Button';
import { Typography } from '../../components/Typography';
import { colors } from '../../constant/theme/colors';
import { OTPVerificationProps, OTPVerificationRef } from '../../types';


const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const OTPVerification = forwardRef<OTPVerificationRef, OTPVerificationProps>(({
  isVisible,
  phoneNumber,
  onClose,
  onVerifySuccess,
  onResendOTP,
  loading = false,
  error = '',
}, ref) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');

  const slideAnimation = useRef(new Animated.Value(screenHeight)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  // Add keyboard handling state after existing state
const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  // Refs for OTP inputs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Timer ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    clearOTP: () => {
      setOtp(['', '', '', '', '', '']);
      setCurrentIndex(0);
      setInternalError('');
      inputRefs.current[0]?.focus();
    },
    setError: (errorMsg: string) => {
      setInternalError(errorMsg);
      if (errorMsg) {
        shakeInputs();
      }
    },
    setLoading: (loadingState: boolean) => {
      setInternalLoading(loadingState);
    },
  }));

// Replace the visibility useEffect (around line 45)
useEffect(() => {
  if (isVisible) {
    // Use setTimeout to defer state updates
    const timeoutId = setTimeout(() => {
      openBottomSheet();
      startResendTimer();
    }, 0);
    
    return () => clearTimeout(timeoutId);
  } else {
    closeBottomSheet();
  }
  
  // Cleanup timer on unmount
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
}, [isVisible]);

useEffect(() => {
  // Auto-verify when all 6 digits are entered
  if (otp.every(digit => digit !== '') && !internalLoading && !loading) {
    // Add a small delay to prevent state update conflicts
    const timeoutId = setTimeout(() => {
      const otpString = otp.join('');
      onVerifySuccess(otpString);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }
}, [otp, internalLoading, loading, onVerifySuccess]);


useEffect(() => {
  const keyboardWillShow = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
  const keyboardWillHide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

  const showSubscription = Keyboard.addListener(keyboardWillShow, (event) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
  });

  const hideSubscription = Keyboard.addListener(keyboardWillHide, () => {
    setKeyboardHeight(0);
    setKeyboardVisible(false);
  });

  return () => {
    showSubscription?.remove();
    hideSubscription?.remove();
  };
}, []);

const startResendTimer = () => {
  // Clear existing timer first
  if (timerRef.current) {
    clearInterval(timerRef.current);
  }
  
  setResendTimer(60);
  setCanResend(false);
  
  timerRef.current = setInterval(() => {
    setResendTimer(prev => {
      if (prev <= 1) {
        setCanResend(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};
  const openBottomSheet = () => {
    Animated.parallel([
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Focus first input after animation
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    });
  };

const closeBottomSheet = () => {
  Animated.parallel([
    Animated.timing(overlayAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }),
    Animated.timing(slideAnimation, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // Use setTimeout to defer state updates after animation
    setTimeout(() => {
      setOtp(['', '', '', '', '', '']);
      setCurrentIndex(0);
      setInternalError('');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 0);
  });
};
  const shakeInputs = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 100, 50, 100]);
    } else {
      Vibration.vibrate(200);
    }

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

  // Replace the handleOTPChange function (around line 155)
const handleOTPChange = (value: string, index: number) => {
  // Only allow numeric input
  if (!/^\d*$/.test(value)) return;

  const newOtp = [...otp];
  
  if (value.length > 1) {
    // Handle paste scenario
    const pastedValue = value.slice(0, 6);
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedValue[i] || '';
    }
    setOtp(newOtp);
    
    // Defer focus to next tick
    setTimeout(() => {
      const lastFilledIndex = Math.min(pastedValue.length - 1, 5);
      setCurrentIndex(lastFilledIndex);
      inputRefs.current[lastFilledIndex]?.focus();
    }, 0);
  } else {
    // Single character input
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      // Defer focus to next tick
      setTimeout(() => {
        setCurrentIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  }

  // Clear errors when user starts typing
  if (internalError || error) {
    setInternalError('');
  }
};

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input if current is empty
        setCurrentIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      onResendOTP();
      startResendTimer();
      setOtp(['', '', '', '', '', '']);
      setCurrentIndex(0);
      setInternalError('');
      inputRefs.current[0]?.focus();
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10) {
      return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    return phone;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLoading = loading || internalLoading;
  const displayError = error || internalError;

return (
  <Modal
    visible={isVisible}
    animationType="none"
    transparent
    onRequestClose={onClose}
    statusBarTranslucent={false} // Changed to false for better iOS handling
  >
    {/* Overlay */}
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: overlayAnimation,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={onClose}
      />
    </Animated.View>

    {/* KeyboardAvoidingView wrapper for iOS */}
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'flex-end' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Bottom Sheet */}
      <Animated.View
        style={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 40 : 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 16,
          // Dynamic positioning based on keyboard
          marginBottom: Platform.OS === 'android' && keyboardVisible ? keyboardHeight * 0.1 : 0,
          transform: [
            {
              translateY: slideAnimation,
            },
          ],
        }}
      >
        {/* Handle Bar */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
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
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray.light,
        }}>
          <View style={{ flex: 1 }}>
            <Typography variant="bold" size={20} style={{ color: colors.text.primary }}>
              Verify Phone Number
            </Typography>
            <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginTop: 4 }}>
              Enter the 6-digit code sent to
            </Typography>
            <Typography variant="semibold" size={14} style={{ color: colors.primary, marginTop: 2 }}>
              {formatPhoneNumber(phoneNumber)}
            </Typography>
          </View>
          
          <TouchableOpacity 
            onPress={onClose}
            style={{ padding: 4 }}
          >
            <MaterialIcons name="close" size={24} color={colors.gray.medium} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content for better keyboard handling */}
        <ScrollView
          style={{ 
            maxHeight: screenHeight * 0.6, // Limit height
            paddingHorizontal: 24, 
            paddingTop: 32 
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* OTP Icon */}
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <MaterialIcons name="sms" size={40} color={colors.primary} />
            </View>
          </View>

          {/* OTP Input - Keep existing code */}
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              paddingHorizontal: 12,
              transform: [{ translateX: shakeAnimation }],
            }}
          >
            {otp.map((digit, index) => (
              <View
                key={index}
                style={{
                  width: 45,
                  height: 56,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: displayError
                    ? colors.error
                    : digit
                    ? colors.primary
                    : currentIndex === index
                    ? colors.primary
                    : colors.gray.light,
                  backgroundColor: digit ? colors.primary + '10' : colors.gray.light + '50',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text.primary,
                  }}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setCurrentIndex(index)}
                  keyboardType="numeric"
                  maxLength={6}
                  selectTextOnFocus
                  editable={!isLoading}
                />
              </View>
            ))}
          </Animated.View>

          {/* Error Message - Keep existing code */}
          {displayError && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              paddingHorizontal: 12,
            }}>
              <MaterialIcons name="error-outline" size={20} color={colors.error} />
              <Typography 
                variant="medium" 
                size={14} 
                style={{ color: colors.error, marginLeft: 8, flex: 1 }}
              >
                {displayError}
              </Typography>
            </View>
          )}

          {/* Loading Indicator - Keep existing code */}
          {isLoading && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
              <MaterialIcons name="refresh" size={20} color={colors.primary} />
              <Typography 
                variant="medium" 
                size={14} 
                style={{ color: colors.primary, marginLeft: 8 }}
              >
                Verifying...
              </Typography>
            </View>
          )}

          {/* Resend Section - Keep existing code */}
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
          }}>
            {!canResend ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="regular" size={14} style={{ color: colors.text.secondary }}>
                  Resend code in 
                </Typography>
                <Typography variant="semibold" size={14} style={{ color: colors.primary, marginLeft: 4 }}>
                  {formatTime(resendTimer)}
                </Typography>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleResendOTP}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
                disabled={isLoading}
              >
                <MaterialIcons name="refresh" size={20} color={colors.primary} />
                <Typography 
                  variant="semibold" 
                  size={14} 
                  style={{ color: colors.primary, marginLeft: 8 }}
                >
                  Resend Code
                </Typography>
              </TouchableOpacity>
            )}
          </View>

          {/* Manual Verify Button - Keep existing code */}
          <Button
            title="Verify"
            onPress={() => {
              const otpString = otp.join('');
              if (otpString.length === 6) {
                onVerifySuccess(otpString);
              }
            }}
            gradient
            size="large"
            disabled={otp.some(digit => digit === '') || isLoading}
            loading={isLoading}
            style={{ marginBottom: 16 }}
          />

          {/* Help Text - Keep existing code */}
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
            <Typography variant="regular" size={12} style={{ 
              color: colors.text.secondary, 
              textAlign: 'center',
              lineHeight: 18,
            }}>
              Didn't receive the code? Check your SMS or try resending.
            </Typography>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  </Modal>
);
});

OTPVerification.displayName = 'OTPVerification';

export default OTPVerification;