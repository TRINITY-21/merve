// components/TimeframeModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ITimeframe } from '../../../../../types/analyticTypes';

interface ITimeframeModalProps {
  visible: boolean;
  timeframes: ITimeframe[];
  selectedTimeframe: string;
  onClose: () => void;
  onSelect: (timeframe: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');

const TimeframeModal: React.FC<ITimeframeModalProps> = ({
  visible,
  timeframes,
  selectedTimeframe,
  onClose,
  onSelect,
}) => {
  const handleSelect = (timeframeKey: string) => {
    onSelect(timeframeKey);
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
        <View 
          className="bg-white rounded-t-3xl"
          style={{ maxHeight: screenHeight * 0.8 }}
        >
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-light">
            <Text className="text-lg font-bold text-text-primary">
              Select Time Period
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
          
          <View className="px-6 py-5">
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.key}
                className="flex-row justify-between items-center py-4 border-b border-gray-light last:border-b-0"
                onPress={() => handleSelect(timeframe.key)}
                activeOpacity={0.8}
              >
                <Text className="text-base text-text-primary">
                  {timeframe.label}
                </Text>
                {selectedTimeframe === timeframe.key && (
                  <MaterialIcons name="check" size={20} color="#00BFA5" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimeframeModal;