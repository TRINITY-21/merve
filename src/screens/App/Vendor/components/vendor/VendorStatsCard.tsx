// components/VendorStatsCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { IVendorStatsCardProps } from '../../../../../types/vendorTypes';

const VendorStatsCard: React.FC<IVendorStatsCardProps> = ({ stats }) => {
  return (
    <View className="bg-white mx-5 mb-4 p-5 rounded-2xl shadow-lg">
      <Text className="text-lg font-semibold text-[#212121] mb-5">
        Today's Performance
      </Text>
      
      <View className="flex-row mb-4">
        <View className="flex-1 items-center">
          <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
          <Text className="text-xl font-bold text-[#212121] mt-2">
            GH₵ {stats.dailyCashIn.toFixed(2)}
          </Text>
          <Text className="text-sm text-[#757575] mt-1">
            Cash In
          </Text>
        </View>
        
        <View className="w-px bg-[#E0E0E0] mx-4" />
        
        <View className="flex-1 items-center">
          <MaterialIcons name="trending-down" size={24} color="#F44336" />
          <Text className="text-xl font-bold text-[#212121] mt-2">
            GH₵ {stats.dailyCashOut.toFixed(2)}
          </Text>
          <Text className="text-sm text-[#757575] mt-1">
            Cash Out
          </Text>
        </View>
      </View>
      
      <View className="flex-row">
        <View className="flex-1 items-center">
          <MaterialIcons name="people" size={24} color="#FFCC00" />
          <Text className="text-xl font-bold text-[#212121] mt-2">
            {stats.totalCustomers}
          </Text>
          <Text className="text-sm text-[#757575] mt-1">
            Customers
          </Text>
        </View>
        
        <View className="w-px bg-[#E0E0E0] mx-4" />
        
        <View className="flex-1 items-center">
          <MaterialIcons name="analytics" size={24} color="#00BFA5" />
          <Text className="text-xl font-bold text-[#212121] mt-2">
            GH₵ {stats.averageTransaction.toFixed(2)}
          </Text>
          <Text className="text-sm text-[#757575] mt-1">
            Avg. Transaction
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VendorStatsCard;