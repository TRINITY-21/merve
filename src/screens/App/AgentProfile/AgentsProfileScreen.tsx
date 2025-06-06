
// Main AgentsProfileScreen.tsx (Complete with all components)
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  View
} from 'react-native';
import { colors } from '../../../constants/theme/colors';
import { agentData, agentMarketplaceData, agentRecentBookings } from '../../../utils/agentProfileDummyData';
import { BookingsSection } from './components/profile/AgentBookingSection';
import { FollowersSection } from './components/profile/AgentFollowerSection';
import { InviteModal } from './components/profile/AgentInviteModal';
import { InvitesSection } from './components/profile/AgentInvitesSection';
import { AgentMapView } from './components/profile/AgentMapLocation';
import { MarketplaceSection } from './components/profile/AgentMarketPlace';
import { OperationalHours } from './components/profile/AgentOperationalHours';
import { AgentProfileHeader } from './components/profile/AgentProfileHeader';
import { ProvidersSection } from './components/profile/AgentProviderSection';
import { RecentActivities } from './components/profile/AgentRecentActivities';
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
        <MaterialIcons key={i} name="star" size={14} color={colors.white} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <MaterialIcons key="half" name="star-half" size={14} color={colors.white} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialIcons key={`empty-${i}`} name="star-border" size={14} color={colors.gray.medium} />
      );
    }

    return stars;
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <AgentProfileHeader
          agentData={agentData}
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          onInvitePress={() => setShowInviteModal(true)}
          headerScaleAnim={headerScaleAnim}
          renderStars={renderStars}
          navigation={navigation}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        >
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

          <MarketplaceSection
            marketplaceData={agentMarketplaceData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
          />

          <InvitesSection
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
            onInvitePress={() => setShowInviteModal(true)}
            getStatusColor={getStatusColor}
          />

          <RecentActivities
            agentData={agentData}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            navigation={navigation}
            renderStars={renderStars}
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