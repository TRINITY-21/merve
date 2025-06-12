// components/TabBar.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
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
                activeTab === tab.key ? '' : ''
              }`}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <MaterialIcons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? colors.primary : '#757575'} 
              />
              <Typography variant='regular' size={14} className={`mt-1.5 ${
                activeTab === tab.key ? 'text-primary' : 'text-gray-600'
              }`}>
                {tab.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};