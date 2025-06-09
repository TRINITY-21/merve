import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    interpolate,
    SharedValue,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Toast from 'react-native-toast-message';
import { Header, Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import useStore from '../../../store/useStore';
import { IRoute, IUser } from '../../../types/userProfileTypes';
import { dummyActivities, dummyFollowers, dummyFollowing, dummyInvites, dummyMarketplaceData, dummyRecentBookings } from '../../../utils/userProfileDummyData';
import { ActivityCard } from './compnents/ActivityCard';
import { BookingCard } from './compnents/BookingCard';
import { FollowerCard } from './compnents/FollowerCard';
import { GradientButton } from './compnents/GradientButton';
import { ProfessionalCard } from './compnents/ModernInput';
import { PremiumUpgradeCard } from './compnents/PremiumCard';
import { ProductCard } from './compnents/ProductCard';
import { ProfessionalStatsCard } from './compnents/StatsCard';

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');
const initialLayout = { width: screenWidth };

interface IActivityData {
    totalEvents: number;
    connections: number;
    interests: number;
    notifications: number;
    recentActivity: Array<{
        id: string;
        title: string;
        description: string;
        time: string;
        status: 'completed' | 'pending' | 'upcoming';
    }>;
    upcomingEvents: Array<{
        id: string;
        title: string;
        description: string;
        time: string;
        status: 'completed' | 'pending' | 'upcoming';
    }>;
}

const dummyActivityData: IActivityData = {
    totalEvents: 24,
    connections: 156,
    interests: 89,
    notifications: 12,
    recentActivity: [
        {
            id: '1',
            title: 'Networking Event',
            description: 'Attended the annual networking event',
            time: '2 hours ago',
            status: 'completed',
        },
        {
            id: '2',
            title: 'Workshop Registration',
            description: 'Registered for the upcoming workshop',
            time: '5 hours ago',
            status: 'pending',
        },
        {
            id: '3',
            title: 'Profile Update',
            description: 'Updated professional profile',
            time: '1 day ago',
            status: 'completed',
        },
    ],
    upcomingEvents: [
        {
            id: '1',
            title: 'Tech Conference',
            description: 'Annual technology conference',
            time: 'In 2 days',
            status: 'upcoming',
        },
        {
            id: '2',
            title: 'Workshop',
            description: 'Professional development workshop',
            time: 'In 5 days',
            status: 'upcoming',
        },
        {
            id: '3',
            title: 'Networking Mixer',
            description: 'Monthly networking event',
            time: 'In 1 week',
            status: 'upcoming',
        },
    ],
};

interface ProductCardProps {
    product: any;
    fadeAnim: SharedValue<number>;
    slideAnim: SharedValue<number>;
    onPress: () => void;
}

interface BookingCardProps {
    booking: any;
    fadeAnim: SharedValue<number>;
}

interface ActivityCardProps {
    activity: any;
    fadeAnim: SharedValue<number>;
    slideAnim: SharedValue<number>;
    index: number;
    isLast: boolean;
    onPress: () => void;
}

interface PremiumUpgradeCardProps {
    onUpgradePress: () => void;
    fadeAnim: SharedValue<number>;
}

const UserProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { updateUser, logout, currentUser } = useStore();

    // State management
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<IUser>({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // Tab routes
    const [routes] = useState<IRoute[]>([
        { key: 'profileInfo', title: 'Profile' },
        { key: 'bookings', title: 'Bookings' },
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Pinned Agents' },
        { key: 'marketplace', title: 'Marketplace' },
        { key: 'invites', title: 'Invites' },
        { key: 'activity', title: 'Activity' },
    ]);

    // Use Reanimated's useSharedValue
    const fadeAnim = useSharedValue(0);
    const slideAnim = useSharedValue(50);
    const scaleAnim = useSharedValue(0.9);
    const rotateAnim = useSharedValue(0);
    const searchAnimation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
            transform: [
                { translateY: slideAnim.value },
                { scale: scaleAnim.value }
            ]
        };
    });

    const searchAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: searchAnimation.value,
            transform: [{
                translateY: interpolate(
                    searchAnimation.value,
                    [0, 1],
                    [-20, 0]
                )
            }]
        };
    });

    useEffect(() => {
        setFormData({
            name: currentUser?.name || '',
            phone: currentUser?.phone || '',
            email: currentUser?.email || '',
        });

        // Update animation sequence to use Reanimated
        fadeAnim.value = withTiming(1, { duration: 800 });
        slideAnim.value = withSpring(0, { damping: 8, stiffness: 30 });
        scaleAnim.value = withSpring(1, { damping: 7, stiffness: 25 });
        rotateAnim.value = withTiming(1, { duration: 800 });
    }, [currentUser]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // Form validation
    const validateForm = (): boolean => {
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: 'Please fill all required fields',
                visibilityTime: 3000,
            });
            return false;
        }

        if (formData.phone.replace(/\D/g, '').length !== 10) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Phone Number',
                text2: 'Phone number must be 10 digits',
                visibilityTime: 3000,
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter a valid email address',
                visibilityTime: 3000,
            });
            return false;
        }

        return true;
    };

    const handleSave = async (): Promise<void> => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            updateUser(formData);
            setLoading(false);
            setIsEditing(false);

            Toast.show({
                type: 'success',
                text1: 'Profile Updated Successfully',
                text2: 'Your information has been saved',
                visibilityTime: 3000,
            });
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: 'Please try again later',
                visibilityTime: 3000,
            });
        }
    };

    const handleLogout = (): void => {
        logout();
        Toast.show({
            type: 'success',
            text1: 'Logged Out Successfully',
            text2: 'See you again soon!',
            visibilityTime: 2000,
        });
        navigation.navigate('Login' as never);
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'completed': return colors.success;
            case 'pending': return colors.warning;
            case 'accepted': return colors.accent;
            case 'cancelled': return colors.error;
            case 'declined': return colors.error;
            default: return colors.gray.medium;
        }
    };

    // Marketplace Tab using reusable components
    const renderMarketplace = () => (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Monthly Overview */}
            <Animated.View style={[animatedStyle, { marginBottom: 32 }]}>
                <Typography variant="bold" size={24} style={{ color: colors.text.primary, letterSpacing: 0.3, marginBottom: 20 }}>
                    This Month's Activity
                </Typography>

                <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 24,
                        padding: 20,
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowOffset: { width: 0, height: 8 },
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {[
                            {
                                icon: 'visibility',
                                color: colors.white,
                                label: 'Products Viewed',
                                value: dummyMarketplaceData.monthlyStats.productsViewed,
                            },
                            {
                                icon: 'question-answer',
                                color: colors.white,
                                label: 'Inquiries Made',
                                value: dummyMarketplaceData.monthlyStats.inquiriesMade,
                            },
                            {
                                icon: 'bookmark',
                                color: colors.white,
                                label: 'Saved',
                                value: dummyMarketplaceData.monthlyStats.favoriteProducts,
                                onPress: () => navigation.navigate('FavoritesScreen' as never),
                            },
                            {
                                icon: 'shopping-cart',
                                color: colors.white,
                                label: 'Purchases',
                                value: dummyMarketplaceData.monthlyStats.purchases || 0,
                            },
                        ].map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        padding: 8,
                                        borderRadius: 12,
                                        marginBottom: 6,
                                    }}
                                >
                                    <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                                </View>
                                <Typography
                                    variant="bold"
                                    size={20}
                                    style={{ color: colors.white, marginBottom: 2 }}
                                >
                                    {item.value}
                                </Typography>
                                <Typography
                                    variant="bold"
                                    size={10}
                                    style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}
                                >
                                    {item.label}
                                </Typography>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </Animated.View>

            {/* Recent Activity */}
            <Animated.View style={[animatedStyle, { marginBottom: 32 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="bold" size={20} style={{ color: colors.text.primary, letterSpacing: 0.3 }}>
                        Recent Market place activity
                    </Typography>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 12,
                        }}
                        activeOpacity={0.8}
                    >
                        <Typography variant="bold" size={12} style={{ color: colors.white }}>
                            View All
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 16 }}>
                    {dummyMarketplaceData.recentActivity?.map((activity) => (
                        <TouchableOpacity
                            key={activity.id}
                            style={{
                                backgroundColor: colors.white,
                                borderRadius: 20,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOpacity: 0.08,
                                shadowOffset: { width: 0, height: 4 },
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                            activeOpacity={0.8}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Typography variant="bold" size={16} style={{ color: colors.text.primary, marginBottom: 4 }}>
                                        {activity.title}
                                    </Typography>
                                    <Typography variant="medium" size={14} style={{ color: colors.text.secondary }}>
                                        {activity.description}
                                    </Typography>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Typography variant="medium" size={14} style={{ color: colors.text.secondary, marginBottom: 8 }}>
                                        {activity.time}
                                    </Typography>
                                    <View
                                        style={{
                                            backgroundColor: getStatusColor(activity.status),
                                            paddingHorizontal: 12,
                                            paddingVertical: 6,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Typography variant="bold" size={12} style={{ color: colors.white }}>
                                            {activity.status.toUpperCase()}
                                        </Typography>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>

            {/* Recommended Products */}
            <Animated.View style={animatedStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="bold" size={20} style={{ color: colors.text.primary, letterSpacing: 0.3 }}>
                        Recommended for You
                    </Typography>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 12,
                        }}
                        activeOpacity={0.8}
                    >
                        <Typography variant="bold" size={12} style={{ color: colors.white }}>
                            View All
                        </Typography>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dummyMarketplaceData.recommendedProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16, paddingRight: 16 }}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            fadeAnim={fadeAnim}
                            slideAnim={slideAnim}
                            onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </Animated.View>
        </ScrollView>
    );

    // Profile Info Tab using reusable components
    const renderProfileInfo = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View
                style={animatedStyle}
                className="bg-white rounded-2xl p-5 mb-5 shadow-lg"
            >
                <View className="flex-row justify-between items-center mb-5">
                    <Typography variant="bold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                        Personal Information
                    </Typography>
                    <View className="flex-row items-center bg-accent px-3 py-1.5 rounded-2xl gap-1 shadow-md">
                        <MaterialIcons name="verified" size={14} color={colors.white} />
                        <Typography variant="bold" size={11} style={{ color: colors.white, letterSpacing: 0.5 }}>
                            Verified
                        </Typography>
                    </View>
                </View>

                {/* Using ModernInput components */}
                <ProfessionalCard
                    label="Full Name"
                    icon="person"
                    value="John Doe"
                />

                <ProfessionalCard
                    label="Phone Number"
                    icon="phone"
                    value="+1 (555) 123-4567"
                    onPress={() => console.log('Call pressed')}
                />

                <ProfessionalCard
                    label="Email Address"
                    icon="email"
                    value="john.doe@example.com"
                    onPress={() => console.log('Email pressed')}
                />

                <ProfessionalCard
                    label="Location"
                    icon="pin-drop"
                    value="Accra, Ghana"
                />

            </Animated.View>

            {/* Premium Upgrade Card */}
            <Animated.View
                style={{ opacity: fadeAnim }}
                className="rounded-2xl overflow-hidden mb-6 shadow-lg"
            >


                <PremiumUpgradeCard
                    onUpgradePress={() => navigation.navigate('UpgradeScreen')}
                    fadeAnim={fadeAnim}
                />

            </Animated.View>

            {/* Logout Button */}
            <TouchableOpacity
                className="flex-row items-center justify-center bg-white rounded-2xl py-4 mb-6 border-2 border-red-500 gap-2 shadow-lg"
                onPress={handleLogout}
                activeOpacity={0.8}
            >
                <MaterialIcons name="logout" size={20} color={colors.error} />
                <Typography variant="bold" size={14} style={{ color: colors.error, letterSpacing: 0.5 }}>
                    Sign out
                </Typography>
            </TouchableOpacity>
        </ScrollView>
    );

    // Bookings Tab using reusable components
    const renderBookings = () => {
        return (
            <FlatList
                data={dummyRecentBookings}
                renderItem={({ item, index }) => (
                    <Animated.View
                        style={animatedStyle}
                    >
                        <BookingCard
                            booking={item}
                            fadeAnim={fadeAnim}
                        />
                    </Animated.View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 14, paddingBottom: Platform.OS === 'ios' ? 80 : 70 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
                ListHeaderComponent={
                    <>
                        {/* Header Section */}
                        <View style={{ marginBottom: 24 }}>
                            <View className="flex-row justify-between items-center mb-4 px-1">
                                <View>
                                    <Typography variant="bold" size={24} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
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
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }],
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
                    </>
                }
                ItemSeparatorComponent={() => (
                    <View style={{ height: 12 }} />
                )}
            />
        );
    };

    // Followers Tab using FollowerCard
    // ================================
    // 1. ADD THESE STATE VARIABLES (with your other state)
    // ================================
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchInputRef = useRef<TextInput>(null);

    // ================================
    // 2. ADD THIS ANIMATED VALUE (with your other animations)
    // ================================
    // const searchAnimation = useSharedValue(0);

    // ================================
    // 3. ADD THESE TWO NEW FUNCTIONS
    // ================================
    const handleSearchToggle = () => {
        if (!isSearchVisible) {
            setIsSearchVisible(true);
            searchAnimation.value = withTiming(1, { duration: 300 });
            searchInputRef.current?.focus();
        } else {
            searchAnimation.value = withTiming(0, { duration: 300 });
            setIsSearchVisible(false);
            setSearchQuery('');
        }
    };

    const getFilteredFollowers = () => {
        if (!searchQuery.trim()) {
            return dummyFollowers;
        }

        return dummyFollowers.filter(follower =>
            follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            follower.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            follower.bio.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // ================================
    // 4. REPLACE YOUR EXISTING renderFollowers FUNCTION WITH THIS
    // ================================
    const renderFollowers = () => {
        const filteredFollowers = getFilteredFollowers();

        return (
            <ScrollView
                contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View className="mb-5 px-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Typography variant="bold" size={20} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                            Followers
                        </Typography>
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: isSearchVisible ? colors.primary : colors.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: colors.shadowColor,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                activeOpacity={0.7}
                                onPress={handleSearchToggle}
                            >
                                <MaterialIcons
                                    name={isSearchVisible ? "close" : "search"}
                                    size={20}
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: colors.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    shadowColor: colors.shadowColor,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                activeOpacity={0.7}
                            >
                                <MaterialIcons name="sort" size={20} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Search Input */}
                    {isSearchVisible && (
                        <Animated.View
                            style={searchAnimatedStyle}
                            className="rounded-2xl overflow-hidden mb-6 shadow-lg"
                        >
                            <View style={{
                                backgroundColor: colors.background,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: colors.gray.light,
                                paddingHorizontal: 16,
                                paddingVertical: 4,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 8,
                                }}>
                                    <MaterialIcons name="search" size={20} color={colors.text.secondary} />
                                    <TextInput
                                        ref={searchInputRef}
                                        style={{
                                            flex: 1,
                                            marginLeft: 12,
                                            fontSize: 16,
                                            color: colors.text.primary,
                                            fontWeight: '500',
                                        }}
                                        placeholder="Search followers..."
                                        placeholderTextColor={colors.text.secondary}
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        returnKeyType="search"
                                    />
                                    {searchQuery.length > 0 && (
                                        <TouchableOpacity
                                            onPress={() => setSearchQuery('')}
                                            style={{ padding: 4 }}
                                            activeOpacity={0.6}
                                        >
                                            <MaterialIcons name="clear" size={18} color={colors.text.secondary} />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {searchQuery.length > 0 && (
                                    <View style={{ paddingBottom: 8 }}>
                                        <Typography variant="medium" size={13} style={{ color: colors.text.secondary }}>
                                            {filteredFollowers.length} {filteredFollowers.length === 1 ? 'follower' : 'followers'} found
                                        </Typography>
                                    </View>
                                )}
                            </View>
                        </Animated.View>
                    )}
                </View>

                {/* Stats Card */}
                <ProfessionalStatsCard
                    title="This Week"
                    stats={[
                        { label: 'Followers', value: '+12' },
                        { label: 'Following', value: '+23', color: colors.success },
                        { label: 'Pinned Agents', value: '+40', color: colors.accent },
                    ]}
                />

                {/* Results */}
                {searchQuery.length > 0 && filteredFollowers.length === 0 ? (
                    <Animated.View
                        style={{ opacity: fadeAnim }}
                        className="items-center justify-center py-12 bg-white rounded-2xl"
                    >
                        <MaterialIcons name="search" size={48} color={colors.gray.light} />
                        <Typography variant="semibold" size={18} style={{ color: colors.text.primary, marginTop: 16, marginBottom: 8 }}>
                            No results found
                        </Typography>
                        <Typography variant="regular" size={14} style={{ color: colors.text.secondary, textAlign: 'center', paddingHorizontal: 24, marginBottom: 16 }}>
                            No followers match "{searchQuery}"
                        </Typography>
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.gray.light,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}
                            onPress={() => setSearchQuery('')}
                            activeOpacity={0.7}
                        >
                            <Typography variant="medium" size={14} style={{ color: colors.text.secondary }}>
                                Clear search
                            </Typography>
                        </TouchableOpacity>
                    </Animated.View>
                ) : (
                    filteredFollowers.map((follower, index) => (
                        <FollowerCard
                            key={follower.id}
                            follower={follower}
                            fadeAnim={fadeAnim}
                            slideAnim={slideAnim}
                            index={index}
                            onFollowPress={(follower) => console.log('Follow pressed:', follower.name)}
                        />
                    ))
                )}
            </ScrollView>
        );
    };
    // Following Tab
    const renderFollowing = () => (
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
                        <Typography variant="bold" size={24} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
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
                        style={{
                            transform: [{ scale: scaleAnim }],
                            opacity: fadeAnim,
                            marginBottom: 12,
                        }}
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

                                    <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
                                        <View style={{
                                            backgroundColor: colors.gray.light,
                                            borderRadius: 12,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                        }}>
                                            <Typography variant="medium" size={12} style={{ color: colors.text.primary }}>
                                                {person.category}
                                            </Typography>
                                        </View>
                                        <View style={{
                                            backgroundColor: colors.accent + '15',
                                            borderRadius: 12,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                        }}>
                                            <Typography variant="medium" size={12} style={{ color: colors.accent }}>
                                                {person.followers} Pins
                                            </Typography>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: colors.gray.light,
                                        borderRadius: 12,
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons name="push-pin" size={16} color={colors.text.primary} />
                                    <Typography variant="semibold" size={14} style={{ color: colors.text.primary }}>
                                        Unpin
                                    </Typography>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                ))}
        </ScrollView>
    );

    // Invites Tab
    const renderInvites = () => (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Invite Stats */}
            <View style={{ marginBottom: 32 }}>
                <Typography variant="bold" size={24} style={{ color: colors.text.primary, letterSpacing: 0.3, marginBottom: 20 }}>
                    Invite Statistics
                </Typography>

                <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 24,
                        padding: 20,
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowOffset: { width: 0, height: 8 },
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        {[
                            {
                                icon: 'send',
                                color: colors.white,
                                label: 'Total Sent',
                                value: dummyInvites.length,
                            },
                            {
                                icon: 'check-circle',
                                color: colors.white,
                                label: 'Accepted',
                                value: dummyInvites.filter(invite => invite.status === 'accepted').length,
                            },
                            {
                                icon: 'pending',
                                color: colors.white,
                                label: 'Pending',
                                value: dummyInvites.filter(invite => invite.status === 'pending').length,
                            },
                            {
                                icon: 'cancel',
                                color: colors.white,
                                label: 'Declined',
                                value: dummyInvites.filter(invite => invite.status === 'declined').length,
                            },
                        ].map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        padding: 8,
                                        borderRadius: 12,
                                        marginBottom: 6,
                                    }}
                                >
                                    <MaterialIcons name={item.icon as any} size={20} color={item.color} />
                                </View>
                                <Typography
                                    variant="bold"
                                    size={20}
                                    style={{ color: colors.white, marginBottom: 2 }}
                                >
                                    {item.value}
                                </Typography>
                                <Typography
                                    variant="bold"
                                    size={10}
                                    style={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center' }}
                                >
                                    {item.label}
                                </Typography>
                            </View>
                        ))}
                    </View>
                </LinearGradient>
            </View>

            {/* Recent Invites */}
            <View style={{ marginBottom: 32 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="bold" size={20} style={{ color: colors.text.primary, letterSpacing: 0.3 }}>
                        Recent Invites
                    </Typography>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 12,
                        }}
                        activeOpacity={0.8}
                    >
                        <Typography variant="bold" size={12} style={{ color: colors.white }}>
                            View All
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 16 }}>
                    {dummyInvites.map((invite) => (
                        <TouchableOpacity
                            key={invite.id}
                            style={{
                                backgroundColor: colors.white,
                                borderRadius: 20,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOpacity: 0.08,
                                shadowOffset: { width: 0, height: 4 },
                                shadowRadius: 8,
                                elevation: 4,
                            }}
                            activeOpacity={0.8}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <View style={{ flex: 1 }}>
                                    <Typography variant="bold" size={16} style={{ color: colors.text.primary, marginBottom: 4 }}>
                                        {invite.name}
                                    </Typography>
                                    <Typography variant="medium" size={14} style={{ color: colors.text.secondary }}>
                                        {invite.phone}
                                    </Typography>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Typography variant="medium" size={14} style={{ color: colors.text.secondary, marginBottom: 8 }}>
                                        {invite.sentDate}
                                    </Typography>
                                    <View
                                        style={{
                                            backgroundColor: getStatusColor(invite.status),
                                            paddingHorizontal: 12,
                                            paddingVertical: 6,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Typography variant="bold" size={12} style={{ color: colors.white }}>
                                            {invite.status.toUpperCase()}
                                        </Typography>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );

    // Activity Tab using ActivityCard
    const renderActivity = () => (
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
                <Typography
                    style={{
                        fontSize: 18,
                        fontWeight: '800',
                        color: colors.text.primary,
                        letterSpacing: 0.5,
                    }}
                >
                    Recent Activity
                </Typography>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Activity' as never)}
                    activeOpacity={0.7}
                    style={{
                        padding: 8,
                        borderRadius: 999,
                        backgroundColor: colors.gray.light,
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
                        activity={activity}
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


    const renderScene = SceneMap({
        profileInfo: renderProfileInfo,
        bookings: renderBookings,
        marketplace: renderMarketplace,
        followers: renderFollowers,
        following: renderFollowing,
        invites: renderInvites,
        activity: renderActivity,
    });


    const renderTabBar = (props: any) => (
        <View className="">
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: colors.primary, height: 4, borderRadius: 0 }}
                style={{ backgroundColor: 'transparent', elevation: 0, paddingTop: 0, paddingBottom: 0 }}
                tabStyle={{ height: 50, justifyContent: 'center' }}
                activeColor={colors.primary}
                inactiveColor={colors.text.secondary}
                scrollEnabled
                renderLabel={({ route, focused, color }: any) => (
                    <Animated.View style={[
                        { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
                        focused && { transform: [{ scale: 1.05 }] }
                    ]}>
                        <Typography
                            variant="bold"
                            size={13}
                            style={{
                                textTransform: 'capitalize',
                                letterSpacing: 0.2,
                                color: focused ? colors.primary : colors.text.secondary
                            }}
                        >
                            {route.title}
                        </Typography>

                        {focused && (
                            <LinearGradient
                                colors={colors.gradient.primary}
                                className="w-5 h-1 rounded-full mt-2"
                            />
                        )}
                    </Animated.View>
                )}
            />
        </View>
    );

    return (
        <View className="flex-1 bg-slate-100">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >

                {/* Header */}
                <Header title="Profile" withShadow={false}
                    backgroundColor={colors.primary}

                    leftIcon={{ name: 'chevron-left', onPress: navigation.goBack }}
                    rightIcons={[
                        { name: 'event', onPress: () => navigation.navigate('UserBookings') },
                        { name: 'settings', onPress: () => navigation.navigate('UserSettings') },
                    ]}
                />

                {/* Profile Header view */}
                <View className="pt-4 pl-5 pr-5 pb-3 mb-1">
                    <View className="flex-row items-start">
                        <TouchableOpacity className="relative mr-4 mt-2 shadow-2xl" activeOpacity={0.8}>
                            <Image
                                source={{ uri: currentUser?.avatar || 'https://i.pravatar.cc/150?img=9' }}
                                className="w-20 h-20 rounded-2xl border-2 border-white"
                            />
                            <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-lg" />
                            <TouchableOpacity
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-xl bg-white items-center justify-center border-2 border-white shadow-lg"
                                activeOpacity={0.8}
                            >
                                <MaterialIcons name="verified" size={14} color={colors.primary} />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <View className="flex-1 pr-3 pt-1">
                            <View className="flex-row items-center mb-1">
                                <Typography className="text-lg text-secondary tracking-wide mr-2" variant="bold" size={18}>
                                    {currentUser?.name}
                                </Typography>
                                <View className="bg-accent/10 px-2 py-0.5 rounded-lg">
                                    <Typography className="text-[10px] text-accent" variant="bold" size={10}>PRO</Typography>
                                </View>
                            </View>
                            <Typography className="text-sm text-secondary/80 mb-1" variant="medium" size={14}>Mobile Money User</Typography>
                            <View className="flex-row items-center">
                                <MaterialIcons name="location-on" size={14} color={colors.secondary} style={{ opacity: 0.7 }} />
                                <Typography className="text-xs text-secondary/70 ml-1" variant="medium" size={12}>Accra, Ghana</Typography>
                            </View>
                        </View>
                    </View>

                    <View className="mt-4 flex-row justify-between bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 mb-1 border-2 border-white/50">
                        <TouchableOpacity className="items-center flex-1 border-white/40 pr-3">
                            <Typography className="text-base text-secondary mb-0.5" variant="bold" size={16}>{23}</Typography>
                            <Typography className="text-[11px] text-secondary/90 tracking-wide" variant="semibold" size={11}>Bookings</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center flex-1 border-white/40 pr-3">
                            <Typography className="text-base text-secondary mb-0.5" variant="bold" size={16}>29.3K</Typography>
                            <Typography className="text-[11px] text-secondary/90 tracking-wide" variant="semibold" size={11}>Followers</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center flex-1 border-white/40 pr-3">
                            <Typography className="text-base text-secondary mb-0.5" variant="bold" size={16}>340</Typography>
                            <Typography className="text-[11px] text-secondary/90 tracking-wide" variant="semibold" size={11}>Following</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center">
                            <MaterialIcons name="person-add" size={Platform.OS === 'ios' ? 23 : 20} color={colors.secondary} />
                            <Typography className="text-md text-secondary/90 tracking-wide" variant="semibold" size={11}>Invite</Typography>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab View */}
                <View className="flex-1 mt-0 bg-slate-50 rounded-t-lg">
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
export default UserProfileScreen; 