import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

interface IRecommendation {
  id: number;
  icon: string;
  title: string;
  description: string;
  actionText: string;
  color: string;
}

interface ITrend {
  id: number;
  icon: string;
  text: string;
  trendIcon: string;
  trendColor: string;
}

interface IScoreItem {
  icon: string;
  text: string;
  type: 'success' | 'warning' | 'error';
}

const InsightsTab: React.FC = () => {
  const recommendations: IRecommendation[] = [
    {
      id: 1,
      icon: 'trending-up',
      title: 'Optimize Top Performers',
      description: 'Your iPhone 13 Pro Max is trending up 15.2%. Consider increasing stock.',
      actionText: 'View Details',
      color: colors.success,
    },
    {
      id: 2,
      icon: 'schedule',
      title: 'Peak Hours Opportunity',
      description: 'Most inquiries happen 6-9 PM. Schedule promotions during these hours.',
      actionText: 'Schedule',
      color: colors.primary,
    },
    {
      id: 3,
      icon: 'location-on',
      title: 'Geographic Expansion',
      description: 'Low performance in Tamale. Consider targeted marketing there.',
      actionText: 'Expand',
      color: colors.accent,
    },
    {
      id: 4,
      icon: 'warning',
      title: 'Improve SEO',
      description: 'Add more keywords to increase search visibility by 25%.',
      actionText: 'Optimize',
      color: colors.warning,
    },
  ];

  const marketTrends: ITrend[] = [
    {
      id: 1,
      icon: 'smartphone',
      text: 'Smartphone demand up 18% this month',
      trendIcon: 'trending-up',
      trendColor: colors.success,
    },
    {
      id: 2,
      icon: 'laptop',
      text: 'Laptop inquiries peak on weekends',
      trendIcon: 'info',
      trendColor: colors.primary,
    },
    {
      id: 3,
      icon: 'headphones',
      text: 'Audio accessories gaining popularity',
      trendIcon: 'trending-up',
      trendColor: colors.success,
    },
  ];

  const scoreItems: IScoreItem[] = [
    { icon: 'check-circle', text: 'High-quality images', type: 'success' },
    { icon: 'check-circle', text: 'Competitive pricing', type: 'success' },
    { icon: 'warning', text: 'Improve descriptions', type: 'warning' },
    { icon: 'error', text: 'Add more categories', type: 'error' },
  ];

  const getScoreColor = (type: 'success' | 'warning' | 'error'): string => {
    switch (type) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'error': return colors.error;
      default: return colors.gray.medium;
    }
  };

  return (
    <View className="p-5">
      {/* AI Recommendations */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">AI Recommendations</Text>
        <View className="gap-4">
          {recommendations.map((recommendation) => (
            <View key={recommendation.id} className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
              <MaterialIcons name={recommendation.icon as any} size={24} color={recommendation.color} />
              <Text className="text-base font-bold text-gray-900 mt-2 mb-2">
                {recommendation.title}
              </Text>
              <Text className="text-sm text-gray-500 leading-5 mb-3">
                {recommendation.description}
              </Text>
              <TouchableOpacity className="self-start bg-primary rounded-lg px-3 py-1.5">
                <Text className="text-xs font-semibold text-secondary">
                  {recommendation.actionText}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Market Trends */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Market Trends</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
          {marketTrends.map((trend, index) => (
            <View 
              key={trend.id} 
              className={`flex-row items-center py-3 gap-3 ${
                index < marketTrends.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <MaterialIcons name={trend.icon as any} size={20} color={colors.primary} />
              <Text className="flex-1 text-sm text-gray-900">{trend.text}</Text>
              <MaterialIcons name={trend.trendIcon as any} size={16} color={trend.trendColor} />
            </View>
          ))}
        </View>
      </View>

      {/* Performance Score */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Overall Performance Score</Text>
        <View className="bg-white rounded-xl p-5 flex-row shadow-sm shadow-black/10 elevation-4">
          <View className="w-20 h-20 rounded-full bg-blue-500/20 items-center justify-center mr-5">
            <Text className="text-2xl font-extrabold text-blue-500">82</Text>
            <Text className="text-xs text-gray-500">/ 100</Text>
          </View>
          <View className="flex-1 gap-2">
            {scoreItems.map((item, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <MaterialIcons 
                  name={item.icon as any} 
                  size={16} 
                  color={getScoreColor(item.type)} 
                />
                <Text className="text-sm text-gray-900">{item.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View> 
    </View> 
  );
};

export default InsightsTab;