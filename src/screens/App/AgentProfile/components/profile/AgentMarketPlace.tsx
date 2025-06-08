// MarketplaceSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IMarketplaceData } from '../../../../../types/agentProfileTypes';

interface MarketplaceSectionProps {
  marketplaceData: IMarketplaceData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  navigation: any;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  marketplaceData,
  fadeAnim,
  slideAnim,
  navigation
}) => (
  <Animated.View
    className="px-4 mb-5"
    style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
  >
    <View className="flex-row justify-between items-center py-2 mb-4">
      <Text className="text-xl font-black pr-2.5" style={{ color: colors.text.primary }}>
        Marketplace Analytics
      </Text>
      <TouchableOpacity
        className="flex-row items-center px-4 py-2.5 rounded-2xl gap-2 shadow-lg"
        style={{ backgroundColor: colors.primary }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AgentShopDashboardScreen')}
      >
        <MaterialIcons name="dashboard" size={18} color={colors.white} />
        <Text className="text-sm font-black" style={{ color: colors.white }}>
          Dashboard
        </Text>
      </TouchableOpacity>
    </View>

    {/* Monthly Overview */}
    <View className="mb-6">
      <LinearGradient
        colors={[colors.primary, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6 shadow-xl"
      >
        <Text className="text-xl font-black mb-5 text-white">
          This Month's Performance
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <View className="w-5/12 items-center mb-6">
            <View className="bg-white/20 p-3 rounded-2xl mb-3">
              <MaterialIcons name="inventory" size={28} color={colors.white} />
            </View>
            <Text className="text-3xl font-black mb-1 text-white">
              {marketplaceData.monthlyStats.activeProducts}
            </Text>
            <Text className="text-sm font-bold text-white/80">
              Active Products
            </Text>
          </View>
          <View className="w-5/12 items-center mb-6">
            <View className="bg-white/20 p-3 rounded-2xl mb-3">
              <MaterialIcons name="visibility" size={28} color={colors.white} />
            </View>
            <Text className="text-3xl font-black mb-1 text-white">
              {marketplaceData.monthlyStats.totalViews}
            </Text>
            <Text className="text-sm font-bold text-white/80">
              Total Views
            </Text>
          </View>
          <View className="w-5/12 items-center">
            <View className="bg-white/20 p-3 rounded-2xl mb-3">
              <MaterialIcons name="question-answer" size={28} color={colors.white} />
            </View>
            <Text className="text-3xl font-black mb-1 text-white">
              {marketplaceData.monthlyStats.totalInquiries}
            </Text>
            <Text className="text-sm font-bold text-white/80">
              Inquiries
            </Text>
          </View>
          <View className="w-5/12 items-center">
            <View className="bg-white/20 p-3 rounded-2xl mb-3">
              <MaterialIcons name="trending-up" size={28} color={colors.white} />
            </View>
            <Text className="text-3xl font-black mb-1 text-white">
              +{marketplaceData.monthlyStats.monthlyGrowth}%
            </Text>
            <Text className="text-sm font-bold text-white/80">
              Growth
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>

    {/* Recent Inquiries */}
    <View className="bg-white rounded-3xl p-5 shadow-xl">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-black" style={{ color: colors.text.primary }}>
          Recent Product Inquiries
        </Text>
        <TouchableOpacity
          className="px-4 py-2 rounded-2xl"
          style={{ backgroundColor: colors.accent }}
          activeOpacity={0.8}
        >
          <Text className="text-sm font-bold" style={{ color: colors.primary }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-4">
        {marketplaceData.recentInquiries.map((inquiry) => (
          <TouchableOpacity
            key={inquiry.id}
            className="bg-gray-50 rounded-2xl p-4 border-l-4"
            style={{ borderLeftColor: colors.primary }}
            activeOpacity={0.8}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-base font-black mb-1" style={{ color: colors.text.primary }}>
                  {inquiry.customerName}
                </Text>
                <Text className="text-sm font-semibold" style={{ color: colors.text.secondary }}>
                  {inquiry.productTitle}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm mb-1.5 font-medium" style={{ color: colors.text.secondary }}>
                  {inquiry.time}
                </Text>
                <View
                  className="px-3 py-1.5 rounded-2xl"
                  style={{
                    backgroundColor:
                      inquiry.status === 'unread' ? colors.error :
                      inquiry.status === 'read' ? colors.warning :
                      colors.success
                  }}
                >
                  <Text className="text-xs font-black text-white">
                    {inquiry.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              className="text-sm leading-5 font-medium"
              style={{ color: colors.text.primary }}
              numberOfLines={2}
            >
              {inquiry.message}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Animated.View>
);
