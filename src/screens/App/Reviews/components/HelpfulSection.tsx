// components/HelpfulSection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IHelpfulSectionProps } from '../../../../types/reviewsTypes';

const HelpfulSection: React.FC<IHelpfulSectionProps> = ({
  reviewId,
  isOwnReview,
  helpfulVotes,
  userVotes,
  onHelpfulVote,
}) => {
  if (isOwnReview) return null;
  
  const votes = helpfulVotes[reviewId] || { helpful: 0, notHelpful: 0 };
  const userVote = userVotes[reviewId];
  const totalVotes = votes.helpful + votes.notHelpful;
  const helpfulPercentage = totalVotes > 0 ? (votes.helpful / totalVotes) * 100 : 0;

  return (
    <View className="bg-[#F5F5F5] rounded-xl p-4 mt-3 mb-2 border border-[#E0E0E0]">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-[#212121] flex-1">
          Was this review helpful?
        </Text>
        {totalVotes > 0 && (
          <Text className="text-xs text-[#757575] font-medium">
            {votes.helpful} of {totalVotes} found this helpful
          </Text>
        )}
      </View>
      
      <View className="flex-row gap-2.5 mb-2">
        <TouchableOpacity
          className={`flex-row items-center justify-center px-4 py-2.5 rounded-full border-1.5 gap-1.5 flex-1 shadow-sm ${
            userVote === true
              ? 'bg-[#4CAF50] border-[#4CAF50] shadow-md'
              : 'border-[#E0E0E0] bg-white'
          }`}
          onPress={() => onHelpfulVote(reviewId, true)}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name="thumb-up" 
            size={16} 
            color={userVote === true ? 'white' : '#4CAF50'} 
          />
          <Text className={`text-xs font-bold tracking-wide ${
            userVote === true ? 'text-white' : 'text-[#212121]'
          }`}>
            Yes ({votes.helpful})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`flex-row items-center justify-center px-4 py-2.5 rounded-full border-1.5 gap-1.5 flex-1 shadow-sm ${
            userVote === false
              ? 'bg-[#F44336] border-[#F44336] shadow-md'
              : 'border-[#E0E0E0] bg-white'
          }`}
          onPress={() => onHelpfulVote(reviewId, false)}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name="thumb-down" 
            size={16} 
            color={userVote === false ? 'white' : '#F44336'} 
          />
          <Text className={`text-xs font-bold tracking-wide ${
            userVote === false ? 'text-white' : 'text-[#212121]'
          }`}>
            No ({votes.notHelpful})
          </Text>
        </TouchableOpacity>
      </View>
      
      {totalVotes > 5 && (
        <View className="mt-2">
          <View className="h-1 bg-[#E0E0E0] rounded-sm mb-1">
            <View 
              className="h-full bg-[#4CAF50] rounded-sm"
              style={{ width: `${helpfulPercentage}%` }}
            />
          </View>
          <Text className="text-xs text-[#757575] font-semibold text-center">
            {Math.round(helpfulPercentage)}% found helpful
          </Text>
        </View>
      )}
    </View>
  );
};

export default HelpfulSection;