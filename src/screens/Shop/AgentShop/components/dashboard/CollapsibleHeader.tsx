import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../../constants/theme/colors';
import { ICollapsibleHeaderProps } from '../../../../../types/agentShopTypes';

const CollapsibleHeader: React.FC<ICollapsibleHeaderProps> = ({
  scrollY,
  navigation,
  dashboardData,
  selectedTimeframe,
  timeframes,
  setShowTimeframeModal,
  headerHeight,
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Header animations
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [24, 18],
    extrapolate: 'clamp',
  });

  const miniHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE - 50, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View 
      className="absolute top-0 left-0 right-0 z-[1000]"
      style={{ height: headerHeight }}
    >
      <LinearGradient colors={colors.gradient.primary} className="flex-1">
        <SafeAreaView className="flex-1">
          <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
          
          {/* Main Header Content */}
          <Animated.View 
            className="px-5 pt-2.5"
            style={{ opacity: headerOpacity }}
          >
            <View className="flex-row items-start justify-between mb-5">
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
              </TouchableOpacity>
              
              <View className="flex-1 pl-3">
                <Text className="text-lg text-white mb-1 font-normal text-secondary">
                  Good afternoon, Mike
                </Text>
                <Animated.Text 
                  className="font-bold text-secondary"
                  style={{ fontSize: titleFontSize }}
                >
                  Shop Dashboard
                </Animated.Text>
              </View>
              
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  className="w-10 h-10 rounded-full bg-white/20 items-center justify-center relative"
                  onPress={() => navigation.navigate('NotificationsScreen')}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="notifications" size={24} color={colors.secondary} />
                  <View className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 items-center justify-center">
                    <Text className="text-xs font-bold text-white">3</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                  onPress={() => navigation.navigate('AddProductScreen')}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="add" size={24} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row mb-4 gap-2">
              <View className="flex-1 items-center">
                <Text className="text-lg font-extrabold text-secondary mb-1">
                  {dashboardData.overview.totalProducts}
                </Text>
                <Text className="text-xs text-secondary text-center">Products</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-extrabold text-secondary mb-1">
                  {formatNumber(dashboardData.overview.totalViews)}
                </Text>
                <Text className="text-xs text-secondary text-center">Views</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-lg font-extrabold text-secondary mb-1">
                  {dashboardData.overview.totalInquiries}
                </Text>
                <Text className="text-xs text-secondary text-center">Inquiries</Text>
              </View>
            </View>

            {/* Timeframe Selector */}
            <View className="pb-4">
              <TouchableOpacity 
                className="flex-row items-center bg-white/20 rounded-full px-3 py-2 gap-1.5 self-start"
                onPress={() => setShowTimeframeModal(true)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="schedule" size={18} color={colors.secondary} />
                <Text className="text-sm font-semibold text-secondary">
                  {timeframes.find(t => t.key === selectedTimeframe)?.label}
                </Text>
                <MaterialIcons name="keyboard-arrow-down" size={18} color={colors.secondary} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Mini Header (shows when scrolled) */}
          <Animated.View 
            className="absolute left-0 right-0 z-[1001] px-5 py-2.5"
            style={{
              top: Platform.OS === 'ios' ? 44 : 0,
              height: Platform.OS === 'ios' ? HEADER_MIN_HEIGHT - 44 : HEADER_MIN_HEIGHT - 100,
              opacity: miniHeaderOpacity,
            }}
          >
            <View className="flex-1 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                  className="p-0.5"
                >
                  <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-secondary">
                  Dashboard
                </Text>
              </View>
              
              <View className="flex-row items-center gap-4">
                <TouchableOpacity 
                  onPress={() => navigation.navigate('AgentProductsScreen')}
                  activeOpacity={0.8}
                  className="items-center"
                >
                  <Text className="text-sm font-bold text-secondary">
                    {dashboardData.overview.totalProducts}
                  </Text>
                  <Text className="text-xs text-secondary opacity-80">
                    Products
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => navigation.navigate('NotificationsScreen')}
                  activeOpacity={0.8}
                  className="w-8 h-8 rounded-2xl bg-white/20 items-center justify-center relative"
                >
                  <MaterialIcons name="notifications" size={20} color={colors.secondary} />
                  <View className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 items-center justify-center">
                    <Text className="text-xs font-bold text-white">3</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
};

export default CollapsibleHeader;