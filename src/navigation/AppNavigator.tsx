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
import MapScreen from '../screens/App/Map/MapScreen';
import NotificationsScreen from '../screens/App/Notification/NotificationsScreen';
import PromoteProductScreen from '../screens/App/Promote/PromoteProductScreen';
import ReviewsScreen from '../screens/App/Reviews/ReviewsScreen';
import SearchAgentsScreen from '../screens/App/SearchAgents/SearchAgentsScreen';
import SearchUsersScreen from '../screens/App/SearchUsers/SearchUsersScreen';
import AddProductScreen from '../screens/App/Shop/AgentShop/AddProductScreen';
import AgentEditProductScreen from '../screens/App/Shop/AgentShop/AgentEditProductScreen';
import AgentProductAnalyticsScreen from '../screens/App/Shop/AgentShop/AgentProductAnalyticsScreen';
import AgentProductsScreen from '../screens/App/Shop/AgentShop/AgentProductsScreen';
import AgentShopDashboardScreen from '../screens/App/Shop/AgentShop/AgentShopDashboardScreen';
import MarketplaceScreen from '../screens/App/Shop/Home/MarketplaceScreen';
import ProductDetailsScreen from '../screens/App/Shop/Home/ProductDetailsScreen';
import FavoriteProductsScreen from '../screens/App/Shop/UserShop/FavoriteProductsScreen';
import UserAccountInfoScreen from '../screens/App/UserProfile/UserAccountInfoScreen';
import UserProfileScreen from '../screens/App/UserProfile/UserProfileScreen';
import UserSettingsScreen from '../screens/App/UserProfile/UserSettingsScreen';
import AgentRegistrationScreen from '../screens/App/Vendor/components/agentRegistration/AgentRegistrationScreen';
import VendorScreen from '../screens/App/Vendor/VendorScreen';

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
  PromoteProduct: undefined;
  SearchAgents: undefined;
  Vendor: undefined;
  Invitations: undefined;
  AgentRegistration: undefined;
};

export type MapStackParamList = {
  MapHome: undefined;
  Notification: undefined;
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
  UserBookings: undefined;
  Chat: undefined;
  Followers: undefined;
  PromoteProduct: undefined;
  Reviews: undefined;
    Vendor: undefined;
  Invitations: undefined;
AgentRegistration: undefined;



};


export type SearchAgentsStackParamList = {
  SearchAgentsHome: undefined;
  Vendor: undefined;
AgentRegistration: undefined;


};



export type SearchUserStackParamList = {
  SearchUsersHome: undefined;
  Vendor: undefined;
  Invitations: undefined;
AgentRegistration: undefined;


};

export type ShopStackParamList = {
  ShopHome: undefined;

  PromoteProduct: undefined;
  Reviews: undefined;
  Vendor: undefined;
  Invitations: undefined;
  AgentRegistration: undefined;
    ProductDetails: { productId: string }; // Add the param
  FavoriteProducts: { productId: string }; // Add the param
  FavoritesScreen: undefined; // Add this route
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Chat: undefined;
  Followers: undefined;
  Reviews: undefined;
  Vendor: undefined;
  Invitations: undefined;
  AgentRegistration: undefined;
};

