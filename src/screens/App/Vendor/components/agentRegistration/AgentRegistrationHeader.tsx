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
  onLayout,
}) => {
  return (
    <View 
      onLayout={onLayout}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'ios' ? 60 : 10,
        paddingBottom: 12,
        paddingHorizontal: 16,
        // shadowColor: colors.shadowColor,
        // shadowOffset: colors.shadowOffset,
        // shadowOpacity: 0.08,
        // shadowRadius: 8,
        // elevation: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
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
            // backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            // shadowColor: colors.shadowColor,
            // shadowOffset: colors.shadowOffset,
            // shadowOpacity: 0.1,
            // shadowRadius: 4,
            // elevation: 2,
            // borderWidth: 1,
            borderColor: colors.gray.light,
          }}
        >
          <MaterialIcons name="chevron-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Typography variant="semibold" size={18} className="text-lg font-bold" style={{ color: colors.text.primary }}>
          Become an Agent
        </Typography>
      </View>

      {/* Progress Container */}
      <View>
        <View 
          className="h-2 rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: colors.gray.light }}
        >
          <Animated.View
            className="h-full rounded-full"
            style={{ 
              width: `${(step / totalSteps) * 100}%`,
              backgroundColor: colors.primary
            }}
          />
        </View>
        <Typography variant="regular" size={12} className="text-center" style={{ color: colors.text.secondary }}>
          Step {step} of {totalSteps}
        </Typography>
      </View>
    </View>
  );
};

export default AgentRegistrationHeader;