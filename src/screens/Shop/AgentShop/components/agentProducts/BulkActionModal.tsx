import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IBulkActionsModalProps } from '../../../../../types/agentProductTypes';


const { height: screenHeight } = Dimensions.get('window');

const BulkActionsModal: React.FC<IBulkActionsModalProps> = ({
  visible,
  selectedCount,
  onAction,
  onClose,
}) => {
  const bulkActions = [
    { action: 'activate', label: 'Activate Selected', icon: 'check-circle', color: colors.success },
    { action: 'pause', label: 'Pause Selected', icon: 'pause-circle', color: colors.warning },
    { action: 'promote', label: 'Promote Selected', icon: 'star', color: colors.accent },
    { action: 'delete', label: 'Delete Selected', icon: 'delete', color: colors.error, isDanger: true },
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
          style={{ maxHeight: screenHeight * 0.7 }}
        >
          <View className="flex-row justify-between items-center px-6 mb-6">
            <Text className="text-lg font-bold text-gray-900">
              Bulk Actions
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          {bulkActions.map((action) => (
            <TouchableOpacity
              key={action.action}
              className={`flex-row items-center px-6 py-4 gap-4 ${
                action.isDanger ? 'border-t border-gray-200' : ''
              }`}
              onPress={() => onAction(action.action)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={action.icon as any} 
                size={20} 
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
    </Modal>
  );
};

export default BulkActionsModal;