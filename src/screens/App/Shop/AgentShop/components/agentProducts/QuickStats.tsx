

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { IQuickStatsProps } from '../../../../../../types/agentProductTypes';


const QuickStats: React.FC<IQuickStatsProps> = ({ products }) => {
  const activeCount = products.filter(p => p.status === 'active').length;
  const draftCount = products.filter(p => p.status === 'draft').length;
  const promotedCount = products.filter(p => p.isPromoted).length;

  return (
    <View className="flex-row items-center justify-between bg-white/15 rounded-3xl py-3 px-4">
      <View className="flex-1 items-center">
        <Text className="text-base font-black text-white mb-0.5">
          {products.length}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          Total
        </Text>
      </View>
      
      <View className="w-px h-6 bg-white/30" />
      
      <View className="flex-1 items-center">
        <Text className="text-base font-black text-white mb-0.5">
          {activeCount}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          Active
        </Text>
      </View>
      
      <View className="w-px h-6 bg-white/30" />
      
      <View className="flex-1 items-center">
        <Text className="text-base font-black text-white mb-0.5">
          {draftCount}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          Drafts
        </Text>
      </View>
      
      <View className="w-px h-6 bg-white/30" />
      
      <View className="flex-1 items-center">
        <Text className="text-base font-black text-white mb-0.5">
          {promotedCount}
        </Text>
        <Text className="text-xs text-white/80 font-semibold">
          Promoted
        </Text>
      </View>
    </View>
  );
};

export default QuickStats;