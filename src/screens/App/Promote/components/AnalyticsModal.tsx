// components/AnalyticsModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IAnalyticsModalProps } from '../../../../types/promoteTypes';

const AnalyticsModal: React.FC<IAnalyticsModalProps> = ({
  visible,
  analytics,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="bg-white rounded-2xl p-5 w-full max-h-4/5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#212121]">
              Performance Preview
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              className="w-8 h-8 rounded-2xl bg-[#F5F5F5] items-center justify-center"
            >
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-[#757575] mb-5 text-center">
            See how promotion could improve your product's performance
          </Text>

          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#757575] text-center mb-2">
                Current
              </Text>
              <View className="bg-[#F5F5F5] rounded-xl p-3 gap-2">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="visibility" size={20} color="#9E9E9E" />
                  <Text className="text-xs text-[#757575] flex-1">Views</Text>
                  <Text className="text-sm font-semibold text-[#212121]">
                    {analytics.currentPeriod.views}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="favorite" size={20} color="#9E9E9E" />
                  <Text className="text-xs text-[#757575] flex-1">Saves</Text>
                  <Text className="text-sm font-semibold text-[#212121]">
                    {analytics.currentPeriod.saves}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="message" size={20} color="#9E9E9E" />
                  <Text className="text-xs text-[#757575] flex-1">Inquiries</Text>
                  <Text className="text-sm font-semibold text-[#212121]">
                    {analytics.currentPeriod.inquiries}
                  </Text>
                </View>
              </View>
            </View>

            <MaterialIcons name="arrow-right-alt" size={32} color="#00BFA5" />

            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#757575] text-center mb-2">
                With Promotion
              </Text>
              <View className="bg-[#F5F5F5] rounded-xl p-3 gap-2">
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="visibility" size={20} color="#FFCC00" />
                  <Text className="text-xs text-[#757575] flex-1">Views</Text>
                  <Text className="text-sm font-semibold text-[#FFCC00]">
                    {analytics.projected.views}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="favorite" size={20} color="#FFCC00" />
                  <Text className="text-xs text-[#757575] flex-1">Saves</Text>
                  <Text className="text-sm font-semibold text-[#FFCC00]">
                    {analytics.projected.saves}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="message" size={20} color="#FFCC00" />
                  <Text className="text-xs text-[#757575] flex-1">Inquiries</Text>
                  <Text className="text-sm font-semibold text-[#FFCC00]">
                    {analytics.projected.inquiries}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-2 bg-[#F5F5F5] p-3 rounded-lg">
            <MaterialIcons name="info" size={16} color="#00BFA5" />
            <Text className="text-xs text-[#757575] flex-1">
              Projections based on similar products and promotion plans
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AnalyticsModal;