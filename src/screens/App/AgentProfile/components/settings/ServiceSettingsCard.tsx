// components/ServiceSettingCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Switch, Text, TextInput, View } from 'react-native';
import { IServiceSettingCardProps } from '../../../../../types/agentSettingsTypes';

const ServiceSettingCard: React.FC<IServiceSettingCardProps> = ({
  serviceKey,
  service,
  onServiceChange,
}) => {
  const getServiceIcon = (key: string): string => {
    switch (key) {
      case 'cashIn': return 'arrow-downward';
      case 'cashOut': return 'arrow-upward';
      case 'billPayment': return 'receipt';
      case 'airtime': return 'phone';
      case 'dataBundle': return 'wifi';
      case 'bankTransfer': return 'account-balance';
      default: return 'settings';
    }
  };

  const formatServiceName = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <View className="mx-4 my-2 bg-gray-light rounded-2xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <MaterialIcons 
            name={getServiceIcon(serviceKey) as any} 
            size={24} 
            color={service.enabled ? '#00BFA5' : '#9E9E9E'} 
          />
          <Text 
            className={`text-base font-semibold ml-3 ${
              service.enabled ? 'text-text-primary' : 'text-text-secondary'
            }`}
          >
            {formatServiceName(serviceKey)}
          </Text>
        </View>
        <Switch
          value={service.enabled}
          onValueChange={(value) => onServiceChange(serviceKey, 'enabled', value)}
          trackColor={{ false: '#E0E0E0', true: '#FFCC00' }}
          thumbColor="#FFFFFF"
        />
      </View>

      {service.enabled && (
        <View className="pt-3 border-t border-white">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm text-text-secondary flex-1">
              Commission Rate
            </Text>
            <TextInput
              className="bg-white rounded-lg p-2 min-w-[80px] text-center mx-2 border border-gray-medium"
              value={service.commission.toString()}
              onChangeText={(value) => onServiceChange(serviceKey, 'commission', parseFloat(value) || 0)}
              keyboardType="decimal-pad"
              placeholder="0.0"
            />
            <Text className="text-sm text-text-secondary min-w-[30px]">%</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-text-secondary flex-1">
              Daily Limit
            </Text>
            <TextInput
              className="bg-white rounded-lg p-2 min-w-[80px] text-center mx-2 border border-gray-medium"
              value={service.dailyLimit.toString()}
              onChangeText={(value) => onServiceChange(serviceKey, 'dailyLimit', parseInt(value) || 0)}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text className="text-sm text-text-secondary min-w-[30px]">GH₵</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ServiceSettingCard;