
// Main AgentsProfileScreen.tsx (Complete with all components)
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Header, Typography } from '../../../components/common';
import { colors } from '../../../constants/theme/colors';
import { agentData, agentRecentBookings } from '../../../utils/agentProfileDummyData';
import { BookingsSection } from './components/profile/AgentBookingSection';
import { FollowersSection } from './components/profile/AgentFollowerSection';
import { InviteModal } from './components/profile/AgentInviteModal';
import { InvitesSection } from './components/profile/AgentInvitesSection';
import { AgentMapView } from './components/profile/AgentMapLocation';
import { OperationalHours } from './components/profile/AgentOperationalHours';
import { ProvidersSection } from './components/profile/AgentProviderSection';
import { ReviewsSection } from './components/profile/AgentReviewSection';
import { ServicesSection } from './components/profile/AgentServiceSection';

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

const AgentsProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [invitePhone, setInvitePhone] = useState<string>('');
  const [inviteMessage, setInviteMessage] = useState<string>('');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(headerScaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSendInvite = (): void => {
    if (!invitePhone.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }
    Alert.alert(
      'Invite Sent!',
      `Invitation sent to ${invitePhone}`,
      [{
        text: 'OK', onPress: () => {
          setShowInviteModal(false);
          setInvitePhone('');
          setInviteMessage('');
        }
      }]
    );
  };

  // Helper functions
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

  const getServiceIcon = (service: string): string => {
    switch (service) {
      case 'cash_out': return 'arrow-upward';
      case 'cash_in': return 'arrow-downward';
      case 'bill_payment': return 'receipt';
      case 'airtime': return 'phone';
      default: return 'help';
    }
  };

  const getServiceColor = (service: string): string => {
    switch (service) {
      case 'cash_out': return colors.error;
      case 'cash_in': return colors.success;
      case 'bill_payment': return colors.warning;
      case 'airtime': return colors.accent;
      default: return colors.gray.medium;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <MaterialIcons key={i} name="star" size={14} color={colors.accent} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialIcons key="half" name="star-half" size={14} color={colors.accent} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialIcons key={`empty-${i}`} name="star-border" size={14} color={colors.accent} />
      );
    }

    return stars;
  };

  return (
    <View className="flex-1 bg-background" style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <Header
          title={!isHeaderSticky ? 'Agent Profile' : agentData.name}
          leftIcon={{
            name: 'chevron-left',
            onPress: () => navigation.goBack(),
          }}
          rightIcons={[
            { name: 'event', onPress: () => navigation.navigate('AgentBookingManagement') },
            { name: 'settings', onPress: () => navigation.navigate('AgentSettings') },
          ]}
          fixed={true}
          customContent={isHeaderSticky ? (
            <View className="flex-row items-center justify-between px-4 h-14">
              {/* Left Icon */}
              <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
                <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
              </TouchableOpacity>

              {/* Center Content - Agent Profile with Image */}
              <View className="flex-1 flex-row items-center justify-center">
                <Image
                  source={{ uri: agentData.avatar }}
                  className="w-8 h-8 rounded-full mr-3 border border-white/20"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    // elevation: 2,
                  }}
                />
                <View className="items-center">
                  <Typography
                    variant="bold"
                    size={16}
                    style={{ color: colors.secondary }}
                    numberOfLines={1}
                  >
                    {agentData.name}
                  </Typography>
                  <View className="flex-row items-center mt-0.5">
                    <View
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: isOnline ? colors.success : colors.error }}
                    />
                    <Typography
                      variant="medium"
                      size={11}
                      style={{ color: colors.secondary, opacity: 0.8 }}
                    >
                      {isOnline ? 'Online' : 'Offline'}
                    </Typography>
                  </View>
                </View>
              </View>

              {/* Right Icons */}
              <View className="flex-row gap-1">
             
                <TouchableOpacity onPress={() => navigation.navigate('AgentBookingManagement')} className="w-8 h-8 items-center justify-center">
                  <MaterialIcons name="event" size={18} color={colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AgentSettings')} className="w-8 h-8 items-center justify-center">
                  <MaterialIcons name="settings" size={18} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          ) : undefined}
        />


        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            const offsetY = nativeEvent.contentOffset.y;
            setIsHeaderSticky(offsetY > 100); // Adjust threshold as needed
          }}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        >

          <View className="mb-5 mt-5 px-5">
            {/* Profile Header */}
            <View className="flex-row items-start">
              {/* Avatar with Status */}
              <View className="relative mr-4">
                <View className="p-0.5 rounded-full" style={{ backgroundColor: colors.accent }}>
                  <Image
                    source={{ uri: agentData.avatar }}
                    className="w-24 h-24 rounded-full border-[3px] border-white"
                  />
                </View>

                {agentData.verified && (
                  <View className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-sm shadow-black/20">
                    <MaterialIcons name="verified" size={18} color={colors.accent} />
                  </View>
                )}

                <View
                  className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-[2px] border-white"
                  style={{ backgroundColor: isOnline ? colors.success : colors.error }}
                />
              </View>

              {/* Profile Info */}
              <View className="flex-1">

                <View className="flex-1 pr-3 pt-1">
                  <View className="flex-row items-center mb-1">
                    <Typography className="text-lg text-secondary tracking-wide mr-2" variant="bold" size={18}>
                      {agentData?.name}
                    </Typography>
                    <View className="bg-accent/10 px-2 py-0.5 rounded-lg">
                      <Typography className="text-[10px] text-accent" variant="bold" size={10}>PREMIUM</Typography>
                    </View>
                  </View>
                  <Typography className="text-sm text-secondary/80 mb-1" variant="medium" size={14}>{agentData.businessName}</Typography>
                  <View className="flex-row items-center">
                    <MaterialIcons name="location-on" size={14} color={colors.secondary} style={{ opacity: 0.7 }} />
                    <Typography className="text-xs text-secondary/70 ml-1" variant="medium" size={12}>Kumasi, Ghana</Typography>
                  </View>
                </View>



                <View className="flex-row items-center gap-1.5 text-accent">
                  <View className="flex-row gap-0.5">
                    {renderStars(agentData.statistics.rating)}
                  </View>
                  <Typography
                    className="semibold opacity-85"
                    size={12}
                    style={{ color: colors.secondary }}
                  >
                    {agentData.statistics.rating.toFixed(1)} • ({agentData.statistics.totalReviews} reviews)
                  </Typography>
                </View>
              </View>
            </View>

            {/* Status & Actions */}
            <View className="flex-row justify-between items-center my-5">
              <View className="flex-row items-center gap-2">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: isOnline ? colors.success : colors.error }}
                />
                <Typography
                  className="semibold tracking-wide"
                  style={{ color: colors.secondary }}
                  size={12}
                  onPress={() => setIsOnline(!isOnline)}
                >
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </Typography>
                <TouchableOpacity
                  onPress={() => setIsOnline(!isOnline)}
                  activeOpacity={0.7}
                >
                  
                  <View
                  className="w-14 h-8 rounded-2xl p-1 justify-center"
                  style={{ backgroundColor: isOnline ? colors.accent : colors.gray.light }}

                >
                    <View
                      className={`w-6 h-6 rounded-xl bg-white shadow-md shadow-black/20 elevation-3 ${isOnline ? 'self-end' : 'self-start'
                        }`}
                    />
                  </View>
                  
                  </TouchableOpacity>
              </View>



              <View className="flex-row gap-2.5">
                {['push-pin', 'phone', 'chat-bubble-outline'].map((icon, index) => (
                  <TouchableOpacity
                    key={icon}
                    className="w-11 h-11 rounded-full items-center justify-center bg-white/10 backdrop-blur-sm"
                    onPress={() => navigation.navigate('Chat')}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name={icon as any}
                      size={20}
                      color={colors.secondary}
                      style={{ opacity: 0.9 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Stats Grid */}
            <View className="flex-row justify-between bg-white/10 backdrop-blur-sm rounded-xl px-4">
              {[
                { value: agentData.statistics.totalBookings, label: 'Bookings' },
                { value: agentData.statistics.followers, label: 'Pins' },
                { value: agentData.statistics.following, label: 'Invites' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  className={`flex-1 items-center justify-center ${index < 2 ? 'border-r border-white/20' : ''}`}
                >
                  <Typography
                    className="text-lg font-extrabold mb-1 text-center tracking-tight"
                    style={{ color: colors.secondary }}
                  >
                    {item.value > 999 ? `${(item.value / 1000).toFixed(1)}k` : item.value}
                  </Typography>

                  <Typography
                    className="semibold text-center opacity-80 tracking-wide"
                    style={{ color: colors.secondary }}
                    size={14}
                  >
                    {item.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

          </View>

          <AgentMapView
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
          />

          <FollowersSection
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
          />

          <ServicesSection
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
          />

          <ProvidersSection
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
          />

          <OperationalHours
            agentData={agentData}
          />

          <BookingsSection
            bookings={agentRecentBookings}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
            getServiceIcon={getServiceIcon}
            getServiceColor={getServiceColor}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
          />

          <InvitesSection
            agentData={agentData} 
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
            onInvitePress={() => setShowInviteModal(true)}
            getStatusColor={getStatusColor}
          />


          <ReviewsSection
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
            renderStars={renderStars}
          />

          <View className="h-8" />
        </ScrollView>

        <InviteModal
          visible={showInviteModal}
          invitePhone={invitePhone}
          inviteMessage={inviteMessage}
          setInvitePhone={setInvitePhone}
          setInviteMessage={setInviteMessage}
          onClose={() => setShowInviteModal(false)}
          onSend={handleSendInvite}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AgentsProfileScreen;