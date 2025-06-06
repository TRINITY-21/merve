// components/PerformanceTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IAnalyticsData } from '../../../../../types/analyticTypes';

interface IPerformanceTabProps {
  data: IAnalyticsData;
}

const PerformanceTab: React.FC<IPerformanceTabProps> = ({ data }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const optimizationItems = [
    { icon: 'check-circle', text: 'Title optimized', color: '#4CAF50' },
    { icon: 'check-circle', text: 'Images high quality', color: '#4CAF50' },
    { icon: 'warning', text: 'Add more tags', color: '#FF9800' },
    { icon: 'error', text: 'Update description', color: '#F44336' },
  ];

  return (
    <View className="p-5">
      {/* Rankings */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Performance Rankings</Text>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-xl p-5 shadow-sm items-center">
            <View className="w-15 h-15 rounded-full bg-primary/20 items-center justify-center mb-3">
              <Text className="text-xl font-extrabold text-primary">
                #{data.performance.ranking}
              </Text>
            </View>
            <Text className="text-sm font-semibold text-text-primary mb-1">
              Overall Ranking
            </Text>
            <Text className="text-xs text-text-secondary text-center">
              out of {formatNumber(data.performance.totalProducts)} products
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-5 shadow-sm items-center">
            <View className="w-15 h-15 rounded-full bg-success/20 items-center justify-center mb-3">
              <Text className="text-xl font-extrabold text-success">
                #{data.performance.categoryRanking}
              </Text>
            </View>
            <Text className="text-sm font-semibold text-text-primary mb-1">
              Category Ranking
            </Text>
            <Text className="text-xs text-text-secondary text-center">
              out of {data.performance.categoryTotal} in category
            </Text>
          </View>
        </View>
      </View>

      {/* Performance Comparison */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">vs Category Average</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
            <Text className="text-2xl font-extrabold text-success ml-2">
              +{data.performance.viewsVsCategory}%
            </Text>
          </View>
          <Text className="text-sm text-text-secondary mb-3">Above category average</Text>
          <View className="h-2 bg-gray-light rounded">
            <View className="w-[65%] h-full bg-success rounded" />
          </View>
        </View>
      </View>

      {/* Search Keywords */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Top Search Keywords</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm">
          {data.performance.searchKeywords.map((keyword, index) => (
            <View key={index} className="flex-row items-center py-3 border-b border-gray-light last:border-b-0">
              <View className="w-8 h-8 rounded-full bg-background items-center justify-center mr-3">
                <Text className="text-xs font-bold text-text-primary">
                  #{keyword.rank}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-text-primary">
                  {keyword.keyword}
                </Text>
                <Text className="text-xs text-text-secondary">
                  {keyword.searches} searches
                </Text>
              </View>
              <MaterialIcons name="search" size={20} color="#9E9E9E" />
            </View>
          ))}
        </View>
      </View>

      {/* Optimization Score */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Optimization Score</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm flex-row">
          <View className="w-20 h-20 rounded-full bg-success/20 items-center justify-center mr-5">
            <Text className="text-2xl font-extrabold text-success">87</Text>
            <Text className="text-xs text-text-secondary">/ 100</Text>
          </View>
          <View className="flex-1 space-y-2">
            {optimizationItems.map((item, index) => (
              <View key={index} className="flex-row items-center">
                <MaterialIcons 
                  name={item.icon as any} 
                  size={16} 
                  color={item.color} 
                />
                <Text className="text-sm text-text-primary ml-2">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PerformanceTab;