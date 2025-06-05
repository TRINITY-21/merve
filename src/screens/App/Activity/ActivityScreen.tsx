import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    ListRenderItem,
    Modal,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { JSX } from 'react/jsx-runtime';
import { Header } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { activitiesData, mockProducts } from '../../../utils/dummyData';

// TypeScript Interfaces
interface Activity {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    category: string;
    status: 'completed' | 'new' | 'warning' | 'achievement';
    type: 'transaction' | 'social' | 'system' | 'achievement';
    icon: string;
    iconColor: string;
    amount?: string;
    user?: string;
    userAvatar?: string;
    agent?: string;
    agentAvatar?: string;
    comment?: string;
    rating?: number;
    transactionId?: string;
    transferId?: string;
    postId?: string;
    userId?: string;
}

interface FilterOption {
    key: string;
    label: string;
    count: number;
    color: string;
}

interface TimeRangeOption {
    key: string;
    label: string;
}

interface ActivitiesData {
    totalActivities: number;
    todayActivities: number;
    thisWeekActivities: number;
    activities: Activity[];
}

interface NavigationProps {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
}

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ActivityScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();

    console.log('activitiesData:', mockProducts);

    // State management
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
    const [selectedTimeRange, setSelectedTimeRange] = useState<string>('today');

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-30)).current;
    const headerScaleAnim = useRef(new Animated.Value(0.95)).current;

    const filterOptions: FilterOption[] = [
        { key: 'all', label: 'All Activities', count: activitiesData?.totalActivities || 0, color: colors.gray.medium },
        { key: 'financial', label: 'Financial', count: 145, color: colors.accent },
        { key: 'social', label: 'Social', count: 68, color: colors.secondaryLight },
        { key: 'account', label: 'Account', count: 12, color: colors.primary },
        { key: 'business', label: 'Business', count: 8, color: colors.success },
        { key: 'system', label: 'System', count: 1, color: colors.warning },
        { key: 'gamification', label: 'Achievements', count: 3, color: colors.gradient.primary[0] }
    ];

    const timeRangeOptions: TimeRangeOption[] = [
        { key: 'today', label: 'Today' },
        { key: 'yesterday', label: 'Yesterday' },
        { key: 'week', label: 'This Week' },
        { key: 'month', label: 'This Month' },
        { key: 'all', label: 'All Time' }
    ];

    useEffect(() => {
        // Initial animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(headerScaleAnim, {
                toValue: 1,
                tension: 25,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleRefresh = (): void => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const formatTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return date.toLocaleDateString();
    };

    const getFilteredActivities = (): Activity[] => {
        let filtered = activitiesData?.activities;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered?.filter(activity =>
                activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedFilter !== 'all') {
            filtered = filtered?.filter(activity => activity.category === selectedFilter);
        }

        // Apply time range filter
        const now = new Date();
        switch (selectedTimeRange) {
            case 'today':
                filtered = filtered?.filter(activity => {
                    const activityDate = new Date(activity.timestamp);
                    return activityDate.toDateString() === now.toDateString();
                });
                break;
            case 'yesterday':
                filtered = filtered?.filter(activity => {
                    const activityDate = new Date(activity.timestamp);
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    return activityDate.toDateString() === yesterday.toDateString();
                });
                break;
            case 'week':
                filtered = filtered?.filter(activity => {
                    const activityDate = new Date(activity.timestamp);
                    const weekAgo = new Date(now);
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return activityDate >= weekAgo;
                });
                break;
            case 'month':
                filtered = filtered?.filter(activity => {
                    const activityDate = new Date(activity.timestamp);
                    const monthAgo = new Date(now);
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    return activityDate >= monthAgo;
                });
                break;
        }

        return (filtered?.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) || [] as any[]) as Activity[];
    };

    const handleActivityTap = (activity: Activity): void => {
        switch (activity.type) {
            case 'transaction':
                navigation.navigate('TransactionDetail', { transactionId: activity.transactionId || activity.transferId });
                break;
            case 'social':
                if (activity.postId) {
                    navigation.navigate('PostDetail', { postId: activity.postId });
                } else if (activity.userId) {
                    navigation.navigate('UserProfile', { userId: activity.userId });
                }
                break;
            case 'system':
                if (activity.status === 'warning') {
                    Alert.alert('Security Alert', activity.description);
                }
                break;
            case 'achievement':
                navigation.navigate('Achievements');
                break;
            default:
                break;
        }
    };

    const renderHeader = (): JSX.Element => (
        <Animated.View
            className="shadow-lg shadow-black/30 elevation-8"
            style={{ transform: [{ scale: headerScaleAnim }] }}
        >
            <LinearGradient colors={colors.gradient.primary} className="rounded-b-0"
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <StatusBar barStyle="dark-content" backgroundColor={colors.gradient.primary[0]} />

                <Header
                    title="Activity"
                    leftIcon={{ name: 'chevron-left', onPress: () => navigation.goBack() }}
                    rightIcons={[
                        { name: 'filter-list', onPress: () => setShowFilterModal(true) },
                    ]}
                />

                <View className="px-4 pt-3 pb-6">
                    {/* Search Bar */}
                    <View
                        className="flex-row items-center rounded-2xl px-4 mb-4 gap-3"
                        style={{
                            backgroundColor: colors.white,
                            paddingVertical: Platform.OS === 'ios' ? 12 : 0
                        }}
                    >
                        <MaterialIcons name="search" size={20} color={colors.text.secondary} />
                        <TextInput
                            className="flex-1 text-base"
                            style={{ color: colors.white }}
                            placeholder="Search activities..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor={colors.secondary + '80'}
                        />
                        {searchQuery !== '' && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <MaterialIcons name="clear" size={20} color={colors.secondary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Stats Row */}
                    <View
                        className="flex-row justify-around rounded-2xl p-2 -mt-2"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                        <View className="items-center">
                            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
                                {activitiesData?.totalActivities}
                            </Text>
                            <Text className="text-xs opacity-80" style={{ color: colors.secondary }}>
                                Total Activities
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
                                {activitiesData?.todayActivities}
                            </Text>
                            <Text className="text-xs opacity-80" style={{ color: colors.secondary }}>
                                Today
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
                                {activitiesData?.thisWeekActivities}
                            </Text>
                            <Text className="text-xs opacity-80" style={{ color: colors.secondary }}>
                                This Week
                            </Text>
                        </View>
                    </View>
                </View>

            </LinearGradient>
        </Animated.View>
    );

    const renderTimeRangeSelector = (): JSX.Element => (
        <View
            className="py-2 mt-0.5"
            style={{
                backgroundColor: colors.white,
                borderBottomWidth: 2,
                borderBottomColor: colors.gray.light
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row px-5 gap-2">
                    {timeRangeOptions.map((option) => (
                        <TouchableOpacity
                            key={option.key}
                            className={`px-3 py-1.5 rounded-xl ${selectedTimeRange === option.key ? '' : ''
                                }`}
                            style={{
                                backgroundColor: selectedTimeRange === option.key
                                    ? colors.secondary
                                    : colors.background
                            }}
                            onPress={() => setSelectedTimeRange(option.key)}
                            activeOpacity={0.8}
                        >
                            <Text
                                className="text-xs font-semibold"
                                style={{
                                    color: selectedTimeRange === option.key
                                        ? colors.white
                                        : colors.text.secondary
                                }}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    const renderActivityCard: ListRenderItem<Activity> = ({ item: activity }) => (
        <Animated.View
            className="bg-white rounded-2xl mb-3 shadow-sm shadow-black/10 elevation-4"
            style={{ opacity: fadeAnim }}
        >
            <TouchableOpacity
                className="flex-row p-4"
                onPress={() => handleActivityTap(activity)}
                activeOpacity={0.8}
            >
                <View
                    className="w-12 h-12 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: activity.iconColor + '20' }}
                >
                    <MaterialIcons name={activity.icon as any} size={24} color={activity.iconColor} />
                </View>

                <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-base font-bold flex-1 mr-2" style={{ color: colors.text.primary }}>
                            {activity.title}
                        </Text>
                        <Text className="text-xs" style={{ color: colors.text.secondary }}>
                            {formatTimestamp(activity.timestamp)}
                        </Text>
                    </View>

                    <Text className="text-sm leading-5 mb-2" style={{ color: colors.text.secondary }}>
                        {activity.description}
                    </Text>

                    {/* Activity specific content */}
                    {activity.amount && (
                        <View className="mb-2">
                            <Text className="text-base font-bold" style={{ color: activity.iconColor }}>
                                {activity.amount}
                            </Text>
                        </View>
                    )}

                    {activity.user && (
                        <View className="flex-row items-center gap-2 mb-2">
                            <Image source={{ uri: activity.userAvatar }} className="w-6 h-6 rounded-full" />
                            <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                {activity.user}
                            </Text>
                        </View>
                    )}

                    {activity.agent && (
                        <View className="flex-row items-center gap-2 mb-2">
                            <Image source={{ uri: activity.agentAvatar }} className="w-6 h-6 rounded-full" />
                            <Text className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                                {activity.agent}
                            </Text>
                        </View>
                    )}

                    {activity.comment && (
                        <View className="rounded-lg p-2 mb-2" style={{ backgroundColor: colors.background }}>
                            <Text className="text-xs italic" style={{ color: colors.text.secondary }}>
                                "{activity.comment}"
                            </Text>
                        </View>
                    )}

                    {activity.rating && (
                        <View className="flex-row gap-0.5 mb-2">
                            {[...Array(5)].map((_, index) => (
                                <MaterialIcons
                                    key={index}
                                    name={index < activity.rating! ? "star" : "star-border"}
                                    size={16}
                                    color={colors.primary}
                                />
                            ))}
                        </View>
                    )}

                    {/* Status indicator */}
                    <View className="flex-row justify-between items-center">
                        <View
                            className="px-2 py-1 rounded-lg"
                            style={{
                                backgroundColor:
                                    activity.status === 'completed' ? colors.success + '20' :
                                        activity.status === 'new' ? colors.accent + '20' :
                                            activity.status === 'warning' ? colors.warning + '20' :
                                                activity.status === 'achievement' ? colors.primary + '20' :
                                                    colors.gray.light
                            }}
                        >
                            <Text
                                className="text-xs font-bold uppercase"
                                style={{
                                    color:
                                        activity.status === 'completed' ? colors.success :
                                            activity.status === 'new' ? colors.accent :
                                                activity.status === 'warning' ? colors.warning :
                                                    activity.status === 'achievement' ? colors.primary :
                                                        colors.gray.medium
                                }}
                            >
                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </Text>
                        </View>

                        <View className="px-2 py-1 rounded-lg" style={{ backgroundColor: colors.gray.light }}>
                            <Text className="text-xs font-semibold capitalize" style={{ color: colors.text.secondary }}>
                                {activity.category}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    const renderFilterModal = (): JSX.Element => (
        <Modal
            visible={showFilterModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowFilterModal(false)}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View
                    className="bg-white rounded-t-3xl pb-5"
                    style={{ maxHeight: screenHeight * 0.8 }}
                >
                    <View className="flex-row justify-between items-center p-5 border-b border-gray-200">
                        <Text className="text-xl font-bold" style={{ color: colors.text.primary }}>
                            Filter Activities
                        </Text>
                        <TouchableOpacity
                            onPress={() => setShowFilterModal(false)}
                            className="p-1"
                        >
                            <MaterialIcons name="close" size={24} color={colors.gray.dark} />
                        </TouchableOpacity>
                    </View>

                    <Text className="text-base font-bold px-5 py-3" style={{ color: colors.text.primary }}>
                        Category
                    </Text>
                    <ScrollView className="max-h-72 px-5" showsVerticalScrollIndicator={false}>
                        {filterOptions.map((option) => (
                            <TouchableOpacity
                                key={option.key}
                                className={`flex-row items-center py-3 border-b border-gray-200 ${selectedFilter === option.key ? 'bg-gray-100 rounded-lg -mx-2 px-2' : ''
                                    }`}
                                onPress={() => {
                                    setSelectedFilter(option.key);
                                }}
                                activeOpacity={0.8}
                            >
                                <View
                                    className="w-3 h-3 rounded-full mr-3"
                                    style={{ backgroundColor: option.color }}
                                />
                                <View className="flex-1 flex-row justify-between items-center mr-4">
                                    <Text
                                        className="text-base font-semibold"
                                        style={{
                                            color: selectedFilter === option.key ? colors.accent : colors.text.primary
                                        }}
                                    >
                                        {option.label}
                                    </Text>
                                    <Text className="text-sm font-semibold" style={{ color: colors.text.secondary }}>
                                        {option.count}
                                    </Text>
                                </View>
                                {selectedFilter === option.key && (
                                    <MaterialIcons name="check" size={20} color={colors.accent} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text className="text-base font-bold px-5 py-3" style={{ color: colors.text.primary }}>
                        Time Range
                    </Text>
                    <View className="px-5 gap-2">
                        {timeRangeOptions.map((option) => (
                            <TouchableOpacity
                                key={option.key}
                                className={`flex-row justify-between items-center py-3 px-4 rounded-lg ${selectedTimeRange === option.key ? '' : ''
                                    }`}
                                style={{
                                    backgroundColor: selectedTimeRange === option.key
                                        ? colors.secondary + '20'
                                        : colors.background
                                }}
                                onPress={() => setSelectedTimeRange(option.key)}
                                activeOpacity={0.8}
                            >
                                <Text
                                    className="text-sm font-semibold"
                                    style={{
                                        color: selectedTimeRange === option.key ? colors.accent : colors.text.primary
                                    }}
                                >
                                    {option.label}
                                </Text>
                                {selectedTimeRange === option.key && (
                                    <MaterialIcons name="check" size={16} color={colors.accent} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        className="rounded-xl p-4 mx-5 mt-4 items-center"
                        style={{ backgroundColor: colors.accent }}
                        onPress={() => setShowFilterModal(false)}
                        activeOpacity={0.8}
                    >
                        <Text className="text-base font-bold" style={{ color: colors.white }}>
                            Apply Filters
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const filteredActivities = getFilteredActivities();

    return (
        <View className="flex-1">
            {renderHeader()}
            {renderTimeRangeSelector()}

            <FlatList
                data={filteredActivities}
                renderItem={renderActivityCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
                ListEmptyComponent={() => (
                    <View className="items-center py-15">
                        <MaterialIcons name="timeline" size={64} color={colors.gray.medium} />
                        <Text className="text-lg font-bold mt-4 mb-2" style={{ color: colors.text.primary }}>
                            No activities found
                        </Text>
                        <Text className="text-sm text-center" style={{ color: colors.text.secondary }}>
                            {searchQuery ? 'Try adjusting your search or filters' : 'Your activities will appear here'}
                        </Text>
                    </View>
                )}
            />

            {renderFilterModal()}
        </View>
    );
};

export default ActivityScreen;