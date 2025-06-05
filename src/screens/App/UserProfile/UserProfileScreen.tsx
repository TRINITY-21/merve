import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Toast from 'react-native-toast-message';
import { Typography } from '../../../components/common';
import { ActivityCard } from '../../../components/userProfile/ActivityCard';
import { BookingCard } from '../../../components/userProfile/BookingCard';
import { FilterButtons } from '../../../components/userProfile/FilterButtons';
import { FollowerCard } from '../../../components/userProfile/FollowerCard';
import { GradientButton } from '../../../components/userProfile/GradientButton';
import { ProfessionalCard } from '../../../components/userProfile/ModernInput';
import { PremiumUpgradeCard } from '../../../components/userProfile/PremiumCard';
import { ProductCard } from '../../../components/userProfile/ProductCard';
import { ProfileHeader } from '../../../components/userProfile/ProfileHeader';
import { ProfessionalStatsCard } from '../../../components/userProfile/StatsCard';
import { colors } from '../../../constants/theme/colors';
import useStore from '../../../store/useStore';
import { IRoute, IUser } from '../../../types/userProfileTypes';
import { dummyActivities, dummyFollowers, dummyFollowing, dummyInvites, dummyMarketplaceData, dummyRecentBookings } from '../../../utils/userProfileDummyData';

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');
const initialLayout = { width: screenWidth };



const UserProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const { updateUser, logout, currentUser } = useStore();

    // State management
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<IUser>({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // Tab routes
    const [routes] = useState<IRoute[]>([ 
        { key: 'profileInfo', title: 'Profile' },
        { key: 'bookings', title: 'Bookings' }, 
        { key: 'followers', title: 'Followers' },
        { key: 'following', title: 'Pinned Agents' }, 
        { key: 'marketplace', title: 'Marketplace' },
        { key: 'invites', title: 'Invites' }, 
        { key: 'activity', title: 'Activity' }, 
    ]);
 
    // Animated values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setFormData({
            name: currentUser?.name || '',
            phone: currentUser?.phone || '',
            email: currentUser?.email || '',
        });

        // Enhanced animation sequence
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 30,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 25,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentUser]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // Form validation
    const validateForm = (): boolean => {
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Missing Information',
                text2: 'Please fill all required fields',
                visibilityTime: 3000,
            });
            return false;
        }

        if (formData.phone.replace(/\D/g, '').length !== 10) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Phone Number',
                text2: 'Phone number must be 10 digits',
                visibilityTime: 3000,
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter a valid email address',
                visibilityTime: 3000,
            });
            return false;
        }

        return true;
    };

    const handleSave = async (): Promise<void> => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            updateUser(formData);
            setLoading(false);
            setIsEditing(false);

            Toast.show({
                type: 'success',
                text1: 'Profile Updated Successfully',
                text2: 'Your information has been saved',
                visibilityTime: 3000,
            });
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Update Failed',
                text2: 'Please try again later',
                visibilityTime: 3000,
            });
        }
    };

    const handleLogout = (): void => {
        logout();
        Toast.show({
            type: 'success',
            text1: 'Logged Out Successfully',
            text2: 'See you again soon!',
            visibilityTime: 2000,
        });
        navigation.navigate('Login' as never);
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'completed': return colors.success;
            case 'pending': return colors.warning;
            case 'accepted': return colors.accent;
            case 'cancelled': return colors.error;
            case 'declined': return colors.error;
            default: return colors.gray.medium;
        }
    };

    // Marketplace Tab using reusable components
const renderMarketplace = () => (
  <ScrollView
    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 120 }}
    showsVerticalScrollIndicator={false}
  >
    {/* Monthly Overview */}
    <View style={{ marginBottom: 32 }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '800',
        color: colors.text.primary,
        letterSpacing: 0.3,
        marginBottom: 16,
      }}>
        This Month's Activity
      </Text>

      <LinearGradient
        colors={colors.gradient.light}
        style={{
          borderRadius: 20,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {[
            {
              icon: 'visibility',
              color: colors.primary,
              label: 'Products Viewed',
              value: dummyMarketplaceData.monthlyStats.productsViewed,
            },
            {
              icon: 'question-answer',
              color: colors.accent,
              label: 'Inquiries Made',
              value: dummyMarketplaceData.monthlyStats.inquiriesMade,
            },
            {
              icon: 'bookmark',
              color: colors.error,
              label: 'Saved',
              value: dummyMarketplaceData.monthlyStats.favoriteProducts,
              onPress: () => navigation.navigate('FavoritesScreen' as never),
            },
            {
              icon: 'store',
              color: colors.success,
              label: 'Agents Contacted',
              value: dummyMarketplaceData.monthlyStats.agentsContacted,
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              activeOpacity={item.onPress ? 0.7 : 1}
              style={{
                width: '48%',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <MaterialIcons name={item.icon as any} size={24} color={item.color} />
              <Text style={{
                fontSize: 22,
                fontWeight: '900',
                color: colors.text.primary,
                marginTop: 8,
                marginBottom: 4,
                letterSpacing: 0.5,
              }}>
                {item.value}
              </Text>
              <Text style={{
                fontSize: 12,
                color: colors.text.secondary,
                fontWeight: '600',
                textAlign: 'center',
                letterSpacing: 0.3,
              }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>

    {/* Recently Viewed */}
    <View style={{ marginBottom: 40 }}>
      <Typography style={{
        fontSize: 20,
        // fontWeight: '800',
        // color: colors.text.primary,
        letterSpacing: 0.3,
        marginBottom: 16,
      }}>
        Recently Viewed
      </Typography>
      <View style={{ gap: 12 }}>
        {dummyMarketplaceData.recentlyViewed.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            fadeAnim={fadeAnim}
            scaleAnim={scaleAnim}
            // onPress={() => navigation.navigate('ProductDetailsScreen' as never, { product } as never)}
          />
        ))}
      </View>
    </View>
  </ScrollView>
);


    // Profile Info Tab using reusable components
    const renderProfileInfo = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                }}
                className="bg-white rounded-2xl p-5 mb-5 shadow-lg"
            >
                <View className="flex-row justify-between items-center mb-5">
                    <Text className="text-lg font-extrabold text-gray-900 tracking-wide">Personal Information</Text>
                    <View className="flex-row items-center bg-accent px-3 py-1.5 rounded-2xl gap-1 shadow-md">
                        <MaterialIcons name="verified" size={14} color={colors.white} />
                        <Text className="text-[11px] font-bold text-white tracking-wide">Verified</Text>
                    </View>
                </View>

                {/* Using ModernInput components */}
                <ProfessionalCard
                    label="Full Name"
                    icon="person"
                    value="John Doe"
                />

                <ProfessionalCard
                    label="Phone Number"
                    icon="phone"
                    value="+1 (555) 123-4567"
                    onPress={() => console.log('Call pressed')}
                />

                <ProfessionalCard
                    label="Email Address"
                    icon="email"
                    value="john.doe@example.com"
                    onPress={() => console.log('Email pressed')}
                />

                <ProfessionalCard
                    label="Location"
                    icon="pin-drop"
                    value="Accra, Ghana"
                />

            </Animated.View>

            {/* Premium Upgrade Card */}
            <Animated.View
                style={{ opacity: fadeAnim }}
                className="rounded-2xl overflow-hidden mb-6 shadow-lg"
            >


                <PremiumUpgradeCard
                    onUpgradePress={() => navigation.navigate('UpgradeScreen' as never)}
                    fadeAnim={fadeAnim}
                />

            </Animated.View>

            {/* Logout Button */}
            <TouchableOpacity
                className="flex-row items-center justify-center bg-white rounded-2xl py-4 mb-6 border-2 border-red-500 gap-2 shadow-lg"
                onPress={handleLogout}
                activeOpacity={0.8}
            >
                <MaterialIcons name="logout" size={20} color={colors.error} />
                <Text className="text-red-500 font-extrabold text-sm tracking-wide">Sign out</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    // Bookings Tab using reusable components
    const renderBookings = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row justify-between items-center mb-4 px-1">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide">Recent Bookings</Text>
              
                <TouchableOpacity className="rounded-2xl items-center justify-center shadow-md" activeOpacity={0.7}>
                <Text className="text-md font-normal text-secondary">View All</Text>

                </TouchableOpacity>
            </View>


            <ProfessionalStatsCard
  title="Monthly Overview"
  subtitle="December 2024" 
  stats={[
    { 
      label: "Total Bookings", 
      value: "198", 
      icon: "book",
      color: "#10b981",
      trend: "up",
    },
    { 
      label: "Completed", 
      value: "89", 
      icon: "done-all",
      color: colors.success,
      trend: "up",
    },
     { 
      label: "Pending", 
      value: "8", 
      icon: "pending-actions",
      color: "#3b82f6",
      trend: "up",
    },
         { 
      label: "Cancelled", 
      value: "34", 
      icon: "cancel",
      color: colors.error,
      trend: "up",
    }

  ]}
  onPress={() => console.log('View details')}
/>


            {dummyRecentBookings.length === 0 ? (
                <View className="items-center justify-center py-15">
                    <MaterialIcons name="event-busy" size={64} color={colors.gray.medium} />
                    <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">No Recent Bookings</Text>
                    <Text className="text-sm text-gray-600 text-center px-10 mb-6 leading-5">
                        Your booking history will appear here once you start making appointments
                    </Text>
                    <GradientButton
                        title="Book Appointment"
                        onPress={() => navigation.navigate('BookAppointmentsScreen' as never)}
                        icon="add"
                    />
                </View>
            ) : (
                <FlatList
                    data={dummyRecentBookings}
                    renderItem={({ item }) => (
                        <BookingCard
  booking={item}
  fadeAnim={fadeAnim}
//   onPress={() => navigation.navigate('BookingDetails', { bookingId: sampleBooking.id })}
/>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 80 : 70 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                />
            )}
        </ScrollView>
    );


    // Followers Tab using FollowerCard
// ================================
// 1. ADD THESE STATE VARIABLES (with your other state)
// ================================
const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
const [searchQuery, setSearchQuery] = useState<string>('');
const searchInputRef = useRef<TextInput>(null);

// ================================
// 2. ADD THIS ANIMATED VALUE (with your other animations)
// ================================
const searchAnimation = useRef(new Animated.Value(0)).current;

// ================================
// 3. ADD THESE TWO NEW FUNCTIONS
// ================================
const toggleSearch = () => {
  if (!isSearchVisible) {
    setIsSearchVisible(true);
    Animated.timing(searchAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      searchInputRef.current?.focus();
    });
  } else {
    Animated.timing(searchAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setIsSearchVisible(false);
      setSearchQuery('');
    });
  }
};

const getFilteredFollowers = () => {
  if (!searchQuery.trim()) {
    return dummyFollowers;
  }
  
  return dummyFollowers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// ================================
// 4. REPLACE YOUR EXISTING renderFollowers FUNCTION WITH THIS
// ================================
const renderFollowers = () => {
  const filteredFollowers = getFilteredFollowers();
  
  return (
    <ScrollView
      contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="mb-5 px-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-extrabold text-gray-900 tracking-wide">
            Followers
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity 
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isSearchVisible ? '#3B82F6' : '#FFCC00',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              activeOpacity={0.7}
              onPress={toggleSearch}
            >
              <MaterialIcons 
                name={isSearchVisible ? "close" : "search"} 
                size={20} 
                color={colors.white} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFCC00',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons name="sort" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        {isSearchVisible && (
          <Animated.View
            style={{
              opacity: searchAnimation,
              transform: [{
                translateY: searchAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                })
              }],
              marginBottom: 16,
            }}
          >
            <View style={{
              backgroundColor: '#F8FAFC',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}>
                <MaterialIcons name="search" size={20} color="#64748B" />
                <TextInput
                  ref={searchInputRef}
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    fontSize: 16,
                    color: '#1E293B',
                    fontWeight: '500',
                  }}
                  placeholder="Search followers..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => setSearchQuery('')}
                    style={{ padding: 4 }}
                    activeOpacity={0.6}
                  >
                    <MaterialIcons name="clear" size={18} color="#64748B" />
                  </TouchableOpacity>
                )}
              </View>
              
              {searchQuery.length > 0 && (
                <View style={{ paddingBottom: 8 }}>
                  <Text style={{
                    fontSize: 13,
                    color: '#64748B',
                    fontWeight: '500',
                  }}>
                    {filteredFollowers.length} {filteredFollowers.length === 1 ? 'follower' : 'followers'} found
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>
        )}
      </View>

      {/* Stats Card */}
      <ProfessionalStatsCard
        title="This Week"
        stats={[
          { label: 'Followers', value: '+12' },
          { label: 'Following', value: '+23', color: colors.success },
          { label: 'Pinned Agents', value: '+40', color: colors.accent },
        ]}
      />

      {/* Results */}
      {searchQuery.length > 0 && filteredFollowers.length === 0 ? (
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="items-center justify-center py-12 bg-white rounded-2xl"
        >
          <MaterialIcons name="search" size={48} color="#CBD5E1" />
          <Text className="text-lg font-semibold text-gray-800 mt-4 mb-2">No results found</Text>
          <Text className="text-sm text-gray-600 text-center px-6 mb-4">
            No followers match "{searchQuery}"
          </Text>
          <TouchableOpacity
            className="bg-gray-100 px-4 py-2 rounded-lg"
            onPress={() => setSearchQuery('')}
            activeOpacity={0.7}
          >
            <Text className="text-gray-700 font-medium text-sm">Clear search</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        filteredFollowers.map((follower, index) => (
          <FollowerCard
            key={follower.id}
            follower={follower} 
            fadeAnim={fadeAnim} 
            slideAnim={slideAnim}
            index={index}
            onFollowPress={(follower) => console.log('Follow pressed:', follower.name)}
          /> 
        ))
      )}
    </ScrollView>
  );
};
    // Following Tab
    const renderFollowing = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >


                <View className="flex-row justify-between items-center mb-4 px-1">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide">Recent Bookings</Text>
              
                <TouchableOpacity className="rounded-2xl items-center justify-center"
                 activeOpacity={0.7}
                 onPress={() => navigation.navigate('ViewAllBookingsScreen' as never)}
                 >

                <Text className="text-md font-normal text-secondary">View All</Text>

                </TouchableOpacity>
            </View>

            <FilterButtons
                filters={['All', 'Accra', 'Takoradi', 'Sunyani', 'Volta', 'Kumasi']}
                selectedFilter={selectedCategory}
                onFilterChange={setSelectedCategory}
            />

            {dummyFollowing
                .filter(person => selectedCategory === 'All' || person.category === selectedCategory)
                .map((person, index) => (
                    <Animated.View
                        key={person.id}
                        style={{
                            transform: [{ scale: scaleAnim }],
                            opacity: fadeAnim,
                        }}
                        className="bg-white rounded-2xl my-1 p-3 shadow-md"
                    >
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: person.avatar }}
                                className="w-16 h-16 rounded-xl mr-4"
                            />
                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="font-bold text-base">{person.name}</Text>
                                    {person.verified && (
                                        <MaterialIcons name="verified" size={16} color={colors.accent} className="ml-2" />
                                    )}
                                </View>
                                <Text className="text-gray-500 mt-1">{person.username}</Text>

                                <View className="flex-row mt-2 gap-2">
                                    <View className="bg-gray-100 rounded-2xl px-2 py-1">
                                        <Text className="text-xs text-gray-800">{person.category}</Text>
                                    </View>
                                    <View className="bg-yellow-100 rounded-2xl px-2 py-1">
                                        <Text className="text-xs text-teal-600">{person.followers} Pins</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                className="rounded-2xl px-3 py-1 flex-row items-center gap-1"
                                activeOpacity={0.9}
                            >
                                <MaterialIcons name="push-pin" size={16} color={colors.black} />
                                <Text className="text-gray-900 font-semibold">Unpin</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                ))}
        </ScrollView>
    );

    // Invites Tab
