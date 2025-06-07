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
        className="mb-6 mx-1"
        style={{ opacity: fadeAnim }}
    >
        {/* Modern card with elevated shadow and sophisticated border */}
        <View className="bg-white rounded-3xl shadow-lg shadow-black/8 elevation-8 border border-gray-100/50">
            {/* Status indicator strip */}
            {/* <View 
                className="h-1 rounded-t-3xl"
                style={{ backgroundColor: getStatusColor(booking.status) }}
            /> */}
            
            <View className="p-6">
                {/* Header Section */}
                <View className="flex-row items-start justify-between mb-5">
                    <View className="flex-row items-center flex-1 mr-4">
                        {/* Service icon with modern glassmorphism effect */}
                        <View className="relative">
                            <LinearGradient
                                colors={[getServiceColor(booking.serviceType) + '15', getServiceColor(booking.serviceType) + '25']}
                                className="w-14 h-14 rounded-2xl items-center justify-center"
                            >
                                <MaterialIcons
                                    name={getServiceIcon(booking.serviceType) as any}
                                    size={26}
                                    color={getServiceColor(booking.serviceType)}
                                />
                            </LinearGradient>
                            {/* Subtle glow effect */}
                            <View 
                                className="absolute inset-0 rounded-2xl"
                                style={{ 
                                    backgroundColor: getServiceColor(booking.serviceType) + '08',
                                    shadowColor: getServiceColor(booking.serviceType),
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                }}
                            />
                        </View>
                        
                        <View className="flex-1 ml-4">
                            <Text className="text-lg font-bold mb-1" style={{ color: colors.text.primary }}>
                                {booking.agentName}
                            </Text>
                            <Text className="text-sm font-medium" style={{ color: colors.text.secondary }}>
                                {booking.serviceType.replace('_', ' ').toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    
                    {/* Modern status badge */}
                    <View className="items-end">
                        <View
                            className="px-4 py-2 rounded-full shadow-sm"
                            style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                            <Text className="text-xs font-bold text-white uppercase tracking-wide">
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Text>
                        </View>
                        
                        {/* Price tag */}
                        <View className="mt-2 bg-gray-50 px-3 py-1 rounded-full">
                            <Text className="text-sm font-bold" style={{ color: colors.text.primary }}>
                                GH₵{booking.amount}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Details Section with modern layout */}
                <View className="space-y-3 mb-5">
                    {/* Date & Time */}
                    <View className="flex-row items-center bg-gray-50/60 rounded-2xl p-4">
                        <View className="w-10 h-10 bg-blue-500/10 rounded-xl items-center justify-center mr-3">
                            <MaterialIcons name="schedule" size={20} color="#3B82F6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Appointment
                            </Text>
                            <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                {formatDate(booking.date)} • {formatTime(booking.time)}
                            </Text>
                        </View>
                    </View>

                    {/* Location */}
                    <View className="flex-row items-center bg-gray-50/60 rounded-2xl p-4">
                        <View className="w-10 h-10 bg-green-500/10 rounded-xl items-center justify-center mr-3">
                            <MaterialIcons name="location-on" size={20} color="#10B981" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                Location
                            </Text>
                            <Text className="text-sm font-semibold" style={{ color: colors.text.primary }} numberOfLines={2}>
                                {booking.location}
                            </Text>
                        </View>
                    </View>

                    {/* Notes */}
                    {booking.notes && (
                        <View className="flex-row items-start bg-gray-50/60 rounded-2xl p-4">
                            <View className="w-10 h-10 bg-purple-500/10 rounded-xl items-center justify-center mr-3 mt-0.5">
                                <MaterialIcons name="note-alt" size={20} color="#8B5CF6" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    Notes
                                </Text>
                                <Text className="text-sm font-medium" style={{ color: colors.text.secondary }} numberOfLines={3}>
                                    {booking.notes}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Reminder indicator */}
                    {booking.reminderSet && (
                        <View className="flex-row items-center justify-center bg-amber-50 border border-amber-200 rounded-2xl p-3 mt-2">
                            <MaterialIcons name="notifications-active" size={18} color="#F59E0B" />
                            <Text className="text-sm font-semibold text-amber-600 ml-2">
                                Reminder Active
                            </Text>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                {['pending', 'accepted'].includes(booking.status) && (
                    <View className="flex-row gap-3 pt-2">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl border-2 border-red-100 bg-red-50"
                            onPress={() => onAction(booking.id, 'cancel')}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="close" size={18} color="#EF4444" />
                            <Text className="text-sm font-bold text-red-500 ml-2">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl shadow-sm"
                            style={{ backgroundColor: colors.accent }}
                            onPress={() => onMessage(booking.agentName)}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="chat-bubble" size={18} color={colors.white} />
                            <Text className="text-sm font-bold text-white ml-2">Message</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    </Animated.View>
);