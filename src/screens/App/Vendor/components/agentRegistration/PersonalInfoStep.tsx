import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Button, Typography } from '../../../../../components/common';
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

  return (
    <Animated.View 
      style={[cardStyle, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.primary + '30',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        marginTop: 20
      }]}
    >
      <Typography variant="semibold" className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
        Personal Information
      </Typography>
      <Text className="text-sm mb-5" style={{ color: colors.text.secondary }}>
        Let's start your agent journey!
      </Text>

      {/* Name Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={[containerStyle, {
          backgroundColor: colors.background || '#F8F9FA',
          borderColor: colors.primary + '30'
        }]}
      >
        <MaterialIcons name="person" size={24} color={colors.primary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFormData({ ...formData, name: '' })}
        />
      </View>

      {/* Phone Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={[containerStyle, {
          backgroundColor: colors.background || '#F8F9FA',
          borderColor: colors.primary + '30'
        }]}
      >
        <MaterialIcons name="phone" size={24} color={colors.primary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor={colors.text.secondary}
        />
      </View>

      {/* Email Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={[containerStyle, {
          backgroundColor: colors.background || '#F8F9FA',
          borderColor: colors.primary + '30'
        }]}
      >
        <MaterialIcons name="email" size={24} color={colors.primary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          placeholderTextColor={colors.text.secondary}
        />
      </View>

      {/* Send OTP Button */}
      <Button
        title={otpSent ? "Resend OTP" : "Send OTP"}
        variant="outline"
        size="medium"
        onPress={handleSendOTP}
        style={{
          borderColor: colors.primary,
          backgroundColor: 'transparent',
          marginBottom: 16
        }}
        textStyle={{ color: colors.primary }}
      />

      {/* OTP Input */}
      {otpSent && (
        <View className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, {
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="lock" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Enter OTP"
            value={formData.otp}
            onChangeText={(text) => setFormData({ ...formData, otp: text })}
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor={colors.text.secondary}
          />
        </View>
      )}

      {/* PIN Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={[containerStyle, {
          backgroundColor: colors.background || '#F8F9FA',
          borderColor: colors.primary + '30'
        }]}
      >
        <MaterialIcons name="lock" size={24} color={colors.primary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Create 4-digit PIN"
          value={formData.pin}
          onChangeText={(text) => setFormData({ ...formData, pin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor={colors.text.secondary}
        />
      </View>

      {/* Confirm PIN Input */}
      <View className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={[containerStyle, {
          backgroundColor: colors.background || '#F8F9FA',
          borderColor: colors.primary + '30'
        }]}
      >
        <MaterialIcons name="lock-outline" size={24} color={colors.primary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Confirm PIN"
          value={formData.confirmPin}
          onChangeText={(text) => setFormData({ ...formData, confirmPin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor={colors.text.secondary}
        />
      </View>
    </Animated.View>
  );
};

export default PersonalInfoStep;