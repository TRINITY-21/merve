// navigation/AppNavigator.tsx
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, View } from 'react-native';
import { Typography } from '../components/common/Typography';
import MapScreen from '../screens/App/Map/MapScreen';
import NotificationsScreen from '../screens/App/Notification/NotificationsScreen';

// --------- Type Definitions ---------
export type RootTabParamList = {
  Map: undefined;
  AgentsProfile: undefined;
  Profile: undefined;
  Agent: undefined;
  Shop: undefined;
  AllAgents: undefined;
  SearchUsers: undefined;


};

export type MapStackParamList = {
  MapHome: undefined;
  Notifications: undefined;
};

export type FeedStackParamList = {
  FeedHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type MapStackScreenProps<Screen extends keyof MapStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MapStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

// --------- Navigators ---------
const Tab = createBottomTabNavigator<RootTabParamList>();
const MapStack = createStackNavigator<MapStackParamList>();
const FeedStack = createStackNavigator<FeedStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// --------- Custom Tab Icon ---------
interface TabIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  label: string;
}


const TabIcon: React.FC<TabIconProps> = ({ name, color, focused, label }) => (
  <View
    className="
    items-center justify-center
    py-2 px-1
    min-h-14 min-w-[64px] max-w-[72px]
    bg-transparent relative
  "
  >
    <MaterialIcons name={name} size={22} color={color} />
    {focused && (
      <>
        <Typography
          size={12}
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
  </MapStack.Navigator>
);

// --------- Main App Navigator ---------
const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFCC00',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,
        tabBarItemStyle: {
          minWidth: 64,
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
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="storefront" color={color} focused={focused} label="Agent" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
