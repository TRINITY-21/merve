import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IServiceType } from '../../../../../types/BookingTypes';

interface ServiceTypeSelectorProps {
  serviceTypes: IServiceType[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  serviceTypes,
  selectedService,
  onServiceSelect
}) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4 px-1">
        <View 
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: colors.primary + '15' }}
        >
          <MaterialIcons name="format-list-bulleted" size={20} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Typography variant="semibold" size={14} className="font-bold" style={{ color: colors.text.primary }}>
            Select Service Type
          </Typography>
          <Typography variant="regular" size={12} className="text-xs" style={{ color: colors.text.secondary }}>
            Choose the service you need
          </Typography>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        className="flex-row"
      >
        {serviceTypes.map((service, index) => {
          const isSelected = selectedService === service.key;
          const isFirst = index === 0;
          const isLast = index === serviceTypes.length - 1;
          
          return (
            <TouchableOpacity
              key={service.key}
              className={`rounded-2xl items-center justify-center shadow-lg shadow-black/10 elevation-4 ${
                !isLast ? 'mr-3' : ''
              }`}
              style={{
                width: 80,
                height: 70,
                backgroundColor: isSelected ? colors.accent : colors.white,
                // borderWidth: isSelected ? 0 : 2,
                borderColor: isSelected ? 'transparent' : colors.gray.light,
                // shadowColor: isSelected ? colors.accent : colors.black,
                shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
                shadowOpacity: isSelected ? 0.25 : 0.08,
                // shadowRadius: isSelected ? 6 : 3,
                // marginLeft: isFirst ? 2 : 0,
                // marginRight: isLast ? 2 : 0,
                marginTop: 4,
              }}
              onPress={() => onServiceSelect(service.key)}
              activeOpacity={0.8}
            >
              {/* Service Icon */}
              <View 
                className="w-8 h-8 rounded-lg items-center justify-center mb-1"
                style={{ 
                  backgroundColor: isSelected 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : service.color + '20'
                }}
              >
                <MaterialIcons
                  name={service.icon as any}
                  size={18}
                  color={isSelected ? colors.white : service.color}
                />
              </View>

              {/* Service Label */}
              <Typography 
                variant="regular" size={10}
                className="text-xs font-semibold text-center leading-3"
                style={{
                  color: isSelected ? colors.white : colors.text.primary,
                  paddingHorizontal: 4
                }}
                numberOfLines={2}
              >
                {service.label}
              </Typography>

              {/* Selected Indicator */}
              {isSelected && (
                <View 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.success }}
                >
                  <MaterialIcons name="check" size={12} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};