// BookingCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
}) => {
    const statusColor = getStatusColor(booking.status);
    const serviceColor = getServiceColor(booking.serviceType);
    const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);

    return (
        <Animated.View
            className="mb-3 px-0"
            style={{
                opacity: fadeAnim,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            }}
        >
            {/* Card Container */}
            <View className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {/* Status Indicator at Top */}
                <View
                    className="w-full py-4 items-center justify-center"
                    style={{ backgroundColor: statusColor + '20' }}
                >
                    <View className="flex-row items-center">
                        <View
                            className="w-2 h-2 rounded-full mr-2 mb-0.5"
                            style={{ backgroundColor: statusColor }}
                        />
                        <Typography variant='semibold' size={12}
                            className="font-bold uppercase tracking-wider"
                            style={{ color: statusColor }}
                        >
                            {statusText}
                        </Typography>
                    </View>
                </View>

                {/* Card Content */}
                <View className="p-3">
                    {/* Header Section */}
                    <View className="flex-row items-start justify-between mb-3">
                        {/* Service Icon and Info */}
                        <View className="flex-row items-center flex-1">
                            <View className="relative mr-3">
                                <LinearGradient
                                    colors={[serviceColor + '15', serviceColor + '40']}
                                    style={{
                                        backgroundColor: serviceColor + '20',
                                        borderRadius: 6,
                                        padding: 8
                                    }}
                                >
                                    <MaterialIcons
                                        name={getServiceIcon(booking.serviceType) as any}
                                        size={24}
                                        color={serviceColor}
                                    />
                                </LinearGradient>
                            </View>

                            <View className="flex-1">
                                <Typography variant='semibold' size={16}
                                    className="mb-1"
                                    style={{ color: colors.text.primary }}
                                    numberOfLines={1}
                                >
                                    {booking.agentName}
                                </Typography>
                                <Typography size={12}
                                    className=" font-medium"
                                    style={{ color: colors.text.secondary }}
                                >
                                    {booking.serviceType.replace(/_/g, ' ').toUpperCase()}
                                </Typography>
                            </View>
                        </View>

                        {/* Price Tag */}
                        <View className="bg-gray-100 px-4 py-2.5 rounded-lg">
                            <Typography variant="semibold" size={14} className="text-base font-bold" style={{ color: colors.text.primary }}>
                                GH₵{booking.amount}
                            </Typography>
                        </View>
                    </View>

                    {/* Details Section */}
                    <View className="space-y-5 mb-0">
                        {/* Date & Time */}
                        <View className="flex-row items-start rounded-xl p-1 mb-2">
                            <MaterialIcons
                                name="schedule"
                                size={22}
                                color={colors.text.secondary}
                                style={{ 
                                    marginRight: 16, 
                                    marginTop: Platform.OS === 'ios' ? 0 : -1 
                                }}
                            />
                            <View style={{ marginTop: Platform.OS === 'ios' ? 4 : -2 }}>
                                <Typography variant='regular' size={14} className="" style={{ color: colors.text.primary }}>
                                    {formatDate(booking.date)} • {formatTime(booking.time)}
                                </Typography>
                            </View>
                        </View>

                        {/* Location */}
                        <View className="flex-row items-start rounded-xl p-1 mb-2">
                            <MaterialIcons
                                name="location-on"
                                size={22}
                                color={colors.text.secondary}
                                style={{ 
                                    marginRight: 16, 
                                    marginTop: Platform.OS === 'ios' ? 0 : -1 
                                }}
                            />
                            <View className="flex-1" style={{ marginTop: Platform.OS === 'ios' ? 4 : -2 }}>
                                <Typography variant='regular' size={14}
                                    className=""
                                    style={{ color: colors.text.primary }}
                                    numberOfLines={2}
                                >
                                    {booking.location}
                                </Typography>
                            </View>
                        </View>

                        {/* Notes */}
                        {booking.notes && (
                            <View className="flex-row items-start rounded-xl p-1">
                                <MaterialIcons
                                    name="notes"
                                    size={22}
                                    color={colors.text.secondary}
                                    style={{ 
                                        marginRight: 16, 
                                        marginTop: Platform.OS === 'ios' ? 0 : -1 
                                    }}
                                />
                                <View className="flex-1" style={{ marginTop: Platform.OS === 'ios' ? 3 : -2 }}>
                                    <Typography variant='regular' size={14}
                                        style={{ color: colors.text.secondary }}
                                        numberOfLines={3}
                                    >
                                        {booking.notes}
                                    </Typography>
                                </View>
                            </View>
                        )}

                        {/* Reminder Indicator */}
                        {booking.reminderSet && (
                            <View className="flex-row items-center justify-center bg-teal-50 border border-teal-100 rounded-xl p-2 mt-2">
                                <MaterialIcons name="notifications-active" size={20} color={colors.primary} />
                                <Text className="text-base font-medium text-teal-500 ml-3">
                                    Reminder Set (30 min before)
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Action Buttons */}
                    {['pending', 'accepted'].includes(booking.status) && (
                        <View className="flex-row h-18 gap-4 pt-4">
                            <TouchableOpacity
                                className="flex-1 flex-row items-center justify-center rounded-xl border border-gray-200 bg-white"
                                onPress={() => onAction(booking.id, 'cancel')}
                                activeOpacity={0.8}
                            >
                                <MaterialIcons name="close" size={20} color="#EF4444" />
                                <Text className="text-base font-bold text-red-500 ml-3">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="flex-1 flex-row items-center justify-center py-4 rounded-xl"
                                style={{ backgroundColor: colors.accent }}
                                onPress={() => onMessage(booking.agentName)}
                                activeOpacity={0.8}
                            >
                                <MaterialIcons name="chat" size={20} color={colors.white} />
                                <Text className="text-base font-bold text-white ml-3">Message</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Animated.View>
    );
};