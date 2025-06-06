import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../../../../../constants/theme/colors';
import { IDeleteModalProps } from '../../../../../../types/editProductTypes';

const DeleteModal: React.FC<IDeleteModalProps> = ({
  visible,
  onDelete,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white rounded-2xl p-6 items-center max-w-sm w-full">
          <MaterialIcons name="warning" size={48} color={colors.error} />
          
          <Text className="text-xl font-bold text-gray-900 mt-4 mb-2">
            Delete Product?
          </Text>
          
          <Text className="text-sm text-gray-600 text-center leading-5 mb-6">
            This action cannot be undone. All product data, images, and analytics will be permanently removed.
          </Text>
          
          <View className="flex-row gap-3 w-full">
            <TouchableOpacity 
              className="flex-1 py-3 items-center bg-gray-100 rounded-lg"
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-gray-900">
                Cancel
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 py-3 items-center bg-red-500 rounded-lg"
              onPress={onDelete}
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-white">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;