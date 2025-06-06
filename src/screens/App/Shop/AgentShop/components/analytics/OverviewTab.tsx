// components/OverviewTab.tsx
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { IAnalyticsData } from '../../../../../../types/analyticTypes';
import MetricCard from './MetricCard';

interface IOverviewTabProps {
  data: IAnalyticsData;
}

const { width: screenWidth } = Dimensions.get('window');

const OverviewTab: React.FC<IOverviewTabProps> = ({ data }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View className="p-5">
      {/* Key Metrics */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Key Metrics</Text>
        <View className="flex-row flex-wrap gap-3">
          <View className="w-[48%]">
            <MetricCard
              title="Total Views"
              value={formatNumber(data.overview.totalViews)}
              change={12.5}
              icon="visibility"
              color="#FFCC00"
            />
          </View>
          <View className="w-[48%]">
            <MetricCard
              title="Inquiries"
              value={data.overview.inquiries.toString()}
              change={8.3}
              icon="question-answer"
              color="#00BFA5"
            />
          </View>
          <View className="w-[48%]">
            <MetricCard
              title="Favorites"
              value={data.overview.favorites.toString()}
              change={-2.1}
              icon="favorite"
              color="#F44336"
            />
          </View>
          <View className="w-[48%]">
            <MetricCard
              title="Agent Views"
              value={data.overview.agentVisits.toString()}
              change={15.7}
              icon="store"
              color="#4CAF50"
            />
          </View>
        </View>
      </View>

      {/* Views Trend Chart */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Views Trend</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {/* Chart would go here - placeholder for now */}
          <View className="h-55 bg-gray-100 rounded-lg items-center justify-center">
            <Text className="text-gray-medium">Chart Component Here</Text>
            <Text className="text-xs text-text-secondary mt-1">
              Mon-Sun: {data.trends.views.join(', ')}
            </Text>
          </View>
        </View>
      </View>

      {/* Performance Summary */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Performance Summary</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm">
          <View className="flex-row justify-between items-center py-3 border-b border-gray-light">
            <Text className="text-sm text-text-secondary">Conversion Rate</Text>
            <Text className="text-base font-bold text-text-primary">
              {data.overview.conversionRate}%
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-3 border-b border-gray-light">
            <Text className="text-sm text-text-secondary">Avg. View Time</Text>
            <Text className="text-base font-bold text-text-primary">
              {data.overview.averageViewTime}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-3 border-b border-gray-light">
            <Text className="text-sm text-text-secondary">Unique Views</Text>
            <Text className="text-base font-bold text-text-primary">
              {formatNumber(data.overview.uniqueViews)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-sm text-text-secondary">Share Rate</Text>
            <Text className="text-base font-bold text-text-primary">
              {((data.overview.shares / data.overview.totalViews) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OverviewTab;