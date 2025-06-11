
// Main AgentBookingManagementScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Platform,
    RefreshControl,
    TouchableOpacity,
    View
} from 'react-native';
import { Typography } from '../../../../components/common';
import { colors } from '../../../../constants/theme/colors';
import {
    IBookingRequest,
    INotificationSettings,
    IServiceType,
    ITab,
    IUrgencyFilter,
    IWorkingHours
} from '../../../../types/agentBookingTypes';
import { dummyBookingRequests } from '../../../../utils/agentBookingDummyData';
import { CompletedView } from '../components/agent/AgentBookingCompletedView';
import { FilterChips } from '../components/agent/AgentBookingFilterChips';
import { AgentBookingManagementHeader } from '../components/agent/AgentBookingManagementHeader';
import { BookingRequestCard } from '../components/agent/AgentBookingRequestCard';
import { SettingsView } from '../components/agent/AgentBookingSettings';
import { ScheduleView } from '../components/agent/AgentScheduleView';

// Import components


const { width: screenWidth } = Dimensions.get('window');


interface NavigationProps {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
}

const AgentBookingManagementScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();

    // State management
    const [activeTab, setActiveTab] = useState<string>('requests');
    const [bookingRequests, setBookingRequests] = useState<IBookingRequest[]>(dummyBookingRequests);
    const [filteredRequests, setFilteredRequests] = useState<IBookingRequest[]>(dummyBookingRequests);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
    const [selectedService, setSelectedService] = useState<string>('all');
