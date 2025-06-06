// components/OptionsMenu.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { IOptionsMenuProps } from '../../../../../../types/productDetailsTypes';

const OptionsMenu: React.FC<IOptionsMenuProps> = ({
  visible,
  isFollowingSeller,
  onClose,
  onShare,
  onFollowSeller,
  onReportSeller,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/50 justify-start items-end"
        style={{ 
          paddingTop: Platform.OS === 'ios' ? 100 : 80,
          paddingRight: 20 
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="bg-white rounded-xl py-2 min-w-[200px] shadow-xl">
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 gap-3"
            onPress={onShare}
            activeOpacity={0.8}
          >
            <MaterialIcons name="share" size={20} color="#FFCC00" />
            <Text className="text-sm font-semibold text-text-primary">
              Share this product
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 gap-3"
            onPress={onFollowSeller}
            activeOpacity={0.8}
          >
            <MaterialIcons 
              name={isFollowingSeller ? "person-remove" : "person-add"} 
              size={20} 
              color="#00BFA5" 
            />
            <Text className="text-sm font-semibold text-text-primary">
              {isFollowingSeller ? 'Unfollow seller' : 'Follow this seller'}
            </Text>
          </TouchableOpacity>
          
          <View className="border-t border-gray-light">
            <TouchableOpacity 
              className="flex-row items-center px-4 py-3 gap-3"
              onPress={onReportSeller}
              activeOpacity={0.8}
            >
              <MaterialIcons name="flag" size={20} color="#F44336" />
              <Text className="text-sm font-semibold text-error">
                Report this seller
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsMenu;