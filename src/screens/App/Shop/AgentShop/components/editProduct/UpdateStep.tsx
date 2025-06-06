import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../../../../../constants/theme/colors';
import { IUpdateStepProps } from '../../../../../../types/editProductTypes';

const UpdateStep: React.FC<IUpdateStepProps> = ({
  fadeAnim,
  slideAnim,
  productData,
  selectedImages,
  onPreview,
  onSaveChanges,
  onUpdateProduct,
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
        Update Product
      </Text>
      <Text className="text-sm text-gray-600 mb-6 leading-5">
        Review your changes before updating
      </Text>

      <TouchableOpacity 
        className="flex-row items-center justify-center bg-gray-50 rounded-xl py-4 gap-2 mb-6"
        onPress={onPreview}
        activeOpacity={0.8}
      >
        <MaterialIcons name="preview" size={24} color={colors.primary} />
        <Text className="text-base font-semibold text-primary">
          Preview Changes
        </Text>
      </TouchableOpacity>

      <View className="bg-white rounded-xl p-4 mb-6">
        <View className="flex-row items-center gap-2 mb-4 pb-2 border-b border-gray-200">
          <MaterialIcons name="info" size={20} color={colors.accent} />
          <Text className="text-base font-bold text-blue-500">
            Changes Summary
          </Text>
        </View>
        
        <View className="gap-3">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="photo" size={20} color={colors.gray.medium} />
            <Text className="text-sm text-gray-900">
              {selectedImages.length} photos
            </Text>
          </View>
          
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="monetization-on" size={20} color={colors.gray.medium} />
            <Text className="text-sm text-gray-900">
              GHS {productData.price}
            </Text>
          </View>
          
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="inventory" size={20} color={colors.gray.medium} />
            <Text className="text-sm text-gray-900">
              {productData.stockCount} in stock
            </Text>
          </View>
          
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="schedule" size={20} color={colors.gray.medium} />
            <Text className="text-sm text-gray-900">
              Last modified: {new Date(productData.lastModified).toLocaleDateString()}
            </Text>
          </View>
          
          {productData.isPromoted && (
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="star" size={20} color={colors.warning} />
              <Text className="text-sm text-gray-900">
                Promoted listing
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center bg-green-500 rounded-xl py-4 gap-2"
          onPress={onSaveChanges}
          activeOpacity={0.8}
        >
          <MaterialIcons name="save" size={20} color={colors.white} />
          <Text className="text-sm font-semibold text-white">
            Save Changes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 flex-row items-center justify-center bg-primary rounded-xl py-4 gap-2"
          onPress={onUpdateProduct}
          activeOpacity={0.8}
        >
          <MaterialIcons name="update" size={20} color={colors.white} />
          <Text className="text-sm font-semibold text-white">
            Update Product
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default UpdateStep;