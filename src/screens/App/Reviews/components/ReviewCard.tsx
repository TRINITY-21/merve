// components/ReviewCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IReviewCardProps } from '../../../../types/reviewsTypes';
import HelpfulSection from './HelpfulSection';
import ReplySection from './ReplySection';
import StarRating from './StarRating';
const ReviewCard: React.FC<IReviewCardProps> = ({
  review,
  isReceived,
  isOwnReview,
  userRole,
  currentUserName,
  replyingToReviewId,
  replyText,
  helpfulVotes,
  userVotes,
  onReplyStart,
  onReplyCancel,
  onReplyTextChange,
  onReplySend,
  onHelpfulVote,
  onReport,
}) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-lg overflow-hidden">
      {/* Review Header */}
      <View className="flex-row items-center mb-3">
        {review.avatar ? (
          <Image 
            source={{ uri: review.avatar }} 
            className="w-12 h-12 rounded-full mr-3 bg-[#E0E0E0]" 
          />
        ) : (
          <View className="w-12 h-12 rounded-full mr-3 bg-[#FFF8E1] items-center justify-center border border-[#E0E0E0]">
            <MaterialIcons
              name={isReceived ? (review.reviewerType === 'User' ? 'person' : 'business') : 'people'}
              size={24}
              color="#1E3A5F"
            />
          </View>
        )}
        
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5 mb-1">
            <Text className="text-base font-bold text-[#212121]">
              {isReceived ? review.reviewerName : review.reviewedName}
            </Text>
            {review.verified && (
              <MaterialIcons name="verified" size={14} color="#00BFA5" />
            )}
          </View>
          <View className="flex-row items-center gap-0.5">
            <StarRating rating={review.rating} size={16} />
            <Text className="text-xs text-[#9E9E9E] ml-2">
              {review.date}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Review Comment */}
      <Text className="text-sm text-[#757575] leading-5 mb-2.5">
        {review.comment}
      </Text>

      {/* Review Context */}
      {isReceived && review.entityName && (
        <Text className="text-xs text-[#616161] mt-1">
          Reviewed for: <Text className="font-semibold text-[#212121]">
            {userRole === 'agent' && review.entityName === 'Your Business Name' ? 'Your Business' : review.entityName}
          </Text>
        </Text>
      )}
      {!isReceived && review.reviewedType && (
        <Text className="text-xs text-[#616161] mt-1">
          Reviewed: <Text className="font-semibold text-[#212121]">{review.reviewedType}</Text>
        </Text>
      )}

      {/* Reply Section */}
      {isReceived && (
        <ReplySection
          review={review}
          userRole={userRole}
          currentUserName={currentUserName}
          replyingToReviewId={replyingToReviewId}
          replyText={replyText}
          onReplyStart={onReplyStart}
          onReplyCancel={onReplyCancel}
          onReplyTextChange={onReplyTextChange}
          onReplySend={onReplySend}
        />
      )}

      {/* Helpful Section */}
      <HelpfulSection
        reviewId={review.id}
        isOwnReview={isOwnReview}
        helpfulVotes={helpfulVotes}
        userVotes={userVotes}
        onHelpfulVote={onHelpfulVote}
      />

      {/* Report Button */}
      <TouchableOpacity 
        className="flex-row items-center self-end mt-2 px-2.5 py-1 rounded-2xl bg-[#F5F5F5]"
        onPress={() => onReport(review.id)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="flag" size={16} color="#9E9E9E" />
        <Text className="text-xs text-[#616161] ml-1">Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewCard;