// screens/VendorScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { DEFAULT_CHART_CONFIG, MOCK_VENDOR_STATS, VENDOR_BENEFITS, VENDOR_SCREEN_TITLES } from '../../../constants/vendorConstant';
import { IUser, IVendorScreenProps, IVendorStatus } from '../../../types/vendorTypes';
import BenefitsSection from './components/vendor/BenefitSection';
import CTASection from './components/vendor/CTASection';
import NonVendorHero from './components/vendor/NonVendorHero';
import VendorChartCard from './components/vendor/VendorChartCard';
import VendorHeader from './components/vendor/VendorHeader';
import VendorStatsCard from './components/vendor/VendorStatsCard';
import VendorStatusCard from './components/vendor/VendorStatusCard';
import VendorUpgradeCard from './components/vendor/VendorUpgradeCard';

// Components


// Utils

// Note: You'll need to replace this with your actual store hook
interface IStore {
  user: IUser;
  toggleVendorMode: () => void;
}

// Mock store hook - replace with your actual implementation
const useStore = (): IStore => ({
  user: { isVendor: false, name: 'John Doe' },
  toggleVendorMode: () => console.log('Toggle vendor mode'),
});

const VendorScreen: React.FC<IVendorScreenProps> = ({
  user: propUser,
  vendorStats = MOCK_VENDOR_STATS,
  onToggleVendorMode,
}) => {
  const navigation = useNavigation();
  const store = useStore();
  const user = propUser || store.user;
  
  const [vendorStatus, setVendorStatus] = useState<IVendorStatus>({
    isAvailable: true,
    cashInEnabled: true,
    cashOutEnabled: true,
  });

  const handleStatusChange = (newStatus: Partial<IVendorStatus>): void => {
    setVendorStatus(prev => ({ ...prev, ...newStatus }));
    
    // If disabling availability, also disable services
    if (newStatus.isAvailable === false) {
      setVendorStatus(prev => ({
        ...prev,
        ...newStatus,
        cashInEnabled: false,
        cashOutEnabled: false,
      }));
    }
  };

  const handleUpgrade = (): void => {
    Alert.alert(
      'Upgrade to Premium',
      'Get access to advanced features and analytics.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Learn More', onPress: () => navigation.navigate('PremiumFeatures' as never) },
      ]
    );
  };

  const handleStartAsAgent = (): void => {
    navigation.navigate('AgentRegistration' as never);
  };

  const renderVendorDashboard = () => (
    <ScrollView showsVerticalScrollIndicator={false} className="pb-10">
      <VendorStatusCard
        status={vendorStatus}
        onStatusChange={handleStatusChange}
      />
      
      <VendorStatsCard stats={vendorStats} />
      
      <VendorChartCard
        weeklyData={vendorStats.weeklyData}
        chartConfig={DEFAULT_CHART_CONFIG}
      />
      
      <VendorUpgradeCard onLearnMore={handleUpgrade} />
    </ScrollView>
  );

  const renderNonVendorView = () => (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <NonVendorHero onGetStarted={handleStartAsAgent} />
      
      <BenefitsSection benefits={VENDOR_BENEFITS} />
      
      <CTASection onStartAsAgent={handleStartAsAgent} />
    </ScrollView>
  );

  return (
    <View className="flex-1">
      <VendorHeader
        title={
          user.isVendor 
            ? VENDOR_SCREEN_TITLES.VENDOR_DASHBOARD 
            : VENDOR_SCREEN_TITLES.BECOME_AGENT
        }
        onBack={() => navigation.goBack()}
      />
      
      {user.isVendor ? renderVendorDashboard() : renderNonVendorView()}
    </View>
  );
};

export default VendorScreen;