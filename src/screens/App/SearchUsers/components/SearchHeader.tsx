// components/SearchHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ISearchHeaderProps } from '../../../../types/searchUsersTypes';

const SearchHeader: React.FC<ISearchHeaderProps> = ({
  searchQuery,
  searchFocused,
  resultsCount,
  onSearchChange,
  onSearchFocus,
  onSearchBlur,
  onClearSearch,
  onBack,
  onToggleFilters,
}) => {
  const searchBarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(searchBarAnim, {
      toValue: searchFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchFocused]);

  return (
    <View className="shadow-lg z-10">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-12' : 'pt-2.5'} pb-5`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onBack}
              activeOpacity={0.7}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-2xl font-extrabold text-[#1E3A5F] text-center flex-1">
              Find Users
            </Text>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onToggleFilters}
              activeOpacity={0.7}
            >
              <MaterialIcons name="tune" size={20} color="#1E3A5F" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Animated.View 
              className="flex-row items-center bg-white rounded-full px-5 shadow-lg"
              style={{
                paddingVertical: Platform.OS === 'ios' ? 12 : 0,
                shadowOpacity: searchBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.2],
                }),
                transform: [{
                  scale: searchBarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.02],
                  }),
                }],
              }}
            >
              <MaterialIcons name="search" size={20} color="#757575" />
              <TextInput
                className="flex-1 text-base text-[#212121] ml-3"
                placeholder="Search by name, location, or handle..."
                placeholderTextColor="#757575"
                value={searchQuery}
                onChangeText={onSearchChange}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={onClearSearch}
                  className="p-1"
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="clear" size={18} color="#757575" />
                </TouchableOpacity>
              )}
            </Animated.View>
          </View>

          <View className="items-center">
            <Text className="text-sm text-[#1E3A5F] font-semibold">
              {resultsCount} {resultsCount === 1 ? 'user' : 'users'} found
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SearchHeader;