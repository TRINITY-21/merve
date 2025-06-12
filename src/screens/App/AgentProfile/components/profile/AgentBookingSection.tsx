// BookingsSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IBooking } from '../../../../../types/agentProfileTypes';


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
      <Typography variant="regular" className="mb-2" size={16} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
              {item.customerName}
            </Typography>
            <Typography variant="regular" size={10} className="mb-0" style={{ color: colors.text.secondary }}>
              {item.serviceType.replace('_', ' ').toUpperCase()} • GH₵{item.amount}
            </Typography>
          </View>
        </View>
        <View
          className="px-2.5 py-1.5 rounded-xl"
          style={{ backgroundColor: getStatusColor(item.status) }}
        >
      <Typography variant="regular" size={12} style={{ color: colors.text.white, letterSpacing: 0 }}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Typography>
        </View>
      </View>

      <View className="gap-1.5">
        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="event" size={14} color={colors.text.secondary} />
      <Typography variant="semibold" size={10} style={{ color: colors.text.secondary, letterSpacing: 0.5 }}>
            {formatDate(item.requestedDate)} at {item.requestedTime}
          </Typography>
        </View>

        <View className="flex-row items-center gap-1.5">
          <MaterialIcons name="location-on" size={14} color={colors.text.secondary} />
      <Typography variant="semibold" size={10} style={{ color: colors.text.secondary, letterSpacing: 0.5 }}>
            {item.location}
          </Typography>
        </View>

        {item.notes && (
          <View className="flex-row items-center gap-1.5">
            <MaterialIcons name="note" size={14} color={colors.text.secondary} />
      <Typography variant="semibold" size={10} style={{ color: colors.text.secondary, letterSpacing: 0.5 }}>
              {item.notes}
            </Typography>
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
      <Typography variant="semibold" size={16} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
          Recent Bookings
        </Typography>
        <TouchableOpacity
          className="flex-row items-center px-3.5 py-2 rounded-2xl gap-1.5 shadow-sm elevation-8"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('AgentBookingManagement')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="event" size={16} color={colors.white} />
      <Typography variant="semibold" size={12} style={{ color: colors.text.white, letterSpacing: 0.5 }}>
            Manage
          </Typography>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="bg-white rounded-2xl p-4 shadow-sm shadow-black/8 elevation-8">
      <Typography variant="semibold" className="mb-2" size={14} style={{ color: colors.text.secondary, letterSpacing: 0.5 }}>
            Today's Summary
          </Typography>
          <View className="flex-row justify-between">
            <View className="items-center">
      <Typography variant="semibold" className='mt-1' size={16} style={{ color: colors.text.secondary, letterSpacing: 0 }}>
                {bookings.length}
              </Typography>
              <Typography variant='regular' size={12} className="semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Total Requests
              </Typography>
            </View>
            <View className="items-center">
              <Typography variant='regular' size={16} className="semibold text-center mt-1" style={{ color: colors.success }}>
                {bookings.filter(b => b.status === 'completed').length}
              </Typography>
              <Typography variant='regular' size={12} className="semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Completed
              </Typography>
            </View>
            <View className="items-center">
              <Typography variant='regular' size={16} className="semibold text-center mt-1" style={{ color: colors.warning }}>
                {bookings.filter(b => b.status === 'pending').length}
              </Typography>
              <Typography variant='regular' size={12} className="semibold text-center mt-1" style={{ color: colors.text.secondary }}>
                Pending
              </Typography>
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
          <Typography variant='regular' size={12} className="semibold text-center mt-1" style={{ color: colors.accent }}>
          View All Bookings
        </Typography>
        <MaterialIcons name="chevron-right" className="mt-1" size={16} color={colors.primary} />
      </TouchableOpacity>
    </Animated.View>
  );
};