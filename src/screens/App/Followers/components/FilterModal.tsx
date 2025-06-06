// components/FilterModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import {
    Dimensions,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const FilterModal: React.FC<IFilterModalProps> = ({
  visible,
  activeTab,
  selectedFilter,
  filterOptions,
  onClose,
  onFilterSelect,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View 
          className="bg-white rounded-t-3xl"
          style={{ maxHeight: screenHeight * 0.8 }}
        >
          <View className="flex-row justify-between items-center p-5 border-b border-gray-200">
            <Text className="text-xl font-bold text-gray-800">
              Filter {activeTab === 'followers' ? 'Followers' : 'Following'}
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              className="p-1"
            >
              <MaterialIcons name="close" size={24} color="#616161" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                className={`flex-row items-center justify-between px-5 py-4 border-b border-gray-200 ${
                  selectedFilter === option.key ? 'bg-teal-50' : ''
                }`}
                onPress={() => onFilterSelect(option.key)}
                activeOpacity={0.8}
              >
                <View className="flex-1 flex-row justify-between items-center mr-4">
                  <Text className={`text-base font-semibold ${
                    selectedFilter === option.key 
                      ? 'text-teal-500' 
                      : 'text-gray-800'
                  }`}>
                    {option.label}
                  </Text>
                  <Text className="text-sm text-gray-600 font-semibold">
                    {option.count}
                  </Text>
                </View>
                {selectedFilter === option.key && (
                  <MaterialIcons name="check" size={20} color="#00BFA5" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// components/EmptyState.tsx
import React from 'react';
import { IEmptyStateProps, IFilterModalProps } from '../../../../types/followersTypes';

export const EmptyState: React.FC<IEmptyStateProps> = ({
  activeTab,
  searchQuery,
}) => {
  return (
    <View className="items-center py-15">
      <MaterialIcons 
        name={activeTab === 'followers' ? "people-outline" : "store"} 
        size={64} 
        color="#9E9E9E" 
      />
      <Text className="text-lg font-bold text-gray-800 mt-4 mb-2">
        No {activeTab === 'followers' ? 'followers' : 'agents'} found
      </Text>
      <Text className="text-sm text-gray-600 text-center">
        {searchQuery ? 'Try adjusting your search' : `Your ${activeTab} will appear here`}
      </Text>
    </View>
  );
};