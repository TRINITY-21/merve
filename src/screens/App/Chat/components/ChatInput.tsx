// components/ChatInput.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { IChatInputProps } from '../../../../types/chatTypes';
import { MediaOptions } from './MediaOptions';
import { MediaPreview } from './MediaPreview';

const MAX_MESSAGE_LENGTH = 500;

export const ChatInput: React.FC<IChatInputProps> = ({
  messageText,
  media,
  isLoading,
  isFocused,
  showMediaOptions,
  onMessageTextChange,
  onSendMessage,
  onFocus,
  onBlur,
  onToggleMediaOptions,
  onRemoveMedia,
  pickMedia,
}) => {
  const mediaOptionsScale = useSharedValue(0);

  useEffect(() => {
    mediaOptionsScale.value = withSpring(showMediaOptions ? 1 : 0);
  }, [showMediaOptions]);

  const mediaOptionsStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: mediaOptionsScale.value },
      { translateY: interpolate(mediaOptionsScale.value, [0, 1], [20, 0]) },
    ],
    opacity: mediaOptionsScale.value,
  }));

  const handleMediaSelect = (mediaItem: any): void => {
    // Media selection is handled through pickMedia function
    onToggleMediaOptions();
  };

  return (
    <View className="bg-transparent">
      <LinearGradient 
        colors={['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0.99)']}
        className={`px-5 py-3 ${Platform.OS === 'ios' ? 'pb-5' : 'pb-3'}`}
      >
        {/* Media Preview */}
        {media.length > 0 && (
          <MediaPreview media={media} onRemove={onRemoveMedia} />
        )}
        
        {/* Input Row */}
        <View className="flex-row items-end gap-2.5">
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-indigo-100 justify-center items-center"
            onPress={onToggleMediaOptions}
          >
            <Ionicons
              name={showMediaOptions ? 'close' : 'add'}
              size={28}
              color="#FFCC00"
            />
          </TouchableOpacity>
          
          <TextInput
            className={`flex-1 text-base min-h-11 max-h-30 px-5 py-3 rounded-2xl bg-black/5 text-gray-800 ${
              isFocused ? 'bg-indigo-50 border border-[#FFCC00]' : ''
            }`}
            placeholder="Type a message..."
            placeholderTextColor="#9E9E9E"
            multiline
            value={messageText}
            onChangeText={onMessageTextChange}
            maxLength={MAX_MESSAGE_LENGTH}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          
          {messageText.trim() || media.length > 0 ? (
            <TouchableOpacity
              disabled={isLoading}
              className="w-11 h-11 rounded-full overflow-hidden"
              onPress={onSendMessage}
            >
              <LinearGradient
                colors={['#FFCC00', '#FFB300']}
                className="flex-1 items-center justify-center"
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="send" size={20} color="white" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="w-11 h-11 rounded-full bg-indigo-100 justify-center items-center">
              <Ionicons name="mic" size={26} color="#FFCC00" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Media Options */}
        {showMediaOptions && (
          <Animated.View style={mediaOptionsStyle}>
            <MediaOptions
              isVisible={showMediaOptions}
              onImagePick={() => pickMedia('image')}
              onVideoPick={() => pickMedia('video')}
              onCameraPick={() => console.log('Camera pick')}
              onFilePick={() => console.log('File pick')}
            />
          </Animated.View>
        )}
      </LinearGradient>
    </View>
  );
};