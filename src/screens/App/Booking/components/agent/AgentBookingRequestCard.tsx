
// BookingRequestCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBookingRequest } from '../../../../../types/agentBookingTypes';

interface BookingRequestCardProps {
  request: IBookingRequest;
  fadeAnim: Animated.Value;
  onAction: (requestId: string, action: string) => void;
  onMessage: (customerName: string) => void;
  getServiceIcon: (service: string) => string;
  getServiceColor: (service: string) => string;
  getUrgencyColor: (urgency: string) => string;
  formatDate: (dateString: string) => string;
  formatTime: (timeString: string) => string;
  getTimeAgo: (dateString: string) => string;
}

export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  request,
  fadeAnim,
  onAction,
  onMessage,
  getServiceIcon,
  getServiceColor,
  getUrgencyColor,
  formatDate,
  formatTime,
  getTimeAgo
}) => (
  <Animated.View 
    className="mb-4 rounded-2xl overflow-hidden shadow-md shadow-black/10 elevation-4"
    style={{ opacity: fadeAnim }}
  >
    <LinearGradient colors={colors.gradient.light} className="p-5">
      {/* Card Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center flex-1 mr-3">
          <View className="w-12 h-12 rounded-full bg-black/5 items-center justify-center mr-3">
            <MaterialIcons 
              name={getServiceIcon(request.serviceType) as any} 
              size={24} 
              color={getServiceColor(request.serviceType)} 
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-1 gap-2">
              <Text className="text-base font-bold" style={{ color: colors.text.primary }}>
                {request.customerName}
              </Text>
              <View className="flex-row items-center gap-0.5">
                <MaterialIcons name="star" size={12} color={colors.primary} />
                <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
                  {request.customerRating}
                </Text>
              </View>
            </View>
            <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
              {request.serviceType.replace('_', ' ').toUpperCase()} • GH₵{request.amount}
            </Text>
          </View>
        </View>
        
        <View className="items-end">
          <View 
            className="px-2 py-1 rounded-2xl mb-1"
            style={{ backgroundColor: getUrgencyColor(request.urgency) }}
          >
            <Text className="text-xs font-bold text-white uppercase">
              {request.urgency.toUpperCase()}
            </Text>
          </View>
          <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
            {getTimeAgo(request.createdAt)}
          </Text>
        </View>
      </View>

      {/* Card Body */}
      <View className="mb-4">
        <View className="flex-row items-center mb-2 gap-2">
          <MaterialIcons name="event" size={16} color={colors.text.secondary} />
          <Text className="text-sm flex-1" style={{ color: colors.text.secondary }}>
            {formatDate(request.requestedDate)} at {formatTime(request.requestedTime)}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-2 gap-2">
          <MaterialIcons name="location-on" size={16} color={colors.text.secondary} />
          <Text className="text-sm flex-1" style={{ color: colors.text.secondary }} numberOfLines={1}>
            {request.customLocation || request.location}
          </Text>
        </View>

        <View className="flex-row items-center mb-2 gap-2">
          <MaterialIcons name="schedule" size={16} color={colors.text.secondary} />
          <Text className="text-sm" style={{ color: colors.text.secondary }}>
            ~{request.estimatedDuration} minutes
          </Text>
        </View>

        {request.notes && (
          <View 
            className="flex-row items-start p-3 rounded-xl mt-1 gap-2"
            style={{ backgroundColor: colors.accent + '10' }}
          >
            <MaterialIcons name="note" size={16} color={colors.accent} />
            <Text 
              className="text-xs font-medium flex-1 leading-4"
              style={{ color: colors.accent }}
              numberOfLines={2}
            >
              {request.notes}
            </Text>
          </View>
        )}
      </View>

      {/* Card Actions */}
      {request.status === 'pending' && (
        <View className="flex-row gap-3 pt-4 border-t border-black/5">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5 bg-black/5 border border-red-300"
            onPress={() => onAction(request.id, 'decline')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={18} color={colors.error} />
            <Text className="text-xs font-semibold" style={{ color: colors.error }}>Decline</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5"
            style={{ backgroundColor: colors.success }}
            onPress={() => onAction(request.id, 'accept')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="check" size={18} color={colors.white} />
            <Text className="text-xs font-semibold text-white">Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {request.status === 'accepted' && (
        <View className="flex-row gap-3 pt-4 border-t border-black/5">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5 bg-black/5 border border-blue-300"
            onPress={() => onMessage(request.customerName)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="message" size={18} color={colors.accent} />
            <Text className="text-xs font-semibold" style={{ color: colors.accent }}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5"
            style={{ backgroundColor: colors.accent }}
            onPress={() => onAction(request.id, 'complete')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="check-circle" size={18} color={colors.white} />
            <Text className="text-xs font-semibold text-white">Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  </Animated.View>
);
