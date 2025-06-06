// components/DurationSelection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IDurationSelectionProps } from '../../../../types/promoteTypes';

const DurationSelection: React.FC<IDurationSelectionProps> = ({
  durations,
  selectedDuration,
  selectedPlan,
  isAutoRenewal,
  onDurationSelect,
  onAutoRenewalToggle,
}) => {
  return (
    <View className="p-5">
      <Text className="text-2xl font-extrabold text-[#212121] mb-2">
        Select Promotion Duration
      </Text>
      <Text className="text-base text-[#757575] leading-5 mb-6">
        Longer durations offer better value and more exposure
      </Text>

      <View className="gap-3">
        {durations.map((duration) => {
          const basePrice = selectedPlan.pricing[duration.days as keyof typeof selectedPlan.pricing];
          const discountAmount = (basePrice * duration.discount) / 100;
          const finalPrice = basePrice - discountAmount;

          return (
            <TouchableOpacity
              key={duration.days}
              className={`bg-white rounded-xl p-4 border-2 flex-row items-center relative ${
                selectedDuration === duration.days 
                  ? 'border-[#00BFA5] bg-[#00BFA5]/5' 
                  : 'border-[#E0E0E0]'
              }`}
              onPress={() => onDurationSelect(duration.days)}
              activeOpacity={0.8}
            >
              {duration.discount > 0 && (
                <View className="absolute -top-2 left-4 bg-[#4CAF50] px-2 py-0.5 rounded-lg z-10">
                  <Text className="text-xs font-bold text-white">
                    Save {duration.discount}%
                  </Text>
                </View>
              )}

              <Text className="text-base font-semibold text-[#212121] flex-1">
                {duration.label}
              </Text>
              
              <View className="items-end mr-4">
                {duration.discount > 0 && (
                  <Text className="text-xs text-[#757575] line-through">
                    GHS {basePrice}
                  </Text>
                )}
                <Text className="text-lg font-bold text-[#FFCC00]">
                  GHS {finalPrice}
                </Text>
              </View>

              <Text className="text-xs text-[#757575] mr-4">
                Est. {selectedPlan.estimatedViews[duration.days as keyof typeof selectedPlan.estimatedViews]} views
              </Text>

              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                selectedDuration === duration.days 
                  ? 'border-[#00BFA5]' 
                  : 'border-[#9E9E9E]'
              }`}>
                {selectedDuration === duration.days && (
                  <View className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex-row items-center justify-between bg-white p-4 rounded-xl mt-5">
        <View className="flex-row items-center gap-2 flex-1">
          <MaterialIcons name="autorenew" size={20} color="#00BFA5" />
          <Text className="text-base font-semibold text-[#212121]">
            Auto-renewal
          </Text>
        </View>
        <Switch
          value={isAutoRenewal}
          onValueChange={onAutoRenewalToggle}
          trackColor={{ false: '#E0E0E0', true: '#00BFA5' }}
          thumbColor={isAutoRenewal ? 'white' : '#9E9E9E'}
        />
      </View>
      
      {isAutoRenewal && (
        <Text className="text-xs text-[#757575] mt-2 px-4 leading-4">
          Your promotion will automatically renew every {durations.find(d => d.days === selectedDuration)?.label.toLowerCase()}. 
          You can cancel anytime from your dashboard.
        </Text>
      )}
    </View>
  );
};

export default DurationSelection;