import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IProductMenuProps } from '../../../../../types/agentProductTypes';

const ProductMenu: React.FC<IProductMenuProps> = ({
  visible,
  viewMode,
  onAction,
}) => {
  if (!visible) return null;

  const isGridView = viewMode === 'grid';
  
  const menuItems = [
    { action: 'edit', label: isGridView ? 'Edit' : 'Edit', icon: 'edit', color: colors.primary },
    { action: 'analytics', label: isGridView ? 'Stats' : 'Analytics', icon: 'analytics', color: colors.accent },
    { action: 'status', label: 'Status', icon: 'swap-vert', color: colors.warning },
    { action: 'delete', label: 'Delete', icon: 'delete', color: colors.error, isDanger: true },
  ];

  const menuPosition = isGridView
    ? 'absolute right-2 top-9 z-[1000]'
    : 'absolute right-3 top-[-10px] z-[1000]';

  const menuWidth = isGridView ? 'min-w-[80px]' : 'min-w-[140px]';

  return (
    <View 
      className={`${menuPosition} bg-white rounded-xl py-1 ${menuWidth} shadow-lg shadow-black/15 elevation-8`}
    >
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={item.action}
          className={`flex-row items-center px-3 py-2 gap-3 ${
            item.isDanger ? 'border-t border-gray-200' : ''
          }`}
          onPress={() => onAction(item.action)}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={item.icon as any} 
            size={isGridView ? 16 : 18} 
            color={item.color} 
          />
          <Text className={`${isGridView ? 'text-xs' : 'text-sm'} ${
            item.isDanger ? 'text-red-500' : 'text-gray-900'
          }`}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductMenu;