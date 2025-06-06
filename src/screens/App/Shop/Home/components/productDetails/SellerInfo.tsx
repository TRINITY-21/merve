// components/SellerInfo.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ISellerInfoProps } from '../../../../../../types/productDetailsTypes';

const SellerInfo: React.FC<ISellerInfoProps> = ({
  agent,
  onViewProfile,
  onViewStore,
}) => {
  return (
    <View className="bg-white px-5 py-5">
      <View className="bg-background rounded-2xl p-5">
        {/* Seller Header */}
        <View className="flex-row mb-4">
          <Image 
            source={{ uri: agent.profileImage }} 
            className="w-15 h-15 rounded-full mr-4"
          />
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-lg font-bold text-text-primary">
                {agent.name}
              </Text>
              {agent.verified && (
                <MaterialIcons name="verified" size={16} color="#00BFA5" />
              )}
            </View>
            <View className="flex-row items-center gap-1 mb-1">
              <MaterialIcons name="star" size={14} color="#FF9800" />
              <Text className="text-sm font-semibold text-text-primary">
                {agent.rating}
              </Text>
              <Text className="text-sm text-text-secondary">
                ({agent.totalReviews} reviews)
              </Text>
            </View>
            <Text className="text-sm text-text-secondary">
              {agent.location}
            </Text>
          </View>
        </View>

        {/* Seller Stats */}
        <View className="flex-row justify-between items-center bg-white rounded-xl p-4 mb-4">
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-text-primary mb-0.5">
              {agent.distance} km
            </Text>
            <Text className="text-xs text-text-secondary">Distance</Text>
          </View>
          <View className="w-px h-8 bg-gray-light" />
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-text-primary mb-0.5">
              {agent.responseTime}
            </Text>
            <Text className="text-xs text-text-secondary">Response</Text>
          </View>
          <View className="w-px h-8 bg-gray-light" />
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-text-primary mb-0.5">
              {agent.totalProducts}
            </Text>
            <Text className="text-xs text-text-secondary">Products</Text>
          </View>
          <View className="w-px h-8 bg-gray-light" />
          <View className="items-center flex-1">
            <Text className="text-base font-bold text-text-primary mb-0.5">
              {agent.memberSince}
            </Text>
            <Text className="text-xs text-text-secondary">Member</Text>
          </View>
        </View>

        {/* Seller Actions */}
        <View className="flex-row gap-3">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center bg-white rounded-xl py-3 gap-2"
            onPress={onViewProfile}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person" size={18} color="#00BFA5" />
            <Text className="text-sm font-semibold text-accent">View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center bg-white rounded-xl py-3 gap-2"
            onPress={onViewStore}
            activeOpacity={0.8}
          >
            <MaterialIcons name="storefront" size={18} color="#00BFA5" />
            <Text className="text-sm font-semibold text-accent">View Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SellerInfo;