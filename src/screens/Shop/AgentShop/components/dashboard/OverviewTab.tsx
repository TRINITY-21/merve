import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import ActivityItem from './ActivityItem';
import MetricCard from './MetricCard';
interface IOverviewData {
  activeProducts: number;
  totalViews: number;
  totalInquiries: number;
  agentVisits: number;
}

interface ICategory {
  name: string;
  count: number;
  views: number;
  percentage: number;
  color: string;
}

interface IActivity {
  id: number;
  type: 'inquiry' | 'view' | 'favorite' | 'visit';
  user: string;
  product: string;
  time: string;
}

interface IDashboardData {
  overview: IOverviewData;
  categories: ICategory[];
  recentActivity: IActivity[];
}

interface IOverviewTabProps {
  dashboardData: IDashboardData;
}

const OverviewTab: React.FC<IOverviewTabProps> = ({ dashboardData }) => {
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
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Performance Overview</Text>
        <View className="flex-row flex-wrap gap-3">
          <MetricCard
            title="Active Products"
            value={dashboardData.overview.activeProducts.toString()}
            change={4.2}
            icon="inventory"
            color={colors.primary}
          />
          <MetricCard
            title="Total Views"
            value={formatNumber(dashboardData.overview.totalViews)}
            change={12.5}
            icon="visibility"
            color={colors.accent}
          />
          <MetricCard
            title="Inquiries"
            value={dashboardData.overview.totalInquiries.toString()}
            change={8.3}
            icon="question-answer"
            color={colors.success}
          />
          <MetricCard
            title="Agent phone viewed"
            value={dashboardData.overview.agentVisits.toString()}
            change={15.7}
            icon="store"
            color={colors.warning}
          />
        </View>
      </View>

      {/* Performance Trends */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">7-Day Performance</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm shadow-black/10 elevation-4">
          <Text className="text-gray-500 text-center py-8">
            Chart component would go here
          </Text>
        </View>
      </View>

      {/* Category Distribution */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Category Performance</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
          {dashboardData.categories.map((category, index) => (
            <View key={index} className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View className="flex-row items-center flex-1">
                <View 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">{category.name}</Text>
                  <Text className="text-xs text-gray-500">
                    {category.count} products • {formatNumber(category.views)} views
                  </Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-gray-900">{category.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">Recent Activity</Text>
          <TouchableOpacity>
            <Text className="text-sm font-semibold text-primary">See All</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
          {dashboardData.recentActivity.slice(0, 5).map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OverviewTab;