// components/ProfessionalBookingCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Typography } from '../../../../components/common/Typography';
import { IBooking } from '../../../../types/userProfileTypes';

interface BookingCardProps {
  booking: IBooking;
  fadeAnim: SharedValue<number>;
  onPress?: () => void; 
}

export const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  fadeAnim, 
  onPress 
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value
  }));

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed': 
        return { color: '#10b981', bg: '#dcfce7', icon: 'check-circle' };
      case 'pending': 
        return { color: '#f59e0b', bg: '#fef3c7', icon: 'schedule' };
      case 'accepted': 
        return { color: '#3b82f6', bg: '#dbeafe', icon: 'thumb-up' };
      case 'cancelled': 
        return { color: '#ef4444', bg: '#fecaca', icon: 'cancel' };
      case 'declined': 
        return { color: '#ef4444', bg: '#fecaca', icon: 'thumb-down' };
      default: 
        return { color: '#6b7280', bg: '#f3f4f6', icon: 'help' };
    }
  };

  const getServiceConfig = (service: string) => {
    switch (service) {
      case 'cash_out': 
        return { 
          icon: 'arrow-upward', 
          color: '#ef4444', 
          bg: '#fef2f2',
          label: 'Cash Out'
        };
      case 'cash_in': 
        return { 
          icon: 'arrow-downward', 
          color: '#10b981', 
          bg: '#f0fdf4',
          label: 'Cash In'
        };
      case 'bill_payment': 
        return { 
          icon: 'receipt-long', 
          color: '#f59e0b', 
          bg: '#fffbeb',
          label: 'Bill Payment'
        };
      case 'airtime': 
        return { 
          icon: 'phone', 
          color: '#8b5cf6', 
          bg: '#faf5ff',
          label: 'Airtime'
        };
      default: 
        return { 
          icon: 'help', 
          color: '#6b7280', 
          bg: '#f9fafb',
          label: 'Unknown'
        };
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const statusConfig = getStatusConfig(booking.status);
  const serviceConfig = getServiceConfig(booking.serviceType);

  return (
    <Animated.View style={animatedStyle} className="mb-3">
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.7}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        {/* Main Content */}
        <View className="p-5">
          {/* Header Row */}
          <View className="flex-row items-start justify-between mb-4">
            {/* Left: Service Icon + Agent Info */}
            <View className="flex-row items-center flex-1 mr-4">
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: serviceConfig.bg }}
              >
                <MaterialIcons
                  name={serviceConfig.icon as any}
                  size={22}
                  color={serviceConfig.color}
                />
              </View>
              
              <View className="flex-1">
                <Typography variant="semibold" size={16} className="text-slate-800 mb-1">
                  {booking.agentName}
                </Typography>
                <Typography variant="regular" size={14} className="text-slate-600">
                  {serviceConfig.label}
                </Typography>
              </View>
            </View>

            {/* Right: Status Badge */}
            <View 
              className="px-3 py-1.5 rounded-full flex-row items-center"
              style={{ backgroundColor: statusConfig.bg }}
            >
              <MaterialIcons 
                name={statusConfig.icon as any} 
                size={14} 
                color={statusConfig.color}
              />
              <Typography 
                variant="semibold"
                size={12}
                className="ml-1 capitalize"
                style={{ color: statusConfig.color }}
              >
                {booking.status}
              </Typography>
            </View>
          </View>

          {/* Amount */}
          <View className="mb-0">
            <Typography variant="semibold" size={16} className="text-slate-900">
              {formatCurrency(booking.amount)}
            </Typography>
          </View>

          {/* Details Row */}
          <View className="flex-row items-center justify-between pt-3 border-t border-slate-50">
            {/* Date & Time */}
            <View className="flex-row items-center flex-1 mr-4">
              <MaterialIcons name="schedule" size={16} color="#64748b" />
              <Typography variant="medium" size={12} className="text-slate-600 ml-2">
                {formatDate(booking.date)}
              </Typography>
              <Typography variant="regular" size={12} className="text-slate-500 ml-1">
                {booking.time}
              </Typography>
            </View>

            {/* Location */}
            <View className="flex-row items-center flex-1">
              <MaterialIcons name="location-on" size={12} color="#64748b" />
              <Typography 
                variant="regular"
                size={12}
                className="text-slate-600 ml-2 flex-1" 
                numberOfLines={1}
              >
                {booking.location}
              </Typography>
            </View>
          </View>
        </View>

        {/* Bottom Action Indicator */}
        {onPress && (
          <View className="bg-slate-50 px-5 py-3 flex-row items-center justify-center">
            <Typography variant="medium" size={14} className="text-slate-600 mr-2">
              Tap for details
            </Typography>
            <MaterialIcons name="chevron-right" size={16} color="#64748b" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Usage Example:
/*
const sampleBooking: IBooking = {
  id: '1',
  agentName: 'John Doe',
  serviceType: 'cash_out',
  amount: 250.00,
  date: '2024-12-15',
  time: '2:30 PM',
  location: 'Accra Mall, Greater Accra',
  status: 'completed'
};

<ProfessionalBookingCard
  booking={sampleBooking}
  fadeAnim={fadeAnim}
  onPress={() => navigation.navigate('BookingDetails', { bookingId: sampleBooking.id })}
/>
*/