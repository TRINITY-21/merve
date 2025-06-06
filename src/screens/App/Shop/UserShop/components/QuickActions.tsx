// components/QuickActions.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';
import { IQuickActionsProps } from '../../../../../types/favoriteProductTypes';

export const QuickActions: React.FC<IQuickActionsProps> = ({
  productId,
  onRemoveFavorite,
  onShare,
  isListView = false,
}) => {
  return (
    <View className={`absolute gap-1.5 ${
      isListView 
        ? 'top-2 right-2' 
        : 'top-3 right-3'
    }`}>
      <TouchableOpacity 
        className={`rounded-full bg-white/90 items-center justify-center shadow-sm ${
          isListView 
            ? 'w-6 h-6' 
            : 'w-8 h-8'
        }`}
        onPress={() => onRemoveFavorite(productId)}
        activeOpacity={0.8}
        style={{
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <MaterialIcons 
          name="favorite" 
          size={isListView ? 14 : 16} 
          color="#F44336" 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        className={`rounded-full items-center justify-center ${
          isListView 
            ? 'w-6 h-6 bg-white/90' 
            : 'w-8 h-8 bg-black/50'
        }`}
        onPress={() => onShare(productId)}
        activeOpacity={0.8}
        style={isListView ? {
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        } : {}}
      >
        <MaterialIcons 
          name="share" 
          size={isListView ? 14 : 16} 
          color={isListView ? '#9E9E9E' : 'white'} 
        />
      </TouchableOpacity>
    </View>
  );
};