const renderInvites = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: 16,
      paddingBottom: 100, // enough for safe area or bottom spacing
    }}
  >
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            color: colors.text.primary,
            letterSpacing: 0.5,
          }}
        >
          Sent Invites
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('InvitationsScreen' as never)}
          activeOpacity={0.7}
          style={{
            padding: 8,
            borderRadius: 999,
            backgroundColor: colors.gray.light,
          }}
        >
          <MaterialIcons name="send" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Invite List */}
      {dummyInvites.map((invite) => (
        <View
          key={invite.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray.light,
            backgroundColor: colors.background,
            borderRadius: 12,
            marginBottom: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          {/* Info */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.text.primary,
                marginBottom: 2,
                letterSpacing: 0.3,
              }}
            >
              {invite.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 2,
                fontWeight: '500',
              }}
            >
              {invite.phone}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.text.secondary,
                fontWeight: '500',
              }}
            >
              Sent: {invite.sentDate}
            </Text>
          </View>

          {/* Status Pill */}
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: getStatusColor(invite.status) + '22',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
                letterSpacing: 0.4,
                color: getStatusColor(invite.status),
              }}
            >
              {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
            </Text>
          </View>
        </View>
      ))}
    </Animated.View>
  </ScrollView>
);

    // Activity Tab using ActivityCard
