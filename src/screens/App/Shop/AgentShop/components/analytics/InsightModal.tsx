// components/InsightsModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IInsight } from '../../../../../../types/analyticTypes';

interface IInsightsModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

const InsightsModal: React.FC<IInsightsModalProps> = ({ visible, onClose }) => {
  const insights: IInsight[] = [
    {
      icon: 'trending-up',
      title: 'Great Performance!',
      text: 'Your product is performing 15.2% above category average. Keep up the good work!',
      color: '#4CAF50',
    },
    {
      icon: 'schedule',
      title: 'Peak Hours',
      text: 'Most views occur between 6-9 PM. Consider promoting during these hours.',
      color: '#FFCC00',
    },
    {
      icon: 'location-on',
      title: 'Geographic Opportunity',
      text: 'Low visibility in Tamale region. Consider targeted promotions there.',
      color: '#00BFA5',
    },
    {
      icon: 'warning',
      title: 'Optimization Needed',
      text: 'Add 2-3 more relevant tags to improve search visibility.',
      color: '#FF9800',
    },
  ];

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
              AI Insights & Recommendations
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="px-6 py-5">
            {insights.map((insight, index) => (
              <View key={index} className="bg-background rounded-xl p-4 mb-4 flex-row">
                <MaterialIcons 
                  name={insight.icon as any} 
                  size={24} 
                  color={insight.color} 
                />
                <View className="flex-1 ml-3">
                  <Text className="text-base font-bold text-text-primary mb-1">
                    {insight.title}
                  </Text>
                  <Text className="text-sm text-text-secondary leading-5">
                    {insight.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default InsightsModal;