import { useNavigation } from '@react-navigation/native';
import React, { JSX, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    RefreshControl,
    View
} from 'react-native';
import { colors } from '../../../constants/theme/colors';
import { IDashboardProps, ITab, ITimeframe } from '../../../types/agentShopTypes';
import { dashboardData } from '../../../utils/dummyData';
import AnalyticsTab from './components/dashboard/AnalyticsTab';
import CollapsibleHeader from './components/dashboard/CollapsibleHeader';
import DashboardTabs from './components/dashboard/DashboardTabs';
import InsightsTab from './components/dashboard/InsightsTab';
import OverviewTab from './components/dashboard/OverviewTab';
import ProductsTab from './components/dashboard/ProductsType';
import TimeframeModal from './components/dashboard/TimeFrameModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Platform-specific constants
const HEADER_MAX_HEIGHT = Platform.OS === 'ios' ? 250 : 170;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 100 : 50;
const TABS_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const AgentShopDashboardScreen: React.FC<IDashboardProps> = () => {
  const navigation = useNavigation();
  
  // State management
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('7d');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showTimeframeModal, setShowTimeframeModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const timeframes: ITimeframe[] = [
    { key: '24h', label: 'Last 24 Hours', value: '24h' },
    { key: '7d', label: 'Last 7 Days', value: '7d' },
    { key: '30d', label: 'Last 30 Days', value: '30d' },
    { key: '90d', label: 'Last 3 Months', value: '90d' },
    { key: '1y', label: 'Last Year', value: '1y' },
  ];

  const tabs: ITab[] = [
    { key: 'overview', label: 'Overview', icon: 'dashboard' },
    { key: 'products', label: 'Products', icon: 'inventory' },
    { key: 'analytics', label: 'Analytics', icon: 'bar-chart' },
    { key: 'insights', label: 'Insights', icon: 'lightbulb' },
  ];

  useEffect(() => {
    // Initial animations
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
  }, [fadeAnim, slideAnim]);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Header animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab dashboardData={dashboardData} />;
      case 'products':
        return <ProductsTab dashboardData={dashboardData} navigation={navigation} />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'insights':
        return <InsightsTab />;
      default:
        return <OverviewTab dashboardData={dashboardData} />;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Collapsible Header */}
      <CollapsibleHeader
        scrollY={scrollY}
        navigation={navigation}
        dashboardData={dashboardData}
        selectedTimeframe={selectedTimeframe}
        timeframes={timeframes}
        setShowTimeframeModal={setShowTimeframeModal}
        headerHeight={headerHeight}
        HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
        HEADER_MIN_HEIGHT={HEADER_MIN_HEIGHT}
        HEADER_SCROLL_DISTANCE={HEADER_SCROLL_DISTANCE}
      />
      
      {/* Animated Tabs */}
      <DashboardTabs
        headerHeight={headerHeight}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Main Content */}
      <Animated.ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT + TABS_HEIGHT,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
      >
        <Animated.View 
          style={[
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          {renderTabContent()}
        </Animated.View>
      </Animated.ScrollView>

      <TimeframeModal
        visible={showTimeframeModal}
        timeframes={timeframes}
        selectedTimeframe={selectedTimeframe}
        onSelect={setSelectedTimeframe}
        onClose={() => setShowTimeframeModal(false)}
      />
    </View>
  );
};

export default AgentShopDashboardScreen;