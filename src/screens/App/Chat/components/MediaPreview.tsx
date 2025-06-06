
// components/MediaPreview.tsx
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import React from 'react';
import {
    Image,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { IMediaPreviewProps } from '../types/chatInterfaces';

export const MediaPreview: React.FC<IMediaPreviewProps> = ({
  media,
  onRemove,
}) => {
  if (!media || media.length === 0) return null;

  return (
    <View className="mb-3">
      {media.map((item, index) => (
        <Animated.View 
          key={item.id}
          entering={ZoomIn} 
          className="relative self-start"
        >
          {item.type === 'image' ? (
            <Image 
              source={{ uri: item.uri }} 
              className="w-30 h-30 rounded-xl" 
            />
          ) : (
            <Video
              source={{ uri: item.uri }}
              className="w-30 h-30 rounded-xl"
              useNativeControls
              resizeMode="cover"
              isLooping
            />
          )}
          <TouchableOpacity
            onPress={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-black/70 rounded-xl p-0.5"
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};