
// FilterChips.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IServiceType, IUrgencyFilter } from '../../../../../types/agentBookingTypes';


interface FilterChipsProps {
  serviceTypes: IServiceType[];
  urgencyFilters: IUrgencyFilter[];
  selectedService: string;
  selectedUrgency: string;
  onServiceChange: (service: string) => void;
  onUrgencyChange: (urgency: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  serviceTypes,
  urgencyFilters,
  selectedService,
  selectedUrgency,
  onServiceChange,
  onUrgencyChange
}) => (
  <View className="px-5 mb-2.5">
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {/* Service Type Filters */}
      {serviceTypes.map((service) => (
        <TouchableOpacity
          key={service.key}
          className="flex-row items-center px-3 py-1.5 rounded-2xl border bg-white gap-1"
          style={{ 
            borderColor: service.color,
            backgroundColor: selectedService === service.key ? service.color : colors.white
          }}
          onPress={() => onServiceChange(service.key)}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name={service.icon as any} 
            size={14} 
            color={selectedService === service.key ? colors.white : service.color} 
          />
          <Text 
            className="text-xs font-semibold"
            style={{ 
              color: selectedService === service.key ? colors.white : colors.text.secondary 
            }}
          >
            {service.label}
          </Text>
        </TouchableOpacity>
      ))}
      
      {/* Urgency Filters */}
      {urgencyFilters.map((urgency) => (
        <TouchableOpacity
          key={urgency.key}
          className="flex-row items-center px-3 py-1.5 rounded-2xl border bg-white"
          style={{ 
            borderColor: urgency.color,
            backgroundColor: selectedUrgency === urgency.key ? urgency.color : colors.white
          }}
          onPress={() => onUrgencyChange(urgency.key)}
          activeOpacity={0.7}
        >
          <Text 
            className="text-xs font-semibold"
            style={{ 
              color: selectedUrgency === urgency.key ? colors.white : colors.text.secondary 
            }}
          >
            {urgency.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);