const [showHistoryOverlay, setShowHistoryOverlay] = useState<boolean>(false);
const [showDateFilter, setShowDateFilter] = useState(false);

    // Agent settings
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [autoAccept, setAutoAccept] = useState<boolean>(false);
    const [maxDailyBookings, setMaxDailyBookings] = useState<string>('10');
    const [workingHours, setWorkingHours] = useState<IWorkingHours>({
        start: '08:00',
        end: '18:00'
    });
    const [availableDays, setAvailableDays] = useState<string[]>([
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]);
    const [notificationSettings, setNotificationSettings] = useState<INotificationSettings>({
        newRequests: true,
        reminders: true,
        cancellations: true,
    });

    // Modal states
    const [showTimePickerStart, setShowTimePickerStart] = useState<boolean>(false);
    const [showTimePickerEnd, setShowTimePickerEnd] = useState<boolean>(false);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;
    const tabSlideAnim = useRef(new Animated.Value(0)).current;

    const tabs: ITab[] = [
        {
            key: 'requests',
            label: 'Requests',
            icon: 'notification-important',
            count: bookingRequests.filter(b => b.status === 'pending').length
        },
        {
            key: 'accepted',
            label: 'Accepted',
            icon: 'event-available',
            count: bookingRequests.filter(b => b.status === 'accepted').length
        },
        {
            key: 'schedule',
            label: 'Schedule',
            icon: 'calendar-today',
            count: 0
        },
        {
            key: 'settings',
            label: 'Settings',
            icon: 'settings',
            count: 0
        }
    ];

    const serviceTypes: IServiceType[] = [
        { key: 'all', label: 'All Services', icon: 'apps', color: colors.gray.medium },
        { key: 'cash_out', label: 'Cash Out', icon: 'arrow-upward', color: colors.error },
        { key: 'cash_in', label: 'Cash In', icon: 'arrow-downward', color: colors.success },
        { key: 'bill_payment', label: 'Bill Payment', icon: 'receipt', color: colors.warning },
        { key: 'airtime', label: 'Airtime', icon: 'phone', color: colors.accent },
    ];

    const urgencyFilters: IUrgencyFilter[] = [
        { key: 'all', label: 'All Priority', color: colors.gray.medium },
        { key: 'high', label: 'High', color: colors.error },
        { key: 'normal', label: 'Normal', color: colors.success },
        { key: 'low', label: 'Low', color: colors.accent },
    ];

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
        ]).start();
    }, []);

    useEffect(() => {
        let filtered = [...bookingRequests];

        if (activeTab === 'requests') {
            filtered = filtered.filter(booking => booking.status === 'pending');
        } else if (activeTab === 'accepted') {
            filtered = filtered.filter(booking => booking.status === 'accepted');
        }

        if (selectedUrgency !== 'all') {
            filtered = filtered.filter(booking => booking.urgency === selectedUrgency);
        }

        if (selectedService !== 'all') {
            filtered = filtered.filter(booking => booking.serviceType === selectedService);
        }

        filtered.sort((a, b) => {
            const urgencyOrder = { high: 3, normal: 2, low: 1 };
            if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
                return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setFilteredRequests(filtered);
    }, [bookingRequests, activeTab, selectedUrgency, selectedService]);

    const handleTabChange = (tabKey: string): void => {
        setActiveTab(tabKey);
        const tabIndex = tabs.findIndex(tab => tab.key === tabKey);
        Animated.spring(tabSlideAnim, {
            toValue: tabIndex * (screenWidth / tabs.length),
            useNativeDriver: false,
        }).start();
    };

    const handleRefresh = (): void => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const getUrgencyColor = (urgency: string): string => {
        switch (urgency) {
            case 'high': return colors.error;
            case 'normal': return colors.success;
            case 'low': return colors.accent;
            default: return colors.gray.medium;
        }
    };

    const getServiceIcon = (service: string): string => {
        const serviceType = serviceTypes.find(s => s.key === service);
        return serviceType ? serviceType.icon : 'help';
    };

    const getServiceColor = (service: string): string => {
        const serviceType = serviceTypes.find(s => s.key === service);
        return serviceType ? serviceType.color : colors.gray.medium;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string): string => {
        return timeString;
    };

    const getTimeAgo = (dateString: string): string => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInHours = (now.getTime() - past.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return `${Math.floor(diffInHours / 24)}d ago`;
        }
    };

    const handleBookingAction = (bookingId: string, action: string): void => {
        const booking = bookingRequests.find(b => b.id === bookingId);
        const actionText = action === 'accept' ? 'accept' : action === 'decline' ? 'decline' : 'complete';

        Alert.alert(
            `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Booking`,
            `Are you sure you want to ${actionText} this booking from ${booking?.customerName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setBookingRequests(prev => prev.map(req =>
                            req.id === bookingId
                                ? {
                                    ...req,
                                    status: action === 'accept' ? 'accepted' :
                                        action === 'decline' ? 'declined' : 'completed' as any
                                }
                                : req
                        ));

                        Alert.alert(
                            'Success',
                            `Booking ${actionText}ed successfully!`
                        );
                    }
                }
            ]
        );
    };

    const handleDayToggle = (day: string): void => {
        setAvailableDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const handleNotificationToggle = (key: string, value: boolean): void => {
        setNotificationSettings(prev => ({ ...prev, [key]: value }));
    };

    const renderBookingRequestCard = ({ item }: { item: IBookingRequest }) => (
        <BookingRequestCard
            request={item}
            fadeAnim={fadeAnim}
            onAction={handleBookingAction}
            onMessage={(customerName) => navigation.navigate('Chat', { customer: customerName })}
            getServiceIcon={getServiceIcon}
            getServiceColor={getServiceColor}
            getUrgencyColor={getUrgencyColor}
            formatDate={formatDate}
            formatTime={formatTime}
            getTimeAgo={getTimeAgo}
        />
    );

 return (
  <View className="flex-1" style={{ backgroundColor: colors.background }}>
    {showHistoryOverlay ? (
      <View style={{ flex: 1 }}>
        {/* Simple header with back button and filter */}
        <View style={{
          paddingTop: Platform.OS === 'ios' ? 60 : 20,
          paddingBottom: 10,
          paddingHorizontal: 16,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity
            onPress={() => setShowHistoryOverlay(false)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.secondary} />
          </TouchableOpacity>
          
          <Typography style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.secondary,
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}>
            Transaction History
          </Typography>

          <TouchableOpacity
            onPress={() => setShowDateFilter(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="filter-list" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        
        {/* CompletedView goes here */}
        <CompletedView
          bookingRequests={bookingRequests}
          navigation={navigation}
          showDateFilter={showDateFilter}
          onShowDateFilter={setShowDateFilter}
        />
      </View>
    ) : (
      <>
        <AgentBookingManagementHeader
          navigation={navigation}
          activeTab={activeTab}
          tabs={tabs}
          isAvailable={isAvailable}
          onTabChange={handleTabChange}
          onHistoryPress={() => setShowHistoryOverlay(true)}
          tabSlideAnim={tabSlideAnim}
        />

        <View className="flex-1 pt-2.5">
          {(activeTab === 'requests' || activeTab === 'accepted') && (
            <FilterChips
              serviceTypes={serviceTypes}
              urgencyFilters={urgencyFilters}
              selectedService={selectedService}
              selectedUrgency={selectedUrgency}
              onServiceChange={setSelectedService}
              onUrgencyChange={setSelectedUrgency}
            />
          )}

          {activeTab === 'schedule' ? (
            <ScheduleView
              bookingRequests={bookingRequests}
              navigation={navigation}
            />
          ) : activeTab === 'settings' ? (
            <SettingsView
              isAvailable={isAvailable}
              workingHours={workingHours}
              availableDays={availableDays}
              autoAccept={autoAccept}
              maxDailyBookings={maxDailyBookings}
              notificationSettings={notificationSettings}
              onAvailabilityToggle={setIsAvailable}
              onStartTimePress={() => setShowTimePickerStart(true)}
              onEndTimePress={() => setShowTimePickerEnd(true)}
              onDayToggle={handleDayToggle}
              onAutoAcceptToggle={setAutoAccept}
              onMaxBookingsChange={setMaxDailyBookings}
              onNotificationToggle={handleNotificationToggle}
            />
          ) : (
            <FlatList
              data={filteredRequests}
              renderItem={renderBookingRequestCard}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                />
              }
              ListEmptyComponent={
                <View className="items-center justify-center py-40">
                  <MaterialIcons
                    name={activeTab === 'requests' ? 'event-busy' : 'event-available'}
                    size={64}
                    color={colors.gray.medium}
                  />
                  <Typography className="text-lg font-bold mt-4 mb-2" style={{ color: colors.text.primary }}>
                    {activeTab === 'requests' ? 'No pending requests' : 'No accepted bookings'}
                  </Typography>
                  <Typography variant='regular' size={14} className="text-sm text-center px-10" style={{ color: colors.text.secondary }}>
                    {activeTab === 'requests'
                      ? 'New booking requests will appear here'
                      : 'Your accepted appointments will show here'
                    }
                  </Typography>
                </View>
              }
            />
          )}
        </View>

        {/* Time Pickers */}
        {showTimePickerStart && (
          <DateTimePicker
            value={new Date(`2000-01-01T${workingHours.start}:00`)}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowTimePickerStart(false);
              if (time) {
                setWorkingHours(prev => ({
                  ...prev,
                  start: time.toTimeString().slice(0, 5)
                }));
              }
            }}
          />
        )}

        {showTimePickerEnd && (
          <DateTimePicker
            value={new Date(`2000-01-01T${workingHours.end}:00`)}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowTimePickerEnd(false);
              if (time) {
                setWorkingHours(prev => ({
                  ...prev,
                  end: time.toTimeString().slice(0, 5)
                }));
              }
            }}
          />
        )}
      </>
    )}


  </View>
);
};

export default AgentBookingManagementScreen;