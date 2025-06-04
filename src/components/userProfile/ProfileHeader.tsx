
// components/ProfileHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { Header } from '../common';

interface ProfileHeaderProps {
    user: {
        name: string;
        avatar?: string;
    };
    onBack: () => void;
    onSettings: () => void;
    onBookings: () => void;
    bookingsCount: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    user,
    onBack,
    onSettings,
    onBookings,
    bookingsCount
}) => {
    return (
        <LinearGradient
            colors={colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="pb-4"
        >

            <Header title="Profile" withShadow={false}
                leftIcon={{ name: 'chevron-left', onPress: onBack }}
                rightIcons={[
                    { name: 'event', onPress: onBookings },
                    { name: 'settings', onPress: onSettings },

                ]} />

            <View className="pt-0 px-0 pb-5 mb-2">
                <View className="flex-row items-center px-1">
                    <TouchableOpacity className="relative mr-4 shadow-2xl" activeOpacity={0.8}>
                        <Image
                            source={{ uri: user.avatar || 'https://i.pravatar.cc/150?img=39' }}
                            className="w-20 h-20 rounded-full border-2 border-white"
                        />
                        <View className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg" />
                        <TouchableOpacity
                            className="absolute -top-1 -right-1 w-7 h-7 rounded-2xl bg-white items-center justify-center border-2 border-white shadow-lg"
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="verified" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <View className="flex-1 pr-3">
                        <Text className="text-xl font-extrabold text-secondary mb-1 tracking-wide">
                            {user.name}
                        </Text>
                        <Text className="text-sm text-secondary/90 mb-1 font-medium">Mobile Money User</Text>
                        <Text className="text-xs text-secondary/85 mb-4 font-medium">📍 Accra, Ghana</Text>

                        <View className="flex-row justify-between bg-white/15 rounded-2xl p-3 mb-2">
                            <TouchableOpacity className="items-center flex-1 border-r border-white/30 pr-2 mr-2">
                                <Text className="text-base font-extrabold text-secondary mb-1">{bookingsCount}</Text>
                                <Text className="text-[11px] text-secondary/80 font-semibold tracking-wide">Bookings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center flex-1 border-r border-secondary/30 pr-2 mr-2">
                                <Text className="text-base font-extrabold text-secondary mb-1">29.3K</Text>
                                <Text className="text-[11px] text-secondary/80 font-semibold tracking-wide">Followers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center flex-1 border-r border-secondary/30 pr-2 mr-2">
                                <Text className="text-base font-extrabold text-secondary mb-1">340</Text>
                                <Text className="text-[11px] text-secondary/80 font-semibold tracking-wide">Following</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="items-center">
                                <MaterialIcons name="person-add" size={20} color={colors.secondary} />
                                <Text className="text-[11px] text-secondary/80 font-semibold tracking-wide">Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};