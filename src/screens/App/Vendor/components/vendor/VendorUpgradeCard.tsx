// components/VendorUpgradeCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IVendorUpgradeCardProps } from '../../../../../types/vendorTypes';

const VendorUpgradeCard: React.FC<IVendorUpgradeCardProps> = ({
  onLearnMore,
}) => {
  return (
    <View className="mx-5 mb-5 rounded-2xl overflow-hidden shadow-lg">
      <LinearGradient
        colors={['#00BFA5', '#00897B']}
        className="p-6 items-center"
      >
        <MaterialIcons name="star" size={32} color="white" />
        <Text className="text-xl font-bold text-white mt-3">
          Upgrade to Premium
        </Text>
        <Text className="text-sm text-white opacity-90 text-center mt-2 mb-4">
          Get advanced analytics, priority listing, and more customers
        </Text>
        <TouchableOpacity
          className="border-2 border-white rounded-2xl px-6 py-3"
          onPress={onLearnMore}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">
            Learn More
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default VendorUpgradeCard;