// components/ServiceSettings.tsx
import React from 'react';
import { View } from 'react-native';
import { IServiceSettingsProps } from '../../../../../types/agentSettingsTypes';
import ServiceSettingCard from './ServiceSettingsCard';


const ServiceSettings: React.FC<IServiceSettingsProps> = ({
  settings,
  onServiceChange,
}) => {
  return (
    <View className="px-1">
      {Object.entries(settings).map(([serviceKey, service]) => (
        <ServiceSettingCard
          key={serviceKey}
          serviceKey={serviceKey}
          service={service}
          onServiceChange={onServiceChange}
        />
      ))}
    </View>
  );
};

export default ServiceSettings;