import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { ActivityCard } from '../compnents/ActivityCard';
import { ProfessionalStatsCard } from '../compnents/StatsCard';

interface Activity {
    id: string;
    [key: string]: any;
}

interface ActivityTabProps {
    dummyActivities: Activity[];
    navigation: any;
    fadeAnim: SharedValue<number>;
    slideAnim: SharedValue<number>;
}

export const ActivityTab: React.FC<ActivityTabProps> = ({
    dummyActivities,
    navigation,
    fadeAnim,
    slideAnim
}) => {
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                    Recent Activity
                </Typography>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Activity' as never)}
                    activeOpacity={0.7}
                    style={{
                        padding: 8,
                        borderRadius: 999,
                    }}
                >
                    <MaterialIcons name="tune" size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Monthly Overview Card */}
            <View style={{ alignItems: 'center', marginHorizontal: 3, marginBottom: 4 }}>
                <ProfessionalStatsCard
                    title="Monthly Overview"
                    subtitle="December 2024"
                    stats={[
                        {
                            label: "Activities",
                            value: "198",
                            icon: "book",
                            color: "#10b981",
                            trend: "up",
                        },
                        {
                            label: "Followers",
                            value: "89",
                            icon: "done-all",
                            color: colors.success,
                            trend: "up",
                        },
                        {
                            label: "Bookings",
                            value: "8",
                            icon: "pending-actions",
                            color: "#3b82f6",
                            trend: "up",
                        },
                        {
                            label: "Invites",
                            value: "34",
                            icon: "cancel",
                            color: colors.error,
                            trend: "up",
                        }
                    ]}
                    onPress={() => console.log('View details')}
                />
            </View>

            {/* Activity List */}
            <View style={{ position: 'relative' }}>
                {dummyActivities.map((activity, index) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity as any}
                        fadeAnim={fadeAnim}
                        slideAnim={slideAnim}
                        index={index}
                        isLast={index === dummyActivities.length - 1}
                        onPress={() => console.log('Activity pressed:', activity.id)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};