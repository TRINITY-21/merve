
// BookingHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { ITab } from '../../../../../types/BookingTypes';

const { width: screenWidth } = Dimensions.get('window');

interface BookingHeaderProps {
  navigation: any;
  activeTab: string;
  tabs: ITab[];
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
  tabSlideAnim
}) => (


  <View className="shadow-lg shadow-black/30 elevation-8">
    <LinearGradient colors={colors.gradient.primary} className="rounded-b-0">
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View
        className="px-5"
        style={{ paddingTop: Platform.OS === 'ios' ? 60 : 10, paddingBottom: 20 }}
      >
        <View className="flex-row items-center justify-between mb-5">
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
          </TouchableOpacity>

          <Text className="text-2xl font-extrabold text-center flex-1" style={{ color: colors.secondary }}>
            Book Appointments
          </Text>

          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            onPress={onNewBookingPress}
            activeOpacity={0.7}
          >
            <MaterialIcons name="add" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row rounded-3xl p-1 relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <View className="absolute top-1 bottom-1 left-5 right-5">
            <Animated.View
              className="absolute top-0 bottom-0 rounded-2xl"
              style={[
                {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  left: tabSlideAnim,
                  width: (screenWidth - 80) / tabs.length - 8
                }
              ]}
            />
          </View>

          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className="flex-1 flex-row items-center justify-center py-3 px-2 gap-1.5"
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)'}
              />
              <Text
                className="text-xs font-semibold"
                style={{ color: activeTab === tab.key ? colors.white : 'rgba(255,255,255,0.7)' }}
              >
                {tab.label}
              </Text>
              {tab.count > 0 && (
                <View className="bg-red-500 rounded-2xl min-w-5 h-5 items-center justify-center ml-1">
                  <Text className="text-xs font-bold text-white">{tab.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  </View>

);