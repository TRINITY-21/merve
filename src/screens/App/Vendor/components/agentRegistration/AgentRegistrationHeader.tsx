import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentRegistrationHeaderProps } from '../../../../../types/agentRegistrationTypes';

const AgentRegistrationHeader: React.FC<IAgentRegistrationHeaderProps> = ({
  onGoBack,
  step,
  totalSteps,
}) => {
  return (
    <View 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 16,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity 
          onPress={onGoBack} 
          className="mr-4"
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MaterialIcons name="chevron-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <Typography variant="semibold" size={18} className="text-lg font-bold" style={{ color: colors.white }}>
          Become an Agent
        </Typography>
      </View>

      {/* Progress Container */}
      <View>
        <View 
          className="h-2 rounded-sm overflow-hidden mb-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Animated.View
            className="h-full rounded-sm"
            style={{ 
              width: `${(step / totalSteps) * 100}%`,
              backgroundColor: colors.white
            }}
          />
        </View>
        <Typography variant="regular" size={12} className="text-center" style={{ color: colors.white }}>
          Step {step} of {totalSteps}
        </Typography>
      </View>
    </View>
  );
};

export default AgentRegistrationHeader;