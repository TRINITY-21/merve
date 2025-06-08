// screens/AgentSettingsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, RefreshControl, ScrollView, View } from 'react-native';

import { IAgentSettingsScreenProps, IBusinessSettings, ICustomerSettings, INotificationSettings, IOperationalSettings, ISecuritySettings, IServiceSettings, ISettingsSection, SettingsSectionId } from '../../../types/agentSettingsTypes';
import AgentSettingsHeader from './components/settings/AgentSettingsHeader';
import BusinessSettings from './components/settings/BusinessSettings';
import CustomerSettings from './components/settings/CustomerSettings';
import NotificationSettings from './components/settings/NotificationSettings';
import OperationalSettings from './components/settings/OperationalSettings';
import SecuritySettings from './components/settings/SecuritySettings';
import ServiceSettings from './components/settings/ServiceSettings';
import SettingsSection from './components/settings/SettingsSection';

const AgentSettingsScreen: React.FC<IAgentSettingsScreenProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Agent settings state
  const [businessSettings, setBusinessSettings] = useState<IBusinessSettings>({
    businessName: 'Johnson Mobile Money Services',
    businessDescription: 'Professional mobile money services with fast and reliable transactions.',
    businessType: 'Mobile Money Agent',
    autoAcceptTransactions: true,
    dailyTransactionLimit: 'GH₵ 50,000',
    requireCustomerID: false,
    businessHours24: false,
    weekendOperations: true,
  });

  const [serviceSettings, setServiceSettings] = useState<IServiceSettings>({
    cashIn: { enabled: true, commission: 0.5, dailyLimit: 20000 },
    cashOut: { enabled: true, commission: 1.0, dailyLimit: 15000 },
    billPayment: { enabled: true, commission: 0.3, dailyLimit: 10000 },
    airtime: { enabled: true, commission: 2.0, dailyLimit: 5000 },
    dataBundle: { enabled: false, commission: 1.5, dailyLimit: 3000 },
    bankTransfer: { enabled: true, commission: 0.8, dailyLimit: 25000 },
  });

  const [notificationSettings, setNotificationSettings] = useState<INotificationSettings>({
    transactionAlerts: true,
    dailyReports: true,
    lowBalanceAlerts: true,
    customerReviews: true,
    systemUpdates: true,
    promotionalOffers: false,
    securityAlerts: true,
    maintenanceNotices: true,
  });

  const [securitySettings, setSecuritySettings] = useState<ISecuritySettings>({
    twoFactorAuth: true,
    biometricAuth: false,
    autoLogout: true,
    sessionTimeout: '30 minutes',
    suspiciousActivityAlerts: true,
    requirePinForTransactions: true,
    allowRemoteAccess: false,
    encryptTransactionData: true,
  });

  const [customerSettings, setCustomerSettings] = useState<ICustomerSettings>({
    showRating: true,
    allowReviews: true,
    customerSupport24: false,
    automaticReceipts: true,
    customerVerification: 'Optional',
    shareContactInfo: true,
    loyaltyProgram: false,
    customerFeedbackAlerts: true,
  });

  const [operationalSettings, setOperationalSettings] = useState<IOperationalSettings>({
    floatManagement: 'Auto-replenish',
    lowFloatThreshold: 'GH₵ 1,000',
    highVolumeAlerts: true,
    performanceReports: 'Weekly',
    backupLocation: 'Cloud',
    dataRetention: '12 months',
    complianceMode: 'Standard',
    auditTrail: true,
  });

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;

  // Settings sections configuration
  const settingsSections: ISettingsSection[] = [
    {
      id: 'business',
      title: 'Business Settings',
      icon: 'business',
      color: '#FFCC00',
      expandable: true,
    },
    {
      id: 'services',
      title: 'Service Management',
      icon: 'settings-applications',
      color: '#00BFA5',
      expandable: true,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications',
      color: '#FF9800',
      expandable: true,
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: 'security',
      color: '#F44336',
      expandable: true,
    },
    {
      id: 'customer',
      title: 'Customer Experience',
      icon: 'people',
      color: '#4CAF50',
      expandable: true,
    },
    {
      id: 'operational',
      title: 'Operations & Compliance',
      icon: 'assessment',
      color: '#1E3A5F',
      expandable: true,
    },
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
    ]).start();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleBusinessToggleChange = (key: keyof IBusinessSettings, value: boolean) => {
    setBusinessSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleServiceChange = (serviceKey: string, settingKey: keyof IServiceSettings, value: any) => {
    setServiceSettings(prev => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey as keyof IServiceSettings],
        [settingKey]: value
      }
    }));
    setHasChanges(true);
  };

  const handleNotificationToggleChange = (key: keyof INotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSecurityToggleChange = (key: keyof ISecuritySettings, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleCustomerToggleChange = (key: keyof ICustomerSettings, value: boolean) => {
    setCustomerSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleOperationalToggleChange = (key: keyof IOperationalSettings, value: boolean) => {
    setOperationalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    Alert.alert(
      'Save Settings',
      'Are you sure you want to save all changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          style: 'default',
          onPress: () => {
            // Simulate API call
            setTimeout(() => {
              setHasChanges(false);
              Alert.alert('Success', 'Settings saved successfully!');
            }, 1000);
          }
        }
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default values. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset all settings to default
            Alert.alert('Settings Reset', 'All settings have been reset to default values.');
          }
        }
      ]
    );
  };

  const handleNavigateToEdit = () => {
    navigation.navigate('EditAgentProfile' as never);
  };

  const renderSectionContent = (sectionId: SettingsSectionId) => {
    switch (sectionId) {
      case 'business':
        return (
          <BusinessSettings
            settings={businessSettings}
            onToggleChange={handleBusinessToggleChange}
            onNavigateToEdit={handleNavigateToEdit}
          />
        );
      case 'services':
        return (
          <ServiceSettings
            settings={serviceSettings}
            onServiceChange={handleServiceChange}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={notificationSettings}
            onToggleChange={handleNotificationToggleChange}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            settings={securitySettings}
            onToggleChange={handleSecurityToggleChange}
          />
        );
      case 'customer':
        return (
          <CustomerSettings
            settings={customerSettings}
            onToggleChange={handleCustomerToggleChange}
          />
        );
      case 'operational':
        return (
          <OperationalSettings
            settings={operationalSettings}
            onToggleChange={handleOperationalToggleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-background">
      <AgentSettingsHeader
        hasChanges={hasChanges}
        onBack={() => navigation.goBack()}
        onReset={handleResetSettings}
        onSave={handleSaveSettings}
      />
      
      <ScrollView
        className="flex-1 p-0 m-0"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={ 
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#FFCC00']}
            tintColor="#FFCC00"
          />
        }
      >
        <Animated.View 
          className="px-5 pt-5"
          style={{ 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          {settingsSections.map((section) => (
            <SettingsSection
              key={section.id}
              section={section}
              isExpanded={expandedSections[section.id] || false}
              onToggle={toggleSection}
            >
              {renderSectionContent(section.id as SettingsSectionId)}
            </SettingsSection>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default AgentSettingsScreen;