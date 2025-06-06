import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

interface ITab {
  key: string;
  label: string;
  icon: string;
}

interface IDashboardTabsProps {
  headerHeight: any;
  tabs: ITab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<IDashboardTabsProps> = ({
  headerHeight,
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Animated.View 
      className="absolute left-0 right-0 z-[999] bg-secondary border-b border-gray-200 pt-0"
      style={{ top: headerHeight }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-5 py-2 gap-6">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-row items-center px-3 py-2 rounded-full gap-1.5 ${
                activeTab === tab.key ? 'bg-blue-500/20' : ''
              }`}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? colors.primary : colors.gray.medium} 
              />
              <Text className={`text-sm font-semibold ${
                activeTab === tab.key ? 'text-primary' : 'text-gray-500'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default DashboardTabs;