
// InvitesSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

interface InvitesSectionProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
  onInvitePress: () => void;
  getStatusColor: (status: string) => string;
}

export const InvitesSection: React.FC<InvitesSectionProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  navigation,
  onInvitePress,
  getStatusColor
}) => (
  <Animated.View
    className="px-4 mb-4"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <View className="flex-row justify-between items-center py-1.5 mb-3">
      <Typography variant="semibold" size={18} className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
        Sent Invites
      </Typography>
      <TouchableOpacity
        className="flex-row items-center px-3.5 py-2 rounded-2xl gap-1.5 shadow-sm elevation-8"
        style={{ backgroundColor: colors.primary }}
        onPress={onInvitePress}
        activeOpacity={0.8}
      >
        <Typography variant="regular" size={12} className="" style={{ color: colors.white }}>
          Send
        </Typography>
        <MaterialIcons name="send" size={14} color={colors.white} />
      </TouchableOpacity>
    </View>

    <View className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/8 elevation-8 mb-3">
      {agentData.pendingInvites.map((invite) => (
        <View key={invite.id} className="flex-row justify-between items-center p-4 border-b border-black/6">
          <View className="flex-1">
            <Typography className="text-base font-bold mb-1" style={{ color: colors.text.primary }}>
              {invite.name}
            </Typography>
            <Typography variant='regular' size={12} className="text-xs mb-0.5 font-medium" style={{ color: colors.text.secondary }}>
              {invite.phone}
            </Typography>
            <Typography variant='regular' size={12} className="font-medium" style={{ color: colors.text.secondary }}>
              Sent: {invite.sentDate}
            </Typography>
          </View>
          <View
            className="px-3 py-1.5 rounded-2xl"
            style={{ backgroundColor: getStatusColor(invite.status) + '20' }}
          >
            <Typography
              variant='regular' size={12} className="font-extrabold"
              style={{ color: getStatusColor(invite.status) }}
            >
              {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
            </Typography>
          </View>
        </View>
      ))}
    </View>

    <TouchableOpacity
      className="flex-row items-center gap-1 mt-2"
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Invitations')}
    >
      <Typography variant="regular" size={13} className="text-xs font-bold" style={{ color: colors.primary }}>
        View Invites
      </Typography>
      <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
    </TouchableOpacity>
  </Animated.View>
);
