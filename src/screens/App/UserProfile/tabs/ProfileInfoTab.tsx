import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { IUser } from '../../../../types/userProfileTypes';
import { ProfessionalCard } from '../compnents/ModernInput';
import { PremiumUpgradeCard } from '../compnents/PremiumCard';

interface ProfileInfoTabProps {
    currentUser: IUser | null;
    navigation: any;
    fadeAnim: SharedValue<number>;
    handleLogout: () => void;
}

export const ProfileInfoTab: React.FC<ProfileInfoTabProps> = ({
    currentUser,
    navigation,
    fadeAnim,
    handleLogout
}) => {
    const animatedStyle = {
        opacity: fadeAnim.value,
        transform: [
            { translateY: 0 },
            { scale: 1 }
        ]
    };

    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View
                style={animatedStyle}
                className="bg-white rounded-2xl p-5 mb-5 shadow-lg"
            >
                <View className="flex-row justify-between items-center mb-5">
                    <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
                        Personal Information
                    </Typography>
                    <View className="flex-row items-center bg-accent px-3 py-1.5 rounded-2xl gap-1 shadow-md">
                        <MaterialIcons name="verified" size={14} color={colors.white} />
                        <Typography variant="bold" size={11} style={{ color: colors.white, letterSpacing: 0.5 }}>
                            Verified
                        </Typography>
                    </View>
                </View>

                <ProfessionalCard
                    label="Full Name"
                    icon="person"
                    value={currentUser?.name || "John Doe"}
                />

                <ProfessionalCard
                    label="Phone Number"
                    icon="phone"
                    value={currentUser?.phone || "+1 (555) 123-4567"}
                    onPress={() => console.log('Call pressed')}
                />

                <ProfessionalCard
                    label="Email Address"
                    icon="email"
                    value={currentUser?.email || "john.doe@example.com"}
                    onPress={() => console.log('Email pressed')}
                />

                <ProfessionalCard
                    label="Location"
                    icon="pin-drop"
                    value="Accra, Ghana"
                />
            </Animated.View>

            <Animated.View
                style={{ opacity: fadeAnim.value }}
                className="rounded-2xl overflow-hidden mb-6 shadow-lg"
            >
                <PremiumUpgradeCard
                    onUpgradePress={() => navigation.navigate('Vendor' as never)}
                    fadeAnim={fadeAnim}
                />
            </Animated.View>

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
};