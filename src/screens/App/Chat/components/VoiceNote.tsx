// components/VoiceNote.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IVoiceNoteProps } from '../../../../types/chatTypes';

export const VoiceNote: React.FC<IVoiceNoteProps> = ({
  voiceNote,
  isUser,
  onPlay,
}) => {
  // Generate random waveform heights for visual effect
  const waveformBars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: Math.random() * 20 + 10,
  }));

  return (
    <TouchableOpacity 
      className="flex-row items-center py-2"
      onPress={onPlay}
    >
      <Ionicons 
        name="mic" 
        size={20} 
        color={isUser ? 'white' : '#FFCC00'} 
      />
      
      <View className="flex-1 flex-row items-center mx-2.5 gap-0.5">
        {waveformBars.map((bar) => (
          <View
            key={bar.id}
            className="w-0.5 rounded"
            style={{
              height: bar.height,
              backgroundColor: isUser ? 'white' : '#FFCC00',
            }}
          />
        ))}
      </View>
      
      <Text className={`text-xs ${
        isUser ? 'text-white' : 'text-gray-600'
      }`}>
        {Math.floor(voiceNote.duration / 60)}:{(voiceNote.duration % 60).toString().padStart(2, '0')}
      </Text>
    </TouchableOpacity>
  );
};