import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '../../../../../constants/theme/colors';
import { IViewToggleProps } from '../../../../../types/agentProductTypes';

const ViewToggle: React.FC<IViewToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <View className="flex-row bg-gray-50 rounded-xl p-0.5">
      <TouchableOpacity
        className={`w-8 h-8 rounded-lg items-center justify-center ${
          viewMode === 'grid' ? 'bg-white shadow-sm' : ''
        }`}
        onPress={() => onViewModeChange('grid')}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name="grid-view" 
          size={16} 
          color={viewMode === 'grid' ? colors.accent : colors.gray.medium} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        className={`w-8 h-8 rounded-lg items-center justify-center ${
          viewMode === 'list' ? 'bg-white shadow-sm' : ''
        }`}
        onPress={() => onViewModeChange('list')}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name="view-list" 
          size={16} 
          color={viewMode === 'list' ? colors.accent : colors.gray.medium} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ViewToggle;