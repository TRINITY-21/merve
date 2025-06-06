import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Button } from '../../../../../components/common';
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

  return (
    <Animated.View 
      style={cardStyle}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-[#FFCC00]/30 shadow-lg"
    >
      <Text className="text-xl font-bold text-[#212121] mb-2">
        Personal Information
      </Text>
      <Text className="text-sm text-[#757575] mb-5">
        Let's start your agent journey! ✨
      </Text>

      {/* Name Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="person" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Phone Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="phone" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Email Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="email" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Send OTP Button */}
      <Button
        title={otpSent ? "Resend OTP" : "Send OTP"}
        variant="outline"
        size="medium"
        onPress={handleSendOTP}
        className="border-[#00BFA5] mb-4"
        // textClassName="text-[#00BFA5]"
      />

      {/* OTP Input */}
      {otpSent && (
        <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
          <MaterialIcons name="lock" size={24} color="#00BFA5" />
          <TextInput
            className="flex-1 ml-2 text-base text-[#212121]"
            placeholder="Enter OTP"
            value={formData.otp}
            onChangeText={(text) => setFormData({ ...formData, otp: text })}
            keyboardType="numeric"
            maxLength={6}
            placeholderTextColor="#9E9E9E"
          />
        </View>
      )}

      {/* PIN Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="lock" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Create 4-digit PIN"
          value={formData.pin}
          onChangeText={(text) => setFormData({ ...formData, pin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Confirm PIN Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="lock-outline" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Confirm PIN"
          value={formData.confirmPin}
          onChangeText={(text) => setFormData({ ...formData, confirmPin: text })}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor="#9E9E9E"
        />
      </View>
    </Animated.View>
  );
};

export default PersonalInfoStep;