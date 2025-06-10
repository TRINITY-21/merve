import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { ProfessionalStatsCard } from '../compnents/StatsCard';

interface FollowingPerson {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    category: string;
    followers: string;
}

interface FollowingTabProps {
    dummyFollowing: FollowingPerson[];
    navigation: any;
    fadeAnim: SharedValue<number>;
    scaleAnim: SharedValue<number>;
}

export const FollowingTab: React.FC<FollowingTabProps> = ({
    dummyFollowing,
    navigation,
    fadeAnim,
    scaleAnim
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleAnim.value }],
            opacity: fadeAnim.value,
        };
    });

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 14,
                paddingBottom: 100,
                paddingTop: Platform.OS === 'ios' ? 14 : 8
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Section */}
            <View style={{ marginBottom: 24 }}>
                <View className="flex-row justify-between items-center mb-4 px-1">
                    <View>
                        <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                            Recent Pinned Agents
                        </Typography>
                        <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginTop: 4 }}>
                            Manage your pinned professional agents
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
                        onPress={() => navigation.navigate('FindAgents' as never)}
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
                            <MaterialIcons name="person-search" size={24} color={colors.primary} />
                        </View>
                        <Typography variant="semibold" size={14} style={{ color: colors.primary }}>
                            Find Agents
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
                        onPress={() => navigation.navigate('RecommendedAgents' as never)}
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
                            <MaterialIcons name="recommend" size={24} color={colors.success} />
                        </View>
                        <Typography variant="semibold" size={14} style={{ color: colors.success }}>
                            Recommended
                        </Typography>
                    </TouchableOpacity>
                </View>

                {/* Modern Filter Section */}
                <View style={{ marginBottom: 24 }}>
                    <Typography variant="medium" size={14} style={{ color: colors.text.secondary, marginBottom: 12, marginLeft: 4 }}>
                        Filter by Location
                    </Typography>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 4 }}
                    >
                        {['All', 'Accra', 'Takoradi', 'Sunyani', 'Volta', 'Kumasi'].map((filter, index) => (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setSelectedCategory(filter)}
                                style={{
                                    marginRight: 8,
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    backgroundColor: selectedCategory === filter ? colors.primary : colors.background,
                                    borderWidth: 1,
                                    borderColor: selectedCategory === filter ? colors.primary : colors.gray.light,
                                    shadowColor: colors.shadowColor,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: selectedCategory === filter ? 0.1 : 0,
                                    shadowRadius: 4,
                                    elevation: selectedCategory === filter ? 2 : 0,
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {selectedCategory === filter && (
                                        <MaterialIcons
                                            name="check"
                                            size={16}
                                            color={colors.white}
                                            style={{ marginRight: 4 }}
                                        />
                                    )}
                                    <Typography
                                        variant="medium"
                                        size={14}
                                        style={{
                                            color: selectedCategory === filter ? colors.white : colors.text.secondary,
                                        }}
                                    >
                                        {filter}
                                    </Typography>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Stats Overview */}
                <View style={{ marginBottom: 24 }}>
                    <ProfessionalStatsCard
                        title="This Week"
                        subtitle="December 2024"
                        stats={[
                            {
                                label: 'Total Agents',
                                value: '24',
                                icon: 'people',
                                color: colors.primary,
                                trend: 'up',
                                trendValue: '+12%'
                            },
                            {
                                label: 'Active',
                                value: '18',
                                icon: 'check-circle',
                                color: colors.success,
                                trend: 'up',
                                trendValue: '+8%'
                            },
                            {
                                label: 'Inactive',
                                value: '6',
                                icon: 'cancel',
                                color: colors.error,
                                trend: 'down',
                                trendValue: '-3%'
                            }
                        ]}
                    />
                </View>
            </View>

            {/* Agent List */}
            {dummyFollowing
                .filter(person => selectedCategory === 'All' || person.category === selectedCategory)
                .map((person, index) => (
                    <Animated.View
                        key={person.id}
                        style={[
                            animatedStyle,
                            { marginBottom: 12 }
                        ]}
                    >
                        <View style={{
                            backgroundColor: colors.white,
                            borderRadius: 16,
                            padding: 16,
                            shadowColor: colors.shadowColor,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 2,
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: person.avatar }}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        marginRight: 16,
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Typography variant="bold" size={16} style={{ color: colors.text.primary }}>
                                            {person.name}
                                        </Typography>
                                        {person.verified && (
                                            <MaterialIcons
                                                name="verified"
                                                size={16}
                                                color={colors.accent}
                                                style={{ marginLeft: 4 }}
                                            />
                                        )}
                                    </View>
                                    <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginTop: 4 }}>
                                        {person.username}
                                    </Typography>
                                    <View className="flex-row items-center mt-1">
                                        <MaterialIcons name="location-on" size={14} color={colors.text.secondary} />
                                        <Typography
                                            variant="medium"
                                            size={12}
                                            style={{ color: colors.text.secondary, marginLeft: 4, flex: 1 }}
                                            numberOfLines={1}
                                        >
                                            {person.category}
                                        </Typography>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
                                        <View style={{
                                            borderRadius: 12,
                                            paddingHorizontal: 2,
                                            paddingVertical: 0,
                                        }}>
                                            <Typography variant="medium" size={12} style={{ color: colors.accent }}>
                                                {person.followers} Pins
                                            </Typography>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    className="px-4 py-2 rounded-xl flex-row items-center"
                                    style={{
                                        backgroundColor: colors.gray.light,
                                        borderWidth: 1,
                                        borderColor: colors.gray.light
                                    }}
                                >
                                    <MaterialIcons
                                        name="push-pin"
                                        size={16}
                                        color={colors.text.secondary}
                                    />
                                    <Typography
                                        variant="semibold"
                                        size={14}
                                        style={{ color: colors.text.secondary, marginLeft: 4 }}
                                    >
                                        Unpin
                                    </Typography>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                ))}
        </ScrollView>
    );
};