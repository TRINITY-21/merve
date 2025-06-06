import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';
import { IActionsModalProps } from '../../../../../../types/editProductTypes';

const { height: screenHeight } = Dimensions.get('window');

const ActionsModal: React.FC<IActionsModalProps> = ({
  visible,
  onPreview,
  onDuplicate,
  onSave,
  onDelete,
  onClose,
}) => {
  const actions = [
    {
      action: 'preview',
      label: 'Preview Product',
      icon: 'preview',
      color: colors.primary,
      onPress: onPreview,
    },
    {
      action: 'duplicate',
      label: 'Duplicate Product',
      icon: 'content-copy',
      color: colors.primary,
      onPress: onDuplicate,
    },
    {
      action: 'save',
      label: 'Save Changes',
      icon: 'save',
      color: colors.success,
      onPress: onSave,
    },
    {
      action: 'delete',
      label: 'Delete Product',
      icon: 'delete',
      color: colors.error,
      onPress: onDelete,
      isDanger: true,
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View 
          className="bg-white rounded-t-3xl pt-6 pb-10"
          style={{ maxHeight: screenHeight * 0.8 }}
        >
          <View className="flex-row justify-between items-center px-6 mb-6">
            <Text className="text-lg font-bold text-gray-900">
              Product Actions
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          <View className="px-6">
            {actions.map((action) => (
              <TouchableOpacity
                key={action.action}
                className={`flex-row items-center py-4 gap-4 ${
                  action.isDanger ? 'border-t border-gray-200' : ''
                }`}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name={action.icon as any} 
                  size={24} 
                  color={action.color} 
                />
                <Text className={`text-base ${
                  action.isDanger ? 'text-red-500' : 'text-gray-900'
                }`}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActionsModal;