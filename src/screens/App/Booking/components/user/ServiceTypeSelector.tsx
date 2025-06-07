import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IServiceType } from '../../../../../types/BookingTypes';

const { width: screenWidth } = Dimensions.get('window');
const itemGap = 12;
const itemWidth = (screenWidth - itemGap * 3 - 32) / 2; // padding + 2 gaps

interface ServiceTypeSelectorProps {
  serviceTypes: IServiceType[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  serviceTypes,
  selectedService,
  onServiceSelect
}) => (
  <View className="">
    <Text className="text-base font-bold mb-3 mt-3" style={{ color: colors.text.primary }}>
      Service Type
    </Text>

    <View className="flex-row flex-wrap justify-between">
      {serviceTypes.map((service, index) => (
        <TouchableOpacity
          key={service.key}
          className="rounded-2xl items-center justify-center shadow-sm shadow-black/10 mb-3 elevation-2"
          style={{
            width: itemWidth,
            aspectRatio: 1.1,
            backgroundColor: selectedService === service.key ? colors.accent : colors.white
          }}
          onPress={() => onServiceSelect(service.key)}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={service.icon as any}
            size={32}
            color={selectedService === service.key ? colors.white : service.color}
          />
          <Text
            className="text-xs font-semibold text-center mt-2 px-2"
            style={{
              color: selectedService === service.key ? colors.white : colors.text.primary
            }}
          >
            {service.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
