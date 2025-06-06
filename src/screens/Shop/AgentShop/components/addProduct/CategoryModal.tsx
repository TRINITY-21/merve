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
import { colors } from '../../../../../constants/theme/colors';
import { ICategoryModalProps } from '../../../../../types/addproductTypes';


const { height: screenHeight } = Dimensions.get('window');

const CategoryModal: React.FC<ICategoryModalProps> = ({
  visible,
  categories,
  selectedCategory,
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
              Select Category
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="px-6 py-5">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                className="flex-row items-center py-4 border-b border-gray-200 gap-4"
                onPress={() => onSelect(category.key)}
                activeOpacity={0.8}
              >
                <MaterialIcons 
                  name={category.icon as any} 
                  size={24} 
                  color={colors.primary} 
                />
                <Text className="flex-1 text-base text-gray-900">
                  {category.label}
                </Text>
                {selectedCategory === category.key && (
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

export default CategoryModal;