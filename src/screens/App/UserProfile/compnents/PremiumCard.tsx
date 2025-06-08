// Premium Upgrade Card Component
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Button } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';

interface PremiumUpgradeCardProps {
    onUpgradePress: () => void;
    fadeAnim?: SharedValue<number>;
}

export const PremiumUpgradeCard: React.FC<PremiumUpgradeCardProps> = ({
    onUpgradePress,
    fadeAnim
}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: fadeAnim?.value ?? 1
    }));

    return (
        <Animated.View
            style={animatedStyle}
            className="mx-0 mb-6"
        >
            <View className="rounded-2xl overflow-hidden shadow-xl bg-white">
                {/* Header with gradient */}
                <LinearGradient
                    colors={[colors.secondary, colors.primary]}
                    className="px-6 pt-6 pb-4 relative"
                >
                    {/* Background pattern */}
                    <View className="absolute top-0 right-0 opacity-10">
                        <MaterialIcons name="auto-awesome" size={120} color="white" />
                    </View>

                    <View className="items-center relative z-10">
                        <View className="bg-white/20 p-3 rounded-full m-3">
                            <MaterialIcons name="workspace-premium" size={28} color="#fbbf24" />
                        </View>
                        <Text className="text-2xl font-bold text-white mb-2">
                            Go Premium
                        </Text>
                        <Text className="text-white text-center text-sm leading-5 mb-2">
                            Unlock advanced features, detailed analytics, and priority support
                        </Text>
                    </View>
                </LinearGradient>

                {/* Features list */}
                <View className="p-6 bg-white shadow-lg">
                    <View className="space-y-3 mb-6">
                        <FeatureItem icon="analytics" text="Advanced Analytics Dashboard" />
                        <FeatureItem icon="security" text="Enhanced Security Features" />
                        <FeatureItem icon="support-agent" text="24/7 Priority Support" />
                        <FeatureItem icon="cloud-sync" text="Unlimited Cloud Storage" />
                    </View>

                    {/* CTA Button */}
                    <Button
                        title='Become an Agent Now'
                        icon="diamond"
                        size="small"
                        className="rounded-xl overflow-hidden shadow-lg"
                        style={{ top: 2 }}
                        onPress={onUpgradePress}
                    />

                    {/* Price hint */}
                    <Text className="text-center text-gray-500 text-xs mt-3">
                        Starting from GHS9.99/month
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
};

// Feature Item Component
const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
    <View className="flex-row items-center p-1">
        <View className="w-8 h-8 bg-secondary rounded-full items-center justify-center mr-3">
            <MaterialIcons name={icon as any} size={16} color={colors.white} />
        </View>
        <Text className="text-gray-700 font-medium flex-1">{text}</Text>
    </View>
);
