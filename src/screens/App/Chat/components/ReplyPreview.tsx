// components/ReplyPreview.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IReplyPreviewProps } from '../../../../types/chatTypes';

export const ReplyPreview: React.FC<IReplyPreviewProps> = ({
  replyTo,
  onCancel,
}) => {
  return (
    <Animated.View 
      entering={FadeInDown} 
      className="flex-row bg-white/90 px-5 py-3 border-t border-gray-200"
      style={StyleSheet.hairlineWidth}
    >
      <View className="flex-1 flex-row">
        <View className="w-0.5 bg-[#FFCC00] rounded mr-3" />
        <View className="flex-1">
          <Text className="text-xs text-[#FFCC00] font-semibold mb-0.5">
            Replying to {replyTo.isUser ? 'yourself' : 'Agent'}
          </Text>
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {replyTo.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onCancel}
        className="p-1"
      >
        <Ionicons name="close" size={20} color="#616161" />
      </TouchableOpacity>
    </Animated.View>
  );
};