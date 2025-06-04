import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme/colors';
import { IAgent } from '../../types';
import { Typography } from '../common/Typography';

// Define how a single NearbyAgent card looks
const renderNearbyAgentItem = ({ item }: { item: IAgent }) => (
  <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100 mx-5">
    {/* Agent Profile Picture/Icon */}
    <View className="w-14 h-14 rounded-full bg-blue-50 items-center justify-center mr-4 relative overflow-hidden">
      {item.profilePicture ? (
        <Image source={{ uri: item.profilePicture }} className="w-full h-full rounded-full" />
      ) : (
        <MaterialIcons name="person" size={28} color={colors.primary} />
      )}
      {/* Optional: Online/Verified status indicator */}
      <View className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
    </View>

    {/* Agent Details */}
    <View className="flex-1">
      <Typography variant="semibold" size={16} className="text-gray-900">
        {item.name}
      </Typography>
      <Typography variant="regular" size={12} className="text-gray-600 mt-1">
        {item.location}
      </Typography>
      <View className="flex-row items-center mt-1">
        <MaterialIcons name="star" size={14} color="#FFB300" />
        <Typography variant="regular" size={12} className="text-gray-700 ml-1">
          {item.rating || '4.5'} {/* Assuming 'rating' field */}
        </Typography>
        <Typography variant="regular" size={12} className="text-gray-500 ml-2">
          ({item.completedTransactions || '100'} transactions)
        </Typography>
      </View>
    </View>
  </TouchableOpacity>
);