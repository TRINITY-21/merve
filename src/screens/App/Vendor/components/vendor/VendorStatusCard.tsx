// components/VendorStatusCard.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { IVendorStatusCardProps } from '../../../../../types/vendorTypes';

const VendorStatusCard: React.FC<IVendorStatusCardProps> = ({
  status,
  onStatusChange,
}) => {
  return (
    <LinearGradient
      colors={['#1E3A5F', '#0D47A1']}
      className="m-5 p-5 rounded-2xl"
    >
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-white">
          My Status
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-white text-sm font-semibold">
            EDIT
          </Text>
        </TouchableOpacity>
      </View>
      
      <View className="flex-row justify-between items-center mb-5">
        <Text className="text-2xl font-bold text-white">
          {status.isAvailable ? 'Open' : 'Closed'}
        </Text>
        <Switch
          value={status.isAvailable}
          onValueChange={(value) => onStatusChange({ isAvailable: value })}
          trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
          thumbColor="white"
        />
      </View>
      
      <View className="border-t border-white/20 pt-0.5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base text-white">
            Cash In
          </Text>
          <Switch
            value={status.cashInEnabled}
            onValueChange={(value) => onStatusChange({ cashInEnabled: value })}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="white"
            disabled={!status.isAvailable}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-white">
            Cash Out
          </Text>
          <Switch
            value={status.cashOutEnabled}
            onValueChange={(value) => onStatusChange({ cashOutEnabled: value })}
            trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            thumbColor="white"
            disabled={!status.isAvailable}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default VendorStatusCard;