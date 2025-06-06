import React from 'react';
import {
    Text,
    View,
} from 'react-native';

interface IRegionData {
  region: string;
  products: number;
  views: number;
  inquiries: number;
  percentage: number;
}

const AnalyticsTab: React.FC = () => {
  const regionData: IRegionData[] = [
    { region: 'Accra', products: 45, views: 1200, inquiries: 23, percentage: 35 },
    { region: 'Kumasi', products: 32, views: 800, inquiries: 15, percentage: 25 },
    { region: 'Tamale', products: 18, views: 400, inquiries: 8, percentage: 15 },
    { region: 'Sunyani', products: 5, views: 100, inquiries: 2, percentage: 5 },
    { region: 'Takoradi', products: 1, views: 25, inquiries: 0, percentage: 1 },
  ];

  return (
    <View className="p-5">
      {/* Revenue Analytics */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Revenue Trends</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm shadow-black/10 elevation-4">
          <Text className="text-gray-500 text-center py-8">
            Bar Chart component would go here
          </Text>
        </View>
      </View>

      {/* Geographic Performance */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Geographic Performance</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
          {regionData.map((region, index) => (
            <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-200">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">{region.region}</Text>
                <Text className="text-xs text-gray-500">
                  {region.products} products • {region.views} views • {region.inquiries} inquiries
                </Text>
              </View>
              <View className="items-end" style={{ minWidth: 60 }}>
                <Text className="text-sm font-bold text-gray-900 mb-1">{region.percentage}%</Text>
                <View className="w-12 h-1 bg-gray-200 rounded-sm">
                  <View 
                    className="h-full bg-primary rounded-sm"
                    style={{ width: `${Math.min(region.percentage * 2.5, 100)}%` }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Conversion Funnel */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-gray-900 mb-2.5">Conversion Funnel</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm shadow-black/10 elevation-4">
          <View className="mb-4">
            <View className="h-6 bg-gray-200 rounded-xl mb-2">
              <View className="w-full h-full bg-primary rounded-xl" />
            </View>
            <Text className="text-sm text-gray-900">Views: 5,200</Text>
          </View>
          <View className="mb-4">
            <View className="h-6 bg-gray-200 rounded-xl mb-2">
              <View className="w-7/12 h-full bg-accent rounded-xl" />
            </View>
            <Text className="text-sm text-gray-900">Favorites: 1,500</Text>
          </View>
          <View className="mb-4">
            <View className="h-6 bg-gray-200 rounded-xl mb-2">
              <View className="w-4/12 h-full bg-warning rounded-xl" />
            </View>
            <Text className="text-sm text-gray-900">Inquiries: 940</Text>
          </View>
          <View className="mb-4">
            <View className="h-6 bg-gray-200 rounded-xl mb-2">
              <View className="w-2/12 h-full bg-orange-500 rounded-xl" />
            </View>
            <Text className="text-sm text-gray-900">Agent Visits: 420</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AnalyticsTab;