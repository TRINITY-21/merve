// components/Header.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IHeaderProps } from '../../../../../types/editProfileTypes';

export const EditProfileHeader: React.FC<IHeaderProps> = ({
  loading,
  hasChanges,
  onCancel,
  onSave,
  headerScaleAnim,
}) => {
  return (
    <Animated.View 
      className="shadow-lg shadow-black/30 z-10 pb-0.5"
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        transform: [{ scale: headerScaleAnim }]
      }}
    >
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-2.5'} pb-5 rounded-b-0`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-xl font-extrabold text-[#1E3A5F] text-center flex-1">
              Edit Agent Info
            </Text>
            
            <TouchableOpacity 
              className={`w-10 h-10 rounded-full items-center justify-center ${
                loading ? 'bg-gray-500' : 'bg-green-500'
              }`}
              onPress={onSave}
              disabled={loading || !hasChanges}
              activeOpacity={0.7}
            >
              {loading ? (
                <MaterialIcons name="hourglass-empty" size={20} color="white" />
              ) : (
                <MaterialIcons name="check" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {hasChanges && (
            <View className="flex-row items-center justify-center mt-3 bg-white/15 rounded-2xl px-3 py-1.5 gap-1.5">
              <MaterialIcons name="info" size={16} color="#FF9800" />
              <Text className="text-xs text-[#1E3A5F] font-semibold">
                You have unsaved changes
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};