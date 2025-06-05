// BookingsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';
import { IBooking } from '../../../../types/agentProfileTypes';


interface BookingsSectionProps {
  bookings: IBooking[];
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
  getServiceIcon: (service: string) => string;
  getServiceColor: (service: string) => string;
  getStatusColor: (status: string) => string;
  formatDate: (dateString: string) => string;
}

export const BookingsSection: React.FC<BookingsSectionProps> = ({
  bookings,
  fadeAnim,
  slideAnim,
  navigation,
  getServiceIcon,
  getServiceColor,
  getStatusColor,
  formatDate
}) => {
  const renderBookingItem = ({ item }: { item: IBooking }) => (
    <View className="p-4 border-b border-black/6">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1 mr-3">
          <View className="w-9 h-9 rounded-2xl bg-black/5 items-center justify-center mr-3">
            <MaterialIcons
              name={getServiceIcon(item.serviceType) as any}
              size={20}
              color={getServiceColor(item.serviceType)}
            />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold mb-1" style={{ color: colors.text.primary }}>
              {item.customerName}
            </Text>
            <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
              {item.serviceType.replace('_', ' ').toUpperCase()} • GH₵{item.amount}
            </Text>
          </View>
        </View>
        <View
          className="px-2.5 py-1.5 rounded-xl"
          style={{ backgroundColor: getStatusColor(item.status) }}
        >
          <Text className="text-xs font-bold text-white uppercase">
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View className="gap-1.5">
        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="event" size={14} color={colors.text.secondary} />
          <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
            {formatDate(item.requestedDate)} at {item.requestedTime}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="location-on" size={14} color={colors.text.secondary} />
          <Text className="text-xs font-medium flex-1" style={{ color: colors.text.secondary }} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        {item.notes && (
          <View className="flex-row items-center gap-1.5">
            <MaterialIcons name="note" size={14} color={colors.text.secondary} />
            <Text className="text-xs font-medium flex-1" style={{ color: colors.text.secondary }} numberOfLines={1}>
              {item.notes}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Animated.View
      className="px-4 mb-4"
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <View className="flex-row justify-between items-center py-1.5 mb-3">
        <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
          Recent Bookings
        </Text>
        <TouchableOpacity
          className="flex-row items-center px-3.5 py-2 rounded-2xl gap-1.5 shadow-sm elevation-8"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('AgentBookingManagementScreen')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="event" size={16} color={colors.white} />
          <Text className="text-xs font-extrabold" style={{ color: colors.white }}>
            Manage
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/8 elevation-8">
          <Text className="text-base font-extrabold mb-3" style={{ color: colors.text.primary }}>
            Today's Summary
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-lg font-black" style={{ color: colors.text.primary }}>
                {bookings.length}
              </Text>
              <Text className="text-xs font-semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Total Requests
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-black" style={{ color: colors.success }}>
                {bookings.filter(b => b.status === 'completed').length}
              </Text>
              <Text className="text-xs font-semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Completed
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-black" style={{ color: colors.warning }}>
                {bookings.filter(b => b.status === 'pending').length}
              </Text>
              <Text className="text-xs font-semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Pending
              </Text>
            </View>
          </View>
        </View>
      </View>

      {bookings.length === 0 ? (
        <View className="items-center justify-center py-10 bg-white rounded-2xl mb-3">
          <MaterialIcons name="event-busy" size={48} color={colors.gray.medium} />
          <Text className="text-base font-bold mt-3 mb-1.5" style={{ color: colors.text.primary }}>
            No Recent Bookings
          </Text>
          <Text className="text-xs text-center px-10" style={{ color: colors.text.secondary }}>
            Customer booking requests will appear here
          </Text>
        </View>
      ) : (
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/8 elevation-8 mb-3">
          {bookings.map((booking) => (
            <View key={booking.id}>
              {renderBookingItem({ item: booking })}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        className="flex-row items-center gap-1 mt-2"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AgentBookingManagementScreen')}
      >
        <Text className="text-xs font-bold" style={{ color: colors.primary }}>
          View All Bookings
        </Text>
        <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};