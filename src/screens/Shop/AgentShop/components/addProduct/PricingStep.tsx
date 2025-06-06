import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';
import { colors } from '../../../../../constants/theme/colors';
import { IPricingStepProps } from '../../../../../types/addproductTypes';
const PricingStep: React.FC<IPricingStepProps> = ({
  fadeAnim,
  slideAnim,
  productData,
  updateProductData,
}) => {
  const calculateDiscount = (): number => {
    const original = parseFloat(productData.originalPrice);
    const current = parseFloat(productData.price);
    if (original && current && original > current) {
      return Math.round(((original - current) / original) * 100);
    }
    return 0;
  };

  const calculateSavings = (): number => {
    const original = parseFloat(productData.originalPrice);
    const current = parseFloat(productData.price);
    if (original && current && original > current) {
      return original - current;
    }
    return 0;
  };

  return (
    <Animated.View 
      className="flex-1 px-5 py-6"
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
    >
      <Text className="text-2xl font-extrabold text-gray-900 mb-6">
        Pricing & Options
      </Text>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Selling Price (GHS) *
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="0.00"
          value={productData.price}
          onChangeText={(text) => updateProductData('price', text)}
          placeholderTextColor={colors.gray.medium}
          keyboardType="numeric"
        />
      </View>

      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Original Price (GHS)
        </Text>
        <Text className="text-xs text-gray-600 mb-2">
          Optional - for showing discounts
        </Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-900 bg-white"
          placeholder="0.00"
          value={productData.originalPrice}
          onChangeText={(text) => updateProductData('originalPrice', text)}
          placeholderTextColor={colors.gray.medium}
          keyboardType="numeric"
        />
      </View>

      {productData.originalPrice && productData.price && calculateDiscount() > 0 && (
        <View className="bg-gray-50 rounded-xl p-4 mb-5">
          <Text className="text-base font-bold text-green-500 mb-1">
            Discount: {calculateDiscount()}%
          </Text>
          <Text className="text-sm text-gray-600">
            Customers save GHS {calculateSavings().toFixed(2)}
          </Text>
        </View>
      )}

      {/* Delivery Options */}
      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-900 mb-3">
          Delivery Options
        </Text>
        
        <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="store" size={20} color={colors.primary} />
            <Text className="text-sm font-semibold text-gray-900">
              Pickup Available
            </Text>
          </View>
          <Switch
            value={productData.deliveryOptions.pickup}
            onValueChange={(value) => updateProductData('deliveryOptions', {
              ...productData.deliveryOptions,
              pickup: value
            })}
            thumbColor={colors.accent}
            trackColor={{ false: colors.gray.light, true: colors.accent }}
          />
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="local-shipping" size={20} color={colors.primary} />
            <Text className="text-sm font-semibold text-gray-900">
              Local Delivery
            </Text>
          </View>
          <Switch
            value={productData.deliveryOptions.delivery}
            onValueChange={(value) => updateProductData('deliveryOptions', {
              ...productData.deliveryOptions,
              delivery: value
            })}
            thumbColor={colors.accent}
            trackColor={{ false: colors.gray.light, true: colors.accent }}
          />
        </View>

        <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="flight" size={20} color={colors.primary} />
            <Text className="text-sm font-semibold text-gray-900">
              Nationwide Shipping
            </Text>
          </View>
          <Switch
            value={productData.deliveryOptions.shipping}
            onValueChange={(value) => updateProductData('deliveryOptions', {
              ...productData.deliveryOptions,
              shipping: value
            })}
            thumbColor={colors.accent}
            trackColor={{ false: colors.gray.light, true: colors.accent }}
          />
        </View>
      </View>

      {/* Promotion Option */}
      <View className="mb-5">
        <View className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center gap-3 flex-1">
            <MaterialIcons name="star" size={20} color={colors.warning} />
            <View>
              <Text className="text-sm font-semibold text-gray-900">
                Promote this product
              </Text>
              <Text className="text-xs text-gray-600">
                Get more visibility for GHS 10/week
              </Text>
            </View>
          </View>
          <Switch
            value={productData.isPromoted}
            onValueChange={(value) => updateProductData('isPromoted', value)}
            thumbColor={colors.accent}
            trackColor={{ false: colors.gray.light, true: colors.accent }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default PricingStep;