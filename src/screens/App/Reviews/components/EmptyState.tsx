// components/EmptyState.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IEmptyStateProps } from '../../../../types/reviewsTypes';

const EmptyState: React.FC<IEmptyStateProps> = ({
  userRole,
  tabType,
  onWriteReview,
}) => {
  const getEmptyStateContent = () => {
    switch (tabType) {
      case 'received':
        return {
          icon: 'star-border' as const,
          title: 'No reviews received yet.',
          subtitle: userRole === 'agent'
            ? "Customers will leave reviews for your services here."
            : "You haven't received any reviews on your profile yet.",
          showButton: false,
        };
      case 'given':
        return {
          icon: 'rate-review' as const,
          title: "You haven't given any reviews.",
          subtitle: 'Share your experiences with agents!',
          showButton: true,
        };
      default:
        return {
          icon: 'star-border' as const,
          title: 'No reviews yet.',
          subtitle: 'Reviews will appear here.',
          showButton: false,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <View className="flex-1 items-center justify-center py-12 px-5">
      <MaterialIcons name={content.icon} size={60} color="#9E9E9E" />
      <Text className="text-lg font-bold text-[#212121] mt-5 mb-2 text-center">
        {content.title}
      </Text>
      <Text className="text-sm text-[#757575] text-center mb-5">
        {content.subtitle}
      </Text>
      
      {content.showButton && onWriteReview && (
        <TouchableOpacity
          className="flex-row items-center bg-[#00BFA5] px-5 py-3 rounded-full shadow-md mt-5"
          onPress={onWriteReview}
          activeOpacity={0.8}
        >
          <MaterialIcons name="create" size={20} color="white" />
          <Text className="text-white text-base font-bold ml-2.5">
            Write a Review
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;