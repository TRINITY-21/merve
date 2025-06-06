import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IAgentRegistrationHeaderProps } from '../../../../../types/agentRegistrationTypes';

const AgentRegistrationHeader: React.FC<IAgentRegistrationHeaderProps> = ({
  onGoBack,
  step,
  totalSteps,
}) => {
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center mb-5">
        <TouchableOpacity 
          onPress={onGoBack} 
          className="mr-4"
        >
          <MaterialIcons name="chevron-left" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">
          Become an Agent
        </Text>
      </View>

      {/* Progress Container */}
      <View className="mb-5">
        <View className="h-2 bg-[#E0E0E0] rounded-sm overflow-hidden">
          <Animated.View
            className="h-full bg-[#00BFA5] rounded-sm"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </View>
        <Text className="text-sm text-white mt-2 text-center">
          Step {step} of {totalSteps}
        </Text>
      </View>
    </>
  );
};

export default AgentRegistrationHeader;