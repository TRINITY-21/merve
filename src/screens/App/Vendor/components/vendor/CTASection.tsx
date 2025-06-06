// components/CTASection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ICTASectionProps } from '../../../../../types/vendorTypes';

const CTASection: React.FC<ICTASectionProps> = ({ onStartAsAgent }) => {
  return (
    <View className="p-5 items-center">
      <TouchableOpacity
        className="rounded-2xl overflow-hidden w-full"
        onPress={onStartAsAgent}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#FFCC00', '#FFB300']}
          className="flex-row items-center justify-center py-4 px-6 gap-2"
        >
          <MaterialIcons name="rocket-launch" size={20} color="white" />
          <Text className="text-lg font-bold text-white">
            Start as an Agent
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      
      <Text className="text-sm text-[#757575] mt-3">
        Free for the first month!
      </Text>
    </View>
  );
};

export default CTASection;