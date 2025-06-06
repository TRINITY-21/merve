
// ScheduleView.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBookingRequest } from '../../../../../types/agentBookingTypes';

interface ScheduleViewProps {
  bookingRequests: IBookingRequest[];
  navigation: any;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  bookingRequests,
  navigation
}) => {
  const todayBookings = bookingRequests.filter(b => 
    b.status === 'accepted' && 
    b.requestedDate === new Date().toISOString().split('T')[0]
  );

  return (
    <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
      <View className="mb-5">
        <Text className="text-2xl font-extrabold mb-1" style={{ color: colors.text.primary }}>
          Today's Schedule
        </Text>
        <Text className="text-sm font-medium" style={{ color: colors.text.secondary }}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm shadow-black/10 elevation-2">
          <Text className="text-xl font-extrabold" style={{ color: colors.accent }}>
            {todayBookings.length}
          </Text>
          <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
            Appointments
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm shadow-black/10 elevation-2">
          <Text className="text-xl font-extrabold" style={{ color: colors.accent }}>
            {todayBookings.reduce((sum, b) => sum + b.estimatedDuration, 0)}m
          </Text>
          <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
            Total Duration
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-4 items-center shadow-sm shadow-black/10 elevation-2">
          <Text className="text-xl font-extrabold" style={{ color: colors.accent }}>
            GH₵{todayBookings.reduce((sum, b) => sum + b.amount, 0)}
          </Text>
          <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
            Expected Revenue
          </Text>
        </View>
      </View>

      {todayBookings.length === 0 ? (
        <View className="items-center justify-center py-15">
          <MaterialIcons name="event-available" size={64} color={colors.gray.medium} />
          <Text className="text-xl font-bold mt-4 mb-2" style={{ color: colors.text.primary }}>
            No appointments today
          </Text>
          <Text className="text-sm text-center px-10 leading-5" style={{ color: colors.text.secondary }}>
            You have a free day! New requests will appear in the Requests tab.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {todayBookings
            .sort((a, b) => a.requestedTime.localeCompare(b.requestedTime))
            .map((booking) => (
              <View key={booking.id} className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm shadow-black/10 elevation-2">
                <View className="items-center mr-4 min-w-15">
                  <Text className="text-base font-bold mb-0.5" style={{ color: colors.accent }}>
                    {booking.requestedTime}
                  </Text>
                  <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
                    ~{booking.estimatedDuration}m
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold mb-0.5" style={{ color: colors.text.primary }}>
                    {booking.customerName}
                  </Text>
                  <Text className="text-xs font-semibold mb-0.5" style={{ color: colors.text.secondary }}>
                    {booking.serviceType.replace('_', ' ').toUpperCase()} • GH₵{booking.amount}
                  </Text>
                  <Text className="text-xs font-medium" style={{ color: colors.text.secondary }} numberOfLines={1}>
                    {booking.customLocation || booking.location}
                  </Text>
                </View>
                <TouchableOpacity 
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.accent + '20' }}
                  onPress={() => navigation.navigate('Chat', { customer: booking.customerName })}
                >
                  <MaterialIcons name="message" size={20} color={colors.accent} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
};
