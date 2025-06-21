// navigation/AppNavigator.tsx
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Typography } from '../components/common/Typography';
import { colors } from '../constants/theme/colors';
import ActivityScreen from '../screens/App/Activity/ActivityScreen';
import AgentSettingsScreen from '../screens/App/AgentProfile/AgentSettingsScreen';
import AgentsProfileScreen from '../screens/App/AgentProfile/AgentsProfileScreen';
import EditAgentProfileScreen from '../screens/App/AgentProfile/EditAgentProfileScreen';
import AgentBookingManagementScreen from '../screens/App/Booking/AgentBooking/AgentBookingManagementScreen';
import UserBookingScreen from '../screens/App/Booking/UserBooking/UserBookingScreen';
import ChatScreen from '../screens/App/Chat/ChatScreen';
import FollowersScreen from '../screens/App/Followers/FollowersScreen';
import InvitationScreen from '../screens/App/Invitation/InvitationScreen';
import UserInvitationsScreen from '../screens/App/Invitation/UserInvitationScreen';
import MapScreen from '../screens/App/Map/MapScreen';
import NotificationsScreen from '../screens/App/Notification/NotificationsScreen';
import PromoteProductScreen from '../screens/App/Promote/PromoteProductScreen';
import ReviewsScreen from '../screens/App/Reviews/ReviewsScreen';
import SearchAgentsScreen from '../screens/App/SearchAgents/SearchAgentsScreen';
import UserAccountInfoScreen from '../screens/App/UserProfile/UserAccountInfoScreen';
import UserProfileScreen from '../screens/App/UserProfile/UserProfileScreen';
import UserSettingsScreen from '../screens/App/UserProfile/UserSettingsScreen';
import AgentRegistrationScreen from '../screens/App/Vendor/components/agentRegistration/AgentRegistrationScreen';
import VendorScreen from '../screens/App/Vendor/VendorScreen';

// --------- Type Definitions ---------
export type RootTabParamList = {
  Map: undefined;
  SearchAgents: undefined;
  AgentsProfile: undefined;
  Notifications: undefined;
  // Removed unused tabs: Agent, Shop, AllAgents, SearchUsers, PromoteProduct, Vendor, Invitations, AgentRegistration
};

export type MapStackParamList = {
  MapHome: undefined;
  Notification: undefined;
  UserProfile: undefined;
  UserSettings: undefined;
  UserAccountInfo: undefined;
  Activity: undefined;
  UserBookings: undefined;
  Chat: undefined;
  Followers: undefined;
  PromoteProduct: undefined;
  Reviews: undefined;
  Vendor: undefined;
  AgentRegistration: undefined;
  SearchAgents: undefined;
  UserInvitations: undefined;
  Invitations: undefined;
};

export type SearchAgentsStackParamList = {
  SearchAgentsHome: undefined;
  Invitations: undefined;
  AgentProfile: undefined;
  AgentBookingManagement: undefined;
  AgentSettings: undefined;
  EditAgentProfile: undefined;
  Chat: undefined;
  Followers: undefined;
  PromoteProduct: undefined;
  Reviews: undefined;
  Vendor: undefined;
  AgentRegistration: undefined;
};

export type AgentProfileStackParamList = {
  AgentProfile: undefined;
  AgentBookingManagement: undefined;
  AgentSettings: undefined;
  EditAgentProfile: undefined;
  Chat: undefined;
  Followers: undefined;
  PromoteProduct: undefined;
  Reviews: undefined;
  Vendor: undefined;
  Invitations: undefined;
  AgentRegistration: undefined;
  SearchAgents: undefined;
  UserProfile: undefined;
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

export type SearchAgentsStackScreenProps<Screen extends keyof SearchAgentsStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SearchAgentsStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

// --------- Navigators ---------
const Tab = createBottomTabNavigator<RootTabParamList>();
const MapStack = createStackNavigator<MapStackParamList>();
const AgentProfileStack = createStackNavigator<AgentProfileStackParamList>();
const SearchAgentsStack = createStackNavigator<SearchAgentsStackParamList>();

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
  badgeCount = 0,
}) => (
  <View
    className="items-center justify-center py-2 px-2 min-h-[60px] w-[80px] relative"
    style={{
      transform: [{ scale: focused ? 1.05 : 1 }],
    }}
  >
    <MaterialIcons
      name={name}
      size={16}
      color={color}
      style={{
        opacity: focused ? 1 : 0.8,
        transform: [{ scale: focused ? 1.1 : 1 }],
      }}
    />

    {/* Notification Badge */}
    {showBadge && badgeCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: 8,
          right: 20,
          minWidth: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: '#EF4444',
          borderWidth: 2,
          borderColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}
      >
        <Typography size={10} variant="medium" className="text-white">
          {badgeCount > 99 ? '99+' : badgeCount}
        </Typography>
      </View>
    )}

    <Typography
      size={10}
      variant="medium"
      className="text-center mt-1 max-w-[60px] leading-tight tracking-tight"
      style={{ color }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Typography>

    {focused && (
      <View
        className="absolute bottom-0 w-8 h-1 rounded-full"
        style={{ backgroundColor: color }}
      />
    )}
  </View>
);

