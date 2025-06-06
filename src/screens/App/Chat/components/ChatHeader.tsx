// components/ChatHeader.tsx
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IChatHeaderProps } from '../../../../types/chatTypes';

export const ChatHeader: React.FC<IChatHeaderProps> = ({
  agent,
  isOnline,
  onBack,
  onCall,
  onMenu,
}) => {
  return (
    <BlurView intensity={20} className="px-5 py-2.5 flex-row items-center">
      <TouchableOpacity onPress={onBack} className="mr-4">
        <MaterialIcons name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity className="flex-1 flex-row items-center">
        <View className="relative">
          <Image
            source={{ uri: agent.avatar || 'https://i.pravatar.cc/100' }}
            className="w-11 h-11 rounded-full border-2 border-yellow-300"
          />
          <View 
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-indigo-400 ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`} 
          />
        </View>
        
        <View className="ml-3 flex-1">
          <Text className="text-lg font-bold text-white">
            {agent.businessName}
          </Text>
          <Text className="text-xs text-white/80 mt-0.5">
            {isOnline ? 'Online' : 'Last seen recently'}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onCall} className="ml-5">
        <Ionicons name="call" size={24} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onMenu} className="ml-5">
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>
    </BlurView>
  );
};