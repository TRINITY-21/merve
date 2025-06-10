import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { ProductCard } from '../compnents/ProductCard';

interface MarketplaceData {
    monthlyStats: {
        productsViewed: number;
        inquiriesMade: number;
        favoriteProducts: number;
        purchases: number;
    };
    recentActivity: Array<{
        id: string;
        title: string;
        description: string;
        time: string;
        status: string;
    }>;
    recommendedProducts: Array<{
        id: string;
        [key: string]: any;
    }>;
}

interface MarketplaceTabProps {
    dummyMarketplaceData: MarketplaceData;
    navigation: any;
    fadeAnim: SharedValue<number>;
    slideAnim: SharedValue<number>;
    getStatusColor: (status: string) => string;
}

export const MarketplaceTab: React.FC<MarketplaceTabProps> = ({
    dummyMarketplaceData,
    navigation,
    fadeAnim,
    slideAnim,
    getStatusColor
}) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
            transform: [
                { translateY: slideAnim.value },
                { scale: 1 }
            ]
        };
    });

    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Monthly Overview */}
            <Animated.View style={[animatedStyle, { marginBottom: 32 }]}>
                <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0, marginBottom: 10 }}>
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
                    <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0 }}>
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
                        <Typography variant="semibold" size={12} style={{ color: colors.white, letterSpacing: 0 }}>
                            Manage
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
                                    <Typography variant="regular" size={16} style={{ color: colors.text.primary, marginBottom: 4 }}>
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
                                        <Typography variant="bold" size={8} style={{ color: colors.white }}>
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
                    <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0 }}>
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

               <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ gap: 16, paddingRight: 16 }}
>
    {dummyMarketplaceData.recommendedProducts.map((item) => (
        <ProductCard
            key={item.id}
            product={item as any}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        />
    ))}
</ScrollView>
            </Animated.View>
        </ScrollView>
    );
};