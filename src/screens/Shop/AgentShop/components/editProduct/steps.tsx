// DetailsStep.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { colors } from '../../../../../constants/theme/colors';

export const DetailsStep: React.FC<IDetailsStepProps> = ({
  fadeAnim, slideAnim, productData, updateProductData, conditions,
  onConditionPress, onSpecPress, onTagPress, onRemoveSpecification, onRemoveTag,
}) => (
  <Animated.View className="flex-1 px-5 py-6" style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
    <Text className="text-2xl font-extrabold text-gray-900 mb-2">Product Details</Text>
    <Text className="text-sm text-gray-600 mb-6">Update product specifications and details</Text>
    
    {/* Condition Field */}
    <View className="mb-5">
      <Text className="text-sm font-semibold text-gray-900 mb-2">Condition *</Text>
      <TouchableOpacity className="flex-row items-center justify-between border border-gray-300 rounded-xl px-4 py-3.5 bg-white" onPress={onConditionPress}>
        <Text className={`text-base ${productData.condition ? 'text-gray-900' : 'text-gray-500'}`}>
          {productData.condition ? conditions.find(c => c.key === productData.condition)?.label : 'Select condition'}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.gray.medium} />
      </TouchableOpacity>
    </View>

    {/* Stock Count */}
    <View className="mb-5">
      <Text className="text-sm font-semibold text-gray-900 mb-2">Stock Quantity *</Text>
      <TextInput className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white" 
        placeholder="How many do you have?" value={productData.stockCount} 
        onChangeText={(text) => updateProductData('stockCount', text)} keyboardType="numeric" />
    </View>

    {/* Warranty */}
    <View className="mb-5">
      <Text className="text-sm font-semibold text-gray-900 mb-2">Warranty</Text>
      <TextInput className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
        placeholder="e.g., 1 Year Manufacturer Warranty" value={productData.warranty}
        onChangeText={(text) => updateProductData('warranty', text)} />
    </View>

    {/* Specifications */}
    <View className="mb-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-gray-900">Specifications</Text>
        <TouchableOpacity onPress={onSpecPress}><MaterialIcons name="add" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      {Object.entries(productData.specifications).map(([key, value]) => (
        <View key={key} className="flex-row items-center bg-gray-50 rounded-lg p-3 mb-2">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-900">{key}</Text>
            <Text className="text-sm text-gray-600 mt-0.5">{value}</Text>
          </View>
          <TouchableOpacity onPress={() => onRemoveSpecification(key)}>
            <MaterialIcons name="close" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      ))}
    </View>

    {/* Tags */}
    <View className="mb-5">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-gray-900">Tags</Text>
        <TouchableOpacity onPress={onTagPress}><MaterialIcons name="add" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {productData.tags.map((tag) => (
          <View key={tag} className="flex-row items-center bg-gray-50 rounded-full px-3 py-1.5 gap-1.5">
            <Text className="text-xs font-semibold text-blue-500">{tag}</Text>
            <TouchableOpacity onPress={() => onRemoveTag(tag)}>
              <MaterialIcons name="close" size={14} color={colors.accent} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  </Animated.View>
);

// PricingStep.tsx  
import { Switch } from 'react-native';
import { IDetailsStepProps, IPricingStepProps } from '../../../../../types/editProductTypes';

export const PricingStep: React.FC<IPricingStepProps> = ({ fadeAnim, slideAnim, productData, updateProductData }) => {
  const calculateDiscount = () => {
    const original = parseFloat(productData.originalPrice);
    const current = parseFloat(productData.price);
    return original && current && original > current ? Math.round(((original - current) / original) * 100) : 0;
  };

  return (
    <Animated.View className="flex-1 px-5 py-6" style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Text className="text-2xl font-extrabold text-gray-900 mb-2">Pricing & Options</Text>
      <Text className="text-sm text-gray-600 mb-6">Update pricing and delivery options</Text>

      {/* Price Fields */}
      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">Selling Price (GHS) *</Text>
        <TextInput className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="0.00" value={productData.price} onChangeText={(text) => updateProductData('price', text)} keyboardType="numeric" />
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">Original Price (GHS)</Text>
        <Text className="text-xs text-gray-600 mb-2">Optional - for showing discounts</Text>
        <TextInput className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="0.00" value={productData.originalPrice} onChangeText={(text) => updateProductData('originalPrice', text)} keyboardType="numeric" />
      </View>

      {/* Discount Info */}
      {productData.originalPrice && productData.price && calculateDiscount() > 0 && (
        <View className="bg-gray-50 rounded-xl p-4 mb-5">
          <Text className="text-base font-bold text-green-500 mb-1">Discount: {calculateDiscount()}%</Text>
          <Text className="text-sm text-gray-600">Customers save GHS {(parseFloat(productData.originalPrice) - parseFloat(productData.price)).toFixed(2)}</Text>
        </View>
      )}

      {/* Delivery Options */}
      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-3">Delivery Options</Text>
        {[
          { key: 'pickup', label: 'Pickup Available', icon: 'store' },
          { key: 'delivery', label: 'Local Delivery', icon: 'local-shipping' },
          { key: 'shipping', label: 'Nationwide Shipping', icon: 'flight' }
        ].map(option => (
          <View key={option.key} className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name={option.icon as any} size={20} color={colors.primary} />
              <Text className="text-sm font-semibold text-gray-900">{option.label}</Text>
            </View>
            <Switch value={productData.deliveryOptions[option.key] as any} 
              onValueChange={(value) => updateProductData('deliveryOptions', { ...productData.deliveryOptions, [option.key]: value })} />
          </View>
        ))}
      </View>

      {/* Promotion */}
      <View className="bg-gray-50 rounded-xl p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <MaterialIcons name="star" size={20} color={colors.warning} />
            <View>
              <Text className="text-sm font-semibold text-gray-900">Promote this product</Text>
              <Text className="text-xs text-gray-600">Get more visibility for GHS 10/week</Text>
            </View>
          </View>
          <Switch value={productData.isPromoted} onValueChange={(value) => updateProductData('isPromoted', value)} />
        </View>
      </View>
    </Animated.View>
  );
};

// Modal Components (ConditionModal, SpecificationModal, TagModal) would follow the same pattern as CategoryModal 
// with their respective data and styling. They are essentially identical to the AddProduct versions 
// but use the EditProduct types.

export default { DetailsStep, PricingStep };