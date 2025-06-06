// components/MessageItem.tsx
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    PanResponder,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import Animated, {
    FadeInUp,
    Layout,
    SlideInRight,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { IMessageItemProps } from '../../../../types/chatTypes';
import { MessageReactions } from './MessageReactions';
import { ReactionPicker } from './ReactionPicker';
import { TypingIndicator } from './TypingIndicator';
import { VoiceNote } from './VoiceNote';

const EMOJI_REACTIONS = ['❤️', '👍', '😂', '😮', '😢', '🙏'];

export const MessageItem: React.FC<IMessageItemProps> = ({
  item,
  isUser,
  onReact,
  onReply,
}) => {
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0 && gestureState.dx > -100) {
          translateX.value = gestureState.dx;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          onReply(item);
          Vibration.vibrate(50);
        }
        translateX.value = withSpring(0);
      },
    })
  ).current;

  const messageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const replyIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -50], [0, 1]),
    transform: [
      { scale: interpolate(translateX.value, [0, -50], [0.8, 1]) },
    ],
  }));

  const handleReactionSelect = (emoji: string): void => {
    onReact(item.id, emoji);
    setShowReactions(false);
  };

  if (item.typing) {
    return (
      <View className={`max-w-[80%] my-1.5 p-3 rounded-2xl ${
        isUser ? 'self-end bg-white rounded-br-1' : 'self-start bg-white/95 rounded-bl-1'
      }`}>
        <TypingIndicator isVisible={true} />
      </View>
    );
  }

  return (
    <View className="relative">
      <Animated.View 
        className="absolute -right-10 top-1/2 -translate-y-3"
        style={replyIconStyle}
      >
        <MaterialIcons name="reply" size={24} color="#FFCC00" />
      </Animated.View>
      
      <Animated.View
        {...panResponder.panHandlers}
        entering={isUser ? SlideInRight : FadeInUp}
        layout={Layout.springify()}
        style={messageStyle}
        className={`max-w-[80%] my-1.5 p-3 rounded-2xl relative ${
          isUser 
            ? 'self-end bg-white rounded-br-1 shadow-sm' 
            : 'self-start bg-white/95 rounded-bl-1 shadow-sm'
        }`}
      >
        {/* Reply Preview */}
        {item.replyTo && (
          <View className="flex-row mb-2 pb-2 border-b border-white/20">
            <View className="w-0.5 bg-[#FFCC00] rounded mr-2" />
            <View className="flex-1">
              <Text className="text-xs font-semibold text-[#FFCC00] mb-0.5">
                {item.replyTo.isUser ? 'You' : 'Agent'}
              </Text>
              <Text className="text-xs text-white/70" numberOfLines={1}>
                {item.replyTo.text}
              </Text>
            </View>
          </View>
        )}
        
        {/* Media Content */}
        {item.media && (
          <TouchableOpacity className="mb-2 rounded-xl overflow-hidden">
            {item.media.type === 'image' ? (
              <Image 
                source={{ uri: item.media.uri }} 
                className="w-50 h-50 rounded-xl" 
              />
            ) : (
              <Video
                source={{ uri: item.media.uri }}
                className="w-50 h-50 rounded-xl"
                useNativeControls
                resizeMode="cover"
                isLooping
              />
            )}
            <LinearGradient
              colors={['transparent', '#FFD700']}
              className="absolute bottom-0 left-0 right-0 h-12"
            />
          </TouchableOpacity>
        )}
        
        {/* Text Content */}
        {item.text && (
          <Text className={`text-base leading-5 ${
            isUser ? 'text-black' : 'text-gray-800'
          }`}>
            {item.text}
          </Text>
        )}
        
        {/* Voice Note */}
        {item.voiceNote && (
          <VoiceNote
            voiceNote={item.voiceNote}
            isUser={isUser}
            onPlay={() => console.log('Play voice note')}
          />
        )}
        
        {/* Message Footer */}
        <View className="flex-row items-center mt-1.5">
          <Text className={`text-xs ${
            isUser ? 'text-white/70' : 'text-gray-500'
          }`}>
            {moment(item.timestamp).format('h:mm A')}
          </Text>
          {isUser && (
            <Ionicons
              name={item.read ? 'checkmark-done' : 'checkmark'}
              size={16}
              color="white"
              className="ml-1.5"
            />
          )}
        </View>
        
        {/* Message Reactions */}
        {item.reactions && item.reactions.length > 0 && (
          <MessageReactions reactions={item.reactions} />
        )}
        
        {/* React Button */}
        <TouchableOpacity
          className="absolute -bottom-2 left-2.5 opacity-70"
          onPress={() => setShowReactions(!showReactions)}
        >
          <Ionicons name="happy-outline" size={18} color="#9E9E9E" />
        </TouchableOpacity>
        
        {/* Reaction Picker */}
        {showReactions && (
          <ReactionPicker
            isVisible={showReactions}
            reactions={EMOJI_REACTIONS}
            onReactionSelect={handleReactionSelect}
          />
        )}
      </Animated.View>
    </View>
  );
};