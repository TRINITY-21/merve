// components/UserStats.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { IUserStatsProps } from '../../../../types/searchUsersTypes';

const UserStats: React.FC<IUserStatsProps> = ({
  followers,
  posts,
  mutual,
}) => {
  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View className="flex-row items-center gap-4">
      <View className="items-center">
        <Text className="text-base font-extrabold text-[#212121]">
          {formatFollowers(followers)}
        </Text>
        <Text className="text-xs text-[#757575] mt-0.5">Followers</Text>
      </View>
      
      <View className="w-px h-5 bg-[#E0E0E0]" />
      
      <View className="items-center">
        <Text className="text-base font-extrabold text-[#212121]">
          {posts}
        </Text>
        <Text className="text-xs text-[#757575] mt-0.5">Posts</Text>
      </View>
      
      <View className="w-px h-5 bg-[#E0E0E0]" />
      
      <View className="items-center">
        <Text className="text-base font-extrabold text-[#212121]">
          {mutual}
        </Text>
        <Text className="text-xs text-[#757575] mt-0.5">Mutual Pins</Text>
      </View>
    </View>
  );
};

export default UserStats;