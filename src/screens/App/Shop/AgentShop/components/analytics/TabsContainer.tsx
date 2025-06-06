// components/TabsContainer.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ITab } from '../../../../../../types/analyticTypes';

interface ITabsContainerProps {
  tabs: ITab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

const TabsContainer: React.FC<ITabsContainerProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <View className="bg-white border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 py-4 space-x-6">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-row items-center px-3 py-2 rounded-full ${
                activeTab === tab.key ? 'bg-primary/20' : ''
              }`}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? '#FFCC00' : '#9E9E9E'} 
              />
              <Text 
                className={`text-sm font-semibold ml-1.5 ${
                  activeTab === tab.key ? 'text-primary' : 'text-gray-medium'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TabsContainer;