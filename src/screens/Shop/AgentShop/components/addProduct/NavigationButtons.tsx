import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { INavigationButtonsProps } from '../../../../../types/addproductTypes';

const NavigationButtons: React.FC<INavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrevious,
}) => {
  return (
    <View 
      className="bg-white border-t border-gray-200 px-5 py-4"
      style={{ paddingBottom: Platform.OS === 'ios' ? 34 : 16 }}
    >
      <View className="flex-row justify-between items-center">
        {currentStep > 0 && (
          <TouchableOpacity 
            className="flex-row items-center px-5 py-3 gap-2"
            onPress={onPrevious}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={20} color={colors.gray.dark} />
            <Text className="text-base font-semibold text-gray-900">
              Previous
            </Text>
          </TouchableOpacity>
        )}
        
        {currentStep < totalSteps - 1 ? (
          <TouchableOpacity 
            className={`flex-row items-center bg-primary rounded-xl px-5 py-3 gap-2 ml-auto ${
              !canProceed ? 'opacity-60' : ''
            }`}
            onPress={onNext}
            disabled={!canProceed}
            activeOpacity={0.8}
          >
            <Text className="text-base font-semibold text-white">Next</Text>
            <MaterialIcons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default NavigationButtons;