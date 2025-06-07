// components/quickcash/ServiceSelectionGrid.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';



export interface ServiceType {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface ServiceSelectionGridProps {
  services: ServiceType[];
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
  columns?: number;
  compact?: boolean;
}

export const ServiceSelectionGrid: React.FC<ServiceSelectionGridProps> = ({
  services,
  selectedService,
  onServiceSelect,
  columns = 4,
  compact = false
}) => {
  const getGridClass = () => {
    switch (columns) {
      case 2: return 'flex-row flex-wrap';
      case 3: return 'flex-row justify-around';
      case 4: return 'flex-row justify-between';
      default: return 'flex-row justify-between';
    }
  };

  const getItemClass = () => {
    switch (columns) {
      case 2: return 'w-[48%] mb-3';
      case 3: return 'flex-1 mx-1';
      case 4: return 'flex-1 mx-1';
      default: return 'flex-1 mx-1';
    }
  };

  return (
    <View className={getGridClass()}>
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          className={`${getItemClass()} items-center rounded-2xl border-2 ${
            selectedService === service.id
              ? 'border-yellow-400 bg-gray-50'
              : 'border-gray-200 bg-gray-50'
          } ${compact ? 'py-3 px-2' : 'py-4 px-2'}`}
          onPress={() => onServiceSelect(service.id)}
          activeOpacity={0.7}
        >
          <View
            className={`rounded-full items-center justify-center mb-2 ${
              compact ? 'w-10 h-10' : 'w-12 h-12'
            }`}
            style={{
              backgroundColor: selectedService === service.id ? service.color : service.bgColor
            }}
          >
            <MaterialIcons
              name={service.icon as any}
              size={compact ? 20 : 24}
              color={selectedService === service.id ? colors.white : service.color}
            />
          </View>
          <Typography
            variant={selectedService === service.id ? 'semibold' : 'medium'}
            size={compact ? 11 : 12}
            className={`text-center tracking-tight ${
              selectedService === service.id ? 'text-orange-600' : 'text-gray-600'
            }`}
          >
            {service.label}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};