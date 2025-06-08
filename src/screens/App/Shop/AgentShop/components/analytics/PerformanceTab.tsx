// components/PerformanceTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../../components/common/Typography';
import { IAnalyticsData } from '../../../../../../types/analyticTypes';

interface IPerformanceTabProps {
  data: IAnalyticsData;
}

const PerformanceTab: React.FC<IPerformanceTabProps> = ({ data }) => {
  const optimizationItems = [
    { icon: 'trending-up', color: '#4CAF50', text: 'Product visibility increased by 45%' },
    { icon: 'people', color: '#2196F3', text: 'Customer engagement up by 30%' },
    { icon: 'shopping-cart', color: '#FF9800', text: 'Conversion rate improved by 25%' },
  ];

  return (
    <View className="p-5">
      {/* Performance Metrics */}
      <View className="mb-8">
        <Typography variant="bold" size={18} className="text-text-primary mb-4">Performance Metrics</Typography>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="visibility" size={24} color="#2196F3" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              {data.overview.uniqueViews}
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Total Views
            </Typography>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="shopping-cart" size={24} color="#4CAF50" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              {data.overview.conversionRate}%
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Conversion Rate
            </Typography>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="trending-up" size={24} color="#FF9800" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              {data.overview.averageViewTime}
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Avg. View Time
            </Typography>
          </View>
        </View>
      </View>

      {/* Optimization Score */}
      <View className="mb-8">
        <Typography variant="bold" size={18} className="text-text-primary mb-4">Optimization Score</Typography>
        <View className="bg-white rounded-xl p-5 shadow-sm flex-row">
          <View className="w-20 h-20 rounded-full bg-success/20 items-center justify-center mr-5">
            <Typography variant="bold" size={24} className="text-success">87</Typography>
            <Typography variant="regular" size={12} className="text-text-secondary">/ 100</Typography>
          </View>
          <View className="flex-1 space-y-2">
            {optimizationItems.map((item, index) => (
              <View key={index} className="flex-row items-center">
                <MaterialIcons 
                  name={item.icon as any} 
                  size={16} 
                  color={item.color} 
                />
                <Typography variant="regular" size={14} className="text-text-primary ml-2">{item.text}</Typography>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PerformanceTab;