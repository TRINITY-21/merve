
// RecentActivities.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { JSX } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';

interface RecentActivitiesProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
  renderStars: (rating: number) => JSX.Element[];
  getStatusColor: (status: string) => string;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  agentData,
  fadeAnim,
  slideAnim,
  navigation,
  renderStars,
  getStatusColor
}) => (
  <Animated.View
    className="px-4 mb-4"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <View className="flex-row justify-between items-center py-1.5 mb-3">
      <Typography variant="semibold" size={18} className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
        Recent Activities
      </Typography>
      <TouchableOpacity
        className="flex-row items-center gap-1 mt-2"
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Activity')}
      >
        <Typography variant="regular" size={12} className="text-xs font-bold" style={{ color: colors.primary }}>
          View All
        </Typography>
        <MaterialIcons name="chevron-right" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>

    <View className="bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/8 elevation-8">
      {agentData.recentActivities.map((activity) => (
        <TouchableOpacity key={activity.id} className="flex-row p-3.5 border-b border-black/6" activeOpacity={0.8}>
          <View
            className="w-9 h-9 rounded-2xl items-center justify-center mr-3"
            style={{ backgroundColor: colors.accent + '20' }}
          >
            <MaterialIcons
              name={
                activity.type === 'transaction' ? 'swap-horiz' :
                activity.type === 'review' ? 'star' :
                activity.type === 'booking' ? 'event' :
                activity.type === 'follow' ? 'person-add' : 'info'
              }
              size={20}
              color={colors.accent}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row justify-between items-start mb-1">
              <Typography variant="regular" size={14} className="text-base font-bold flex-1 mr-2" style={{ color: colors.text.primary }}>
                {activity.title}
              </Typography>
              <Text className="text-xs font-medium" style={{ color: colors.text.secondary }}>
                {activity.time}
              </Text>
            </View>
            <Typography variant="regular" size={12} className="text-xs mb-1 font-medium" style={{ color: colors.text.secondary }}>
              {activity.type === 'review' ? `Review by ${activity.customer}` :
               activity.type === 'booking' ? `${activity.customer} ${activity.action}` :
               activity.type === 'follow' ? `${activity.customer} ${activity.action}` :
               `Customer: ${activity.customer}`}
            </Typography>
            {activity.amount && (
              <Typography variant="regular" size={14} className="text-sm font-extrabold mb-1" style={{ color: colors.accent }}>
                {activity.amount}
              </Typography>
            )}
            {activity.rating && (
              <View className="flex-row items-center gap-2 mb-1">
                <View className="flex-row gap-0.5">
                  {renderStars(activity.rating)}
                </View>
                <Typography variant="regular" size={12} className="flex-1 text-xs italic font-medium" style={{ color: colors.text.secondary }} numberOfLines={1}>
                  "{activity.comment}"
                </Typography>
              </View>
            )}
            {activity.status && (
              <View className="flex-row items-center gap-1.5">
                <View
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                />
                <Typography variant="regular" size={12}
                  className="text-xs font-bold"
                  style={{ color: getStatusColor(activity.status) }}
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Typography>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </Animated.View>
);
