import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';
import { IConditionModalProps } from '../../../../../../types/addproductTypes';

const { height: screenHeight } = Dimensions.get('window');

const ConditionModal: React.FC<IConditionModalProps> = ({
  visible,
  conditions,
  selectedCondition,
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
          className="bg-white rounded-t-3xl"
          style={{ maxHeight: screenHeight * 0.8 }}
        >
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900">
              Product Condition
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="px-6 py-5">
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition.key}
                className="flex-row items-center py-4 border-b border-gray-200"
                onPress={() => onSelect(condition.key)}
                activeOpacity={0.8}
              >
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 mb-1">
                    {condition.label}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {condition.desc}
                  </Text>
                </View>
                {selectedCondition === condition.key && (
                  <MaterialIcons name="check" size={20} color={colors.accent} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ConditionModal;