// components/PaymentModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IPaymentModalProps } from '../../../../types/promoteTypes';

const PaymentModal: React.FC<IPaymentModalProps> = ({
  visible,
  paymentMethods,
  selectedPaymentMethod,
  selectedPlan,
  pricing,
  onClose,
  onPaymentMethodSelect,
  onPayment,
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
              Choose Payment Method
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              className="w-8 h-8 rounded-2xl bg-[#F5F5F5] items-center justify-center"
            >
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>

          <View className="bg-[#F5F5F5] rounded-xl p-4 mb-5">
            <Text className="text-sm font-semibold text-[#757575] mb-2">
              Payment Summary
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-base text-[#212121]">
                {selectedPlan.name}
              </Text>
              <Text className="text-lg font-bold text-[#FFCC00]">
                GHS {pricing.finalPrice}
              </Text>
            </View>
          </View>

          <ScrollView className="gap-3 mb-5" showsVerticalScrollIndicator={false}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`bg-[#F5F5F5] rounded-xl p-4 border-2 flex-row items-center justify-between ${
                  selectedPaymentMethod === method.id 
                    ? 'border-[#00BFA5] bg-[#00BFA5]/5' 
                    : 'border-[#E0E0E0]'
                }`}
                onPress={() => onPaymentMethodSelect(method.id)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center flex-1">
                  <MaterialIcons 
                    name={method.icon as any} 
                    size={24} 
                    color="#FFCC00" 
                  />
                  <View className="ml-3 flex-1">
                    <View className="flex-row items-center gap-2 mb-0.5">
                      <Text className="text-base font-semibold text-[#212121]">
                        {method.name}
                      </Text>
                      {method.popular && (
                        <View className="bg-[#00BFA5] rounded-lg px-1.5 py-0.5">
                          <Text className="text-xs font-semibold text-white">
                            Popular
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-xs text-[#757575]">
                      {method.description}
                    </Text>
                  </View>
                </View>
                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                  selectedPaymentMethod === method.id 
                    ? 'border-[#00BFA5]' 
                    : 'border-[#9E9E9E]'
                }`}>
                  {selectedPaymentMethod === method.id && (
                    <View className="w-2.5 h-2.5 rounded-full bg-[#00BFA5]" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity 
            className="bg-[#FFCC00] rounded-2xl p-4 flex-row items-center justify-center gap-2"
            onPress={onPayment}
            activeOpacity={0.8}
          >
            <Text className="text-base font-bold text-white">
              Pay GHS {pricing.finalPrice}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;