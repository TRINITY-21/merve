// components/ReviewAndConfirm.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import { IReviewProps } from '../../../../types/promoteTypes';

const ReviewAndConfirm: React.FC<IReviewProps> = ({
  selectedPlan,
  selectedDuration,
  durations,
  pricing,
}) => {
  const duration = durations.find(d => d.days === selectedDuration);

  return (
    <View className="p-5">
      <Text className="text-2xl font-extrabold text-[#212121] mb-2">
        Review & Confirm
      </Text>
      <Text className="text-base text-[#757575] leading-5 mb-6">
        Please review your promotion details before proceeding
      </Text>

      <ScrollView className="gap-5" showsVerticalScrollIndicator={false}>
        {/* Promotion Plan Section */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#212121] mb-3">
            Promotion Plan
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <MaterialIcons 
                name={selectedPlan.icon as any} 
                size={24} 
                color={selectedPlan.color} 
              />
              <View className="ml-3">
                <Text className="text-base font-semibold text-[#212121]">
                  {selectedPlan.name}
                </Text>
                <Text className="text-sm text-[#757575]">
                  {duration?.label}
                </Text>
              </View>
            </View>
            <Text className="text-lg font-bold text-[#FFCC00]">
              GHS {pricing.finalPrice}
            </Text>
          </View>
        </View>

        {/* Expected Results Section */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#212121] mb-3">
            Expected Results
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1 items-center bg-[#F5F5F5] rounded-lg p-3">
              <MaterialIcons name="visibility" size={20} color="#FFCC00" />
              <Text className="text-xs text-[#757575] mt-1">Views</Text>
              <Text className="text-base font-bold text-[#212121] mt-0.5">
                {selectedPlan.estimatedViews[selectedDuration as keyof typeof selectedPlan.estimatedViews]}
              </Text>
            </View>
            <View className="flex-1 items-center bg-[#F5F5F5] rounded-lg p-3">
              <MaterialIcons name="trending-up" size={20} color="#4CAF50" />
              <Text className="text-xs text-[#757575] mt-1">Boost</Text>
              <Text className="text-base font-bold text-[#212121] mt-0.5">
                {selectedPlan.id === 'basic' ? '2x' : selectedPlan.id === 'premium' ? '5x' : '10x'}
              </Text>
            </View>
          </View>
        </View>

        {/* Pricing Breakdown Section */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#212121] mb-3">
            Pricing Breakdown
          </Text>
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-[#757575]">Base Price</Text>
              <Text className="text-sm text-[#212121]">GHS {pricing.basePrice}</Text>
            </View>
            {pricing.discount > 0 && (
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-[#4CAF50]">
                  Discount ({duration?.discount}%)
                </Text>
                <Text className="text-sm text-[#4CAF50]">
                  -GHS {pricing.discount.toFixed(2)}
                </Text>
              </View>
            )}
            <View className="border-t border-[#E0E0E0] pt-2 mt-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-bold text-[#212121]">Total</Text>
                <Text className="text-lg font-extrabold text-[#FFCC00]">
                  GHS {pricing.finalPrice}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-bold text-[#212121] mb-3">
            You'll Get:
          </Text>
          {selectedPlan.features.slice(0, 4).map((feature, index) => (
            <View key={index} className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Text className="text-sm text-[#212121] flex-1">{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewAndConfirm;