// components/ServiceSettingCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Switch, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
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
          <Typography variant='regular' size={14}
            className={`font-semibold ml-3 ${
              service.enabled ? 'text-text-primary' : 'text-text-secondary'
            }`}
          >
            {formatServiceName(serviceKey)}
          </Typography>
        </View>
        <Switch
          value={service.enabled}
          onValueChange={(value) => onServiceChange(serviceKey, 'enabled', value)}
          trackColor={{ false: '#E0E0E0', true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View> 
    </View>
  );
};

export default ServiceSettingCard;