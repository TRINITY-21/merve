// components/DemographicsTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IAnalyticsData } from '../../../../../types/analyticTypes';

interface IDemographicsTabProps {
  data: IAnalyticsData;
}

const DemographicsTab: React.FC<IDemographicsTabProps> = ({ data }) => {
  return (
    <View className="p-5">
      {/* Age Demographics */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Age Demographics</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="h-55 bg-gray-100 rounded-lg items-center justify-center mb-4">
            <Text className="text-gray-medium">Pie Chart Component Here</Text>
          </View>
          <View className="space-y-2">
            {data.demographics.ageGroups.map((group, index) => (
              <View key={index} className="flex-row items-center">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: group.color }}
                />
                <Text className="text-sm text-text-secondary flex-1">{group.name}</Text>
                <Text className="text-sm font-semibold text-text-primary">
                  {group.population}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Geographic Distribution */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">Geographic Distribution</Text>
        <View className="bg-white rounded-xl p-5 shadow-sm">
          {data.demographics.locations.map((location, index) => (
            <View key={index} className="py-3 border-b border-gray-light last:border-b-0">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text-primary">
                    {location.city}
                  </Text>
                  <Text className="text-xs text-text-secondary">
                    {location.views} views
                  </Text>
                </View>
                <View className="items-end min-w-[60px]">
                  <Text className="text-sm font-bold text-text-primary mb-1">
                    {location.percentage}%
                  </Text>
                  <View className="w-12 h-1 bg-gray-light rounded">
                    <View 
                      className="h-full bg-primary rounded"
                      style={{ width: `${Math.min(location.percentage, 100)}%` }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* User Behavior */}
      <View className="mb-8">
        <Text className="text-lg font-bold text-text-primary mb-4">User Behavior</Text>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="schedule" size={24} color="#FFCC00" />
            <Text className="text-xl font-extrabold text-text-primary mt-2 mb-1">
              2m 34s
            </Text>
            <Text className="text-xs text-text-secondary text-center">
              Avg. Time Spent
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="touch-app" size={24} color="#00BFA5" />
            <Text className="text-xl font-extrabold text-text-primary mt-2 mb-1">
              4.2
            </Text>
            <Text className="text-xs text-text-secondary text-center">
              Interactions per View
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="refresh" size={24} color="#4CAF50" />
            <Text className="text-xl font-extrabold text-text-primary mt-2 mb-1">
              18%
            </Text>
            <Text className="text-xs text-text-secondary text-center">
              Return Visitors
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DemographicsTab;