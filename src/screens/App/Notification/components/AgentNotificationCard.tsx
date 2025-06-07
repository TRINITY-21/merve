// components/notifications/AgentNotificationCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Animated as RNAnimated, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';


export interface RequestData {
  service: string;
  amount: string;
  location: string;
  distance: string;
  customerName: string;
  requestTime: string;
}

interface AgentNotificationCardProps {
  visible: boolean;
  requestData: RequestData | null;
  onAccept: () => void;
  onDecline: () => void;
  autoDeclineSeconds?: number;
  gradientColors?: string[];
  style?: any;
}

export const AgentNotificationCard: React.FC<AgentNotificationCardProps> = ({
  visible,
  requestData,
  onAccept,
  onDecline,
  autoDeclineSeconds = 15,
  gradientColors = colors.gradient.primary,
  style
}) => {
  const slideAnim = useRef(new RNAnimated.Value(-400)).current;
  const progressAnim = useRef(new RNAnimated.Value(1)).current;
  const [timeLeft, setTimeLeft] = useState(autoDeclineSeconds);

  useEffect(() => {
    if (visible) {
      // Reset timer and progress when card becomes visible
      setTimeLeft(autoDeclineSeconds);
      progressAnim.setValue(1);

      // Slide in animation
      RNAnimated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }).start();

      // Start countdown timer
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onDecline(); // Auto-decline when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Start progress bar animation
      RNAnimated.timing(progressAnim, {
        toValue: 0,
        duration: autoDeclineSeconds * 1000,
        useNativeDriver: false,
      }).start();

      return () => clearInterval(interval);
    } else {
      // Slide out animation - move further up to ensure it's completely hidden
      RNAnimated.spring(slideAnim, {
        toValue: -400,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();

      // Reset progress when hiding
      progressAnim.setValue(1);
    }
  }, [visible, autoDeclineSeconds]);

  // Don't render anything when not visible to prevent UI glitches
  if (!visible && !requestData) return null;

  return (
    <RNAnimated.View
      className="absolute top-0 left-4 right-4 z-50"
      style={[
        {
          transform: [{ translateY: slideAnim }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        },
        style
      ]}
    >
      <View className={`bg-white rounded-2xl overflow-hidden ${Platform.OS === 'ios' ? 'mt-12' : 'mt-8'}`}>
        {/* Header with gradient */}
        <LinearGradient colors={colors.gradient.primary} className="px-4 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 p-3">
              <View className="w-8 h-8 rounded-full bg-white/30 items-center justify-center mr-3">
                <MaterialIcons name="notifications-active" size={18} color="white" />
              </View>
              <View className="flex-1">
                <Typography variant="bold" size={16} className="text-white">
                  New Cash Request
                </Typography>
                <Typography variant="medium" size={12} className="text-white/80">
                  {requestData?.requestTime}
                </Typography>
              </View>
            </View>
            <View className="bg-red-500 px-2 py-1 rounded-md mr-4">
              <Typography variant="bold" size={9} className="text-white">
                URGENT
              </Typography>
            </View>
          </View>
        </LinearGradient>

        {/* Content */}
        <View className="p-4">
          {/* Customer info */}
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3">
              <MaterialIcons name="person" size={24} color={colors.primary} />
            </View>
            <View className="flex-1">
              <Typography variant="bold" size={16} className="text-gray-900 mb-1">
                {requestData?.customerName}
              </Typography>
              <View className="flex-row items-center">
                <MaterialIcons name="location-on" size={14} color={colors.secondary} />
                <Typography variant="medium" size={13} className="text-gray-600 ml-1">
                  {requestData?.distance}
                </Typography>
              </View>
            </View>
          </View>

          {/* Details */}
          <View className="bg-gray-50 rounded-xl p-3 mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Typography variant="medium" size={14} className="text-gray-600">
                Service
              </Typography>
              <Typography variant="semibold" size={14} className="text-gray-900">
                {requestData?.service}
              </Typography>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Typography variant="medium" size={14} className="text-gray-600">
                Amount
              </Typography>
              <Typography variant="bold" size={16} className="text-green-600">
                GHS {requestData?.amount}
              </Typography>
            </View>
            <View className="flex-row justify-between items-center">
              <Typography variant="medium" size={14} className="text-gray-600">
                Location
              </Typography>
              <Typography variant="semibold" size={14} className="text-gray-900 flex-1 text-right ml-2">
                {requestData?.location}
              </Typography>
            </View>
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-3 mb-3">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3 rounded-xl border border-gray-200 bg-gray-50"
              onPress={onDecline}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={18} color="#EF4444" />
              <Typography variant="semibold" size={14} className="text-gray-700 ml-1">
                Decline
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center py-3 rounded-xl bg-primary"
              onPress={onAccept}
              activeOpacity={0.8}
              style={{
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <MaterialIcons name="check" size={18} color="white" />
              <Typography variant="bold" size={14} className="text-white ml-1">
                Accept
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Countdown */}
          <View className="items-center">
            <Typography variant="medium" size={11} className="text-gray-500 text-center mb-2">
              Auto-decline in {timeLeft}s
            </Typography>

            {/* Progress Bar */}
            <View className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <RNAnimated.View
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </RNAnimated.View>
  );
};