const renderActivity = () => (
  <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 100,
    }}
    showsVerticalScrollIndicator={false}
  >
    {/* Header */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: '800',
          color: colors.text.primary,
          letterSpacing: 0.5,
        }}
      >
        Recent Activity
      </Text>

      <TouchableOpacity
        onPress={() => console.log('Filter pressed')}
        activeOpacity={0.7}
        style={{
          padding: 8,
          borderRadius: 999,
          backgroundColor: colors.gray.light,
        }}
      >
        <MaterialIcons name="tune" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
                <ProfessionalStatsCard
  title="Monthly Overview"
  subtitle="December 2024" 
  stats={[
    { 
      label: "Activities", 
      value: "198", 
      icon: "book",
      color: "#10b981",
      trend: "up",
    },
    { 
      label: "Followers", 
      value: "89", 
      icon: "done-all",
      color: colors.success,
      trend: "up",
    },
     { 
      label: "Bookings", 
      value: "8", 
      icon: "pending-actions",
      color: "#3b82f6",
      trend: "up",
    },
         { 
      label: "Invites", 
      value: "34", 
      icon: "cancel",
      color: colors.error,
      trend: "up",
    }

  ]}
  onPress={() => console.log('View details')}
/>

    {/* Activity List */}
    <View style={{ position: 'relative' }}>
      {dummyActivities.map((activity, index) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          index={index}
          isLast={index === dummyActivities.length - 1}
          onPress={() => console.log('Activity pressed:', activity.id)}
        />
      ))}
    </View>
  </ScrollView>
);


    const renderScene = SceneMap({ 
        profileInfo: renderProfileInfo,
        bookings: renderBookings,
        marketplace: renderMarketplace,
        followers: renderFollowers,
        following: renderFollowing,
        invites: renderInvites,
        activity: renderActivity,
    });

    const renderTabBar = (props: any) => (
        <View className="bg-white rounded-t-3xl shadow-2xl">
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: colors.primary, height: 4, borderRadius: 2 }}
                style={{ backgroundColor: 'transparent', elevation: 0, paddingTop: 16, paddingBottom: 6 }}
                tabStyle={{ height: 50, justifyContent: 'center' }}
                labelStyle={{ fontSize: 13, fontWeight: '700', textTransform: 'capitalize', letterSpacing: 0.2 }}
                activeColor={colors.primary}
                inactiveColor={colors.gray.medium}
                scrollEnabled
                renderLabel={({ route, focused, color }: any) => (
                    <Animated.View style={[
                        { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
                        focused && { transform: [{ scale: 1.05 }] }
                    ]}>
                        <Text style={{ fontSize: 13, fontWeight: '700', textTransform: 'capitalize', letterSpacing: 0.2, color }}>
                            {route.title}
                        </Text>
                        {focused && (
                            <LinearGradient
                                colors={colors.gradient.primary}
                                className="w-5 h-1 rounded-full mt-2"
                            />
                        )}
                    </Animated.View>
                )}
            />
        </View>
    );

    return (
        <View className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Using ProfileHeader component */}
                <ProfileHeader
                    user={{
                        name: currentUser?.name || 'Alex Johnson',
                        avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=9'
                    }}
                    onBack={() => navigation.goBack()}
                    onSettings={() => navigation.navigate('UserSettingsScreen' as never)}
                    onBookings={() => navigation.navigate('BookAppointmentsScreen' as never)}
                    bookingsCount={dummyRecentBookings.length}
                />

                {/* Tab View */}
                <View className="flex-1 -mt-6 bg-slate-50 rounded-t-3xl">
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default UserProfileScreen; 