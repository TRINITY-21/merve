// components/ProfileHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { Header, Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import { useStatusBar } from '../../../../hooks/useStatusBar';

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
    useStatusBar({
        backgroundColor: colors.background,
        barStyle: 'dark-content',
        translucent: false
    });

    return (
        <LinearGradient
            colors={[colors.background, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="pb-2"
        >
            <Header title="Profile" withShadow={false}
                leftIcon={{ name: 'chevron-left', onPress: onBack }}
                rightIcons={[
                    { name: 'event', onPress: onBookings },
                    { name: 'settings', onPress: onSettings },
                ]} />

            <View className="pt-0 pl-5 pr-5 pb-3 mb-1">
                <View className="flex-row items-start">
                    <TouchableOpacity className="relative mr-4 mt-2 shadow-2xl" activeOpacity={0.8}>
                        <Image
                            source={{ uri: user.avatar || 'https://i.pravatar.cc/150?img=9' }}
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
                                {user.name}
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
                        <Typography className="text-base text-secondary mb-0.5" variant="bold" size={16}>{bookingsCount}</Typography>
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
                        {/* <MaterialIcons name="person-add" size={23} color={colors.secondary} />
                        <Typography className="text-md text-secondary/90 tracking-wide" variant="semibold" size={11}>Invite</Typography> */}

                        <MaterialIcons name="person-add" size={ Platform.OS === 'ios' ? 23 : 20} color={colors.secondary} />
                        <Typography className="text-md text-secondary/90 tracking-wide" variant="semibold" size={11}>Invite</Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};