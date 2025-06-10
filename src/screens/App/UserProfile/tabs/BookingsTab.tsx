import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { BookingCard } from '../compnents/BookingCard';
import { GradientButton } from '../compnents/GradientButton';
import { ProfessionalStatsCard } from '../compnents/StatsCard';

interface BookingData {
    id: string;
    [key: string]: any;
}

interface BookingsTabProps {
    dummyRecentBookings: BookingData[];
    navigation: any;
    fadeAnim: SharedValue<number>;
    scaleAnim: SharedValue<number>;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({
    dummyRecentBookings,
    navigation,
    fadeAnim,
    scaleAnim
}) => {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
            transform: [
                { translateY: 0 },
                { scale: 1 }
            ]
        };
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <View style={{ padding: 14, paddingBottom: Platform.OS === 'ios' ? 80 : 70 }}>
            {/* Header Section */}
            <View style={{ marginBottom: 24 }}>
                <View className="flex-row justify-between items-center mb-4 px-1">
                    <View>
                        <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                            Recent Bookings
                        </Typography>
                        <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginTop: 4 }}>
                            Manage your appointments and schedules
                        </Typography>
                    </View>
                    <TouchableOpacity
                        className="rounded-2xl items-center justify-center bg-primary/10 px-4 py-2"
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ViewAllBookingsScreen' as never)}
                    >
                        <Typography variant="semibold" size={14} style={{ color: colors.primary }}>
                            View All
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View style={{
                    flexDirection: 'row',
                    gap: 12,
                    marginBottom: 24,
                    paddingHorizontal: 4
                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: colors.primary + '15',
                            borderRadius: 16,
                            padding: 16,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: colors.primary + '30',
                        }}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('BookAppointments' as never)}
                    >
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.primary + '20',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 8
                        }}>
                            <MaterialIcons name="add" size={24} color={colors.primary} />
                        </View>
                        <Typography variant="semibold" size={14} style={{ color: colors.primary }}>
                            New Booking
                        </Typography>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: colors.success + '15',
                            borderRadius: 16,
                            padding: 16,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: colors.success + '30',
                        }}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('UpcomingBookings' as never)}
                    >
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.success + '20',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 8
                        }}>
                            <MaterialIcons name="event" size={24} color={colors.success} />
                        </View>
                        <Typography variant="semibold" size={14} style={{ color: colors.success }}>
                            Upcoming
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* Stats Overview */}
                <ProfessionalStatsCard
                    title="Monthly Overview"
                    subtitle="December 2024"
                    stats={[
                        {
                            label: "Total Bookings",
                            value: "198",
                            icon: "book",
                            color: colors.primary,
                            trend: "up",
                            trendValue: "+12%"
                        },
                        {
                            label: "Completed",
                            value: "89",
                            icon: "done-all",
                            color: colors.success,
                            trend: "up",
                            trendValue: "+8%"
                        },
                        {
                            label: "Pending",
                            value: "8",
                            icon: "pending-actions",
                            color: colors.warning,
                            trend: "down",
                            trendValue: "-3%"
                        },
                        {
                            label: "Cancelled",
                            value: "34",
                            icon: "cancel",
                            color: colors.error,
                            trend: "down",
                            trendValue: "-5%"
                        }
                    ]}
                    onPress={() => console.log('View details')}
                />
            </View>

            {/* Empty State */}
            {dummyRecentBookings.length === 0 && (
                <Animated.View
                    style={{
                        opacity: fadeAnim.value,
                        transform: [{ scale: scaleAnim.value }],
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 40,
                        backgroundColor: colors.background,
                        borderRadius: 24,
                        marginHorizontal: 4,
                        borderWidth: 1,
                        borderColor: colors.gray.light,
                    }}
                >
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: colors.gray.light,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                    }}>
                        <MaterialIcons name="event-busy" size={40} color={colors.gray.medium} />
                    </View>
                    <Typography variant="bold" size={20} style={{ color: colors.text.primary, marginBottom: 8 }}>
                        No Recent Bookings
                    </Typography>
                    <Typography variant="regular" size={14} style={{
                        color: colors.text.secondary,
                        textAlign: 'center',
                        paddingHorizontal: 32,
                        marginBottom: 24,
                        lineHeight: 20
                    }}>
                        Your booking history will appear here once you start making appointments with our professional agents
                    </Typography>
                    <GradientButton
                        title="Book an Appointment"
                        onPress={() => navigation.navigate('BookAppointments' as never)}
                        icon="add"
                        size="large"
                    />
                </Animated.View>
            )}

            {/* Bookings List */}
            {dummyRecentBookings.map((item, index) => (
                <View key={item.id} style={{ marginBottom: 12 }}>
                    <Animated.View style={animatedStyle}>
                        <BookingCard
                            booking={item as any}
                            fadeAnim={fadeAnim}
                        />
                    </Animated.View>
                </View>
            ))}
        </View>
    );
};