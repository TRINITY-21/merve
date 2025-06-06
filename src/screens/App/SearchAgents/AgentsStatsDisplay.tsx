// components/AgentStatsDisplay.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IAgentStatsDisplayProps } from '../../../types/searchAgentTypes';

const AgentStatsDisplay: React.FC<IAgentStatsDisplayProps> = ({
  transactions,
  cashAvailable,
}) => {
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-row items-center">
        <MaterialIcons name="push-pin" size={16} color="#757575" />
        <Text className="text-sm font-semibold text-[#212121] ml-1 mr-1">
          {transactions}
        </Text>
        <Text className="text-xs text-[#757575]">Pins</Text>
      </View>
      
      <View className="flex-row items-center">
        <MaterialIcons 
          name={cashAvailable ? "account-balance-wallet" : "money-off"} 
          size={16} 
          color={cashAvailable ? "#4CAF50" : "#F44336"} 
        />
        <Text className={`text-xs font-medium ml-1 ${
          cashAvailable ? 'text-[#4CAF50]' : 'text-[#F44336]'
        }`}>
          {cashAvailable ? 'Cash Available' : 'No Cash'}
        </Text>
      </View>
    </View>
  );
};

export default AgentStatsDisplay;