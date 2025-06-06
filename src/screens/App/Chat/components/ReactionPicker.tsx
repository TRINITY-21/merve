// components/ReactionPicker.tsx
import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IReactionPickerProps } from '../../../../types/chatTypes';

export const ReactionPicker: React.FC<IReactionPickerProps> = ({
  isVisible,
  reactions,
  onReactionSelect,
}) => {
  if (!isVisible) return null;

  return (
    <Animated.View 
      entering={FadeInDown} 
      className="absolute bottom-10 left-0 flex-row bg-white rounded-2xl p-2 shadow-lg"
      style={{
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {reactions.map((emoji, index) => (
        <TouchableOpacity
          key={index}
          className="p-2"
          onPress={() => onReactionSelect(emoji)}
        >
          <Text className="text-2xl">{emoji}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};