// screens/ProductAnalyticsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { IAnalyticsData, IProductAnalyticsScreenProps, ITab, ITimeframe } from '../../../types/analyticTypes';
import { AnalyticsHeader, DemographicsTab, EngagementTab, InsightsModal, OverviewTab, PerformanceTab, TabsContainer, TimeframeModal } from './components/analytics';

// Components



const ProductAnalyticsScreen: React.FC<IProductAnalyticsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  
  // Get product data from route params
  const product = route.params?.product || {};
  
  // State management
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('7d');
  const [showTimeframeModal, setShowTimeframeModal] = useState<boolean>(false);
  const [showInsightsModal, setShowInsightsModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const timeframes: ITimeframe[] = [
    { key: '24h', label: 'Last 24 Hours', value: '24h' },
    { key: '7d', label: 'Last 7 Days', value: '7d' },
    { key: '30d', label: 'Last 30 Days', value: '30d' },
    { key: '90d', label: 'Last 3 Months', value: '90d' },
    { key: '1y', label: 'Last Year', value: '1y' },
    { key: 'all', label: 'All Time', value: 'all' },
  ];

  const tabs: ITab[] = [
    { key: 'overview', label: 'Overview', icon: 'dashboard' },
    { key: 'engagement', label: 'Engagement', icon: 'trending-up' },
    { key: 'demographics', label: 'Demographics', icon: 'people' },
    { key: 'performance', label: 'Performance', icon: 'bar-chart' },
  ];

  // Mock analytics data - In real app, this would come from API
  const analyticsData: IAnalyticsData = {
    overview: {
      totalViews: 1247,
      uniqueViews: 892,
      inquiries: 43,
      favorites: 78,
      shares: 23,
      agentVisits: 15,
      conversionRate: 3.4,
      averageViewTime: '2m 34s',
    },
    trends: {
      views: [120, 150, 180, 220, 190, 240, 280],
      inquiries: [3, 5, 7, 6, 8, 4, 10],
      favorites: [8, 12, 15, 10, 18, 14, 20],
      shares: [2, 3, 1, 4, 2, 5, 6],
    },
    demographics: {
      ageGroups: [
        { name: '18-24', population: 156, color: '#FF6B6B', legendFontColor: '#7F7F7F' },
        { name: '25-34', population: 298, color: '#4ECDC4', legendFontColor: '#7F7F7F' },
        { name: '35-44', population: 234, color: '#45B7D1', legendFontColor: '#7F7F7F' },
        { name: '45-54', population: 187, color: '#96CEB4', legendFontColor: '#7F7F7F' },
        { name: '55+', population: 125, color: '#FFEAA7', legendFontColor: '#7F7F7F' },
      ],
      locations: [
        { city: 'Accra', views: 423, percentage: 33.9 },
        { city: 'Kumasi', views: 298, percentage: 23.9 },
        { city: 'Tamale', views: 156, percentage: 12.5 },
        { city: 'Cape Coast', views: 134, percentage: 10.7 },
        { city: 'Others', views: 236, percentage: 18.9 },
      ],
    },
    performance: {
      ranking: 23,
      totalProducts: 1500,
      categoryRanking: 5,
      categoryTotal: 250,
      viewsVsCategory: 15.2,
      searchKeywords: [
        { keyword: 'iPhone 13', searches: 89, rank: 3 },
        { keyword: 'smartphone', searches: 67, rank: 7 },
        { keyword: 'apple phone', searches: 45, rank: 12 },
        { keyword: 'used iphone', searches: 34, rank: 18 },
        { keyword: 'mobile phone', searches: 28, rank: 25 },
      ],
    },
  };

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

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTimeframeSelect = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab data={analyticsData} />;
      case 'engagement':
        return <EngagementTab data={analyticsData} />;
      case 'demographics':
        return <DemographicsTab data={analyticsData} />;
      case 'performance':
        return <PerformanceTab data={analyticsData} />;
      default:
        return <OverviewTab data={analyticsData} />;
    }
  };

  return (
    <View className="flex-1 bg-background">
      <AnalyticsHeader
        product={product}
        selectedTimeframe={selectedTimeframe}
        timeframes={timeframes}
        onBack={handleBack}
        onTimeframePress={() => setShowTimeframeModal(true)}
        onInsightsPress={() => setShowInsightsModal(true)}
      />
      
      <TabsContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          {renderTabContent()}
        </Animated.View>
      </ScrollView>

      <TimeframeModal
        visible={showTimeframeModal}
        timeframes={timeframes}
        selectedTimeframe={selectedTimeframe}
        onClose={() => setShowTimeframeModal(false)}
        onSelect={handleTimeframeSelect}
      />

      <InsightsModal
        visible={showInsightsModal}
        onClose={() => setShowInsightsModal(false)}
      />
    </View>
  );
};

export default ProductAnalyticsScreen;