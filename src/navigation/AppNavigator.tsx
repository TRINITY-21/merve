import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, View } from 'react-native';
import { Typography } from '../components/Typography';
import HomeScreen from '../screens/ HomeScreen';

// Type definitions for navigation
export type RootTabParamList = {
  Map: undefined;
  Feed: undefined;
  Profile: undefined;
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
  <View className={`
    items-center justify-center 
    py-2 px-0.5 
    min-h-14 min-w-12 max-w-15 
    bg-transparent 
    relative
    ${focused ? 'bg-transparent' : ''}
  `}>
    <View className="
      w-7 h-7 
      items-center justify-center 
      bg-transparent 
      mb-1
    ">
      <MaterialIcons 
        name={name} 
        size={22} 
        color={color}
      />
    </View>
    
    <Typography
      variant={focused ? 'bold' : 'medium'}
      className={`
        text-[10px] 
        text-center 
        mt-0.5 
        max-w-12
        ${focused ? 'tracking-wide' : 'tracking-normal'}
      `}
      style={{ color }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Typography>
    
    {focused && (
      <View className="
        absolute bottom-0 
        w-8 h-0.5 
        bg-yellow-400 
        rounded-sm
      " />
    )}
  </View>
);

// Stack Navigators (you can expand these as needed)
const MapStackNavigator: React.FC = () => (
  <MapStack.Navigator screenOptions={{ headerShown: false }}>
    <MapStack.Screen name="MapHome" component={HomeScreen} />
  </MapStack.Navigator>
);

const FeedStackNavigator: React.FC = () => (
  <FeedStack.Navigator screenOptions={{ headerShown: false }}>
    <FeedStack.Screen name="FeedHome" component={HomeScreen} />
  </FeedStack.Navigator>
);

const ProfileStackNavigator: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileHome" component={HomeScreen} />
  </ProfileStack.Navigator>
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
      {/* 
      <Tab.Screen
        name="Feed"
        component={FeedStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} label="Feed" />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} focused={focused} label="Profile" />
          ),
        }}
      />
      */}
    </Tab.Navigator>
  );
};

export default AppNavigator;