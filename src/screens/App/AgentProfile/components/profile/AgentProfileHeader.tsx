// AgentProfileHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { JSX } from 'react';
import { Animated, Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

interface AgentProfileHeaderProps {
  agentData: IAgentData;
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
  onInvitePress: () => void;
  headerScaleAnim: Animated.Value;
  renderStars: (rating: number) => JSX.Element[];
  navigation: any;
}

export const AgentProfileHeader: React.FC<AgentProfileHeaderProps> = ({
  agentData,
  isOnline,
  setIsOnline,
  onInvitePress,
  headerScaleAnim,
  renderStars,
  navigation
}) => (
  <Animated.View
    className="shadow-lg shadow-black/30 elevation-8"
    style={{ transform: [{ scale: headerScaleAnim }] }}
  >
    <LinearGradient 
      colors={colors.gradient.primary} 
      className="rounded-b-0"
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }}
    >
      <Header
        title='Agent Profile'
        leftIcon={{
          name: 'chevron-left', 
          onPress: () => navigation.goBack(),
        }}
        rightIcons={[
          { name: 'shop-2', onPress: () => navigation.navigate('AgentShopDashboard') },
          { name: 'event', onPress: () => navigation.navigate('AgentBookingManagement') },
          { name: 'settings', onPress: () => navigation.navigate('AgentSettings') },
        ]}
      />

      <View className="mb-3 px-7">
        <View className="flex-row items-center">
          <View className="relative mr-4">
            <Image
              source={{ uri: agentData.avatar }}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg shadow-black/20 elevation-8"
            />
            {agentData.verified && (
              <View className="absolute -top-1 -right-1 bg-white rounded-2xl p-1 shadow-sm shadow-black/20 elevation-8">
                <MaterialIcons name="verified" size={16} color={colors.accent} />
              </View>
            )}
            <View
              className="absolute bottom-1.5 right-1.5 w-4.5 h-4.5 rounded-full border-3 border-white shadow-sm shadow-black/30 elevation-8"
              style={{ backgroundColor: isOnline ? colors.success : colors.error }}
            />
          </View>

          <View className="flex-1">
            <Text className="text-xl font-extrabold mb-1" style={{ color: colors.secondary }}>
              {agentData.name}
            </Text>
            <Text className="text-sm opacity-85 mb-1 font-medium" style={{ color: colors.secondary }}>
              {agentData.businessName}
            </Text>
            <Text className="text-xs opacity-70 mb-2 font-medium" style={{ color: colors.secondary }}>
              ID: {agentData.agentCode}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="flex-row gap-0.5">
                {renderStars(agentData.statistics.rating)}
              </View>
              <Text className="text-xs opacity-80 font-medium" style={{ color: colors.secondary }}>
                {agentData.statistics.rating} ({agentData.statistics.totalReviews} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* Status Toggle + Action Buttons Row */}
        <View className="flex-row justify-between items-center mt-3 mb-4">
          <View className="flex-row items-center gap-2.5">
            <Text className="text-sm font-bold" style={{ color: colors.secondary }}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: colors.gray.light, true: colors.accent }}
              thumbColor={colors.white}
            />
          </View>

          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity
              className="p-2.5 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              onPress={() => console.log("Pin button pressed")}
              activeOpacity={0.7}
            >
              <MaterialIcons name="push-pin" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2.5 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              onPress={() => navigation.navigate('Chat')} 
              activeOpacity={0.7}
            >
              <MaterialIcons name="phone" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2.5 rounded-full items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Stats */}
        <View
          className="flex-row justify-between rounded-2xl p-3"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
        >
          <TouchableOpacity className="items-center flex-1 border-r border-white/30 pr-1.5 mr-1.5">
            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
              {agentData.statistics.totalBookings}
            </Text>
            <Text className="text-xs opacity-80 font-semibold" style={{ color: colors.secondary }}>
              Bookings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center flex-1 border-r border-white/30 pr-1.5 mr-1.5">
            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
              {agentData.statistics.followers}
            </Text>
            <Text className="text-xs opacity-80 font-semibold" style={{ color: colors.secondary }}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center flex-1 border-r border-white/30 pr-1.5 mr-1.5">
            <Text className="text-base font-extrabold mb-1" style={{ color: colors.secondary }}>
              {agentData.statistics.following}
            </Text>
            <Text className="text-xs opacity-80 font-semibold" style={{ color: colors.secondary }}>
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center flex-1"
            onPress={onInvitePress}
          >
            <MaterialIcons name="person-add" size={20} color={colors.secondary} />
            <Text className="text-xs opacity-80 font-semibold" style={{ color: colors.secondary }}>
              Invite
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  </Animated.View>
);
