import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    RefreshControl,
    ScrollView,
    StatusBar,
    Switch,
    TouchableOpacity,
    View
} from 'react-native';
import { Header, Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { IAboutItem, IAccountSection, IExpandedSections, INotificationSettings, IPrivacySettings, IQuickAction, ISectionItem } from '../../../types/userSettingTypes';
import { aboutItems, accountSections, quickActions } from '../../../utils/userProfileDummyData';

// TypeScript interfaces

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');

const UserSettingsScreen: React.FC = () => {
    const navigation = useNavigation();

    // State management with TypeScript
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [expandedSections, setExpandedSections] = useState<IExpandedSections>({});
    const [notificationSettings, setNotificationSettings] = useState<INotificationSettings>({
        pushNotifications: true,
        emailNotifications: false,
        smsNotifications: true,
        transactionAlerts: true,
        socialUpdates: false,
        promotionalOffers: true,
    });
    const [privacySettings, setPrivacySettings] = useState<IPrivacySettings>({
        profileVisibility: true,
        locationSharing: false,
        activityStatus: true,
        contactSync: false,
    });

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-30)).current;
    const profileScaleAnim = useRef(new Animated.Value(0.9)).current;


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
            Animated.spring(profileScaleAnim, {
                toValue: 1,
                tension: 25,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleRefresh = (): void => {
        setRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const toggleSection = (sectionId: string): void => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleItemAction = (item: ISectionItem | IQuickAction | IAboutItem): void => {
        switch (item.action) {
            case 'navigate':
                if ('screen' in item && item.screen) {
                    navigation.navigate(item.screen as never);
                }
                break;
            case 'toggle':
                if ('key' in item && item.key) {
                    if (item.key in notificationSettings) {
                        setNotificationSettings(prev => ({
                            ...prev,
                            [item.key as keyof INotificationSettings]: !prev[item.key as keyof INotificationSettings]
                        }));
                    } else if (item.key in privacySettings) {
                        setPrivacySettings(prev => ({
                            ...prev,
                            [item.key as keyof IPrivacySettings]: !prev[item.key as keyof IPrivacySettings]
                        }));
                    }
                }
                break;
            case 'rate':
                console.log('Rate app');
                break;
            case 'share':
                console.log('Share app');
                break;
            default:
                break;}
    };

    const getToggleValue = (key?: keyof INotificationSettings | keyof IPrivacySettings): boolean => {
        if (!key) return false;
        return notificationSettings[key as keyof INotificationSettings] !== undefined
            ? notificationSettings[key as keyof INotificationSettings]
            : privacySettings[key as keyof IPrivacySettings];
    };

    const renderQuickActions = () => (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
        >
            <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
                {/* Title */}
                <Typography
                    style={{
                        fontSize: 18,
                        fontWeight: '800',
                        color: colors.text.primary,
                        marginBottom: 16,
                        letterSpacing: 0.5,
                    }}
                >
                    Quick Actions
                </Typography>

                {/* Action Grid */}
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: 12, // For modern spacing; Tailwind-style spacing simulation
                    }}
                >
                    {quickActions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            onPress={() => handleItemAction(action)}
                            activeOpacity={0.85}
                            style={{
                                width: (screenWidth - 48) / 2, // 16px padding * 2 + 16px gap
                                borderRadius: 16,
                                overflow: 'hidden',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.06,
                                shadowRadius: 4,
                                elevation: 3,
                                marginBottom: 12,
                            }}
                        >
                            <LinearGradient
                                colors={colors.gradient.light}
                                style={{
                                    padding: 20,
                                    alignItems: 'center',
                                    borderRadius: 16,
                                }}
                            >
                                <View
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 24,
                                        backgroundColor: action.color,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 12,
                                    }}
                                >
                                    <MaterialIcons name={action.icon as any} size={24} color={colors.white} />
                                </View>
                                <Typography
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: colors.text.primary,
                                        textAlign: 'center',
                                        letterSpacing: 0.3,
                                    }}
                                >
                                    {action.title}
                                </Typography>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Animated.View>
    );

    const renderAccountSection = (section: IAccountSection) => {
        const isExpanded = expandedSections[section.id];

        return (
            <Animated.View
                key={section.id}
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
                className="bg-white rounded-2xl mb-4 overflow-hidden shadow-lg elevation-6"
            >
                <TouchableOpacity
                    className="flex-row items-center justify-between p-5"
                    onPress={() => toggleSection(section.id)}
                    activeOpacity={0.8}
                >
                    <View className="flex-row items-center flex-1">
                        <View
                            className="w-10 h-10 rounded-2xl items-center justify-center mr-4"
                            style={{ backgroundColor: section.color }}
                        >
                            <MaterialIcons name={section.icon as any} size={20} color={colors.white} />
                        </View>
                        <Typography className="text-lg font-bold text-gray-900">{section.title}</Typography>
                    </View>
                    <MaterialIcons
                        name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={24}
                        color={colors.text.secondary}
                    />
                </TouchableOpacity>

                {isExpanded && (
                    <Animated.View className="pb-2">
                        {section.items.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                className={`flex-row items-center justify-between px-5 py-4 border-t border-gray-200 ${item.highlight ? 'bg-teal-50' : item.warning ? 'bg-red-50' : ''
                                    }`}
                                onPress={() => handleItemAction(item)}
                                activeOpacity={0.7}
                            >
                                <View className="flex-row items-center flex-1">
                                    <MaterialIcons
                                        name={item.icon as any}
                                        size={20}
                                        color={
                                            item.warning
                                                ? colors.error
                                                : item.highlight
                                                    ? colors.accent
                                                    : colors.text.secondary
                                        }
                                    />
                                    <View className="ml-4 flex-1">
                                        <Typography
                                            className={`text-base font-semibold ${item.warning ? 'text-red-500' : item.highlight ? 'text-teal-500' : 'text-gray-900'
                                                }`}
                                        >
                                            {item.title}
                                        </Typography>
                                        {item.subtitle && (
                                            <Typography className="text-xs text-gray-600 mt-1">{item.subtitle}</Typography>
                                        )}
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    {item.badge && (
                                        <View className="bg-teal-500 px-2 py-1 rounded-2xl">
                                            <Typography className="text-[10px] text-white font-bold">{item.badge}</Typography>
                                        </View>
                                    )}
                                    {item.action === 'toggle' ? (
                                        <Switch
                                            value={getToggleValue(item.key)}
                                            onValueChange={() => handleItemAction(item)}
                                            trackColor={{ false: colors.gray.light, true: colors.primary }}
                                            thumbColor={
                                                getToggleValue(item.key) ? colors.white : colors.gray.medium
                                            }
                                        />
                                    ) : (
                                        <MaterialIcons
                                            name="chevron-right"
                                            size={20}
                                            color={colors.text.secondary}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                )}
            </Animated.View>
        );
    };

    const renderAboutSection = () => (
        <>
            <Typography className="text-xl font-bold text-gray-900 mb-4">About & Legal</Typography>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
                className="bg-white rounded-2xl mb-4 overflow-hidden shadow-lg elevation-6"
            >
                <View className="px-5 pb-2">
                    {aboutItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            className={`flex-row items-center justify-between py-4 ${index < aboutItems.length - 1 ? 'border-b border-gray-200' : ''
                                }`}
                            onPress={() => handleItemAction(item)}
                            activeOpacity={0.7}
                        >
                            <View className="flex-row items-center flex-1">
                                <MaterialIcons name={item.icon as any} size={20} color={colors.text.secondary} />
                                <View className="ml-4 flex-1">
                                    <Typography className="text-base font-semibold text-gray-900">{item.title}</Typography>
                                    {item.subtitle && (
                                        <Typography className="text-xs text-gray-600 mt-1">{item.subtitle}</Typography>
                                    )}
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={20} color={colors.text.secondary} />
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </>
    );

    const renderLogoutSection = () => (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }}
            className="mt-2"
        >
            <TouchableOpacity className="rounded-2xl overflow-hidden shadow-lg elevation-6" activeOpacity={0.8}>
                <LinearGradient colors={colors.gradient.dark} className="flex-row items-center justify-center p-5 gap-3">
                    <MaterialIcons name="logout" size={20} color={colors.white} />
                    <Typography className="text-lg font-bold text-white">Sign Out</Typography>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Header title="User Settings"
                leftIcon={{ name: 'chevron-left', onPress: () => navigation.goBack() }}
                rightIcons={[
                    { name: 'refresh', onPress: () => handleRefresh() },
                ]}
            />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                    />
                }
            >

                {renderQuickActions()}

                <View className="px-6">
                    {accountSections.map(renderAccountSection)}
                    {renderAboutSection()}
                    {renderLogoutSection()}
                </View>
            </ScrollView>
        </View>
    );
};

export default UserSettingsScreen;