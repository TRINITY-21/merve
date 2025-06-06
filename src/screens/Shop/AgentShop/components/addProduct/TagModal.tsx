import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { ITagModalProps } from '../../../../../types/addproductTypes';


const { height: screenHeight } = Dimensions.get('window');

const TagModal: React.FC<ITagModalProps> = ({
  visible,
  newTag,
  onTagChange,
  onAdd,
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
              Add Tag
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          <View className="px-6 py-5">
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-900 mb-2">
                Tag
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
                placeholder="e.g., premium, latest, authentic"
                value={newTag}
                onChangeText={onTagChange}
                placeholderTextColor={colors.gray.medium}
              />
            </View>
            
            <TouchableOpacity 
              className="bg-primary rounded-xl py-4 items-center mt-4"
              onPress={onAdd}
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-white">
                Add Tag
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TagModal;