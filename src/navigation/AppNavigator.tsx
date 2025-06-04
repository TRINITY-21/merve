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

// Type definitions for navigation
export type RootTabParamList = {
  Map: undefined;
  Feed: undefined;
  Profile: undefined;
  Agent:undefined;
  Shop:undefined;
  
};

export type MapStackParamList = {
  MapHome: undefined;
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

// Initialize navigators
const Tab = createBottomTabNavigator<RootTabParamList>();
const MapStack = createStackNavigator<MapStackParamList>();
const FeedStack = createStackNavigator<FeedStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// TabIcon component with TypeScript and Tailwind
interface TabIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, focused, label }) => (
  <View
    className={`
      items-center justify-center
      py-2 px-0.5
      min-h-14 min-w-12 max-w-15
      bg-transparent
      relative
    `}
  >
    <View className="w-6 h-6 items-center justify-center bg-transparent mb-0.5">
      <MaterialIcons name={name} size={20} color={color} />
    </View>

    {focused && (
      <Typography
        variant="medium"
        className={`
          text-[9px]
          text-center
          mt-0.5
          max-w-12
          tracking-wide
        `}
        style={{ color }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Typography>
    )} 

    {focused && (
      <View className="absolute bottom-0 w-6 h-0.5 bg-yellow-400 rounded-sm" />
    )}
  </View>
);


// Stack Navigators (you can expand these as needed)
const MapStackNavigator: React.FC = () => (
  <MapStack.Navigator screenOptions={{ headerShown: false }}>
    <MapStack.Screen name="MapHome" component={MapScreen} />
  </MapStack.Navigator>
);


const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFCC00',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 68,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
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
      
      {/* Add more tabs as needed */}
      
      <Tab.Screen
        name="Feed"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="shop" color={color} focused={focused} label="Feed" />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="find-in-page" color={color} focused={focused} label="Profile" />
          ),
        }}
      />
        <Tab.Screen
        name="Shop"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="group" color={color} focused={focused} label="Profile" />
          ),
        }}
      />
            <Tab.Screen
        name="Agent"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="storefront" color={color} focused={focused} label="Profile" />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
};

export default AppNavigator;