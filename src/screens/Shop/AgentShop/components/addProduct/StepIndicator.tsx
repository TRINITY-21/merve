import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import { colors } from '../../../../../constants/theme/colors';
import { IStepIndicatorProps } from '../../../../../types/addproductTypes';

const StepIndicator: React.FC<IStepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <View className="bg-white py-4 border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-6">
          {steps.map((step, index) => (
            <View key={step.key} className="items-center min-w-[60px]">
              <View className={`w-9 h-9 rounded-full items-center justify-center mb-2 ${
                currentStep >= index 
                  ? currentStep > index 
                    ? 'bg-green-500' 
                    : 'bg-primary'
                  : 'bg-gray-300'
              }`}>
                <MaterialIcons 
                  name={currentStep > index ? "check" : step.icon as any} 
                  size={18} 
                  color={currentStep >= index ? colors.white : colors.gray.medium} 
                />
              </View>
              <Text className={`text-xs font-semibold text-center ${
                currentStep >= index ? 'text-primary' : 'text-gray-500'
              }`}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default StepIndicator;