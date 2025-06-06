// components/AgentSettingsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IAgentSettingsHeaderProps } from '../../../../../types/agentSettingsTypes';

const AgentSettingsHeader: React.FC<IAgentSettingsHeaderProps> = ({
  hasChanges,
  onBack,
  onReset,
  onSave,
}) => {
  return (
    <View className="shadow-lg">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-12' : 'pt-2'} pb-2`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onBack}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-extrabold text-secondary text-center flex-1">
              Agent Settings
            </Text>
            
            <View className="flex-row">
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
                onPress={onReset}
                activeOpacity={0.7}
              >
                <MaterialIcons name="refresh" size={20} color="#1E3A5F" />
              </TouchableOpacity>
            </View>
          </View>

          {hasChanges && (
            <View className="flex-row items-center justify-between bg-white/15 rounded-2xl px-4 py-2.5">
              <View className="flex-row items-center flex-1">
                <MaterialIcons name="info" size={16} color="#FF9800" />
                <Text className="text-sm text-secondary font-semibold ml-2">
                  You have unsaved changes
                </Text>
              </View>
              <TouchableOpacity 
                className="bg-success px-4 py-1.5 rounded-xl"
                onPress={onSave}
                activeOpacity={0.8}
              >
                <Text className="text-white text-xs font-bold">Save Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default AgentSettingsHeader;