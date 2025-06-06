import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../../../../../../constants/theme/colors';
import { ISearchBarProps } from '../../../../../../types/agentProductTypes';

const SearchBar: React.FC<ISearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <View className="flex-row items-center bg-white/90 rounded-2xl px-4 py-3.5 gap-3 mb-4">
      <MaterialIcons name="search" size={20} color={colors.gray.medium} />
      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor={colors.gray.medium}
      />
      {searchQuery !== '' && (
        <TouchableOpacity onPress={() => onSearchChange('')}>
          <MaterialIcons name="clear" size={20} color={colors.gray.medium} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;