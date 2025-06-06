// components/VendorChartCard.tsx
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { IVendorChartCardProps } from '../../../../../types/vendorTypes';
// import { BarChart } from 'react-native-chart-kit'; // Uncomment when chart library is available

const { width } = Dimensions.get('window');

const VendorChartCard: React.FC<IVendorChartCardProps> = ({
  weeklyData,
  chartConfig,
}) => {
  // Placeholder chart data structure
  const chartData = {
    labels: weeklyData.map(d => d.day),
    datasets: [
      {
        data: weeklyData.map(d => d.cashIn),
        color: () => '#4CAF50',
      },
      {
        data: weeklyData.map(d => d.cashOut),
        color: () => '#F44336',
      },
    ],
  };

  return (
    <View className="bg-white mx-5 mb-4 p-5 rounded-2xl shadow-lg">
      <Text className="text-lg font-semibold text-[#212121] mb-5">
        Weekly Overview
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Placeholder for chart - Replace with actual BarChart component */}
        <View 
          className="bg-[#F5F5F5] rounded-2xl items-center justify-center my-2"
          style={{ width: width * 1.5, height: 220 }}
        >
          <Text className="text-[#757575] text-center px-4">
            Chart Component Placeholder{'\n'}
            Import BarChart from react-native-chart-kit{'\n'}
            and replace this view
          </Text>
        </View>
        
        {/* Uncomment when chart library is available:
        <BarChart
          data={chartData}
          width={width * 1.5}
          height={220}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
          showBarTops={false}
          withInnerLines={false}
        />
        */}
      </ScrollView>
      
      <View className="flex-row justify-center mt-4">
        <View className="flex-row items-center mx-4">
          <View className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2" />
          <Text className="text-sm text-[#757575]">Cash In</Text>
        </View>
        <View className="flex-row items-center mx-4">
          <View className="w-3 h-3 rounded-full bg-[#F44336] mr-2" />
          <Text className="text-sm text-[#757575]">Cash Out</Text>
        </View>
      </View>
    </View>
  );
};

export default VendorChartCard;