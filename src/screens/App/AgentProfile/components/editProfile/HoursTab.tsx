// components/tabs/HoursTab.tsx
import React from 'react';
import {
  Animated,
  View
} from 'react-native';
import { HoursItem, ToggleItem } from '.';
import { Typography } from '../../../../../components/common';
import { IHoursTabProps, IServiceToggle } from '../../../../../types/editProfileTypes';


export const HoursTab: React.FC<IHoursTabProps> = ({
  agentData,
  workingHours,
  fadeAnim,
  slideAnim,
  onInputChange,
  onWorkingHoursChange,
}) => {
  const additionalSettings: IServiceToggle[] = [
    {
      key: 'acceptsWeekendTransactions',
      label: 'Weekend Transactions',
      icon: 'weekend',
      iconColor: '#FFCC00',
      value: agentData.acceptsWeekendTransactions,
      onValueChange: (value) => onInputChange('acceptsWeekendTransactions', value),
    },
    {
      key: 'offers24HourService',
      label: '24-Hour Service',
      icon: 'schedule',
      iconColor: '#00BFA5',
      value: agentData.offers24HourService,
      onValueChange: (value) => onInputChange('offers24HourService', value),
    },
  ];

  return (
    <Animated.View 
      className="p-5"
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography variant='semibold' className="text-lg font-bold text-gray-800 mb-4">
          Operating Hours
        </Typography>
        
        {Object.entries(workingHours).map(([day, hours]) => (
          <HoursItem
            key={day}
            day={day}
            hours={hours}
            onWorkingHoursChange={onWorkingHoursChange}
          />
        ))}
      </View>

      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm" 
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Typography variant='semibold' className="text-lg font-bold text-gray-800 mb-4">
          Additional Settings
        </Typography>
        
        <View className="gap-4">
          {additionalSettings.map((toggle) => (
            <ToggleItem key={toggle.key} data={toggle} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};