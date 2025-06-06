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
import { IDetailsStepProps } from '../../../../../../types/addproductTypes';

const DetailsStep: React.FC<IDetailsStepProps> = ({
  fadeAnim,
  slideAnim,
  productData,
  updateProductData,
  conditions,
  onConditionPress,
  onSpecPress,
  onTagPress,
  onRemoveSpecification,
  onRemoveTag,
}) => {
  return (
    <Animated.View 
      className="flex-1 px-5 py-6"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Text className="text-2xl font-extrabold text-gray-900 mb-6">
        Product Details
      </Text>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Condition *
        </Text>
        <TouchableOpacity 
          className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3.5 bg-white"
          onPress={onConditionPress}
          activeOpacity={0.8}
        >
          <Text className={`text-base ${
            productData.condition ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {productData.condition 
              ? conditions.find(c => c.key === productData.condition)?.label 
              : 'Select condition'
            }
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.gray.medium} />
        </TouchableOpacity>
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Stock Quantity *
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="How many do you have?"
          value={productData.stockCount}
          onChangeText={(text) => updateProductData('stockCount', text)}
          placeholderTextColor={colors.gray.medium}
          keyboardType="numeric"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Warranty
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="e.g., 1 Year Manufacturer Warranty"
          value={productData.warranty}
          onChangeText={(text) => updateProductData('warranty', text)}
          placeholderTextColor={colors.gray.medium}
        />
      </View>

      {/* Specifications */}
      <View className="mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-semibold text-gray-900">
            Specifications
          </Text>
          <TouchableOpacity 
            onPress={onSpecPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {Object.entries(productData.specifications).map(([key, value]) => (
          <View key={key} className="flex-row items-center bg-gray-50 rounded-lg p-3 mb-2">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-900">{key}</Text>
              <Text className="text-sm text-gray-600 mt-0.5">{value}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => onRemoveSpecification(key)}
              activeOpacity={0.8}
            >
              <MaterialIcons name="close" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Tags */}
      <View className="mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm font-semibold text-gray-900">
            Tags
          </Text>
          <TouchableOpacity 
            onPress={onTagPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row flex-wrap gap-2">
          {productData.tags.map((tag) => (
            <View key={tag} className="flex-row items-center bg-gray-50 rounded-full px-3 py-1.5 gap-1.5">
              <Text className="text-xs font-semibold text-blue-500">{tag}</Text>
              <TouchableOpacity 
                onPress={() => onRemoveTag(tag)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="close" size={14} color={colors.accent} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default DetailsStep;