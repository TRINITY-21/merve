// components/MediaOptions.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IMediaOptionsProps } from '../../../../types/chatTypes';

export const MediaOptions: React.FC<IMediaOptionsProps> = ({
  isVisible,
  onImagePick,
  onVideoPick,
  onCameraPick,
  onFilePick,
}) => {
  if (!isVisible) return null;

  const mediaOptions = [
    {
      type: 'image' as const,
      label: 'Gallery',
      icon: 'image' as const,
      colors: ['#FF6B6B', '#EE5A6F'] as [string, string],
      onPress: onImagePick,
    },
    {
      type: 'video' as const,
      label: 'Video',
      icon: 'videocam' as const,
      colors: ['#4ECDC4', '#44A08D'] as [string, string],
      onPress: onVideoPick,
    },
    {
      type: 'camera' as const,
      label: 'Camera',
      icon: 'camera' as const,
      colors: ['#667eea', '#764ba2'] as [string, string],
      onPress: onCameraPick,
    },
    {
      type: 'file' as const,
      label: 'File',
      icon: 'document' as const,
      colors: ['#f093fb', '#f5576c'] as [string, string],
      onPress: onFilePick,
    },
  ];

  return (
    <View className="flex-row justify-around mt-4 pt-4 border-t border-gray-200" style={StyleSheet.hairlineWidth}>
      {mediaOptions.map((option) => (
        <TouchableOpacity 
          key={option.type}
          className="items-center"
          onPress={option.onPress}
        >
          <LinearGradient
            colors={option.colors}
            className="w-14 h-14 rounded-full justify-center items-center mb-2 shadow-lg"
            style={{
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Ionicons name={option.icon} size={24} color="white" />
          </LinearGradient>
          <Text className="text-xs text-gray-600 font-medium">
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};