export type AgentProfileStackParamList = {
  AgentProfile: undefined;
  AgentBookingManagement: undefined;  
  AgentShopDashboard: undefined;     
  AddProduct: undefined;
  AgentProducts: undefined;
  AgentEditProduct: undefined;
  AgentProductAnalytics: undefined;
  AgentSettings: undefined;
  EditAgentProfile: undefined;
  Chat: undefined;
  Followers: undefined;
  PromoteProduct: undefined;
  Reviews: undefined;
  Vendor: undefined;
  Invitations: undefined;
  AgentRegistration: undefined;
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

  export type ShopStackScreenProps<Screen extends keyof ShopStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ShopStackParamList, Screen>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

    export type SearchUserStackScreenProps<Screen extends keyof SearchUserStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SearchUserStackParamList, Screen>,
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
const SearchUserStack = createStackNavigator<SearchUserStackParamList>();
const ShopStack = createStackNavigator<ShopStackParamList>();
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
  badgeCount = 0
}) => (
  <View
    className="
    items-center justify-center
    py-2 px-1
    min-h-14 min-w-[64px] max-w-[72px]
    relative
    "
    style={{
      transform: [{ scale: focused ? 1.05 : 1 }],
    }}
  >
    <MaterialIcons 
      name={name} 
      size={20} 
      color={color} 
    style={{
  opacity: focused ? 1 : 0.9, // Changed from 0.7 to 0.6 for better contrast
  transform: [{ scale: focused ? 1.1 : 1 }]
}}
    />
    
    {/* Notification Badge */}
    {showBadge && badgeCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 20,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: '#EF4444',
          borderWidth: 2,
          borderColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}
      >
        <Typography
          size={10}
          variant="medium"
          className="text-white"
        >
          {badgeCount > 99 ? '99+' : badgeCount}
        </Typography>
      </View>
    )}
    
    {focused && (
      <>
        <Typography
          size={9}
          variant="medium"
          className="text-sm text-center mt-1 max-w-[48px] leading-tight tracking-tight"
          style={{ color }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {label}
        </Typography>

        <View 
          className="absolute bottom-0 w-6 h-0.5 rounded-full" 
          style={{ 
            backgroundColor: color,
          }} 
        />
      </>
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

  </MapStack.Navigator>
);

const AgentProfileStackNavigator: React.FC = () => (
  <AgentProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <AgentProfileStack.Screen name="AgentProfile" component={AgentsProfileScreen} />
    <AgentProfileStack.Screen name="AgentBookingManagement" component={AgentBookingManagementScreen} />
    <AgentProfileStack.Screen name="AgentShopDashboard" component={AgentShopDashboardScreen} />
    <AgentProfileStack.Screen name="AddProduct" component={AddProductScreen} />
    <AgentProfileStack.Screen name="AgentProducts" component={AgentProductsScreen} />
    <AgentProfileStack.Screen name="AgentEditProduct" component={AgentEditProductScreen} />
    <AgentProfileStack.Screen name="AgentProductAnalytics" component={AgentProductAnalyticsScreen} />
    <AgentProfileStack.Screen name="AgentSettings" component={AgentSettingsScreen} />
    <AgentProfileStack.Screen name="EditAgentProfile" component={EditAgentProfileScreen} />
    <AgentProfileStack.Screen name="Chat" component={ChatScreen} />
    <AgentProfileStack.Screen name="Followers" component={FollowersScreen} />
    <AgentProfileStack.Screen name="PromoteProduct" component={PromoteProductScreen} />
    <AgentProfileStack.Screen name="Reviews" component={ReviewsScreen} />
    <AgentProfileStack.Screen name="Vendor" component={VendorScreen} />
    <AgentProfileStack.Screen name="Invitations" component={InvitationScreen} />
    <AgentProfileStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />


  </AgentProfileStack.Navigator>
);


const ShopStackNavigator: React.FC = () => (
  <ShopStack.Navigator screenOptions={{ headerShown: false }}>
    <ShopStack.Screen name="ShopHome" component={MarketplaceScreen} />
    <ShopStack.Screen name="ProductDetails" component={ProductDetailsScreen} 
   />
    <ShopStack.Screen name="FavoriteProducts" component={FavoriteProductsScreen} />
    <ShopStack.Screen name="FavoritesScreen" component={FavoriteProductsScreen} />
    <ShopStack.Screen name="PromoteProduct" component={PromoteProductScreen} />
    <ShopStack.Screen name="Reviews" component={ReviewsScreen} />
    <ShopStack.Screen name="Invitations" component={InvitationScreen} />
    <ShopStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />
  </ShopStack.Navigator>
);



const SearchUsersStackNavigator: React.FC = () => (
  <SearchUserStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchUserStack.Screen name="SearchUsersHome" component={SearchUsersScreen} />
    <AgentProfileStack.Screen name="Invitations" component={InvitationScreen} />
    <AgentProfileStack.Screen name="AgentRegistration" component={AgentRegistrationScreen} />


  </SearchUserStack.Navigator>
);


const SearchAgentsStackNavigator: React.FC = () => (
  <SearchAgentsStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchAgentsStack.Screen name="SearchAgentsHome" component={SearchAgentsScreen} />
    <AgentProfileStack.Screen name="Invitations" component={InvitationScreen} />


  </SearchAgentsStack.Navigator>
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
  tabBarActiveTintColor: colors.primary, // Active teal
  tabBarInactiveTintColor: colors.primary + '60', // Light teal (60% opacity)
  tabBarShowLabel: false,
  tabBarItemStyle: {
    minWidth: 56,
    maxWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 84 : 74,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
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
            <TabIcon 
              name="location-on" 
color={focused ? colors.primary : colors.primary + '60'}
              focused={focused} 
              label="Map" 
            />
          ), 
        }}
      />

      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              name="shop" 
color={focused ? colors.primary : colors.primary + '60'}
              focused={focused} 
              label="Shop" 
            />
          ),
        }}
      />

      <Tab.Screen
        name="AllAgents"
        component={SearchAgentsStackNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              name="person-search" 
color={focused ? colors.primary : colors.primary + '60'}
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
color={focused ? colors.primary : colors.primary + '60'}
              focused={focused} 
              label="Agent" 
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notiificaton" 
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              name="notifications" 
color={focused ? colors.primary : colors.primary + '60'}
              focused={focused} 
              label="Notification"
              showBadge={true}
              badgeCount={notificationCount}
            />
          ),
        }}
        listeners={{
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