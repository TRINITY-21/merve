// components/BottomAction.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IBottomActionProps } from '../../../../types/promoteTypes';

const BottomAction: React.FC<IBottomActionProps> = ({
  currentStep,
  pricing,
  onContinue,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0">
      <LinearGradient 
        colors={['transparent', 'white']} 
        className="h-5" 
      />
      <View 
        className={`flex-row bg-white px-5 py-4 items-center gap-4 border-t border-[#E0E0E0] ${
          Platform.OS === 'ios' ? 'pb-8' : 'pb-4'
        }`}
      >
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-[#FFCC00]">
            GHS {pricing.finalPrice}
          </Text>
          {pricing.discount > 0 && (
            <Text className="text-sm text-[#757575] line-through">
              GHS {pricing.basePrice}
            </Text>
          )}
        </View>
        
        <TouchableOpacity 
          className="bg-[#FFCC00] rounded-2xl px-6 py-4 flex-row items-center gap-2 shadow-lg"
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text className="text-base font-bold text-white">
            {currentStep === 3 ? 'Promote Now' : 'Continue'}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomAction;