// MarketplaceSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
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
              <Typography variant='semibold' size={18} className="semibold text-center mt-1" style={{ color: colors.text.primary }}>
        Marketplace Analytics
      </Typography>
      <TouchableOpacity
        className="flex-row items-center px-4 py-2.5 rounded-2xl gap-2 shadow-lg"
        style={{ backgroundColor: colors.primary }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AgentShopDashboardScreen')}
      >
        <MaterialIcons name="dashboard" size={12} color={colors.white} />
              <Typography variant='regular' size={12} className="semibold text-center mt-1" style={{ color: colors.text.light }}>
          Dashboard
        </Typography>
      </TouchableOpacity>
    </View>
{/* Monthly Overview - Glassy, Rounded & Stylish */}
<View className="mb-6">
  <View className="rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-md">
    <LinearGradient
      colors={[`${colors.primary}80`, `${colors.accent}90`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="p-6"
    >
      <Typography variant='semibold' className="text-xl text-center pt-2 font-black mb-2 text-secondary tracking-tight">
        This Month's Performance
      </Typography>

      <View className="flex-row justify-between items-center gap-3">
        {[
          {
            icon: 'inventory',
            value: marketplaceData.monthlyStats.activeProducts,
            label: 'Products',
          },
          {
            icon: 'visibility',
            value: marketplaceData.monthlyStats.totalViews,
            label: 'Views',
          },
          {
            icon: 'question-answer',
            value: marketplaceData.monthlyStats.totalInquiries,
            label: 'Inquiries',
          },
          {
            icon: 'trending-up',
            value: `+${marketplaceData.monthlyStats.monthlyGrowth}%`,
            label: 'Growth',
          },
        ].map((item, index) => (
          <View
            key={index}
            className="flex-1 items-center px-0"
          >
            <View className="p-0 rounded-full mb-2 shadow-md shadow-black/10">
              <MaterialIcons name={item.icon as any} size={26} color={colors.white} />
            </View>
            <Typography className="text-xl font-extrabold text-white mb-0.5">
              {item.value}
            </Typography>
            <Typography size={12} className="mb-3 text-white/80 tracking-wide">
              {item.label}
            </Typography>
          </View>
        ))}
      </View>
    </LinearGradient>
  </View>
</View>


    {/* Recent Inquiries */}
    <View className="bg-white rounded-3xl p-5 shadow-xl">
      <View className="flex-row justify-between items-center mb-4">
        <Typography variant="semibold" size={18} className="text-lg" style={{ color: colors.text.primary }}>
          Recent Product Inquiries
        </Typography>
        <TouchableOpacity
          className="px-4 py-2 rounded-2xl"
          style={{ backgroundColor: colors.accent }}
          activeOpacity={0.8}
        >
          <Typography size={12} className="text-sm font-bold" style={{ color: colors.white }}>
            View All
          </Typography>
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
                <Typography className="text-base font-black mb-1" style={{ color: colors.text.primary }}>
                  {inquiry.customerName}
                </Typography>
                <Typography variant="regular" size={12} className="font-semibold" style={{ color: colors.text.secondary }}>
                  {inquiry.productTitle}
                </Typography>
              </View>
              <View className="items-end">
                <Typography size={12} className="text-sm mb-1.5 font-medium" style={{ color: colors.text.secondary }}>
                  {inquiry.time}
                </Typography>
                <View
                  className="px-3 py-1 rounded-2xl"
                  style={{
                    backgroundColor:
                      inquiry.status === 'unread' ? colors.error :
                      inquiry.status === 'read' ? colors.warning :
                      colors.success
                  }}
                >
                  <Typography size={10} className="text-xs font-black text-white">
                    {inquiry.status.toUpperCase()}
                  </Typography>
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
