
// SettingsView.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { INotificationSettings, IWorkingHours } from '../../../../../types/agentBookingTypes';
import { AvailabilityCard } from './AgentBookingAvailabilityCard';
import { WorkingHoursCard } from './AgentBookingWorkingHoursCard';
interface SettingsViewProps {
  isAvailable: boolean;
  workingHours: IWorkingHours;
  availableDays: string[];
  autoAccept: boolean;
  maxDailyBookings: string;
  notificationSettings: INotificationSettings;
  onAvailabilityToggle: (value: boolean) => void;
  onStartTimePress: () => void;
  onEndTimePress: () => void;
  onDayToggle: (day: string) => void;
  onAutoAcceptToggle: (value: boolean) => void;
  onMaxBookingsChange: (value: string) => void;
  onNotificationToggle: (key: string, value: boolean) => void;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SettingsView: React.FC<SettingsViewProps> = ({
  isAvailable,
  workingHours,
  availableDays,
  autoAccept,
  maxDailyBookings,
  notificationSettings,
  onAvailabilityToggle,
  onStartTimePress,
  onEndTimePress,
  onDayToggle,
  onAutoAcceptToggle,
  onMaxBookingsChange,
  onNotificationToggle
}) => (
  <ScrollView className="flex-1 px-5 mb-20" showsVerticalScrollIndicator={false}>
    {/* Availability Status */}
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
        Availability
      </Text>
      <AvailabilityCard
        isAvailable={isAvailable}
        onToggle={onAvailabilityToggle}
      />
    </View>

    {/* Working Hours */}
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
        Working Hours
      </Text>
      <WorkingHoursCard
        workingHours={workingHours}
        onStartTimePress={onStartTimePress}
        onEndTimePress={onEndTimePress}
      />
    </View>

    {/* Available Days */}
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
        Available Days
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day}
            className={`px-4 py-2 rounded-2xl border shadow-sm shadow-black/10 elevation-1 ${
              availableDays.includes(day) ? '' : 'bg-white'
            }`}
            style={{
              backgroundColor: availableDays.includes(day) ? colors.accent : colors.white,
              borderColor: availableDays.includes(day) ? colors.accent : colors.gray.light
            }}
            onPress={() => onDayToggle(day)}
            activeOpacity={0.7}
          >
            <Text 
              className="text-xs font-semibold"
              style={{ 
                color: availableDays.includes(day) ? colors.white : colors.text.secondary 
              }}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

    {/* Booking Preferences */}
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
        Booking Preferences
      </Text>
      
      <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-black/10 elevation-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 gap-3">
            <MaterialIcons name="auto-awesome" size={20} color={colors.accent} />
            <View>
              <Text className="text-base font-bold mb-0.5" style={{ color: colors.text.primary }}>
                Auto Accept
              </Text>
              <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
                Automatically accept bookings from verified customers
              </Text>
            </View>
          </View>
          <Switch
            value={autoAccept}
            onValueChange={onAutoAcceptToggle}
            trackColor={{ false: colors.gray.light, true: colors.accent + '40' }}
            thumbColor={autoAccept ? colors.accent : colors.gray.medium}
          />
        </View>
      </View>

      <View className="flex-row items-center justify-between bg-white rounded-2xl p-4 shadow-sm shadow-black/10 elevation-2">
        <Text className="text-base font-semibold" style={{ color: colors.text.primary }}>
          Max Daily Bookings
        </Text>
        <TextInput
          className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-semibold text-center min-w-15"
          style={{ color: colors.text.primary }}
          value={maxDailyBookings}
          onChangeText={onMaxBookingsChange}
          keyboardType="numeric"
          placeholder="10"
        />
      </View>
    </View>

    {/* Notification Settings */}
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3" style={{ color: colors.text.primary }}>
        Notifications
      </Text>
      
      {Object.entries(notificationSettings).map(([key, value]) => (
        <View key={key} className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-2 shadow-sm shadow-black/10 elevation-1">
          <View className="flex-row items-center flex-1 gap-3">
            <MaterialIcons 
              name={
                key === 'newRequests' ? 'notification-important' :
                key === 'reminders' ? 'schedule' : 'cancel'
              } 
              size={20} 
              color={colors.text.secondary} 
            />
            <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
              {key === 'newRequests' ? 'New Requests' :
               key === 'reminders' ? 'Appointment Reminders' : 'Cancellations'}
            </Text>
          </View>
          <Switch
            value={value}
            onValueChange={(newValue) => onNotificationToggle(key, newValue)}
            trackColor={{ false: colors.gray.light, true: colors.accent + '40' }}
            thumbColor={value ? colors.accent : colors.gray.medium}
          />
        </View>
      ))}
    </View>
  </ScrollView>
);