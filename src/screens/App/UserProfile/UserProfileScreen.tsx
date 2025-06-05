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
import { dummyActivities, dummyFollowers, dummyFollowing, dummyInvites, dummyMarketplaceData, dummyPhotos, dummyRecentBookings } from '../../../utils/userProfileDummyData';

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
        { key: 'photos', title: 'Gallery' },
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
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Monthly Overview */}
            <View className="mb-6">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide mb-4">This Month's Activity</Text>
                <View className="mb-4">
                    <LinearGradient colors={colors.gradient.light} className="rounded-2xl p-5 shadow-lg">
                        <View className="flex-row flex-wrap justify-between mb-5">
                            <View className="w-[48%] items-center mb-4">
                                <MaterialIcons name="visibility" size={24} color={colors.primary} />
                                <Text className="text-2xl font-black text-gray-900 mt-2 mb-1 tracking-wide">
                                    {dummyMarketplaceData.monthlyStats.productsViewed}
                                </Text>
                                <Text className="text-xs text-gray-600 font-semibold text-center tracking-wide">Products Viewed</Text>
                            </View>
                            <View className="w-[48%] items-center mb-4">
                                <MaterialIcons name="question-answer" size={24} color={colors.accent} />
                                <Text className="text-2xl font-black text-gray-900 mt-2 mb-1 tracking-wide">
                                    {dummyMarketplaceData.monthlyStats.inquiriesMade}
                                </Text>
                                <Text className="text-xs text-gray-600 font-semibold text-center tracking-wide">Inquiries Made</Text>
                            </View>
                            <View className="w-[48%] items-center mb-4">
                                <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen' as never)}>
                                    <MaterialIcons name="bookmark" size={24} color={colors.error} />
                                    <Text className="text-2xl font-black text-gray-900 mt-2 mb-1 tracking-wide">
                                        {dummyMarketplaceData.monthlyStats.favoriteProducts}
                                    </Text>
                                    <Text className="text-xs text-gray-600 font-semibold text-center tracking-wide">Saved</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="w-[48%] items-center mb-4">
                                <MaterialIcons name="store" size={24} color={colors.success} />
                                <Text className="text-2xl font-black text-gray-900 mt-2 mb-1 tracking-wide">
                                    {dummyMarketplaceData.monthlyStats.agentsContacted}
                                </Text>
                                <Text className="text-xs text-gray-600 font-semibold text-center tracking-wide">Agents Contacted</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>

            {/* Recently Viewed Products using ProductCard */}
            <View className="mb-6">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide mb-4">Recently Viewed</Text>
                <View className="gap-3">
                    {dummyMarketplaceData.recentlyViewed.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            fadeAnim={fadeAnim}
                            scaleAnim={scaleAnim}
                        //   onPress={() => navigation.navigate('ProductDetailsScreen' as never, { product } as never)}
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

            {/* <StatsCard
                title="This Month"
                stats={[
                    { label: 'Total Bookings', value: '8' },
                    { label: 'Completed', value: '6', color: colors.success },
                    { label: 'Pending', value: '2', color: colors.warning },
                ]}
            /> */}


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

    // Photos Tab using FilterButtons
    const renderPhotos = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row justify-between items-center mb-5 px-1">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide">Photo Gallery</Text>
                <GradientButton
                    title="Upload"
                    onPress={() => console.log('Upload pressed')}
                    icon="add-a-photo"
                    size="small"
                /> 
            </View>

            <FilterButtons
                filters={['All', 'Nature', 'Urban', 'Portrait', 'Food', 'Travel']}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
            />

            <View className="flex-row flex-wrap gap-3">
                {dummyPhotos
                    .filter(photo => selectedFilter === 'All' || photo.category === selectedFilter)
                    .map((photo, index) => (
                        <Animated.View
                            key={photo.id}
                            style={{
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                            }}
                            className={`rounded-2xl overflow-hidden relative shadow-md mb-3 ${index % 7 === 0 || index % 7 === 4 ? 'w-full h-50' : 'w-[48%] h-35'
                                }`}
                        >
                            <TouchableOpacity activeOpacity={0.8}>
                                <Image source={{ uri: photo.uri }} className="w-full h-full" style={{ resizeMode: 'cover' }} />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    className="absolute bottom-0 left-0 right-0 h-[65%] justify-end"
                                >
                                    <View className="flex-row justify-between items-end p-4">
                                        <View className="flex-1">
                                            <Text className="text-white text-sm font-extrabold mb-1 tracking-wide">{photo.title}</Text>
                                            <Text className="text-white/90 text-[11px] font-semibold tracking-wide">{photo.category}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-1">
                                            <MaterialIcons name="favorite" size={14} color={colors.white} />
                                            <Text className="text-white text-xs font-bold">{photo.likes}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
            </View>
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
            <View className="flex-row justify-between items-center mb-5 px-1">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide">Pinned Agents</Text>
                <GradientButton
                    title="View Agents"
                    onPress={() => navigation.navigate('ViewAllAgentsScreen' as never)}
                    size="small"
                />
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
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} className="px-4">
            <View className="flex-row justify-between items-center py-2 mb-3 pt-5">
                <Text className="text-lg font-extrabold text-gray-900 tracking-wide pr-3">Sent Invites</Text>
                <GradientButton
                    title="View Invites"
                    onPress={() => navigation.navigate('InvitationsScreen' as never)}
                    icon="send"
                    size="small"
                />
            </View>
            <View className="gap-0">
                {dummyInvites.map((invite) => (
                    <View key={invite.id} className="flex-row justify-between items-center p-4 border-b border-gray-100">
                        <View className="flex-1">
                            <Text className="text-base font-bold text-gray-900 mb-1 tracking-wide">{invite.name}</Text>
                            <Text className="text-sm text-gray-600 mb-1 font-medium">{invite.phone}</Text>
                            <Text className="text-xs text-gray-600 font-medium">Sent: {invite.sentDate}</Text>
                        </View>
                        <View className="px-3 py-2 rounded-2xl" style={{ backgroundColor: getStatusColor(invite.status) + '20' }}>
                            <Text className="text-xs font-extrabold tracking-wide" style={{ color: getStatusColor(invite.status) }}>
                                {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </Animated.View>
    );

    // Activity Tab using ActivityCard
    const renderActivity = () => (
        <ScrollView
            contentContainerStyle={{ padding: 14, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row justify-between items-center mb-5 px-1">
                <Text className="text-xl font-extrabold text-gray-900 tracking-wide">Recent Activity</Text>
                <GradientButton
                    title="Filter"
                    onPress={() => console.log('Filter pressed')}
                    icon="tune"
                    size="small"
                />
            </View>

            {/* <StatsCard
                title="This Week"
                stats={[
                    { label: 'Activities', value: '12' },
                    { label: 'Followers', value: '18', color: colors.success },
                    { label: 'Bookings', value: '5', color: colors.error },
                ]}
            /> */}



            <View className="relative">
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
        photos: renderPhotos,
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
                        avatar: 'https://i.pravatar.cc/150?img=91'
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