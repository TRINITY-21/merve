// components/ProfileHeader.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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



        </LinearGradient>
    );
};