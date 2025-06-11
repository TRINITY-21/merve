// components/AgentStatsDisplay.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IAgentStatsDisplayProps } from '../../../../types/searchAgentTypes';

const AgentStatsDisplay: React.FC<IAgentStatsDisplayProps> = ({
  transactions,
  cashAvailable,
}) => {
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-row items-center">
        <MaterialIcons name="push-pin" size={16} color={transactions < 1000? colors.primary : colors.gray.medium} />
        <Typography variant='regular' size={12} className="text-sm font-medium ml-1 mr-1">
          {transactions}
        </Typography>
        <Typography variant='regular' size={11} className="text-xs text-gray-500">Pins</Typography>
      </View>
      
      <View className="flex-row items-center">
        <MaterialIcons 
          name={cashAvailable ? "account-balance-wallet" : "money-off"} 
          size={16} 
          color={cashAvailable ? colors.primary : colors.error} 
        />
        <Text className={`text-xs font-medium ml-1 ${
          cashAvailable ? 'text-primary' : 'text-error'
        }`}>
          {cashAvailable ? 'Cash Available' : 'No Cash'}
        </Text>
      </View>
    </View>
  );
};

export default AgentStatsDisplay;