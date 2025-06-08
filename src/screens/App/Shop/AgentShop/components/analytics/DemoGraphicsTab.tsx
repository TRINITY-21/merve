// components/DemographicsTab.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../../../components/common/Typography';
import { IAgeGroup, IAnalyticsData, ILocation } from '../../../../../../types/analyticTypes';

interface IDemographicsTabProps {
  data: IAnalyticsData;
}

const DemographicsTab: React.FC<IDemographicsTabProps> = ({ data }) => {
  return (
    <View className="p-5">
      {/* Age Demographics */}
      <View className="mb-8">
        <Typography variant="bold" size={18} className="text-text-primary mb-4">Age Demographics</Typography>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="h-55 bg-gray-100 rounded-lg items-center justify-center mb-4">
            <Typography variant="regular" size={14} className="text-gray-medium">Pie Chart Component Here</Typography>
          </View>
          <View className="space-y-2">
            {data.demographics.ageGroups.map((group: IAgeGroup, index: number) => (
              <View key={index} className="flex-row items-center">
                <View 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: group.color }}
                />
                <Typography variant="regular" size={14} className="text-text-secondary flex-1">{group.name}</Typography>
                <Typography variant="semibold" size={14} className="text-text-primary">
                  {group.population}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Geographic Distribution */}
      <View className="mb-8">
        <Typography variant="bold" size={18} className="text-text-primary mb-4">Geographic Distribution</Typography>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="h-55 bg-gray-100 rounded-lg items-center justify-center mb-4">
            <Typography variant="regular" size={14} className="text-gray-medium">Map Component Here</Typography>
          </View>
          <View className="space-y-2">
            {data.demographics.locations.map((location: ILocation, index: number) => (
              <View key={index} className="flex-row items-center">
                <View 
                  className="w-3 h-3 rounded-full mr-2 bg-primary"
                />
                <Typography variant="regular" size={14} className="text-text-secondary flex-1">{location.city}</Typography>
                <Typography variant="semibold" size={14} className="text-text-primary">
                  {location.percentage}%
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* User Behavior */}
      <View className="mb-8">
        <Typography variant="bold" size={18} className="text-text-primary mb-4">User Behavior</Typography>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="schedule" size={24} color="#FFCC00" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              2m 34s
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Avg. Time Spent
            </Typography>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="touch-app" size={24} color="#00BFA5" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              4.2
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Interactions per View
            </Typography>
          </View>
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm items-center">
            <MaterialIcons name="refresh" size={24} color="#4CAF50" />
            <Typography variant="bold" size={20} className="text-text-primary mt-2 mb-1">
              18%
            </Typography>
            <Typography variant="regular" size={12} className="text-text-secondary text-center">
              Return Visitors
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DemographicsTab;