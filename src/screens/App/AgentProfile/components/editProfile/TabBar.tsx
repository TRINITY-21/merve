// components/TabBar.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ITabBarProps } from '../../../../../types/editProfileTypes';


export const TabBar: React.FC<ITabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  return (
    <View className="bg-white border-b border-gray-200 shadow-sm" 
      style={{
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-row items-center px-4 py-3 mr-2 rounded-2xl gap-1.5 ${
                activeTab === tab.key ? 'bg-[#FFCC00]/20' : ''
              }`}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? '#FFCC00' : '#757575'} 
              />
              <Text className={`text-sm font-semibold ${
                activeTab === tab.key ? 'text-[#FFCC00]' : 'text-gray-600'
              }`}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};