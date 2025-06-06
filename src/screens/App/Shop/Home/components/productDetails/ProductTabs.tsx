// components/ProductTabs.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IProductTabsProps } from '../../../../../../types/productDetailsTypes';

const ProductTabs: React.FC<IProductTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <View className="bg-white border-b border-gray-light">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 gap-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-row items-center px-4 py-3 rounded-full gap-1.5 ${
                activeTab === tab.key ? 'bg-accent' : 'bg-transparent'
              }`}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={tab.icon as any} 
                size={18} 
                color={activeTab === tab.key ? '#FFFFFF' : '#9E9E9E'} 
              />
              <Text 
                className={`text-sm font-semibold ${
                  activeTab === tab.key ? 'text-white' : 'text-gray-medium'
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

export default ProductTabs;