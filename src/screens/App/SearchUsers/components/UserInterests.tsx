// components/UserInterests.tsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IUserInterestsProps } from '../../../../types/searchUsersTypes';

const UserInterests: React.FC<IUserInterestsProps> = ({
  interests,
  maxVisible = 3,
}) => {
  const visibleInterests = interests.slice(0, maxVisible);
  const remainingCount = interests.length - maxVisible;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2">
        {visibleInterests.map((interest, index) => (
          <View key={index} className="bg-[#FFCC00] px-3 py-1 rounded-xl">
            <Text className="text-xs text-white font-semibold">
              {interest}
            </Text>
          </View>
        ))}
        {remainingCount > 0 && (
          <View className="bg-[#E0E0E0] px-2.5 py-1 rounded-xl">
            <Text className="text-xs text-[#757575] font-semibold">
              +{remainingCount}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default UserInterests;