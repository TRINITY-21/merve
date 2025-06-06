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
import { IStatusModalProps } from '../../../../../types/agentProductTypes';

const { height: screenHeight } = Dimensions.get('window');

const StatusModal: React.FC<IStatusModalProps> = ({
  visible,
  statusOptions,
  selectedProduct,
  onStatusChange,
  onClose,
}) => {
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
              Change Status
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status.key}
              className="flex-row items-center px-6 py-4 gap-4"
              onPress={() => onStatusChange(status.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={status.icon as any} 
                size={20} 
                color={status.color} 
              />
              <Text className="flex-1 text-base text-gray-900">
                {status.label}
              </Text>
              {selectedProduct?.status === status.key && (
                <MaterialIcons name="check" size={20} color={colors.accent} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;