// components/ReviewAndConfirm.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Typography } from '../../../../components/common/Typography';
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
      <Typography variant="bold" size={24} className="text-[#212121] mb-2">
        Review & Confirm
      </Typography>
      <Typography variant="regular" size={16} className="text-[#757575] leading-5 mb-6">
        Please review your promotion details before proceeding
      </Typography>

      <ScrollView className="gap-5" showsVerticalScrollIndicator={false}>
        {/* Promotion Plan Section */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Typography variant="semibold" size={16} className="text-[#212121] mb-3">
            Promotion Plan
          </Typography>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <MaterialIcons 
                name={selectedPlan.icon as any} 
                size={24} 
                color={selectedPlan.color} 
              />
              <View className="ml-3">
                <Typography variant="semibold" size={16} className="text-[#212121]">
                  {selectedPlan.name}
                </Typography>
                <Typography variant="regular" size={14} className="text-[#757575]">
                  {duration?.label}
                </Typography>
              </View>
            </View>
            <Typography variant="bold" size={18} className="text-[#FFCC00]">
              GHS {pricing.finalPrice}
            </Typography>
          </View>
        </View>

        {/* Expected Results Section */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Typography variant="semibold" size={16} className="text-[#212121] mb-3">
            Expected Results
          </Typography>
          <View className="flex-row gap-4">
            <View className="flex-1 items-center bg-[#F5F5F5] rounded-lg p-3">
              <MaterialIcons name="visibility" size={20} color="#FFCC00" />
              <Typography variant="regular" size={12} className="text-[#757575] mt-1">Views</Typography>
              <Typography variant="bold" size={16} className="text-[#212121] mt-0.5">
                {selectedPlan.estimatedViews[selectedDuration as keyof typeof selectedPlan.estimatedViews]}
              </Typography>
            </View>
            <View className="flex-1 items-center bg-[#F5F5F5] rounded-lg p-3">
              <MaterialIcons name="trending-up" size={20} color="#4CAF50" />
              <Typography variant="regular" size={12} className="text-[#757575] mt-1">Boost</Typography>
              <Typography variant="bold" size={16} className="text-[#212121] mt-0.5">
                {selectedPlan.id === 'basic' ? '2x' : selectedPlan.id === 'premium' ? '5x' : '10x'}
              </Typography>
            </View>
          </View>
        </View>

        {/* Pricing Breakdown Section */}
        <View className="bg-white rounded-xl p-4">
          <Typography variant="semibold" size={16} className="text-[#212121] mb-3">
            Pricing Breakdown
          </Typography>
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Typography variant="regular" size={14} className="text-[#757575]">Base Price</Typography>
              <Typography variant="regular" size={14} className="text-[#212121]">GHS {pricing.basePrice}</Typography>
            </View>
            {pricing.discount > 0 && (
              <View className="flex-row justify-between items-center">
                <Typography variant="regular" size={14} className="text-[#4CAF50]">
                  Discount ({duration?.discount}%)
                </Typography>
                <Typography variant="regular" size={14} className="text-[#4CAF50]">
                  -GHS {pricing.discount.toFixed(2)}
                </Typography>
              </View>
            )}
            <View className="border-t border-[#E0E0E0] pt-2 mt-2">
              <View className="flex-row justify-between items-center">
                <Typography variant="bold" size={16} className="text-[#212121]">Total</Typography>
                <Typography variant="bold" size={18} className="text-[#FFCC00]">
                  GHS {pricing.finalPrice}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        {/* Benefits Section */}
        <View className="bg-white rounded-xl p-4">
          <Typography variant="semibold" size={16} className="text-[#212121] mb-3">
            You'll Get:
          </Typography>
          {selectedPlan.features.slice(0, 4).map((feature, index) => (
            <View key={index} className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
              <Typography variant="regular" size={14} className="text-[#212121] flex-1">{feature}</Typography>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewAndConfirm;