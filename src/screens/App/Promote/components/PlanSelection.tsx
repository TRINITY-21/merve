// components/PlanSelection.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IPlanSelectionProps } from '../../../../types/promoteTypes';

const PlanSelection: React.FC<IPlanSelectionProps> = ({
  plans,
  selectedPlan,
  onPlanSelect,
}) => {
  return (
    <View className="p-5">
      <Text className="text-2xl font-extrabold text-[#212121] mb-2">
        Choose Your Promotion Plan
      </Text>
      <Text className="text-base text-[#757575] leading-5 mb-6">
        Select the plan that best fits your promotion goals and budget
      </Text>

      <ScrollView className="gap-4" showsVerticalScrollIndicator={false}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            className={`bg-white rounded-2xl p-5 border-2 relative ${
              selectedPlan === plan.id 
                ? 'border-[#00BFA5] bg-[#00BFA5]/5' 
                : 'border-[#E0E0E0]'
            }`}
            onPress={() => onPlanSelect(plan.id)}
            activeOpacity={0.8}
          >
            {plan.badge && (
              <View 
                className="absolute -top-2 right-5 px-3 py-1 rounded-xl z-10"
                style={{ backgroundColor: plan.color }}
              >
                <Text className="text-xs font-bold text-white">
                  {plan.badge}
                </Text>
              </View>
            )}

            <View className="flex-row items-start mb-4">
              <View 
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{ backgroundColor: `${plan.color}15` }}
              >
                <MaterialIcons 
                  name={plan.icon as any} 
                  size={28} 
                  color={plan.color} 
                />
              </View>
              
              <View className="flex-1">
                <Text className="text-lg font-bold text-[#212121] mb-1">
                  {plan.name}
                </Text>
                <Text className="text-sm text-[#757575] leading-4">
                  {plan.description}
                </Text>
              </View>
              
              <View className="ml-3">
                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPlan === plan.id 
                    ? 'border-[#00BFA5]' 
                    : 'border-[#9E9E9E]'
                }`}>
                  {selectedPlan === plan.id && (
                    <View className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]" />
                  )}
                </View>
              </View>
            </View>

            <View className="mb-4 gap-2">
              {plan.features.map((feature, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <MaterialIcons 
                    name="check-circle" 
                    size={16} 
                    color={plan.color} 
                  />
                  <Text className="text-sm text-[#212121] flex-1">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            <View className="border-t border-[#E0E0E0] pt-4 flex-row justify-between items-center">
              <Text className="text-base font-bold text-[#FFCC00]">
                Starting from GHS {plan.pricing[7]}
              </Text>
              <Text className="text-xs text-[#757575]">
                Est. {plan.estimatedViews[7]} views/week
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlanSelection;