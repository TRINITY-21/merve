// components/QuickReplies.tsx
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IQuickRepliesProps } from '../../../../types/chatTypes';

export const QuickReplies: React.FC<IQuickRepliesProps> = ({
  replies,
  onReplyPress,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <Animated.View entering={FadeInDown} className="py-2.5 bg-transparent">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {replies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white/90 px-4 py-2 rounded-2xl border border-[#FFCC00]"
            onPress={() => onReplyPress(reply)}
          >
            <Text className="text-sm text-[#FFCC00] font-medium">
              {reply}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};