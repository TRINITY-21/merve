// BookingHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'; // Import useRef, useEffect, useState
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Header, Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { ITab } from '../../../../../types/BookingTypes';

const { width: screenWidth } = Dimensions.get('window');

interface BookingHeaderProps {
  navigation: any;
  activeTab: string;
  tabs: ITab[]; // Confirmed: 3 tabs
  onTabChange: (tabKey: string) => void;
  onNewBookingPress: () => void;
  tabSlideAnim: Animated.Value;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({
  navigation,
  activeTab,
  tabs,
  onTabChange,
  onNewBookingPress,
  // tabSlideAnim // No longer passed as prop
}) => {
  // Internalize the Animated.Value
  const tabSlideAnim = useRef(new Animated.Value(0)).current;
  // Store the layout of each tab for accurate positioning
  const tabLayouts = useRef<{ x: number; width: number }[]>(Array(tabs.length).fill({ x: 0, width: 0 }));

  // Find the index of the active tab
  const activeTabIndex = tabs.findIndex(tab => tab.key === activeTab);

  // State to hold a base width for the indicator once layouts are known
  const [baseIndicatorWidth, setBaseIndicatorWidth] = useState(0);

  // Effect to set base width and trigger animation
  useEffect(() => {
    // Only set base width once the first tab's layout is known and not already set
    if (tabLayouts.current[0]?.width > 0 && baseIndicatorWidth === 0) {
      setBaseIndicatorWidth(tabLayouts.current[0].width);
      // Set initial position immediately to avoid flicker on first render
      tabSlideAnim.setValue(activeTabIndex);
    }

    // Animate the indicator when the active tab changes (and base width is known)
    if (baseIndicatorWidth > 0) {
      Animated.spring(tabSlideAnim, {
        toValue: activeTabIndex,
        friction: 8, // Adjust for desired springiness
        tension: 30, // Adjust for desired springiness
        useNativeDriver: true, // Keep native driver for transform properties
      }).start();
    }
  }, [activeTab, activeTabIndex, tabSlideAnim, baseIndicatorWidth]); // Add baseIndicatorWidth to dependencies

  // Handle layout measurements for each tab item
  const onTabItemMeasured = (event: any, index: number) => {
    tabLayouts.current[index] = {
      x: event.nativeEvent.layout.x,
      width: event.nativeEvent.layout.width,
    };
    // If this is the active tab and base width hasn't been set, set it
    if (index === activeTabIndex && baseIndicatorWidth === 0) {
      setBaseIndicatorWidth(tabLayouts.current[0]?.width || 0);
    }
  };

  // Only proceed with interpolation if baseIndicatorWidth is set
  const animatedIndicatorStyle = baseIndicatorWidth > 0 ? {
    transform: [{
      translateX: tabSlideAnim.interpolate({
        inputRange: tabs.map((_, i) => i), // [0, 1, 2] for 3 tabs
        outputRange: tabs.map((_, i) => {
          // Calculate the target X position, considering the indicator's current width and target width
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
      <Header title="Booking Appointments" withShadow={false}
        titleColor={colors.secondary}
        iconBackgroundColor="rgba(255, 255, 255, 0.1)"
        leftIcon={{
          name: 'chevron-left',
          onPress: () => navigation.goBack(),
        }}
        rightIcons={[
         
        ]}
      />

      {/* Tab Navigation */}
      <View className="flex-row mt-2 mb-2 rounded-3xl m-5 px-4 relative" style={{ backgroundColor: colors.primary }}>
        {/* Animated Background Indicator - Render only when base width is known */}
        {baseIndicatorWidth > 0 && (
          <Animated.View
            className="absolute top-1 bottom-1 rounded-2xl"
            style={[
              {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: baseIndicatorWidth, // Set initial width
              },
              animatedIndicatorStyle // Apply dynamic transform (translateX and scaleX)
            ]}
          />
        )}


        {/* Tab Buttons */}
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            // Use onLayout to measure each tab's dimensions
            onLayout={(event) => onTabItemMeasured(event, index)}
            className="flex-1 flex-row items-center justify-center py-3 gap-1.5"
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)'}
            />
            <Typography variant='regular' size={12}
              className="text-xs font-semibold"
              style={{ color: activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)' }}
            >
              {tab.label}
            </Typography>
            {tab.count > 0 && (
              <View className="bg-red-500 rounded-2xl min-w-5 h-5 items-center justify-center ml-1">
                <Text className="text-xs font-bold text-white">{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};