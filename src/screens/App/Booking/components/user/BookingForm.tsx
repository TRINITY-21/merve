import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Typography } from '../../../../../components/common';
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
  onCreateBooking,
}) => (
  <ScrollView
    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    showsVerticalScrollIndicator={false}
  >
    <View style={{ marginBottom: 24 }}>
      <Typography
        variant="bold"
        size={18}
        style={{
          color: colors.text.primary,
          marginBottom: 6
        }}
      >
        Book Your Service
      </Typography>
      <Typography
        variant="regular"
        size={14}
        style={{ color: colors.text.secondary }}
      >
        Fill in the details below to schedule your appointment
      </Typography>
    </View>

    <ServiceTypeSelector
      serviceTypes={serviceTypes}
      selectedService={selectedService}
      onServiceSelect={onServiceSelect}
    />

    {/* Amount Input */}
    <View className="mb-6">
      <Typography variant="semibold" size={16} className="text-base font-bold mb-3" style={{ color: colors.text.primary }}>
        Service Amount (GH₵)
      </Typography>
      <View
        className="flex-row items-center bg-white rounded-2xl px-4 shadow-lg shadow-black/10 elevation-4"
        style={{
          paddingVertical: Platform.OS === 'ios' ? 18 : 14,
          minHeight: Platform.OS === 'ios' ? 60 : 56,
          borderWidth: 2,
          borderColor: amount ? colors.primary : '#E5E7EB'
        }}
      >
        <View
          className="rounded-xl px-3 py-2 mr-3"
          style={{ backgroundColor: colors.primary + '20' }}
        >
          <Text
            className="text-lg font-bold"
            style={{
              color: colors.primary,
              lineHeight: Platform.OS === 'ios' ? 22 : 20,
              includeFontPadding: false
            }}
          >
            GH₵
          </Text>
        </View>
        <TextInput
          className="flex-1 text-xl font-semibold"
          style={{
            color: colors.text.primary,
            lineHeight: Platform.OS === 'ios' ? 16 : 20,
            includeFontPadding: false,
            textAlignVertical: 'center',
            paddingVertical: 0
          }}
          value={amount}
          onChangeText={onAmountChange}
          placeholder="0.00"
          keyboardType="numeric"
          placeholderTextColor={colors.text.secondary}
        />
        {amount ? (
          <MaterialIcons name="check-circle" size={24} color={colors.success} />
        ) : null}
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

    {/* Additional Details Card */}
    <View className="bg-white rounded-2xl p-5 shadow-lg shadow-black/10 elevation-4 mb-6">
      <Typography variant="semibold" size={16} className="text-base font-bold mb-4" style={{ color: colors.text.primary }}>
        📝 Additional Details
      </Typography>

      {/* Custom Location */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2" style={{ color: colors.text.primary }}>
          Custom Location (Optional)
        </Text>
        <TextInput
          className="bg-gray-50 rounded-xl px-4 py-3 text-sm"
          style={{
            color: colors.text.primary,
            borderWidth: 1,
            borderColor: customLocation ? colors.primary : '#E5E7EB'
          }}
          value={customLocation}
          onChangeText={onLocationChange}
          placeholder="Enter custom meeting location..."
          placeholderTextColor={colors.text.secondary}
          multiline
        />
      </View>

      {/* Booking Notes */}
      <View>
        <Text className="text-sm font-semibold mb-2" style={{ color: colors.text.primary }}>
          Notes (Optional)
        </Text>
        <TextInput
          className="bg-gray-50 rounded-xl px-4 py-3 text-sm h-20"
          style={{
            color: colors.text.primary,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: bookingNotes ? colors.primary : '#E5E7EB'
          }}
          value={bookingNotes}
          onChangeText={onNotesChange}
          placeholder="Add any special instructions..."
          placeholderTextColor={colors.text.secondary}
          multiline
          numberOfLines={3}
        />
      </View>
    </View>

    {/* Reminder Toggle */}
    <TouchableOpacity
      className="flex-row items-center justify-between bg-white rounded-2xl p-5 shadow-lg shadow-black/10 elevation-4 mb-8"
      onPress={onReminderToggle}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1 gap-4">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center"
          style={{ backgroundColor: reminderEnabled ? colors.primary + '20' : '#F3F4F6' }}
        >
          <MaterialIcons
            name={reminderEnabled ? "notifications-active" : "notifications-none"}
            size={24}
            color={reminderEnabled ? colors.primary : colors.gray.medium}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold" style={{ color: colors.text.primary }}>
            Set Reminder
          </Text>
          <Text className="text-xs" style={{ color: colors.text.secondary }}>
            Get notified 30 minutes before appointment
          </Text>
        </View>
      </View>

      <View
        className="w-14 h-8 rounded-2xl p-1 justify-center"
        style={{ backgroundColor: reminderEnabled ? colors.primary : colors.gray.light }}
      >
        <View
          className={`w-6 h-6 rounded-xl bg-white shadow-md shadow-black/20 elevation-3 ${reminderEnabled ? 'self-end' : 'self-start'
            }`}
        />
      </View>
    </TouchableOpacity>

    {/* Create Booking Button */}
    <TouchableOpacity
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 150
      }}
      onPress={onCreateBooking}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={colors.gradient.primary}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 18,
          gap: 12
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <MaterialIcons name="event-available" size={24} color={colors.white} />
        <Typography
          variant="bold"
          size={16}
          style={{ color: colors.white }}
        >
          Confirm Booking
        </Typography>
        <MaterialIcons name="chevron-right" size={20} color={colors.white} />
      </LinearGradient>
    </TouchableOpacity>
  </ScrollView>
);

export default BookingForm;