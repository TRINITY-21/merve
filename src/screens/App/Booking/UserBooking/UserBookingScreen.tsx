
// Main UserBookingScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Modal,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../../../constants/theme/colors';

// Import components
import { IAgent, IBooking, IServiceType, IStatusFilter, ITab } from '../../../../types/BookingTypes';
import { userDummyAgents, userDummyBookings } from '../../../../utils/UserBookingDummyData';
import { BookingCard } from '../components/user/BookingCard';
import { BookingForm } from '../components/user/BookingForm';
import { BookingHeader } from '../components/user/BookingHeader';
import { StatusFilters } from '../components/user/StatusFilter';

const { width: screenWidth } = Dimensions.get('window');

interface NavigationProps {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
}

const UserBookingScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();

    // State management
    const [activeTab, setActiveTab] = useState<string>('bookings');
    const [bookings, setBookings] = useState<IBooking[]>(userDummyBookings);
    const [filteredBookings, setFilteredBookings] = useState<IBooking[]>(userDummyBookings);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // New booking states
    const [showNewBookingModal, setShowNewBookingModal] = useState<boolean>(false);
    const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);
    const [selectedService, setSelectedService] = useState<string>('cash_out');
    const [amount, setAmount] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [customLocation, setCustomLocation] = useState<string>('');
    const [bookingNotes, setBookingNotes] = useState<string>('');
    const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-50)).current;
    const tabSlideAnim = useRef(new Animated.Value(0)).current;

    const tabs: ITab[] = [
        { key: 'bookings', label: 'Active', icon: 'event-note', count: bookings.filter(b => ['pending', 'accepted'].includes(b.status)).length },
        { key: 'history', label: 'History', icon: 'history', count: bookings.filter(b => b.status === 'completed').length },
        { key: 'new', label: 'Book New', icon: 'add-circle', count: 0 }
    ];

    const serviceTypes: IServiceType[] = [
        { key: 'cash_out', label: 'Cash Out', icon: 'arrow-upward', color: colors.error },
        { key: 'cash_in', label: 'Cash In', icon: 'arrow-downward', color: colors.success },
        { key: 'bill_payment', label: 'Bill Payment', icon: 'receipt', color: colors.warning },
        { key: 'airtime', label: 'Airtime', icon: 'phone', color: colors.accent },
    ];

    const statusFilters: IStatusFilter[] = [
        { key: 'all', label: 'All Status', color: colors.gray.medium },
        { key: 'pending', label: 'Pending', color: colors.warning },
        { key: 'accepted', label: 'Accepted', color: colors.success },
        { key: 'completed', label: 'Completed', color: colors.accent },
        { key: 'cancelled', label: 'Cancelled', color: colors.error },
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
        let filtered = [...bookings];

        if (activeTab === 'bookings') {
            filtered = filtered.filter(booking => ['pending', 'accepted'].includes(booking.status));
        } else if (activeTab === 'history') {
            filtered = filtered.filter(booking => ['completed', 'cancelled'].includes(booking.status));
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(booking => booking.status === selectedStatus);
        }

        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setFilteredBookings(filtered);
    }, [bookings, activeTab, selectedStatus]);

    const handleTabChange = (tabKey: string): void => {
        setActiveTab(tabKey);
        const tabIndex = tabs.findIndex(tab => tab.key === tabKey);
        const tabWidth = (screenWidth - 80) / tabs.length;
        Animated.spring(tabSlideAnim, {
            toValue: tabIndex * tabWidth + 4,
            useNativeDriver: false,
        }).start();
    };

    const handleRefresh = (): void => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending': return colors.warning;
            case 'accepted': return colors.success;
            case 'completed': return colors.accent;
            case 'cancelled': return colors.error;
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

    const handleBookingAction = (bookingId: string, action: string): void => {
        Alert.alert(
            'Confirm Action',
            `Are you sure you want to ${action} this booking?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setBookings(prev => prev.map(booking =>
                            booking.id === bookingId
                                ? { ...booking, status: action === 'cancel' ? 'cancelled' : action as any }
                                : booking
                        ));
                    }
                }
            ]
        );
    };

    const handleCreateBooking = (): void => {
        if (!selectedAgent || !amount || amount === '0') {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const newBooking: IBooking = {
            id: (bookings.length + 1).toString(),
            agentName: selectedAgent.name,
            agentPhone: '+233-24-000-0000',
            serviceType: selectedService,
            amount: parseFloat(amount),
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime.toTimeString().slice(0, 5),
            location: customLocation || selectedAgent.location,
            status: 'pending',
            createdAt: new Date().toISOString(),
            notes: bookingNotes,
            reminderSet: reminderEnabled,
        };

        setBookings(prev => [newBooking, ...prev]);

        // Reset form
        setSelectedAgent(null);
        setAmount('');
        setBookingNotes('');
        setCustomLocation('');
        setSelectedDate(new Date());
        setSelectedTime(new Date());
        setShowNewBookingModal(false);

        Alert.alert('Success', 'Booking created successfully!');
    };

    const renderBookingCard = ({ item }: { item: IBooking }) => (
        
        <BookingCard
            booking={item}
            fadeAnim={fadeAnim}
            onAction={handleBookingAction}
            onMessage={(agentName) => navigation.navigate('Chat', { agent: { name: agentName } })}
            getServiceIcon={getServiceIcon}
            getServiceColor={getServiceColor}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
            formatTime={formatTime}
        />
    );

    return (
        <View className="flex-1" style={{ backgroundColor: colors.background }}>
            <BookingHeader
                navigation={navigation}
                activeTab={activeTab}
                tabs={tabs}
                onTabChange={handleTabChange}
                onNewBookingPress={() => setShowNewBookingModal(true)}
                tabSlideAnim={tabSlideAnim}
            />

            <View className="pt-5">
                {activeTab !== 'new' && (
                    <StatusFilters
                        filters={statusFilters}
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                    />
                )}

                {activeTab === 'new' ? (
                    <BookingForm
                        serviceTypes={serviceTypes}
                        agents={userDummyAgents}
                        selectedService={selectedService}
                        selectedAgent={selectedAgent}
                        amount={amount}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        customLocation={customLocation}
                        bookingNotes={bookingNotes}
                        reminderEnabled={reminderEnabled}
                        onServiceSelect={setSelectedService}
                        onAgentSelect={setSelectedAgent}
                        onAmountChange={setAmount}
                        onDatePress={() => setShowDatePicker(true)}
                        onTimePress={() => setShowTimePicker(true)}
                        onLocationChange={setCustomLocation}
                        onNotesChange={setBookingNotes}
                        onReminderToggle={() => setReminderEnabled(!reminderEnabled)}
                        onCreateBooking={handleCreateBooking}
                    />
                ) : (
                    <FlatList
                        data={filteredBookings}
                        renderItem={renderBookingCard}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[colors.primary]}
                                tintColor={colors.primary}
                            />
                        }
                        ListEmptyComponent={
                            <View className="items-center justify-center py-15">
                                <MaterialIcons
                                    name={activeTab === 'bookings' ? 'event-busy' : 'history'}
                                    size={64}
                                    color={colors.gray.medium}
                                />
                                <Text className="text-lg font-bold mt-4 mb-2" style={{ color: colors.text.primary }}>
                                    {activeTab === 'bookings' ? 'No active bookings' : 'No booking history'}
                                </Text>
                                <Text className="text-sm text-center px-10" style={{ color: colors.text.secondary }}>
                                    {activeTab === 'bookings'
                                        ? 'Create your first booking to get started'
                                        : 'Your completed bookings will appear here'
                                    }
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) setSelectedDate(date);
                    }}
                />
            )}

            {/* Time Picker */}
            {showTimePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="default"
                    onChange={(event, time) => {
                        setShowTimePicker(false);
                        if (time) setSelectedTime(time);
                    }}
                />
            )}

            {/* New Booking Modal */}
            <Modal
                visible={showNewBookingModal}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <View className="flex-1" style={{ backgroundColor: colors.background }}>
                    <View className="flex-row items-center justify-between px-5 py-5 border-b border-gray-200">
                        <TouchableOpacity
                            onPress={() => setShowNewBookingModal(false)}
                            className="w-8 h-8 rounded-2xl items-center justify-center"
                            style={{ backgroundColor: colors.gray.light }}
                        >
                            <MaterialIcons name="close" size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold" style={{ color: colors.text.primary }}>
                            New Booking
                        </Text>
                        <View className="w-6" />
                    </View>
                    <BookingForm
                        serviceTypes={serviceTypes}
                        agents={userDummyAgents}
                        selectedService={selectedService}
                        selectedAgent={selectedAgent}
                        amount={amount}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        customLocation={customLocation}
                        bookingNotes={bookingNotes}
                        reminderEnabled={reminderEnabled}
                        onServiceSelect={setSelectedService}
                        onAgentSelect={setSelectedAgent}
                        onAmountChange={setAmount}
                        onDatePress={() => setShowDatePicker(true)}
                        onTimePress={() => setShowTimePicker(true)}
                        onLocationChange={setCustomLocation}
                        onNotesChange={setBookingNotes}
                        onReminderToggle={() => setReminderEnabled(!reminderEnabled)}
                        onCreateBooking={handleCreateBooking}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default UserBookingScreen;