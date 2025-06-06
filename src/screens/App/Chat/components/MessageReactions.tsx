// components/MessageReactions.tsx
import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { IMessageReactionsProps } from '../../../../types/chatTypes';

export const MessageReactions: React.FC<IMessageReactionsProps> = ({
  reactions,
  onReactionPress,
}) => {
  if (!reactions || reactions.length === 0) return null;

  return (
    <Animated.View 
      entering={ZoomIn} 
      className="absolute -bottom-2.5 right-2.5 flex-row gap-1"
    >
      {reactions.map((reaction, index) => (
        <View 
          key={index} 
          className="bg-white rounded-xl px-1.5 py-0.5 shadow-sm"
          style={{
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text className="text-sm">{reaction}</Text>
        </View>
      ))}
    </Animated.View>
  );
};