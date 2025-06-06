// components/SortModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { ISortModalProps } from '../../../../../../types/marketplaceTypes';

const SortModal: React.FC<ISortModalProps> = ({
  visible,
  sortOptions,
  selectedSort,
  onClose,
  onSortSelect,
}) => {
  const handleSortSelect = (sortKey: string) => {
    onSortSelect(sortKey);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl pt-6 pb-10">
          <View className="flex-row justify-between items-center px-6 mb-6">
            <Text className="text-xl font-bold text-text-primary">Sort by</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
          
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              className={`flex-row items-center px-6 py-4 gap-4 ${
                selectedSort === option.key ? 'bg-background' : ''
              }`}
              onPress={() => handleSortSelect(option.key)}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={20} 
                color={selectedSort === option.key ? '#00BFA5' : '#9E9E9E'} 
              />
              <Text 
                className={`flex-1 text-base ${
                  selectedSort === option.key 
                    ? 'font-semibold text-accent' 
                    : 'text-text-primary'
                }`}
              >
                {option.label}
              </Text>
              {selectedSort === option.key && (
                <MaterialIcons name="check" size={20} color="#00BFA5" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;