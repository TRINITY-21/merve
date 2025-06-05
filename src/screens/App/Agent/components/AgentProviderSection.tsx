// ProvidersSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';

const { width: screenWidth } = Dimensions.get('window');

interface ProvidersSectionProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export const ProvidersSection: React.FC<ProvidersSectionProps> = ({
  fadeAnim,
  slideAnim
}) => (
  <Animated.View
    className="px-4 mb-4 mt-4"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
      Supported Providers
    </Text>
    <View className="flex-row flex-wrap justify-between gap-2.5 mt-4">
      <View className="rounded-2xl overflow-hidden shadow-sm shadow-black/15 elevation-8" style={{ width: (screenWidth - 80) / 2 }}>
        <LinearGradient colors={[colors.vendor.mtn, '#FFB300']} className="p-4.5 items-center">
          <MaterialIcons name="phone-android" size={28} color={colors.white} />
          <Text
            className="text-base font-black mt-2 mb-1 text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            MTN
          </Text>
          <Text className="text-xs text-white opacity-95 text-center font-semibold">
            Mobile Money
          </Text>
        </LinearGradient>
      </View>

      <View className="rounded-2xl overflow-hidden shadow-sm shadow-black/15 elevation-8" style={{ width: (screenWidth - 80) / 2 }}>
        <LinearGradient colors={[colors.vendor.vodafone, '#B71C1C']} className="p-4.5 items-center">
          <MaterialIcons name="phone-android" size={28} color={colors.white} />
          <Text
            className="text-base font-black mt-2 mb-1 text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            Vodafone
          </Text>
          <Text className="text-xs text-white opacity-95 text-center font-semibold">
            Mobile Money
          </Text>
        </LinearGradient>
      </View>

      <View className="rounded-2xl overflow-hidden shadow-sm shadow-black/15 elevation-8" style={{ width: (screenWidth - 80) / 2 }}>
        <LinearGradient colors={colors.gradient.warm} className="p-4.5 items-center">
          <MaterialIcons name="phone-android" size={28} color={colors.white} />
          <Text
            className="text-base font-black mt-2 mb-1 text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            AirtelTigo
          </Text>
          <Text className="text-xs text-white opacity-95 text-center font-semibold">
            Mobile Services
          </Text>
        </LinearGradient>
      </View>

      <View className="rounded-2xl overflow-hidden shadow-sm shadow-black/15 elevation-8" style={{ width: (screenWidth - 80) / 2 }}>
        <LinearGradient colors={colors.gradient.secondary} className="p-4.5 items-center">
          <MaterialIcons name="phone-android" size={28} color={colors.white} />
          <Text
            className="text-base font-black mt-2 mb-1 text-white"
            style={{ textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 }}
          >
            Others
          </Text>
          <Text className="text-xs text-white opacity-95 text-center font-semibold">
            Mobile Services
          </Text>
        </LinearGradient>
      </View>
    </View>
  </Animated.View>
);