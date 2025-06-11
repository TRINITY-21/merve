import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import {
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { Header, Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import useStore from '../../../store/useStore';
import { IRoute, IUser } from '../../../types/userProfileTypes';
import { dummyActivities, dummyFollowing, dummyInvites, dummyMarketplaceData, dummyRecentBookings } from '../../../utils/userProfileDummyData';
import { ActivityTab } from './tabs/ActivityTab';
import { BookingsTab } from './tabs/BookingsTab';
import { FollowingTab } from './tabs/FollowingTab';
import { InvitesTab } from './tabs/InvitesTab';
import { MarketplaceTab } from './tabs/MarketplaceTab';
import { ProfileInfoTab } from './tabs/ProfileInfoTab';

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window'); 

const UserProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { updateUser, logout, currentUser } = useStore();

    // State management
    const [formData, setFormData] = useState<IUser>({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
    });
    const [index, setIndex] = useState<number>(0);
    const [isTabsSticky, setIsTabsSticky] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    // Tab routes
    const [routes] = useState<IRoute[]>([
        { key: 'profileInfo', title: 'Profile' },
        { key: 'bookings', title: 'Bookings' },
        { key: 'following', title: 'Pinned Agents' },
        { key: 'marketplace', title: 'Marketplace' },
        { key: 'invites', title: 'Invites' },
    ]);

    // Use Reanimated's useSharedValue
    const fadeAnim = useSharedValue(0);
    const slideAnim = useSharedValue(50);
    const scaleAnim = useSharedValue(0.9);

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
    }, [currentUser]);

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

    const renderTabBar = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        >
            <View className="flex-row">
                {routes.map((route, idx) => (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => setIndex(idx)}
                        className="px-4 py-3 mr-2"
                        style={{
                            borderBottomWidth: index === idx ? 4 : 0,
                            borderBottomColor: colors.primary,
                        }}
                    >
                        <Typography
                            variant="semibold"
                            size={13}
                            style={{
                                color: index === idx ? colors.primary : colors.text.secondary,
                                textTransform: 'capitalize',
                                letterSpacing: 0.2,
                            }}
                        >
                            {route.title}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
 
    const renderCurrentTab = () => {
        const currentRoute = routes[index];
 
        const getTabContent = () => {
            switch (currentRoute.key) {
                case 'profileInfo':
                    return (
                        <ProfileInfoTab
                            currentUser={currentUser as IUser}
                            navigation={navigation}
                            fadeAnim={fadeAnim}
                            handleLogout={handleLogout}
                        />
                    );
                case 'bookings':
                    return (
                        <BookingsTab
                            dummyRecentBookings={dummyRecentBookings}
                            navigation={navigation}
                            fadeAnim={fadeAnim}
                            scaleAnim={scaleAnim}
                        />
                    );
                case 'marketplace':
                    return (
                        <MarketplaceTab
                            dummyMarketplaceData={dummyMarketplaceData}
                            navigation={navigation}
                            fadeAnim={fadeAnim}
                            slideAnim={slideAnim}
                            getStatusColor={getStatusColor}
                        />
                    );
                case 'following':
                    return (
                        <FollowingTab
                            dummyFollowing={dummyFollowing}
                            navigation={navigation}
                            fadeAnim={fadeAnim}
                            scaleAnim={scaleAnim}
                        />
                    );
                case 'invites':
                    return (
                        <InvitesTab
                            dummyInvites={dummyInvites}
                            navigation={navigation}
                            getStatusColor={getStatusColor}
                        />
                    );
                case 'activity':
                    return (
                        <ActivityTab
                            dummyActivities={dummyActivities}
                            navigation={navigation}
                            fadeAnim={fadeAnim}
                            slideAnim={slideAnim}
                        />
                    );
                default:
                    return null;
            }
        };

        const tabContent = getTabContent();

        if (isTabsSticky) {
            // When tabs are sticky, render with independent ScrollView
            return (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    {tabContent}
                </ScrollView>
            );
        } else {
            // When not sticky, render as regular View (part of main scroll)
            return <View>{tabContent}</View>;
        }
    };

    return (
        <View className="flex-1 bg-slate-100">
            {/* Fixed Header */}
            <Header
                title={!isTabsSticky ? 'Profile' : (currentUser?.name || 'Profile')}
                withShadow={false}
                backgroundColor={colors.primary}
                fixed={true}
                leftIcon={{ name: 'chevron-left', onPress: navigation.goBack }}
                rightIcons={[
                    { name: 'event', onPress: () => navigation.navigate('UserBookings') },
                    { name: 'settings', onPress: () => navigation.navigate('UserSettings') },
                ]}
                customContent={isTabsSticky ? (
                    <View className="flex-row items-center justify-between px-4 h-14">
                        {/* Left Icon */}
                        <TouchableOpacity onPress={navigation.goBack} className="w-10 h-10 items-center justify-center">
                            <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
                        </TouchableOpacity>

                        {/* Center Content - Profile */}
                        <View className="flex-1 flex-row items-center justify-center">
                            <Image
                                source={{ uri: currentUser?.avatar || 'https://i.pravatar.cc/150?img=9' }}
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <Typography
                                variant="bold"
                                size={18}
                                style={{ color: colors.secondary }}
                                numberOfLines={1}
                            >
                                {currentUser?.name || 'Profile'}
                            </Typography>
                        </View>

                        {/* Right Icons */}
                        <View className="flex-row gap-2">
                            <TouchableOpacity onPress={() => navigation.navigate('UserBookings')} className="w-8 h-8 items-center justify-center">
                                <MaterialIcons name="event" size={18} color={colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('UserSettings')} className="w-8 h-8 items-center justify-center">
                                <MaterialIcons name="settings" size={18} color={colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : undefined}
            />

            {/* Scrollable Content */}
            <ScrollView
                ref={scrollViewRef}
                className="flex-1"
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                onScroll={({ nativeEvent }) => {
                    const offsetY = nativeEvent.contentOffset.y;
                    setIsTabsSticky(offsetY > 120); // Adjust threshold as needed
                }}
                scrollEventThrottle={16}
            >
                {/* Profile Header Section */}
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
                            <Typography className="text-[11px] text-secondary/90 tracking-wide" variant="semibold" size={11}>Agents Pinned</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center flex-1 border-white/40 pr-3">
                            <MaterialIcons name="person-add-alt" size={Platform.OS === 'ios' ? 23 : 20} color={colors.secondary} />
                            <Typography className="text-md text-secondary/90 tracking-wide" variant="semibold" size={11}>Invite</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center">
                            <MaterialIcons name="chat-bubble-outline" size={Platform.OS === 'ios' ? 23 : 20} color={colors.secondary} />
                            <Typography className="text-md text-secondary/90 tracking-wide" variant="semibold" size={11}>Chat</Typography>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sticky Tab Bar */}
                <View className="bg-white">
                    {renderTabBar()}
                </View>

                {/* Dynamic Tab Content Container */}
                <View style={{ minHeight: isTabsSticky ? 400 : 'auto' }}>
                    {renderCurrentTab()}
                </View>
            </ScrollView>
        </View>
    );
};

export default UserProfileScreen;