import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IStepProps } from '../../../../../types/agentRegistrationTypes';

const PersonalInfoStep: React.FC<IStepProps & { cardStyle: any }> = ({
  formData,
  setFormData,
  otpSent,
  setOtpSent,
  sendOTP,
  cardStyle,
}) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSendOTP = () => {
    if (formData.phone.length !== 10) {
      Toast.show({ 
        type: 'error', 
        text1: 'Invalid Phone', 
        text2: 'Phone must be 10 digits' 
      });
      return;
    }
    console.log('Sending OTP to', formData.phone);
    const otpResult = sendOTP(formData.phone);
    console.log('sendOTP result:', otpResult);
    setOtpSent(true);
    Toast.show({ 
      type: 'success', 
      text1: 'OTP Sent', 
      text2: 'Check your phone for the OTP' 
    });
  };

  const inputStyle = {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 0,
    lineHeight: Platform.OS === 'ios' ? 20 : 18,
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
    marginTop: Platform.OS === 'ios' ? -5 : -1,
    marginLeft: 8,
    fontFamily: 'JosefinSans_400Regular',
  };

  const iconStyle = {
    marginTop: Platform.OS === 'ios' ? 0 : -1
  };

  const containerStyle = {
    paddingVertical: Platform.OS === 'ios' ? 6 : 2,
    minHeight: Platform.OS === 'ios' ? 52 : 48
  };

  const getInputContainerStyle = (inputName: string) => ({
    ...containerStyle,
    backgroundColor: colors.white,
    borderColor: focusedInput === inputName ? colors.primary : colors.gray.light,
    borderWidth: focusedInput === inputName ? 2 : 1,
    // shadowColor: focusedInput === inputName ? colors.primary : colors.shadowColor,
    // shadowOffset: colors.shadowOffset,
    // shadowOpacity: focusedInput === inputName ? 0.1 : 0.05,
    // shadowRadius: focusedInput === inputName ? 8 : 4,
    // elevation: focusedInput === inputName ? 4 : 2,
  });

  return (
    <Animated.View 
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        // marginBottom: 20,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.1,
        // shadowRadius: 16,
        // elevation: 8,
        borderWidth: 1,
        borderColor: colors.gray.light,
        marginTop: 10,
      }]}
    >
      <View style={{ marginBottom: 24 }}>
        <Typography variant="semibold" className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
          Personal Information
        </Typography>
        <Text className="text-sm" style={{ color: colors.text.secondary, lineHeight: 20 }}>
          Please provide your basic information to get started.
        </Text>
      </View>

      {/* Name Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('name')}
      >
        <MaterialIcons name="person" size={24} color={focusedInput === 'name' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="words"
        />
      </View>

      {/* Phone Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('phone')}
      >
        <MaterialIcons name="phone" size={24} color={focusedInput === 'phone' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('phone')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Email Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('email')}
      >
        <MaterialIcons name="email" size={24} color={focusedInput === 'email' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity
        onPress={handleSendOTP}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 20,
          marginBottom: 16,
          alignItems: 'center',
          shadowColor: colors.primary,
          shadowOffset: colors.shadowOffset,
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Typography variant="medium" style={{ color: colors.white, textAlign: "center", fontSize: 16 }}>
          {otpSent ? "Resend OTP" : "Send OTP"}
        </Typography>
      </TouchableOpacity>

      {/* OTP Input */}
      {otpSent && (
        <View className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={getInputContainerStyle('otp')}
        >
          <MaterialIcons name="lock" size={24} color={focusedInput === 'otp' ? colors.primary : colors.text.secondary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChangeText={(text) => setFormData({ ...formData, otp: text })}
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor={colors.text.secondary}
            onFocus={() => setFocusedInput('otp')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>
      )}

      {/* PIN Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('pin')}
      >
        <MaterialIcons name="lock" size={24} color={focusedInput === 'pin' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Create 4-digit PIN"
          value={formData.pin}
          onChangeText={(text) => setFormData({ ...formData, pin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('pin')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Confirm PIN Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('confirmPin')}
      >
        <MaterialIcons name="lock" size={24} color={focusedInput === 'confirmPin' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Confirm 4-digit PIN"
          value={formData.confirmPin}
          onChangeText={(text) => setFormData({ ...formData, confirmPin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('confirmPin')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

    </Animated.View>
  );
};

export default PersonalInfoStep;