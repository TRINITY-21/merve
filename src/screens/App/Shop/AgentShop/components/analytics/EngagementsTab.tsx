// components/EngagementTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IAnalyticsData } from '../../../../../../types/analyticTypes';

interface IEngagementTabProps {
  data: IAnalyticsData;
}

const EngagementTab: React.FC<IEngagementTabProps> = ({ data }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const engagementBreakdowns = [
    { label: 'Views (78%)', width: '78%', color: '#FFCC00' },
    { label: 'Favorites (6.3%)', width: '6.3%', color: '#4CAF50' },
    { label: 'Inquiries (3.4%)', width: '3.4%', color: '#00BFA5' },
    { label: 'Shares (1.8%)', width: '1.8%', color: '#FF9800' },
  ];

  return (
    <View className="p-5">
      {/* Engagement Metrics */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Engagement Overview</Text>
        <View className="flex-row flex-wrap gap-3">
          <View className="w-[48%] bg-white rounded-xl p-5 shadow-sm items-center">
            <MaterialIcons name="visibility" size={32} color="#FFCC00" />
            <Text className="text-2xl font-extrabold text-text-primary mt-2 mb-1">
              {formatNumber(data.overview.totalViews)}
            </Text>
            <Text className="text-xs text-text-secondary text-center">Total Views</Text>
          </View>
          <View className="w-[48%] bg-white rounded-xl p-5 shadow-sm items-center">
            <MaterialIcons name="favorite" size={32} color="#F44336" />
            <Text className="text-2xl font-extrabold text-text-primary mt-2 mb-1">
              {data.overview.favorites}
            </Text>
            <Text className="text-xs text-text-secondary text-center">Favorites</Text>
          </View>
          <View className="w-[48%] bg-white rounded-xl p-5 shadow-sm items-center">
            <MaterialIcons name="share" size={32} color="#00BFA5" />
            <Text className="text-2xl font-extrabold text-text-primary mt-2 mb-1">
              {data.overview.shares}
            </Text>
            <Text className="text-xs text-text-secondary text-center">Shares</Text>
          </View>
          <View className="w-[48%] bg-white rounded-xl p-5 shadow-sm items-center">
            <MaterialIcons name="question-answer" size={32} color="#4CAF50" />
            <Text className="text-2xl font-extrabold text-text-primary mt-2 mb-1">
              {data.overview.inquiries}
            </Text>
            <Text className="text-xs text-text-secondary text-center">Inquiries</Text>
          </View>
        </View>
      </View>

      {/* Engagement Trends */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Engagement Trends</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="h-55 bg-gray-100 rounded-lg items-center justify-center">
            <Text className="text-gray-medium">Bar Chart Component Here</Text>
            <Text className="text-xs text-text-secondary mt-1">
              Inquiries: {data.trends.inquiries.join(', ')}
            </Text>
          </View>
        </View>
      </View>

      {/* Engagement Breakdown */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Engagement Breakdown</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm">
          {engagementBreakdowns.map((item, index) => (
            <View key={index} className="mb-4">
              <View className="h-2 bg-gray-light rounded-sm mb-2">
                <View 
                  className="h-full rounded-sm"
                  style={{ width: item.width, backgroundColor: item.color }}
                />
              </View>
              <Text className="text-sm text-text-primary">{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EngagementTab;