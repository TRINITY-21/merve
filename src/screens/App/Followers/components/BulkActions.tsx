// components/BulkActions.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IBulkActionsProps } from '../../../../types/followersTypes';

export const BulkActions: React.FC<IBulkActionsProps> = ({
  isVisible,
  selectedCount,
  activeTab,
  onBulkAction,
}) => {
  if (!isVisible) return null;

  const followerActions = [
    { action: 'Follow Back', icon: 'person-add' },
    { action: 'Remove', icon: 'person-remove' },
    { action: 'Block', icon: 'block' },
  ];

  const followingActions = [
    { action: 'Unfollow', icon: 'person-remove' },
    { action: 'Add to Favorites', icon: 'favorite' },
    { action: 'Notify', icon: 'notifications' },
  ];

  const actions = activeTab === 'followers' ? followerActions : followingActions;

  return (
    <View className="bg-white border-b border-gray-200">
      <LinearGradient 
        colors={['#1E3A5F', '#0D47A1']}
        className="flex-row justify-between items-center px-5 py-3"
      >
        <Text className="text-white text-sm font-semibold">
          {selectedCount} selected
        </Text>
        <View className="flex-row gap-3">
          {actions.map((item) => (
            <TouchableOpacity 
              key={item.action}
              className="w-9 h-9 rounded-full bg-white/15 items-center justify-center"
              onPress={() => onBulkAction(item.action)}
              activeOpacity={0.8}
            >
              <MaterialIcons name={item.icon as any} size={20} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};