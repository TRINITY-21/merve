// components/ReplySection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constants/theme/colors';
import { IReplySectionProps } from '../../../../types/reviewsTypes';

const ReplySection: React.FC<IReplySectionProps> = ({
  review,
  userRole,
  currentUserName,
  replyingToReviewId,
  replyText,
  onReplyStart,
  onReplyCancel,
  onReplyTextChange,
  onReplySend,
}) => {
  const isCurrentUserReply = review.reply?.agentName === (userRole === 'agent' ? 'Your Business Name' : currentUserName);

  return (
    <>
      {/* Existing Reply */}
      {review.reply && (
        <View className="bg-[#FFF8E1] rounded-2xl p-3 mt-4 border-l-4 border-[#1E3A5F]">
          <View className="flex-row items-center mb-1">
            <MaterialIcons name="reply" size={18} color="#1E3A5F" />
            <Text className="text-xs font-bold text-[#1E3A5F] ml-1 flex-1">
              {review.reply.agentName}{isCurrentUserReply ? ' (Your Reply)' : ' (Reply)'}
            </Text>
            <Text className="text-xs text-[#9E9E9E]">
              {review.reply.date}
            </Text>
          </View>
          <Text className="text-xs text-[#757575] leading-4">
            {review.reply.comment}
          </Text>
        </View>
      )}

      {/* Reply Button */}
      {!review.reply && (
        <TouchableOpacity
          className="flex-row items-center justify-center bg-primary py-2.5 rounded-full mt-4 shadow-sm"
          onPress={() => onReplyStart(review.id)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="reply" size={18} color={colors.white} />
          <Text className="text-white text-sm font-bold ml-2">
            Reply to Review
          </Text>
        </TouchableOpacity>
      )}

      {/* Reply Input */}
      {replyingToReviewId === review.id && (
        <View className="mt-4 bg-[#F5F5F5] rounded-xl p-3 border border-[#E0E0E0]">
          <TextInput
            className="text-sm text-[#212121] min-h-20 mb-2.5"
            placeholder="Type your reply..."
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={3}
            value={replyText}
            onChangeText={onReplyTextChange}
            textAlignVertical="top"
          />
          <View className="flex-row justify-end gap-2.5">
            <TouchableOpacity
              className="flex-row items-center px-4 py-2 rounded-full bg-[#9E9E9E]"
              onPress={onReplyCancel}
            >
              <Text className="text-white text-xs font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center px-4 py-2 rounded-full bg-[#4CAF50]"
              onPress={() => onReplySend(review.id)}
            >
              <Text className="text-white text-xs font-semibold">Send Reply</Text>
              <MaterialIcons name="send" size={16} color="white" className="ml-1" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ReplySection;