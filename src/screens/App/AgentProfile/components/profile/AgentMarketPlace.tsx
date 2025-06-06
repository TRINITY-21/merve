
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
    <View className="flex-row justify-between items-center py-1.5 mb-3">
      <Text className="text-lg font-extrabold pr-2.5" style={{ color: colors.text.primary }}>
        Marketplace Analytics
      </Text>
      <TouchableOpacity
        className="flex-row items-center px-3.5 py-2 rounded-2xl gap-1.5 shadow-sm elevation-4"
        style={{ backgroundColor: colors.primary }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AgentShopDashboardScreen')}
      >
        <MaterialIcons name="dashboard" size={16} color={colors.white} />
        <Text className="text-xs font-extrabold" style={{ color: colors.white }}>
          Dashboard
        </Text>
      </TouchableOpacity>
    </View>

    {/* Monthly Overview */}
    <View className="mb-5">
      <LinearGradient
        colors={colors.gradient.light}
        className="rounded-2xl p-5 shadow-sm shadow-black/8 elevation-6"
      >
        <Text className="text-lg font-extrabold mb-4" style={{ color: colors.text.primary }}>
          This Month's Performance
        </Text>
        <View className="flex-row flex-wrap justify-between mb-5">
          <View className="w-5/12 items-center mb-4">
            <MaterialIcons name="inventory" size={24} color={colors.primary} />
            <Text className="text-2xl font-black mt-2 mb-1" style={{ color: colors.text.primary }}>
              {marketplaceData.monthlyStats.activeProducts}
            </Text>
            <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
              Active Products
            </Text>
          </View>
          <View className="w-5/12 items-center mb-4">
            <MaterialIcons name="visibility" size={24} color={colors.accent} />
            <Text className="text-2xl font-black mt-2 mb-1" style={{ color: colors.text.primary }}>
              {marketplaceData.monthlyStats.totalViews}
            </Text>
            <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
              Total Views
            </Text>
          </View>
          <View className="w-5/12 items-center">
            <MaterialIcons name="question-answer" size={24} color={colors.success} />
            <Text className="text-2xl font-black mt-2 mb-1" style={{ color: colors.text.primary }}>
              {marketplaceData.monthlyStats.totalInquiries}
            </Text>
            <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
              Inquiries
            </Text>
          </View>
          <View className="w-5/12 items-center">
            <MaterialIcons name="trending-up" size={24} color={colors.warning} />
            <Text className="text-2xl font-black mt-2 mb-1" style={{ color: colors.text.primary }}>
              +{marketplaceData.monthlyStats.monthlyGrowth}%
            </Text>
            <Text className="text-xs font-semibold text-center" style={{ color: colors.text.secondary }}>
              Growth
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>

    {/* Recent Inquiries */}
    <View className="bg-white rounded-2xl p-4 mb-5 shadow-sm shadow-black/8 elevation-4">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-extrabold" style={{ color: colors.text.primary }}>
          Recent Product Inquiries
        </Text>
        <TouchableOpacity
          className="px-3 py-1.5 rounded-2xl"
          style={{ backgroundColor: colors.accent }}
          activeOpacity={0.8}
        >
          <Text className="text-xs font-bold" style={{ color: colors.primary }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {marketplaceData.recentInquiries.map((inquiry) => (
          <TouchableOpacity
            key={inquiry.id}
            className="bg-gray-50 rounded-xl p-3.5 border-l-3"
            style={{ borderLeftColor: colors.primary }}
            activeOpacity={0.8}
          >
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-base font-bold mb-0.5" style={{ color: colors.text.primary }}>
                  {inquiry.customerName}
                </Text>
                <Text className="text-xs font-semibold" style={{ color: colors.text.secondary }}>
                  {inquiry.productTitle}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs mb-1 font-medium" style={{ color: colors.text.secondary }}>
                  {inquiry.time}
                </Text>
                <View
                  className="px-2 py-1 rounded-2xl"
                  style={{
                    backgroundColor:
                      inquiry.status === 'unread' ? colors.error :
                      inquiry.status === 'read' ? colors.warning :
                      colors.success
                  }}
                >
                  <Text className="text-xs font-extrabold text-white">
                    {inquiry.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              className="text-xs leading-4 font-medium"
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
