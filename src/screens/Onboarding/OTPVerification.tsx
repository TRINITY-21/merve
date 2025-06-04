import { MaterialIcons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

import { BottomSheet, Button } from '../../components/common';
import { Typography } from '../../components/common/Typography';
import { colors } from '../../constants/theme/colors';
import { OTPVerificationProps, OTPVerificationRef } from '../../types';

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

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useImperativeHandle(ref, () => ({
    clearOTP: () => {
      setOtp(['', '', '', '', '', '']);
      setCurrentIndex(0);
      setInternalError('');
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
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

  useEffect(() => {
    if (isVisible) {
      startResendTimer();
      const timeoutId = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 350);
      return () => clearTimeout(timeoutId);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      inputRefs.current.forEach(input => input?.blur());
      setOtp(['', '', '', '', '', '']);
      setCurrentIndex(0);
      setInternalError('');
    }
  }, [isVisible]);

  useEffect(() => {
    if (otp.every(digit => digit !== '') && !internalLoading && !loading) {
      const timeoutId = setTimeout(() => {
        const otpString = otp.join('');
        onVerifySuccess(otpString);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [otp, internalLoading, loading, onVerifySuccess]);

  const startResendTimer = () => {
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

  const handleOTPChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const pastedValue = value.slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedValue[i] || '';
      }
      setOtp(newOtp);

      setTimeout(() => {
        const lastFilledIndex = Math.min(pastedValue.length - 1, 5);
        setCurrentIndex(lastFilledIndex);
        inputRefs.current[lastFilledIndex]?.focus();
      }, 0);
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        setTimeout(() => {
          setCurrentIndex(index + 1);
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    }

    if (internalError || error) {
      setInternalError('');
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        setCurrentIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      } else {
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
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
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
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Verify Phone Number"
      animationDuration={300}
      keyboardAware={true}
      height={Platform.OS === 'ios' ? '55%' : '60%'}
      maxHeight={Platform.OS === 'ios' ? '90%' : '90%'}
      showCloseButton={true}
      closeIcon="close"
      statusBarStyle="dark-content"
      statusBarTranslucent={false}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Platform.OS === 'ios' ? 0 : 0 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: 6,
        }}>
          <View style={{ flex: 1 }}>
            <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginTop: 4 }}>
              Enter the 6-digit code sent to
            </Typography>
            <Typography variant="semibold" size={14} style={{ color: colors.primary, marginTop: 2 }}>
              {formatPhoneNumber(phoneNumber)}
            </Typography>
          </View>
        </View>

        <View style={{ flex: 1, paddingTop: 3 }}>
          {/* OTP Icon */}
          <View style={{
            alignItems: 'center',
            marginBottom: 2,
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

          {/* OTP Input */}
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
                  maxLength={1}
                  selectTextOnFocus
                  editable={!isLoading}
                />
              </View>
            ))}
          </Animated.View>

          {/* Error Message */}
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

          {/* Loading Indicator */}
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

          {/* Resend Section */}
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

          {/* Manual Verify Button */}
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

          {/* Help Text */}
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingBottom: 20,
          }}>
            <Typography variant="regular" size={12} style={{
              color: colors.text.secondary,
              textAlign: 'center',
              lineHeight: 18,
            }}>
              Didn't receive the code? Check your SMS or try resending.
            </Typography>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

OTPVerification.displayName = 'OTPVerification';

export default OTPVerification;