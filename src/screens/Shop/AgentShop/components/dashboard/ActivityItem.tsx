import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';

interface IActivity {
  id: number;
  type: 'inquiry' | 'view' | 'favorite' | 'visit';
  user: string;
  product: string;
  time: string;
}

interface IActivityItemProps {
  item: IActivity;
}

const ActivityItem: React.FC<IActivityItemProps> = ({ item }) => {
  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'inquiry': return 'question-answer';
      case 'view': return 'visibility';
      case 'favorite': return 'favorite';
      case 'visit': return 'store';
      default: return 'notifications';
    }
  };

  const getActivityColor = (type: string): string => {
    switch (type) {
      case 'inquiry': return colors.accent;
      case 'view': return colors.primary;
      case 'favorite': return colors.error;
      case 'visit': return colors.success;
      default: return colors.gray.medium;
    }
  };

  const getActivityText = (type: string): string => {
    switch (type) {
      case 'inquiry': return 'inquired about';
      case 'view': return 'viewed';
      case 'favorite': return 'favorited';
      case 'visit': return 'visited';
      default: return 'interacted with';
    }
  };

  return (
    <View className="flex-row items-center py-3 border-b border-gray-200 gap-3">
      <View 
        className="w-8 h-8 rounded-full items-center justify-center"
        style={{ backgroundColor: getActivityColor(item.type) + '20' }}
      >
        <MaterialIcons 
          name={getActivityIcon(item.type) as any} 
          size={16} 
          color={getActivityColor(item.type)} 
        />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-900">
          <Text className="font-semibold">{item.user}</Text> {getActivityText(item.type)} {item.product}
        </Text>
        <Text className="text-xs text-gray-500">{item.time}</Text>
      </View>
    </View>
  );
};

export default ActivityItem;