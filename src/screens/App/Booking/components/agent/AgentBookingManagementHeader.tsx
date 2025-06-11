// AgentBookingManagementHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { ITab } from '../../../../../types/agentBookingTypes';


const { width: screenWidth } = Dimensions.get('window');

interface AgentBookingManagementHeaderProps {
  navigation: any;
  activeTab: string;
  tabs: ITab[];
  isAvailable: boolean;
  onTabChange: (tabKey: string) => void;
  onHistoryPress: () => void;
}

export const AgentBookingManagementHeader: React.FC<AgentBookingManagementHeaderProps> = ({
  navigation,
  activeTab,
  tabs,
  isAvailable,
  onTabChange,
  onHistoryPress,
}) => {
  const tabSlideAnim = useRef(new Animated.Value(0)).current;
  // Store the layout of each tab for accurate positioning
  const tabLayouts = useRef<{ x: number; width: number }[]>(Array(tabs.length).fill({ x: 0, width: 0 }));

  const activeTabIndex = tabs.findIndex(tab => tab.key === activeTab);

  // State to hold a base width for the indicator once layouts are known
  const [baseIndicatorWidth, setBaseIndicatorWidth] = useState(0);

  // Effect to set base width and trigger animation
  useEffect(() => {
    // Only set base width once the first tab's layout is known
    if (tabLayouts.current[0]?.width > 0 && baseIndicatorWidth === 0) {
      setBaseIndicatorWidth(tabLayouts.current[0].width);
      // Set initial position immediately to avoid flicker on first render
      tabSlideAnim.setValue(activeTabIndex);
    }

    // Animate the indicator when the active tab changes (and base width is known)
    if (baseIndicatorWidth > 0) {
      Animated.spring(tabSlideAnim, {
        toValue: activeTabIndex,
        friction: 8,
        tension: 30,
        useNativeDriver: true, // Keep native driver for transform properties
      }).start();
    }
  }, [activeTab, activeTabIndex, tabSlideAnim, baseIndicatorWidth]);


  const onTabItemMeasured = (event: any, index: number) => {
    tabLayouts.current[index] = {
      x: event.nativeEvent.layout.x,
      width: event.nativeEvent.layout.width,
    };
    // If this is the active tab, ensure the initial animation value is set correctly
    // This handles cases where layout might be known after the initial useEffect
    if (index === activeTabIndex && baseIndicatorWidth === 0) {
      // Re-trigger useEffect if base width wasn't set, ensuring animation starts
      setBaseIndicatorWidth(tabLayouts.current[0]?.width || 0);
    }
  };


  // Only proceed with interpolation if baseIndicatorWidth is set
  const animatedIndicatorStyle = baseIndicatorWidth > 0 ? {
    transform: [{
      translateX: tabSlideAnim.interpolate({
        inputRange: tabs.map((_, i) => i),
        outputRange: tabs.map((_, i) => {
          // Calculate the target X position, considering the indicator's current width and target width
          // We need to shift it so it aligns correctly after scaling
          const targetX = tabLayouts.current[i].x;
          const targetWidth = tabLayouts.current[i].width;
          // Adjust translateX to center the scaled indicator over the target tab
          return targetX + (targetWidth - baseIndicatorWidth) / 2;
        }),
        extrapolate: 'clamp',
      }),
    }, {
      scaleX: tabSlideAnim.interpolate({
        inputRange: tabs.map((_, i) => i),
        outputRange: tabs.map((_, i) => {
          // Scale factor is target width / base width
          return tabLayouts.current[i].width / baseIndicatorWidth;
        }),
        extrapolate: 'clamp',
      }),
    }],
  } : {}; // Return empty object if baseWidth not yet known


  return (
    <View className="">
      <LinearGradient colors={[colors.primary, colors.primary]} className="rounded-b-0">
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

        <View
          className="px-2"
          style={{ paddingTop: Platform.OS === 'ios' ? 60 : 10, paddingBottom: 20 }}
        >
          <View className="flex-row items-center justify-between mb-0">
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
            </TouchableOpacity>

            <Typography variant="semibold" size={18} className="text-lg font-extrabold" style={{ color: colors.secondary }}>
              Booking Management
            </Typography>

            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              onPress={onHistoryPress}
              activeOpacity={0.7}
            >
              <MaterialIcons name="history" size={24} color={colors.secondary} />
            </TouchableOpacity>

            <View
              className="flex-row items-center px-3 py-1.5 rounded-2xl gap-1.5"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <View
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isAvailable ? colors.success : colors.error }}
              />
              <Text className="text-xs font-semibold" style={{ color: colors.secondary }}>
                {isAvailable ? 'Available' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View className="m-2 mx-3 px-2 flex-row rounded-3xl relative" style={{ backgroundColor: colors.accent }}>
        {/* Animated Background Indicator */}
        {/* We need a base width for the indicator. If baseIndicatorWidth is 0, render a placeholder. */}
        {baseIndicatorWidth > 0 && (
          <Animated.View
            className="absolute top-1 bottom-1 rounded-2xl"
            style={[
              {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                // Set initial width to baseIndicatorWidth
                width: baseIndicatorWidth,
              },
              animatedIndicatorStyle // Apply dynamically calculated transform (translateX and scaleX)
            ]}
          />
        )}


        {/* Tab Buttons */}
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            // Use onLayout to measure each tab's dimensions
            onLayout={(event) => onTabItemMeasured(event, index)}
            className="flex-1 flex-row items-center justify-center py-2.5 px-1 gap-1"
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)'}
            />
            <Text
              className="text-xs font-semibold"
              style={{ color: activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)' }}
            >
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View className="bg-red-500 rounded-lg min-w-4 h-4 items-center justify-center ml-0.5">
                <Text className="text-xs font-bold text-white">{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};