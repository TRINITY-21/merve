
// BookingForm.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IAgent, IServiceType } from '../../../../../types/BookingTypes';
import { AgentSelector } from './AgentSelector';
import { DateTimeSelector } from './DateTimeSelector';
import { ServiceTypeSelector } from './ServiceTypeSelector';

interface BookingFormProps {
    serviceTypes: IServiceType[];
    agents: IAgent[];
    selectedService: string;
    selectedAgent: IAgent | null;
    amount: string;
    selectedDate: Date;
    selectedTime: Date;
    customLocation: string;
    bookingNotes: string;
    reminderEnabled: boolean;
    onServiceSelect: (service: string) => void;
    onAgentSelect: (agent: IAgent) => void;
    onAmountChange: (amount: string) => void;
    onDatePress: () => void;
    onTimePress: () => void;
    onLocationChange: (location: string) => void;
    onNotesChange: (notes: string) => void;
    onReminderToggle: () => void;
    onCreateBooking: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
    serviceTypes,
    agents,
    selectedService,
    selectedAgent,
    amount,
    selectedDate,
    selectedTime,
    customLocation,
    bookingNotes,
    reminderEnabled,
    onServiceSelect,
    onAgentSelect,
    onAmountChange,
    onDatePress,
    onTimePress,
    onLocationChange,
    onNotesChange,
    onReminderToggle,
    onCreateBooking
}) => (
    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <ServiceTypeSelector
            serviceTypes={serviceTypes}
            selectedService={selectedService}
            onServiceSelect={onServiceSelect}
        />

        {/* Amount Input */}
        <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
                Amount (GH₵)
            </Text>
            <View
                className="flex-row items-center bg-white rounded-xl px-4 shadow-sm shadow-black/10 elevation-2"
                style={{ paddingVertical: Platform.OS === 'ios' ? 16 : 0 }}
            >
                <Text className="text-lg font-bold mr-2" style={{ color: colors.accent }}>
                    GH₵
                </Text>
                <TextInput
                    className="flex-1 text-lg font-semibold"
                    style={{ color: colors.text.primary }}
                    value={amount}
                    onChangeText={onAmountChange}
                    placeholder="0.00"
                    keyboardType="numeric"
                    placeholderTextColor={colors.text.secondary}
                />
            </View>
        </View>

        <AgentSelector
            agents={agents}
            selectedAgent={selectedAgent}
            onAgentSelect={onAgentSelect}
        />

        <DateTimeSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDatePress={onDatePress}
            onTimePress={onTimePress}
        />

        {/* Custom Location */}
        <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
                Custom Location (Optional)
            </Text>
            <TextInput
                className="bg-white rounded-xl px-4 py-3 text-sm shadow-sm shadow-black/10 elevation-2"
                style={{ color: colors.text.primary }}
                value={customLocation}
                onChangeText={onLocationChange}
                placeholder="Enter custom meeting location..."
                placeholderTextColor={colors.text.secondary}
                multiline
            />
        </View>

        {/* Notes */}
        <View className="mb-6">
            <Text className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
                Notes (Optional)
            </Text>
            <TextInput
                className="bg-white rounded-xl px-4 py-3 text-sm shadow-sm shadow-black/10 elevation-2 h-20"
                style={{ color: colors.text.primary, textAlignVertical: 'top' }}
                value={bookingNotes}
                onChangeText={onNotesChange}
                placeholder="Add any special instructions..."
                placeholderTextColor={colors.text.secondary}
                multiline
                numberOfLines={3}
            />
        </View>

        {/* Reminder Toggle */}
        <View className="mb-6">
            <TouchableOpacity
                className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow-sm shadow-black/10 elevation-2"
                onPress={onReminderToggle}
                activeOpacity={0.7}
            >
                <View className="flex-row items-center flex-1 gap-3">
                    <MaterialIcons
                        name="notifications"
                        size={24}
                        color={reminderEnabled ? colors.accent : colors.gray.medium}
                    />
                    <View>
                        <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                            Set Reminder
                        </Text>
                        <Text className="text-xs" style={{ color: colors.text.secondary }}>
                            Get notified 30 minutes before appointment
                        </Text>
                    </View>
                </View>
                <View
                    className="w-12 h-7 rounded-2xl p-0.5 justify-center"
                    style={{ backgroundColor: reminderEnabled ? colors.accent : colors.gray.light }}
                >
                    <View
                        className={`w-6 h-6 rounded-xl bg-white shadow-sm shadow-black/20 elevation-2 ${reminderEnabled ? 'self-end' : 'self-start'
                            }`}
                    />
                </View>
            </TouchableOpacity>
        </View>

        {/* Create Booking Button */}
        <TouchableOpacity
            className="mb-10 rounded-2xl overflow-hidden shadow-md shadow-primary/30 elevation-6"
            onPress={onCreateBooking}
            activeOpacity={0.8}
        >
            <LinearGradient colors={colors.gradient.primary} className="flex-row items-center justify-center py-4.5 gap-2.5">
                <MaterialIcons name="event" size={24} color={colors.white} />
                <Text className="text-base font-bold text-white">Create Booking</Text>
            </LinearGradient>
        </TouchableOpacity>
    </ScrollView>
);