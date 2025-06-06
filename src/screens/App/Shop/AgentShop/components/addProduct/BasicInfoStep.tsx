import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';
import { IBasicInfoStepProps } from '../../../../../../types/addproductTypes';

const BasicInfoStep: React.FC<IBasicInfoStepProps> = ({
  fadeAnim,
  slideAnim,
  productData,
  updateProductData,
  categories,
  onCategoryPress,
}) => {
  return (
    <Animated.View 
      className="flex-1 px-5 py-6"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Text className="text-2xl font-extrabold text-gray-900 mb-2">
        Product Information
      </Text>
      
      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Product Title *
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="Enter product title"
          value={productData.title}
          onChangeText={(text) => updateProductData('title', text)}
          placeholderTextColor={colors.gray.medium}
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Description *
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white h-25"
          style={{ height: 100 }}
          placeholder="Describe your product in detail"
          value={productData.description}
          onChangeText={(text) => updateProductData('description', text)}
          placeholderTextColor={colors.gray.medium}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Category *
        </Text>
        <TouchableOpacity 
          className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3.5 bg-white"
          onPress={onCategoryPress}
          activeOpacity={0.8}
        >
          <Text className={`text-base ${
            productData.category ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {productData.category 
              ? categories.find(c => c.key === productData.category)?.label 
              : 'Select category'
            }
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.gray.medium} />
        </TouchableOpacity>
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Location
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="Where is this product located?"
          value={productData.location}
          onChangeText={(text) => updateProductData('location', text)}
          placeholderTextColor={colors.gray.medium}
        />
      </View>
    </Animated.View>
  );
};

export default BasicInfoStep;