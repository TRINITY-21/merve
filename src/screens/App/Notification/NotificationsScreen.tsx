import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Header, Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { MapStackParamList } from '../../../navigation/AppNavigator';
import { IFilterOption, INotification, INotificationGroup } from '../../../types';
import { dummyNotifications } from '../../../utils/dummyData';

type NotificationsScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Notifications'>;


const NotificationsScreen: React.FC = () => {
    const navigation = useNavigation<NotificationsScreenNavigationProp>();

    // State management
    const [notifications, setNotifications] = useState<INotification[]>(dummyNotifications);
    const [filteredNotifications, setFilteredNotifications] = useState<INotification[]>(dummyNotifications);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-30)).current;
    const headerScaleAnim = useRef(new Animated.Value(0.95)).current;

    // Filter options
    const filterOptions: IFilterOption[] = [
        { key: 'all', label: 'All', icon: 'notifications', color: colors.gray.medium },
        { key: 'unread', label: 'Unread', icon: 'mark-email-unread', color: colors.primary },
        { key: 'transaction', label: 'Transactions', icon: 'account-balance-wallet', color: colors.accent },
        { key: 'social', label: 'Social', icon: 'people', color: colors.success },
        { key: 'system', label: 'System', icon: 'settings', color: colors.secondary },
    ];

    useEffect(() => {
        // Initial animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
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

useEffect(() => {
    // Filter notifications based on selected filter
    let filtered = [...notifications];

    switch (selectedFilter) {
        case 'unread':
            filtered = filtered.filter(notif => !notif.isRead);
            break;
        case 'transaction':
            filtered = filtered.filter(notif => notif.type === 'transaction');
            break;
        case 'social':
            filtered = filtered.filter(notif => ['follow', 'like', 'comment'].includes(notif.type));
            break;
        case 'system':
            filtered = filtered.filter(notif => ['system', 'security', 'update', 'promotion'].includes(notif.type));
            break;
        default:
            // 'all' case - no filtering needed
            break;
    }

    setFilteredNotifications(filtered);
}, [selectedFilter, notifications]);

    const handleRefresh = (): void => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const markAsRead = (notificationId: string): void => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId ? { ...notif, isRead: true } : notif
            )
        );
    };

    const markAllAsRead = (): void => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    const deleteNotification = (notificationId: string): void => {
        setNotifications(prev =>
            prev.filter(notif => notif.id !== notificationId)
        );
    };

    const toggleSelectionMode = (): void => {
        setIsSelectionMode(!isSelectionMode);
        setSelectedNotifications([]);
    };

    const toggleNotificationSelection = (notificationId: string): void => {
        setSelectedNotifications(prev =>
            prev.includes(notificationId)
                ? prev.filter(id => id !== notificationId)
                : [...prev, notificationId]
        );
    };

    const deleteSelectedNotifications = (): void => {
        setNotifications(prev =>
            prev.filter(notif => !selectedNotifications.includes(notif.id))
        );
        setSelectedNotifications([]);
        setIsSelectionMode(false);
    };
    // Professional notification icon mapping with modern icons
    const getNotificationIcon = (type: string, customIcon?: string): string => {
        if (customIcon) return customIcon;

        const iconMap: Record<string, string> = {
            follow: 'person-add',
            like: 'favorite',
            comment: 'chat-bubble-outline',
            transaction: 'account-balance-wallet',
            agent: 'storefront',
            achievement: 'emoji-events',
            system: 'settings',
            promotion: 'local-offer',
            security: 'security',
            default: 'notifications'
        };

        return iconMap[type] || iconMap.default;
    };

    // Professional color scheme with semantic meaning
    const getNotificationColor = (type: string): string => {
        const colorMap: Record<string, string> = {
            follow: '#10B981',      // Green - Growth/Connection
            like: '#EF4444',        // Red - Engagement
            comment: '#3B82F6',     // Blue - Communication
            transaction: '#6366F1', // Indigo - Financial
            system: '#6B7280',      // Gray - System/Info
            promotion: '#F59E0B',   // Amber - Promotional
            security: '#DC2626',    // Red - Security/Alert
            agent: '#8B5CF6',       // Purple - Business
            achievement: '#059669', // Emerald - Success
            default: '#9CA3AF'      // Gray - Default
        };

        return colorMap[type] || colorMap.default;
    };

    // Enhanced timestamp formatting with better readability
    const formatTimestamp = (timestamp: Date): string => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();

        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        // More precise and user-friendly formatting
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d`;
        if (weeks === 1) return '1w';
        if (weeks < 4) return `${weeks}w`;
        if (months === 1) return '1mo';
        if (months < 12) return `${months}mo`;

        // For older dates, show actual date
        return timestamp.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: timestamp.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    // Optimized grouping with better time boundaries
    const groupNotificationsByTime = (notifications: INotification[]): INotificationGroup => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const groups: INotificationGroup = {
            today: [],
            yesterday: [],
            thisWeek: [],
            older: []
        };

        // Sort notifications by timestamp (newest first) before grouping
        const sortedNotifications = [...notifications].sort((a, b) =>
            b.timestamp.getTime() - a.timestamp.getTime()
        );

        sortedNotifications.forEach(notification => {
            const notificationDate = new Date(notification.timestamp);

            if (notificationDate >= today) {
                groups.today.push(notification);
            } else if (notificationDate >= yesterday) {
                groups.yesterday.push(notification);
            } else if (notificationDate >= weekAgo) {
                groups.thisWeek.push(notification);
            } else {
                groups.older.push(notification);
            }
        });

        return groups;
    };

    // Professional action button with clean design
    const renderActionButton = (notification: INotification) => {
        if (!notification.actionRequired) return null;

        interface ActionConfig {
            text: string;
            icon: string;
            backgroundColor: string;
            textColor: string;
            borderColor?: string;
        }

        const getActionConfig = (): ActionConfig => {
            const actionConfigs: Record<string, ActionConfig> = {
                follow_back: {
                    text: 'Follow Back',
                    icon: 'person-add',
                    backgroundColor: '#10B981',
                    textColor: '#ffffff'
                },
                reply: {
                    text: 'Reply',
                    icon: 'reply',
                    backgroundColor: '#3B82F6',
                    textColor: '#ffffff'
                },
                view_agent: {
                    text: 'View Agent',
                    icon: 'storefront',
                    backgroundColor: '#6366F1',
                    textColor: '#ffffff'
                },
                claim_offer: {
                    text: 'Claim Offer',
                    icon: 'local-offer',
                    backgroundColor: '#F59E0B',
                    textColor: '#ffffff'
                },
                update_app: {
                    text: 'Update',
                    icon: 'system-update',
                    backgroundColor: '#ffffff',
                    textColor: '#374151',
                    borderColor: '#D1D5DB'
                },
                explore_features: {
                    text: 'Explore',
                    icon: 'explore',
                    backgroundColor: '#8B5CF6',
                    textColor: '#ffffff'
                },
                review_security: {
                    text: 'Review',
                    icon: 'security',
                    backgroundColor: '#DC2626',
                    textColor: '#ffffff'
                }
            };

            return actionConfigs[notification.actionType as string] || {
                text: 'View',
                icon: 'visibility',
                backgroundColor: '#6B7280',
                textColor: '#ffffff'
            };
        };

        const actionConfig = getActionConfig();

        return (
            <TouchableOpacity
                className="rounded-lg border overflow-hidden"
                style={{
                    backgroundColor: actionConfig.backgroundColor,
                    borderColor: actionConfig.borderColor || actionConfig.backgroundColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1
                }}
                activeOpacity={0.8}
            >
                <View
                    className="flex-row items-center justify-center"
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        gap: 6
                    }}
                >
                    <MaterialIcons
                        name={actionConfig.icon as any}
                        size={16}
                        color={actionConfig.textColor}
                    />
                    <Text
                        className="font-medium"
                        style={{
                            color: actionConfig.textColor,
                            fontSize: 13,
                            lineHeight: 18
                        }}
                    >
                        {actionConfig.text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Professional notification priority badge
    const renderPriorityBadge = (priority: string) => {
        if (priority !== 'high') return null;

        return (
            <View
                className="absolute bg-red-500 rounded-full items-center justify-center border-2 border-white"
                style={{
                    top: 8,
                    right: 8,
                    width: 24,
                    height: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2
                }}
            >
                <MaterialIcons name="priority-high" size={14} color="white" />
            </View>
        );
    };

    // Professional unread indicator
    const renderUnreadIndicator = (isRead: boolean) => {
        if (isRead) return null;

        return (
            <View
                className="absolute bg-blue-500 rounded-full border-2 border-white"
                style={{
                    top: -2,
                    right: -2,
                    width: 12,
                    height: 12,
                    shadowColor: '#3B82F6',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 2
                }}
            />
        );
    };

    // Professional verification badge
    const renderVerificationBade = (isVerified: boolean) => {
        if (!isVerified) return null;

        return (
            <View
                className="absolute bg-white border border-gray-200 rounded-full items-center justify-center"
                style={{
                    top: -2,
                    right: -2,
                    width: 18,
                    height: 18,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                    elevation: 1
                }}
            >
                <MaterialIcons name="verified" size={12} color="#3B82F6" />
            </View>
        );
    };

    // Professional selection checkbox
    const renderSelectionCheckbox = (isSelected: boolean, onPress: () => void) => {
        return (
            <TouchableOpacity
                className={`
                w-6 h-6 rounded-full border-2 items-center justify-center
                ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}
            `}
                style={{
                    shadowColor: isSelected ? '#3B82F6' : '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: isSelected ? 0.2 : 0.05,
                    shadowRadius: 2,
                    elevation: isSelected ? 2 : 1
                }}
                onPress={onPress}
                activeOpacity={0.8}
            >
                {isSelected && (
                    <MaterialIcons name="check" size={14} color="white" />
                )}
            </TouchableOpacity>
        );
    };


    const renderNotificationCard = ({ item, index }: { item: INotification; index: number }) => {
        const isTransaction = item.type === 'transaction';
        const isPromotion = item.type === 'promotion';
        const isAchievement = item.type === 'achievement';
        const hasSocialContent = (item.type === 'like' || item.type === 'comment') && item.postImage;

        return (
            <Animated.View
                style={[
                    {
                        opacity: fadeAnim,
                        transform: [
                            {
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, index * 2],
                                })
                            }
                        ],
                    },
                    {
                        marginBottom: 12,
                        shadowColor: selectedNotifications.includes(item.id) ? colors.accent : '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: selectedNotifications.includes(item.id) ? 0.15 : 0.08,
                        shadowRadius: selectedNotifications.includes(item.id) ? 8 : 4,
                        elevation: selectedNotifications.includes(item.id) ? 4 : 2,
                    }
                ]}
                className={`
                bg-white rounded-2xl overflow-hidden
                ${!item.isRead ? 'border-l-4 border-l-primary' : ''}
                ${selectedNotifications.includes(item.id) ? 'border-accent' : ''}
            `}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (isSelectionMode) {
                            toggleNotificationSelection(item.id);
                        } else {
                            markAsRead(item.id);
                        }
                    }}
                    onLongPress={() => {
                        if (!isSelectionMode) {
                            setIsSelectionMode(true);
                            toggleNotificationSelection(item.id);
                        }
                    }}
                    activeOpacity={0.7}
                    style={{ padding: 16 }}
                >
                    {/* Selection Checkbox */}
                    {isSelectionMode && (
                        <View
                            className="absolute z-10"
                            style={{ top: 12, right: 12 }}
                        >
                            {renderSelectionCheckbox(
                                selectedNotifications.includes(item.id),
                                () => toggleNotificationSelection(item.id)
                            )}
                        </View>
                    )}

                    {/* Notification Content */}
                    <View className="flex-row" style={{ gap: 12 }}>
                        {/* Icon/Avatar */}
                        <View className="relative">
                            {'avatar' in item ? (
                                <View className="relative">
                                    <Image
                                        source={{ uri: item.avatar }}
                                        className="w-12 h-12 rounded-full border border-gray-100"
                                        style={{ backgroundColor: '#f8fafc' }}
                                    />
                                    {'userVerified' in item && item.userVerified && (
                                        <View
                                            className="absolute bg-white rounded-full items-center justify-center"
                                            style={{
                                                top: -2,
                                                right: -2,
                                                width: 16,
                                                height: 16,
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 2,
                                                elevation: 2
                                            }}
                                        >
                                            <MaterialIcons name="verified" size={10} color={colors.accent} />
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center"
                                    style={{ 
                                        backgroundColor: getNotificationColor(item.type),
                                        shadowColor: getNotificationColor(item.type),
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 4,
                                        elevation: 3
                                    }}
                                >
                                    <MaterialIcons
                                        name={getNotificationIcon(item.type, 'icon' in item ? item.icon : undefined) as any}
                                        size={20}
                                        color={colors.white}
                                    />
                                </View>
                            )}

                            {/* Unread Indicator */}
                            {!item.isRead && (
                                <View
                                    className="absolute bg-primary rounded-full border-2 border-white"
                                    style={{
                                        top: -1,
                                        right: -1,
                                        width: 12,
                                        height: 12,
                                        shadowColor: colors.primary,
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        elevation: 2
                                    }}
                                />
                            )}
                        </View>

                        {/* Main Content */}
                        <View className="flex-1">
                            {/* Header */}
                            <View
                                className="flex-row justify-between items-start"
                                style={{ marginBottom: 6 }}
                            >
                                <Text
                                    className={`
                                    text-base flex-1 
                                    ${!item.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}
                                `}
                                    style={{
                                        lineHeight: 22,
                                        marginRight: 12
                                    }}
                                    numberOfLines={2}
                                >
                                    {item.title}
                                </Text>

                                <Text
                                    className="text-xs text-gray-500 font-medium"
                                    style={{ lineHeight: 16 }}
                                >
                                    {formatTimestamp(item.timestamp)}
                                </Text>
                            </View>

                            {/* Message */}
                            <Text
                                className="text-sm text-gray-600"
                                style={{
                                    lineHeight: 20,
                                    marginBottom: 12
                                }}
                                numberOfLines={2}
                            >
                                {item.message}
                            </Text>

                            {/* Transaction Info */}
                            {isTransaction && (
                                <View
                                    className="bg-gray-50 rounded-xl flex-row justify-between items-center"
                                    style={{
                                        padding: 12,
                                        marginBottom: 12,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1
                                    }}
                                >
                                    <Text
                                        className={`
                                        text-base font-semibold
                                        ${item.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'}
                                    `}
                                        style={{ lineHeight: 22 }}
                                    >
                                        {item.transactionType === 'credit' ? '+' : '-'}GH₵ {item.amount.toFixed(2)}
                                    </Text>
                                    <Text
                                        className="text-xs text-gray-500 font-medium"
                                        style={{ lineHeight: 16 }}
                                    >
                                        ID: {item.transactionId}
                                    </Text>
                                </View>
                            )}

                            {/* Promotion Info */}
                            {isPromotion && item.discount && (
                                <View
                                    className="flex-row items-center"
                                    style={{
                                        marginBottom: 12,
                                        gap: 8
                                    }}
                                >
                                    <View
                                        className="bg-primary rounded-lg items-center justify-center"
                                        style={{
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                            shadowColor: colors.primary,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 4,
                                            elevation: 2
                                        }}
                                    >
                                        <Text
                                            className="text-xs text-white font-bold"
                                            style={{ lineHeight: 16 }}
                                        >
                                            {item.discount} OFF
                                        </Text>
                                    </View>
                                    <Text
                                        className="text-xs text-gray-500 flex-1"
                                        style={{ lineHeight: 16 }}
                                    >
                                        Valid until {item.validUntil}
                                    </Text>
                                </View>
                            )}

                            {/* Achievement Info */}
                            {isAchievement && 'achievementName' in item && (
                                <View
                                    className="bg-primary/5 rounded-xl"
                                    style={{
                                        padding: 12,
                                        marginBottom: 12,
                                        shadowColor: colors.primary,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        elevation: 1
                                    }}
                                >
                                    <Text
                                        className="text-sm font-semibold text-gray-900"
                                        style={{
                                            lineHeight: 20,
                                            marginBottom: 4
                                        }}
                                    >
                                        {item.achievementName}
                                    </Text>
                                    <Text
                                        className="text-xs text-primary font-medium"
                                        style={{ lineHeight: 16 }}
                                    >
                                        +{item.rewardPoints} points earned
                                    </Text>
                                </View>
                            )}

                            {/* Social Content Preview */}
                            {hasSocialContent && (
                                <View
                                    className="bg-gray-50 rounded-xl flex-row items-center"
                                    style={{
                                        padding: 8,
                                        marginBottom: 12,
                                        gap: 8,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.postImage }}
                                        className="rounded-lg"
                                        style={{
                                            width: 32,
                                            height: 32,
                                            backgroundColor: '#f8fafc'
                                        }}
                                    />
                                    {item.postTitle && (
                                        <Text
                                            className="text-xs text-gray-600 flex-1"
                                            style={{ lineHeight: 16 }}
                                            numberOfLines={1}
                                        >
                                            {item.postTitle}
                                        </Text>
                                    )}
                                </View>
                            )}

                            {/* Action Button */}
                            <View className="flex-row justify-end">
                                {renderActionButton(item)}
                            </View>
                        </View>
                    </View>

                    {/* Priority Indicator */}
                    {item.priority === 'high' && (
                        <View
                            className="absolute"
                            style={{ top: 8, right: 8 }}
                        >
                            <View
                                className="bg-red-500 rounded-full items-center justify-center"
                                style={{ 
                                    width: 20, 
                                    height: 20,
                                    shadowColor: colors.error,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 2
                                }}
                            >
                                <MaterialIcons name="priority-high" size={12} color={colors.white} />
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

// Update your renderGroupedNotifications function
const renderGroupedNotifications = () => {
    // Check if filteredNotifications is empty
    if (filteredNotifications.length === 0) {
        return (
            <View className="flex-1 items-center justify-center px-6 py-16">
                <LinearGradient
                    colors={colors.gradient.light}
                    className="rounded-3xl p-12 items-center w-full"
                >
                    <MaterialIcons name="notifications-none" size={80} color={colors.gray.medium} />
                    <Text className="text-2xl font-bold text-gray-900 mt-6 mb-2">No notifications</Text>
                    <Text className="text-base text-gray-500 text-center leading-6">
                        {selectedFilter === 'all' 
                            ? "You're all caught up! New notifications will appear here."
                            : `No ${selectedFilter} notifications found.`}
                    </Text>
                </LinearGradient>
            </View>
        );
    }

    // Group the filtered notifications
    const groups = groupNotificationsByTime(filteredNotifications);
    
    // Create sections only for groups that have data
    const sections = [
        { title: 'Today', data: groups.today },
        { title: 'Yesterday', data: groups.yesterday },
        { title: 'This Week', data: groups.thisWeek },
        { title: 'Older', data: groups.older },
    ].filter(section => section.data.length > 0);

    // If all sections are empty (shouldn't happen but just in case)
    if (sections.length === 0) {
        return (
            <View className="flex-1 items-center justify-center px-6 py-16">
                <LinearGradient
                    colors={colors.gradient.light}
                    className="rounded-3xl p-12 items-center w-full"
                >
                    <MaterialIcons name="notifications-none" size={80} color={colors.gray.medium} />
                    <Text className="text-2xl font-bold text-gray-900 mt-6 mb-2">No notifications</Text>
                    <Text className="text-base text-gray-500 text-center leading-6">
                        {selectedFilter === 'all' 
                            ? "You're all caught up! New notifications will appear here."
                            : `No ${selectedFilter} notifications found.`}
                    </Text>
                </LinearGradient>
            </View>
        );
    }

    return (
        <FlatList
            data={sections}
            renderItem={({ item: section }) => (
                <View className="mb-6">
                    <View className="flex-row items-center justify-between mb-3 px-6">
                        <Text className="text-lg font-bold text-gray-900">{section.title}</Text>
                        <View className="bg-accent/10 rounded-full px-3 py-1.5">
                            <Text className="text-xs text-accent font-bold">{section.data.length}</Text>
                        </View>
                    </View>
                    <View className="px-6">
                        {section.data.map((item) => (
                            <View key={item.id} style={{ marginBottom: 12 }}>
                                {renderNotificationCard({ item, index: 0 })}
                            </View>
                        ))}
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[colors.primary]}
                    tintColor={colors.primary}
                />
            }
        />
    );
};

const renderFilters = () => (
    <View className="bg-white mb-3 border-b border-gray-100">
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-4"
            contentContainerStyle={{
                paddingHorizontal: 16,
                alignItems: 'center',
                paddingVertical: 0,
            }}
            style={{
                flexGrow: 0,
            }}
        >
            {filterOptions.map((filter, index) => (
                <TouchableOpacity
                    key={filter.key}
                    style={[
                        {
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            borderRadius: 16,
                            marginRight: 8,
                            marginLeft: index === 0 ? 0 : 0,
                            minHeight: 36,
                            height: 32,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            flexDirection: 'row',
                            // Solid backgrounds like MapHeader
                            backgroundColor: selectedFilter === filter.key 
                                ? colors.primary 
                                : '#FFFFFF',
                            borderColor: selectedFilter === filter.key 
                                ? colors.primary 
                                : 'rgba(0, 0, 0, 0.08)',
                            // Enhanced shadows
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: selectedFilter === filter.key ? 6 : 4,
                            },
                            shadowOpacity: selectedFilter === filter.key ? 0.25 : 0.15,
                            shadowRadius: selectedFilter === filter.key ? 12 : 8,
                            elevation: selectedFilter === filter.key ? 12 : 6,
                        },
                        // Add glow effect for selected state
                        selectedFilter === filter.key && {
                            shadowColor: colors.primary,
                            shadowOpacity: 0.3,
                        }
                    ]}
                    onPress={() => setSelectedFilter(filter.key)}
                    activeOpacity={0.8}
                >
                    <View className="flex-row items-center justify-center" style={{ gap: 6 }}>
                        <MaterialIcons
                            name={filter.icon as any}
                            size={16}
                            color={selectedFilter === filter.key ? colors.white : colors.text.secondary}
                        />
                        <Typography
                            style={{
                                color: selectedFilter === filter.key ? colors.white : colors.secondary,
                                fontSize: 14,
                                // fontWeight: '700',
                                letterSpacing: 0.2,
                                lineHeight: 16,
                                textAlign: 'center',
                            }}
                            numberOfLines={1}
                        >
                            {filter.label}
                        </Typography>
                        {filter.key === 'unread' && (
                            <View
                                className={`
                                    rounded-full min-w-[20px] h-5 px-1.5 
                                    items-center justify-center
                                    ${selectedFilter === filter.key
                                        ? 'bg-white'
                                        : 'bg-red-500'
                                    }
                                `}
                                style={{ marginLeft: 2 }} 
                            > 
                                <Typography
                                size={10}
                                    style={{
                                        color: selectedFilter === filter.key ? colors.primary : colors.white,
                                        fontSize: 11,
                                        // fontWeight: 'bold',
                                        lineHeight: 16,
                                    }}
                                >
                                    {notifications.filter(n => !n.isRead).length}
                                </Typography>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);
    
    const renderHeader = () => (
        <Animated.View
            style={{ transform: [{ scale: headerScaleAnim }] }}
            className="shadow-lg shadow-black/10"
        >
            <LinearGradient
                colors={colors.gradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="pb-4"
            >
                <Header
                    title="Notifications"
                    leftIcon={{
                        name: 'chevron-left',
                        onPress: () => navigation.goBack(),
                        color: colors.secondary
                    }}
                    rightIcons={
                        isSelectionMode
                            ? [
                                {
                                    name: 'delete',
                                    onPress: deleteSelectedNotifications,
                                    color: colors.error
                                },
                                {
                                    name: 'close',
                                    onPress: toggleSelectionMode,
                                    color: colors.secondary
                                }
                            ]
                            : [ 
                                {
                                    name: 'done-all',
                                    onPress: markAllAsRead,
                                    color: colors.secondary
                                },
                                {
                                    name: 'checklist',
                                    onPress: toggleSelectionMode,
                                    color: colors.secondary
                                }
                            ]
                    }
                    animatedValue={headerScaleAnim}
                    barStyle="dark-content"
                    withShadow={true}
                />


                {/* Stats row */}
                <View className="flex-row justify-between p-4" style={{ gap: 10 }}>
                    <View className="flex-1 bg-white/10 rounded-xl p-3 items-center">
                        <Text className="text-lg font-bold text-secondary mb-0.5">
                            {notifications.length}
                        </Text>
                        <Text className="text-xs text-secondary font-medium">Total</Text>
                    </View>
                    <View className="flex-1 bg-white/10 rounded-xl p-3 items-center">
                        <Text className="text-lg font-bold text-secondary mb-0.5">
                            {notifications.filter(n => !n.isRead).length}
                        </Text>
                        <Text className="text-xs text-secondary font-medium">Unread</Text>
                    </View>
                    <View className="flex-1 bg-white/10 rounded-xl p-3 items-center">
                        <Text className="text-lg font-bold text-secondary mb-0.5">
                            {notifications.filter(n => n.actionRequired).length}
                        </Text>
                        <Text className="text-xs text-secondary font-medium">Actions</Text>
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            {renderHeader()}

            <View className="flex-1">
                {renderFilters()}
                {renderGroupedNotifications()}
            </View>
        </View>
    );
};

export default NotificationsScreen;