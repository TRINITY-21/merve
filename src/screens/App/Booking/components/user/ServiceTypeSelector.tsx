
// ServiceTypeSelector.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IServiceType } from '../../../../../types/BookingTypes';

const { width: screenWidth } = Dimensions.get('window');

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
    <View className="mb-6">
        <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
            Service Type
        </Text>
        <View className="flex-row flex-wrap gap-3">
            {serviceTypes.map((service) => (
                <TouchableOpacity
                    key={service.key}
                    className={`rounded-2xl items-center justify-center gap-2 shadow-sm shadow-black/10 elevation-2`}
                    style={{
                        width: (screenWidth - 64) / 2,
                        aspectRatio: 1.2,
                        backgroundColor: selectedService === service.key ? colors.accent : colors.white
                    }}
                    onPress={() => onServiceSelect(service.key)}
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name={service.icon as any}
                        size={32}
                        color={selectedService === service.key ? colors.white : service.color}
                    />
                    <Text
                        className="text-xs font-semibold text-center"
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
