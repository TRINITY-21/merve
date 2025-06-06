
// BookingCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBooking } from '../../../../../types/BookingTypes';

interface BookingCardProps {
    booking: IBooking;
    fadeAnim: Animated.Value;
    onAction: (bookingId: string, action: string) => void;
    onMessage: (agentName: string) => void;
    getServiceIcon: (service: string) => string;
    getServiceColor: (service: string) => string;
    getStatusColor: (status: string) => string;
    formatDate: (dateString: string) => string;
    formatTime: (timeString: string) => string;
}

export const BookingCard: React.FC<BookingCardProps> = ({
    booking,
    fadeAnim,
    onAction,
    onMessage,
    getServiceIcon,
    getServiceColor,
    getStatusColor,
    formatDate,
    formatTime
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
                            name={getServiceIcon(booking.serviceType) as any}
                            size={24}
                            color={getServiceColor(booking.serviceType)}
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-base font-bold mb-1" style={{ color: colors.text.primary }}>
                            {booking.agentName}
                        </Text>
                        <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
                            {booking.serviceType.replace('_', ' ').toUpperCase()} • GH₵{booking.amount}
                        </Text>
                    </View>
                </View>
                <View
                    className="px-3 py-1.5 rounded-2xl"
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                    <Text className="text-xs font-bold text-white uppercase">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Text>
                </View>
            </View>

            {/* Card Body */}
            <View className="mb-4">
                <View className="flex-row items-center mb-2 gap-2">
                    <MaterialIcons name="event" size={16} color={colors.text.secondary} />
                    <Text className="text-sm flex-1" style={{ color: colors.text.secondary }}>
                        {formatDate(booking.date)} at {formatTime(booking.time)}
                    </Text>
                </View>

                <View className="flex-row items-center mb-2 gap-2">
                    <MaterialIcons name="location-on" size={16} color={colors.text.secondary} />
                    <Text className="text-sm flex-1" style={{ color: colors.text.secondary }} numberOfLines={1}>
                        {booking.location}
                    </Text>
                </View>

                {booking.notes && (
                    <View className="flex-row items-center mb-2 gap-2">
                        <MaterialIcons name="note" size={16} color={colors.text.secondary} />
                        <Text className="text-sm flex-1" style={{ color: colors.text.secondary }} numberOfLines={2}>
                            {booking.notes}
                        </Text>
                    </View>
                )}

                {booking.reminderSet && (
                    <View
                        className="flex-row items-center self-start px-2 py-1 rounded-xl gap-1"
                        style={{ backgroundColor: colors.accent + '20' }}
                    >
                        <MaterialIcons name="notifications-active" size={14} color={colors.accent} />
                        <Text className="text-xs font-semibold" style={{ color: colors.accent }}>
                            Reminder set
                        </Text>
                    </View>
                )}
            </View>

            {/* Card Actions */}
            {['pending', 'accepted'].includes(booking.status) && (
                <View className="flex-row gap-3 pt-4 border-t border-black/5">
                    <TouchableOpacity
                        className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5 bg-black/5 border border-red-300"
                        onPress={() => onAction(booking.id, 'cancel')}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="cancel" size={16} color={colors.error} />
                        <Text className="text-xs font-semibold" style={{ color: colors.error }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 flex-row items-center justify-center py-3 rounded-xl gap-1.5"
                        style={{ backgroundColor: colors.accent }}
                        onPress={() => onMessage(booking.agentName)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="message" size={16} color={colors.white} />
                        <Text className="text-xs font-semibold text-white">Message</Text>
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    </Animated.View>
);