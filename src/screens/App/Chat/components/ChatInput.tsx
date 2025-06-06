// components/ChatInput.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
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
import { IChatInputProps } from '../types/chatInterfaces';
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

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0.99)']}
        style={styles.gradient}
      >
        {/* Media Preview */}
        {media.length > 0 && (
          <MediaPreview media={media} onRemove={onRemoveMedia} />
        )}
        
        {/* Input Row */}
        <View style={styles.inputRow}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={onToggleMediaOptions}
          >
            <Ionicons
              name={showMediaOptions ? 'close' : 'add'}
              size={28}
              color="#FFCC00"
            />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.textInput, isFocused && styles.textInputFocused]}
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
              style={styles.sendButton}
              onPress={onSendMessage}
            >
              <LinearGradient
                colors={['#FFCC00', '#FFB300']}
                style={styles.sendButtonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Ionicons name="send" size={20} color="white" />
                )}
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={26} color="#FFCC00" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Media Options */}
        <Animated.View style={[mediaOptionsStyle]}>
          <MediaOptions
            isVisible={showMediaOptions}
            onImagePick={() => pickMedia('image')}
            onVideoPick={() => pickMedia('video')}
            onCameraPick={() => console.log('Camera pick')}
            onFilePick={() => console.log('File pick')}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 204, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.05)',
    color: '#212121',
  },
  textInputFocused: {
    backgroundColor: 'rgba(255, 204, 0, 0.05)',
    borderWidth: 1,
    borderColor: '#FFCC00',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 204, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});