// --------- Stack Wrappers ---------
const MapStackNavigator: React.FC = () => (
  <MapStack.Navigator screenOptions={{ headerShown: false }}>
    <MapStack.Screen name="MapHome" component={MapScreen} />
    <MapStack.Screen name="Notification" component={NotificationsScreen} />
    <MapStack.Screen name="UserProfile" component={UserProfileScreen} />
    <MapStack.Screen name="UserSettings" component={UserSettingsScreen} />
    <MapStack.Screen name="UserAccountInfo" component={UserAccountInfoScreen} />
    <MapStack.Screen name="Activity" component={ActivityScreen} />
    <MapStack.Screen name="UserBookings" component={UserBookingScreen} />
    <MapStack.Screen name="Chat" component={ChatScreen} />
    <MapStack.Screen name="Followers" component={FollowersScreen} />
    <MapStack.Screen name="PromoteProduct" component={PromoteProductScreen} />
    <MapStack.Screen name="Reviews" component={ReviewsScreen} />
    <MapStack.Screen name="Vendor" component={VendorScreen} />
    <MapStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />
    <MapStack.Screen name="SearchAgents" component={SearchAgentsScreen} />
    <MapStack.Screen name="Invitations" component={InvitationScreen} />
    <MapStack.Screen name="UserInvitations" component={UserInvitationsScreen} />
  </MapStack.Navigator>
);

const AgentProfileStackNavigator: React.FC = () => (
  <AgentProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <AgentProfileStack.Screen name="AgentProfile" component={AgentsProfileScreen} />
    <AgentProfileStack.Screen name="AgentBookingManagement" component={AgentBookingManagementScreen} />
    <AgentProfileStack.Screen name="AgentSettings" component={AgentSettingsScreen} />
    <AgentProfileStack.Screen name="EditAgentProfile" component={EditAgentProfileScreen} />
    <AgentProfileStack.Screen name="Chat" component={ChatScreen} />
    <AgentProfileStack.Screen name="Followers" component={FollowersScreen} />
    <AgentProfileStack.Screen name="PromoteProduct" component={PromoteProductScreen} />
    <AgentProfileStack.Screen name="Reviews" component={ReviewsScreen} />
    <AgentProfileStack.Screen name="Vendor" component={VendorScreen} />
    <AgentProfileStack.Screen name="Invitations" component={InvitationScreen} />
    <AgentProfileStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />
    <AgentProfileStack.Screen name="SearchAgents" component={SearchAgentsScreen} />
    <AgentProfileStack.Screen name="UserProfile" component={UserProfileScreen} />
  </AgentProfileStack.Navigator>
);

const SearchAgentsStackNavigator: React.FC = () => (
  <SearchAgentsStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchAgentsStack.Screen name="SearchAgentsHome" component={SearchAgentsScreen} />
    <SearchAgentsStack.Screen name="Invitations" component={InvitationScreen} />
    <SearchAgentsStack.Screen name="AgentProfile" component={AgentsProfileScreen} />
    <SearchAgentsStack.Screen name="AgentBookingManagement" component={AgentBookingManagementScreen} />
    <SearchAgentsStack.Screen name="AgentSettings" component={AgentSettingsScreen} />
    <SearchAgentsStack.Screen name="EditAgentProfile" component={EditAgentProfileScreen} />
    <SearchAgentsStack.Screen name="Chat" component={ChatScreen} />
    <SearchAgentsStack.Screen name="Followers" component={FollowersScreen} />
    <SearchAgentsStack.Screen name="PromoteProduct" component={PromoteProductScreen} />
    <SearchAgentsStack.Screen name="Reviews" component={ReviewsScreen} />
    <SearchAgentsStack.Screen name="Vendor" component={VendorScreen} />
    <SearchAgentsStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />
  </SearchAgentsStack.Navigator>
);

// --------- Main App Navigator ---------
const AppNavigator: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState<number>(5);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Mock API call
      setNotificationCount(7);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotificationCount(0);
    }
  };

  const updateNotificationCount = (newCount: number) => {
    setNotificationCount(newCount);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary + '80',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 78 : 70,
          paddingBottom: Platform.OS === 'ios' ? 24 : 16,
          paddingTop: 8,
          paddingHorizontal: 0,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          position: 'absolute',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="location-on"
              color={color}
              focused={focused}
              label="Map"
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchAgents"
        component={SearchAgentsStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="person-search"
              color={color}
              focused={focused}
              label="Agents"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AgentsProfile"
        component={AgentProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="storefront"
              color={color}
              focused={focused}
              label="Agent"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="notifications"
              color={color}
              focused={focused}
              label="Notifications"
              showBadge={true}
              badgeCount={notificationCount}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            // Optional: Clear notifications
            // updateNotificationCount(0);
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;