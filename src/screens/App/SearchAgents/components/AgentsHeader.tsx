// components/AgentsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IAgentsHeaderProps } from '../../../../types/searchAgentTypes';
const AgentsHeader: React.FC<IAgentsHeaderProps> = ({
  searchQuery,
  viewMode,
  showFilters,
  stats,
  onSearchChange,
  onViewModeToggle,
  onToggleFilters,
  onBack,
}) => {
  return (
    <View className="shadow-lg">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-2.5'} pb-5`}
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
              All Agents
            </Text>
            
            <View className="flex-row gap-2.5">
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
                onPress={onViewModeToggle}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={viewMode === 'list' ? 'grid-view' : 'view-list'} 
                  size={20} 
                  color="#1E3A5F" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
                onPress={onToggleFilters}
                activeOpacity={0.7}
              >
                <MaterialIcons name="tune" size={20} color="#1E3A5F" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-5">
            <View className={`flex-row items-center bg-white rounded-full px-5 shadow-lg ${
              Platform.OS === 'ios' ? 'py-3' : 'py-0'
            }`}>
              <MaterialIcons name="search" size={20} color="#757575" />
              <TextInput
                className="flex-1 text-base text-[#212121] ml-3"
                placeholder="Search agents by name or location..."
                placeholderTextColor="#757575"
                value={searchQuery}
                onChangeText={onSearchChange}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => onSearchChange('')}
                  className="p-1"
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="clear" size={18} color="#757575" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="flex-row justify-between gap-1.5">
            <View className="flex-1 bg-white/15 rounded-xl p-1 items-center">
              <Text className="text-sm font-extrabold text-[#1E3A5F] m-1">
                {stats.total}
              </Text>
              <Text className="text-xs text-[#1E3A5F] text-center font-semibold">
                Total Agents
              </Text>
            </View>
            <View className="flex-1 bg-white/15 rounded-xl p-1 items-center">
              <Text className="text-sm font-extrabold text-[#1E3A5F] m-1">
                {stats.open}
              </Text>
              <Text className="text-xs text-[#1E3A5F] text-center font-semibold">
                Open Now
              </Text>
            </View>
            <View className="flex-1 bg-white/15 rounded-xl p-1 items-center">
              <Text className="text-sm font-extrabold text-[#1E3A5F] m-1">
                {stats.cashAvailable}
              </Text>
              <Text className="text-xs text-[#1E3A5F] text-center font-semibold">
                Cash Available
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AgentsHeader;