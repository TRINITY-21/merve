// components/AgentServices.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AgentService, IAgentServicesProps } from '../../../types/searchAgentTypes';

const AgentServices: React.FC<IAgentServicesProps> = ({ services }) => {
  const getServiceIcon = (service: AgentService): string => {
    switch (service) {
      case 'cash_in': return 'arrow-downward';
      case 'cash_out': return 'arrow-upward';
      case 'bill_payment': return 'receipt';
      case 'airtime': return 'phone';
      default: return 'help';
    }
  };

  const formatServiceName = (service: AgentService): string => {
    return service.replace('_', ' ').toUpperCase();
  };

  return (
    <View className="mb-2">
      <Text className="text-xs font-bold text-[#212121] mb-2">
        Services:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {services.map((service, index) => (
            <View 
              key={index} 
              className="flex-row items-center bg-[#00BFA5]/20 px-2.5 py-1 rounded-xl gap-1"
            >
              <MaterialIcons 
                name={getServiceIcon(service) as any} 
                size={12} 
                color="#00BFA5" 
              />
              <Text className="text-xs font-semibold text-[#00BFA5]">
                {formatServiceName(service)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AgentServices;