// components/EmptyAgentsState.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IEmptyAgentsStateProps } from '../../../types/searchAgentTypes';

const EmptyAgentsState: React.FC<IEmptyAgentsStateProps> = ({
  searchQuery,
  hasFilters = false,
  onClearFilters,
}) => {
  const getEmptyMessage = () => {
    if (searchQuery && searchQuery.length > 0) {
      return {
        title: 'No agents found',
        subtitle: `No agents match "${searchQuery}". Try adjusting your search terms.`,
        icon: 'search-off',
      };
    } else if (hasFilters) {
      return {
        title: 'No agents found',
        subtitle: 'No agents match your current filters. Try adjusting your filter criteria.',
        icon: 'filter-list-off',
      };
    } else {
      return {
        title: 'No agents available',
        subtitle: 'There are currently no agents in this area.',
        icon: 'location-off',
      };
    }
  };

  const message = getEmptyMessage();

  return (
    <View className="items-center justify-center py-15">
      <MaterialIcons name={message.icon as any} size={64} color="#9E9E9E" />
      <Text className="text-xl font-bold text-[#212121] mt-4 mb-2">
        {message.title}
      </Text>
      <Text className="text-sm text-[#757575] text-center px-10 mb-6">
        {message.subtitle}
      </Text>
      
      {hasFilters && onClearFilters && (
        <TouchableOpacity 
          className="bg-[#FFCC00] px-6 py-3 rounded-2xl flex-row items-center gap-2"
          onPress={onClearFilters}
          activeOpacity={0.8}
        >
          <MaterialIcons name="clear-all" size={16} color="white" />
          <Text className="text-white font-bold">Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyAgentsState;