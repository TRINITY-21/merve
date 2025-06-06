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
import { ISortModalProps } from '../../../../../../types/agentProductTypes';

const { height: screenHeight } = Dimensions.get('window');

const SortModal: React.FC<ISortModalProps> = ({
  visible,
  sortOptions,
  selectedSort,
  onSelect,
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
              Sort Products
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`flex-row items-center px-6 py-4 gap-4 ${
                selectedSort === option.key ? 'bg-gray-50' : ''
              }`}
              onPress={() => onSelect(option.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={20} 
                color={selectedSort === option.key ? colors.accent : colors.gray.medium} 
              />
              <Text className={`flex-1 text-base ${
                selectedSort === option.key 
                  ? 'font-semibold text-blue-500' 
                  : 'text-gray-900'
              }`}>
                {option.label}
              </Text>
              {selectedSort === option.key && (
                <MaterialIcons name="check" size={20} color={colors.accent} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;