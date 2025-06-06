// components/EmptySearchState.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IEmptySearchStateProps } from '../../../../types/searchUsersTypes';

const EmptySearchState: React.FC<IEmptySearchStateProps> = ({
  onExplore,
}) => {
  return (
    <View className="flex-1 py-15 rounded-2xl overflow-hidden mt-10">
      <LinearGradient 
        colors={['#f8fafc', '#ffffff']} 
        className="items-center justify-center p-10"
      >
        <MaterialIcons name="person-search" size={80} color="#9E9E9E" />
        <Text className="text-2xl font-bold text-[#212121] mt-5 mb-2">
          No users found
        </Text>
        <Text className="text-base text-[#757575] text-center leading-5 mb-6">
          Try adjusting your search terms or filters to find more users
        </Text>
        
        {onExplore && (
          <TouchableOpacity 
            className="rounded-2xl overflow-hidden"
            onPress={onExplore}
            activeOpacity={0.8}
          >
            <LinearGradient 
              colors={['#FFCC00', '#FFB300']} 
              className="flex-row items-center px-6 py-3 gap-2"
            >
              <MaterialIcons name="explore" size={16} color="white" />
              <Text className="text-base font-bold text-white">
                Explore Suggestions
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

export default EmptySearchState;