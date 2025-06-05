// navigation/AppNavigator.tsx
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Typography } from '../components/common/Typography';
import ActivityScreen from '../screens/App/Activity/ActivityScreen';
import AgentsProfileScreen from '../screens/App/Agent/AgentsProfileScreen';
import MapScreen from '../screens/App/Map/MapScreen';
import NotificationsScreen from '../screens/App/Notification/NotificationsScreen';
import UserAccountInfoScreen from '../screens/App/UserProfile/UserAccountInfoScreen';
import UserProfileScreen from '../screens/App/UserProfile/UserProfileScreen';
import UserSettingsScreen from '../screens/App/UserProfile/UserSettingsScreen';

// --------- Type Definitions ---------
export type RootTabParamList = {
  Map: undefined;
  AgentsProfile: undefined;
  UserProfile: undefined;
  Agent: undefined;
  Shop: undefined;
  AllAgents: undefined;
  SearchUsers: undefined;
  Notiificatons: undefined;
};

export type MapStackParamList = {
  MapHome: undefined;
  Notifications: undefined;
  Map: undefined;
  AgentsProfile: undefined;
  UserProfile: undefined;
  Agent: undefined;
  Shop: undefined;
  AllAgents: undefined;
  SearchUsers: undefined;
  UserSettings: undefined;
  UserAccountInfo: undefined;
  Activity: undefined;
};

export type FeedStackParamList = {
  FeedHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

export type AgentProfileStackParamList = {
  AgentProfile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type MapStackScreenProps<Screen extends keyof MapStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MapStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

export type AgentStackScreenProps<Screen extends keyof AgentProfileStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AgentProfileStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

// --------- Navigators ---------
const Tab = createBottomTabNavigator<RootTabParamList>();
const MapStack = createStackNavigator<MapStackParamList>();
const AgentProfileStack = createStackNavigator<AgentProfileStackParamList>();
const FeedStack = createStackNavigator<FeedStackParamList>();

// --------- Custom Tab Icon with Badge Support ---------
interface TabIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  label: string;
  showBadge?: boolean;
  badgeCount?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ 
  name, 
  color, 
  focused, 
  label,
  showBadge = false,
  badgeCount = 0
}) => (
  <View
    className="
    items-center justify-center
    py-2 px-1
    min-h-14 min-w-[64px] max-w-[72px]
    bg-transparent relative
  "
  >
    <MaterialIcons name={name} size={22} color={color} />
    
    {/* Notification Badge */}
    {showBadge && badgeCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: 14,
          right: 24,
          width: 6,
          height: 6,
          borderRadius: 4,
          backgroundColor: '#EF4444',
          borderWidth: 1,
          borderColor: '#FFFFFF',
        }}
      />
    )}
    
    {focused && (
      <>
        <Typography
          size={10}
          variant="regular"
          className="text-sm text-center mt-0.5 max-w-[48px] leading-tight tracking-tight"
          style={{ color }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {label}
        </Typography>

        <View className="absolute bottom-0 w-5 h-0.5 bg-yellow-400 rounded-sm" />
      </>
    )}
  </View>
);

// --------- Stack Wrappers ---------
const MapStackNavigator: React.FC = () => (
  <MapStack.Navigator screenOptions={{ headerShown: false }}>
    <MapStack.Screen name="MapHome" component={MapScreen} />
    <MapStack.Screen name="Notifications" component={NotificationsScreen} />
    <MapStack.Screen name="UserProfile" component={UserProfileScreen} />
    <MapStack.Screen name="UserSettings" component={UserSettingsScreen} />
    <MapStack.Screen name="UserAccountInfo" component={UserAccountInfoScreen} />
    <MapStack.Screen name="Activity" component={ActivityScreen} />

  </MapStack.Navigator>
);

const AgentProfileStackNavigator: React.FC = () => (
  <AgentProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <AgentProfileStack.Screen name="AgentProfile" component={AgentsProfileScreen} />

  </AgentProfileStack.Navigator>
);

// --------- Main App Navigator ---------
const AppNavigator: React.FC = () => {
  // Notification state management
  const [notificationCount, setNotificationCount] = useState<number>(5);

  // Simulate fetching notifications (replace with your actual API call)
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace this with your actual API call
      // const response = await api.getUnreadNotifications();
      // setNotificationCount(response.unreadCount);
      
      // For demo purposes, using a mock count
      setNotificationCount(7);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotificationCount(0);
    }
  };

  // Function to clear/update notification count
  const updateNotificationCount = (newCount: number) => {
    setNotificationCount(newCount);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFCC00',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          minWidth: 56,
          maxWidth: 72,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 78 : 68,
          paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          paddingTop: 8,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="location-on" color={color} focused={focused} label="Map" />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="shop" color={color} focused={focused} label="Shop" />
          ),
        }}
      />

      <Tab.Screen
        name="AllAgents"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="find-in-page" color={color} focused={focused} label="Agents" />
          ),
        }}
      />

      <Tab.Screen
        name="SearchUsers"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="group" color={color} focused={focused} label="Search" />
          ),
        }}
      />

      <Tab.Screen
        name="AgentsProfile"
        component={AgentProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="storefront" color={color} focused={focused} label="Agent" />
          ),
        }}
      />

      <Tab.Screen
        name="Notiificatons" 
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              name="notifications" 
              color={color} 
              focused={focused} 
              label="notification"
              showBadge={true}
              badgeCount={notificationCount}
            />
          ),
        }}
        listeners={{
          // Clear notification count when user taps on notifications tab
          tabPress: () => {
            // Optional: Clear notifications when tab is pressed
            // updateNotificationCount(0);
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;