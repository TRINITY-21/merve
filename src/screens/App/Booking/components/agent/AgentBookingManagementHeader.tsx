// AgentBookingManagementHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { ITab } from '../../../../../types/agentBookingTypes';


const { width: screenWidth } = Dimensions.get('window');

interface AgentBookingManagementHeaderProps {
  navigation: any;
  activeTab: string;
  tabs: ITab[];
  isAvailable: boolean;
  onTabChange: (tabKey: string) => void;
  tabSlideAnim: Animated.Value;
}

export const AgentBookingManagementHeader: React.FC<AgentBookingManagementHeaderProps> = ({
  navigation,
  activeTab,
  tabs,
  isAvailable,
  onTabChange,
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
          
          <Text className="text-xl font-extrabold text-center flex-1 mx-2.5" style={{ color: colors.secondary }}>
            Booking Management
          </Text>
          
          <View 
            className="flex-row items-center px-3 py-1.5 rounded-2xl gap-1.5"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <View 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isAvailable ? colors.accent : colors.error }}
            />
            <Text className="text-xs font-semibold" style={{ color: colors.secondary }}>
              {isAvailable ? 'Available' : 'Offline'}
            </Text>
          </View>
        </View> 


        {/* Tab Navigation */}
        <View className="flex-row rounded-3xl p-1 relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <View className="absolute top-1 bottom-1 left-5 right-5">
            <Animated.View 
              className="absolute top-0 bottom-0 rounded-2xl"
              style={[
                { 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  left: tabSlideAnim.interpolate({
                    inputRange: [0, screenWidth],
                    outputRange: [0, screenWidth / tabs.length],
                  }),
                  width: screenWidth / tabs.length - 40
                }
              ]} 
            />
          </View>
          
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
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
    </LinearGradient>
  </View>
);