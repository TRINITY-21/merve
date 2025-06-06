// components/BottomActions.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { IBottomActionsProps } from '../../../../../../types/productDetailsTypes';

const BottomActions: React.FC<IBottomActionsProps> = ({
  showSellerNumber,
  sellerPhone,
  onCall,
  onDirections,
  onMessage,
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0">
      <LinearGradient colors={['transparent', '#FFFFFF']} className="h-5" />
      <View 
        className={`bg-white px-5 py-4 border-t border-gray-light gap-3 ${
          Platform.OS === 'ios' ? 'pb-8' : ''
        }`}
      >
        <View className="flex-row gap-3">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center bg-background rounded-2xl py-4 gap-2 border border-accent"
            onPress={onDirections}
            activeOpacity={0.8}
          >
            <MaterialIcons name="directions" size={20} color="#00BFA5" />
            <Text className="text-sm font-semibold text-accent">Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-2 flex-row items-center justify-center bg-primary rounded-2xl py-4 gap-2 shadow-md"
            onPress={onCall}
            activeOpacity={0.8}
          >
            {showSellerNumber ? (
              <Text className="text-base font-bold text-white">{sellerPhone}</Text>
            ) : (
              <>
                <MaterialIcons name="phone" size={20} color="#FFFFFF" />
                <Text className="text-base font-bold text-white">Call Seller</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center bg-background rounded-2xl py-4 gap-2 border border-accent"
            onPress={onMessage}
            activeOpacity={0.8}
          >
            <MaterialIcons name="message" size={20} color="#00BFA5" />
            <Text className="text-sm font-semibold text-accent">Message</Text>
          </TouchableOpacity>
        </View>
        
        {showSellerNumber && (
          <View className="flex-row items-start bg-background px-5 py-3 rounded-xl gap-2">
            <MaterialIcons name="security" size={16} color="#FF9800" />
            <Text className="flex-1 text-xs text-text-secondary leading-4">
              Safety tip: Meet in a public place and inspect items before payment. Never send money in advance.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BottomActions;