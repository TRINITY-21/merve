// AgentEditScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { IAgentData, ITabConfig, IWorkingHours, IWorkingHoursDay } from '../../../types/editProfileTypes';
import { EditProfileHeader, TabBar, TabContent } from './components/editProfile';


const AgentEditScreen: React.FC = () => {
  const navigation = useNavigation();
  
  // State management
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('profile');

  // Form data state
  const [agentData, setAgentData] = useState<IAgentData>({
    // Personal Information
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+233 24 123 4567',
    whatsapp: '+233 24 123 4567',
    dateOfBirth: '1985-08-15',
    gender: 'Male',
    idNumber: 'GHA-123456789-0',
    idType: 'National ID',
    
    // Business Information
    businessName: 'Johnson Mobile Money Services',
    businessDescription: 'Professional mobile money services with fast, reliable and secure transactions for all your financial needs.',
    businessType: 'Mobile Money Agent',
    businessRegNumber: 'REG-MTN-12345',
    businessCategory: 'Financial Services',
    yearsInOperation: '3',
    
    // Location & Contact
    businessAddress: '123 Independence Avenue',
    city: 'Accra',
    region: 'Greater Accra',
    postalCode: '00233',
    landmark: 'Near Circle Interchange',
    gpsAddress: 'GA-123-4567',
    
    // Banking Information
    bankName: 'Ghana Commercial Bank',
    accountNumber: '1234567890123',
    accountName: 'Johnson Mobile Money Services',
    mobileMoneyNumber: '+233 24 123 4567',
    
    // Emergency Contact
    emergencyContactName: 'Sarah Johnson',
    emergencyContactPhone: '+233 26 987 6543',
    emergencyContactRelation: 'Sister',
    
    // Business Operations
    dailyTransactionLimit: '50000',
    monthlyTransactionLimit: '1000000',
    floatAmount: '25000',
    minimumFloatAlert: '2000',
    operatingLicense: 'LIC-MTN-98765',
    
    // Settings
    acceptsWeekendTransactions: true,
    offers24HourService: false,
    acceptsCashDeposits: true,
    acceptsCashWithdrawals: true,
    acceptsBillPayments: true,
    acceptsAirtimePurchases: true,
  });

  // Working hours state
  const [workingHours, setWorkingHours] = useState<IWorkingHoursDay>({
    monday: { open: '08:00', close: '18:00', isOpen: true },
    tuesday: { open: '08:00', close: '18:00', isOpen: true },
    wednesday: { open: '08:00', close: '18:00', isOpen: true },
    thursday: { open: '08:00', close: '18:00', isOpen: true },
    friday: { open: '08:00', close: '19:00', isOpen: true },
    saturday: { open: '09:00', close: '17:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: false },
  });

  // Original data for comparison
  const [originalData, setOriginalData] = useState<{ agentData: IAgentData; workingHours: IWorkingHours }>({ 
    agentData, 
    workingHours 
  });
  const [profileImageUri, setProfileImageUri] = useState<string>('https://i.pravatar.cc/150?img=9');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerScaleAnim = useRef(new Animated.Value(0.95)).current;

  // Input refs for navigation
  const inputRefs = useRef<Record<string, any>>({});

  // Tab configuration
  const tabs: ITabConfig[] = [
    { key: 'profile', title: 'Profile', icon: 'person' },
    { key: 'business', title: 'Business', icon: 'business' },
    { key: 'location', title: 'Location', icon: 'location-on' },
    { key: 'banking', title: 'Banking', icon: 'account-balance' },
    { key: 'hours', title: 'Hours', icon: 'schedule' },
  ];

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
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

    // Store original data
    setOriginalData({ agentData, workingHours });
  }, []);

  useEffect(() => {
    // Check for changes
    const hasFormChanges = JSON.stringify({ agentData, workingHours }) !== JSON.stringify(originalData);
    setHasChanges(hasFormChanges);
  }, [agentData, workingHours, originalData]);

  const handleInputChange = (key: keyof IAgentData, value: string | boolean): void => {
    setAgentData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWorkingHoursChange = (day: keyof IWorkingHours, field: string, value: string | boolean): void => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof IAgentData)[] = [
      'firstName', 'lastName', 'email', 'phone', 'businessName', 
      'businessAddress', 'city', 'region', 'bankName', 'accountNumber'
    ];

    for (const field of requiredFields) {
      if (!agentData[field] || (typeof agentData[field] === 'string' && agentData[field].toString().trim() === '')) {
        Alert.alert('Validation Error', `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
        return false;
      }
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agentData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    // Phone validation
    if (!/^\+233\s\d{2}\s\d{3}\s\d{4}$/.test(agentData.phone)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number (+233 XX XXX XXXX)');
      return false;
    }

    return true;
  };

  const handleSave = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOriginalData({ agentData, workingHours });
      setHasChanges(false);
      
      Alert.alert('Success', 'Agent information updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update agent information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (hasChanges) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard', 
            style: 'destructive',
            onPress: () => {
              setAgentData(originalData.agentData);
              setWorkingHours(originalData.workingHours);
              setHasChanges(false);
              navigation.goBack();
            }
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleImagePicker = (): void => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Photo Library', onPress: () => console.log('Open photo library') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const focusNextInput = (currentKey: string): void => {
    if (inputRefs.current[currentKey]) {
      inputRefs.current[currentKey].focus();
    }
  };

  return (
    <View className="flex-1 bg-background">
      <EditProfileHeader
        loading={loading}
        hasChanges={hasChanges}
        onCancel={handleCancel}
        onSave={handleSave}
        headerScaleAnim={headerScaleAnim}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TabContent
            activeTab={activeTab}
            agentData={agentData}
            workingHours={workingHours}
            profileImageUri={profileImageUri}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            inputRefs={inputRefs}
            onInputChange={handleInputChange}
            onWorkingHoursChange={handleWorkingHoursChange}
            onImagePicker={handleImagePicker}
            onFocusNextInput={focusNextInput}
          />
          
          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AgentEditScreen;