import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../../../../constants/theme/colors';

const { height: screenHeight } = Dimensions.get('window');

interface ITimeframe {
  key: string;
  label: string;
  value: string;
}

interface ITimeframeModalProps {
  visible: boolean;
  timeframes: ITimeframe[];
  selectedTimeframe: string;
  onSelect: (timeframe: string) => void;
  onClose: () => void;
}

const TimeframeModal: React.FC<ITimeframeModalProps> = ({
  visible,
  timeframes,
  selectedTimeframe,
  onSelect,
  onClose,
}) => {
  const handleSelect = (timeframeKey: string): void => {
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
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900">Select Time Period</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text?.primary || colors.gray.dark} />
            </TouchableOpacity>
          </View>
          
          <View className="px-6 py-5">
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.key}
                className="flex-row justify-between items-center py-4 border-b border-gray-200"
                onPress={() => handleSelect(timeframe.key)}
                activeOpacity={0.8}
              >
                <Text className="text-base text-gray-900">{timeframe.label}</Text>
                {selectedTimeframe === timeframe.key && (
                  <MaterialIcons name="check" size={20} color={colors.accent} />
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