import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';

interface Invite {
    id: string;
    name: string;
    phone: string;
    sentDate: string;
    status: string;
}

interface InvitesTabProps {
    dummyInvites: Invite[];
    navigation: any;
    getStatusColor: (status: string) => string;
}

export const InvitesTab: React.FC<InvitesTabProps> = ({
    dummyInvites,
    navigation,
    getStatusColor
}) => {
    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Invite Stats */}
            <View style={{ marginBottom: 32 }}>
                <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0.5, marginBottom: 10 }}>
                    Invite Statistics
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
                                icon: 'send',
                                color: colors.white,
                                label: 'Total Sent',
                                value: dummyInvites.length,
                            },
                            {
                                icon: 'check-circle',
                                color: colors.white,
                                label: 'Accepted',
                                value: dummyInvites.filter(invite => invite.status === 'accepted').length,
                            },
                            {
                                icon: 'pending',
                                color: colors.white,
                                label: 'Pending',
                                value: dummyInvites.filter(invite => invite.status === 'pending').length,
                            },
                            {
                                icon: 'cancel',
                                color: colors.white,
                                label: 'Declined',
                                value: dummyInvites.filter(invite => invite.status === 'declined').length,
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
            </View>

            {/* Recent Invites */}
            <View style={{ marginBottom: 32 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Typography variant="semibold" size={18} style={{ color: colors.text.primary, letterSpacing: 0 }}>
                        Recent Invites
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
                        <Typography variant="semibold" size={12} style={{ color: colors.text.light, letterSpacing: 0 }}>
                            Manage
                        </Typography>
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 16 }}>
                    {dummyInvites.map((invite) => (
                        <TouchableOpacity
                            key={invite.id}
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Typography variant="semibold" size={16} style={{ color: colors.text.primary, marginBottom: 10 }}>
                                        {invite.name}
                                    </Typography>
                                    <Typography variant="regular" size={14} style={{ color: colors.text.secondary }}>
                                        {invite.phone}
                                    </Typography>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Typography variant="regular" size={14} style={{ color: colors.text.secondary, marginBottom: 8 }}>
                                        {invite.sentDate}
                                    </Typography>
                                    <View
                                        style={{
                                            backgroundColor: getStatusColor(invite.status),
                                            paddingHorizontal: 12,
                                            paddingVertical: 6,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Typography variant="semibold" size={10} style={{ color: colors.white }}>
                                            {invite.status.toUpperCase()}
                                        </Typography>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};