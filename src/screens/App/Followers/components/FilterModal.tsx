// components/FilterModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IFilterModalProps } from '../../../../types/followersTypes';

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
  <View style={{ 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end' 
  }}> 
    <View style={{
      backgroundColor: 'white',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      minHeight: 300,
      maxHeight: 900,
    }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#1F2937',
            }}>
              Filter {activeTab === 'followers' ? 'Customers' : 'Customers'}
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              style={{ padding: 2 }}
            >
              <MaterialIcons name="close" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={{ flex: 1 }}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F4F6',
                  backgroundColor: selectedFilter === option.key ? '#ECFDF5' : 'white',
                }}
                onPress={() => onFilterSelect(option.key)}
                activeOpacity={0.8}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: 16,
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: selectedFilter === option.key ? '#059669' : '#1F2937',
                  }}>
                    {option.label}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#6B7280',
                    fontWeight: '600',
                  }}>
                    {option.count}
                  </Text>
                </View>
                {selectedFilter === option.key && (
                  <MaterialIcons name="check" size={20} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};