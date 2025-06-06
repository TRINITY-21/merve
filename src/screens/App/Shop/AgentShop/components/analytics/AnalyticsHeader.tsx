// components/AnalyticsHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IProduct, ITimeframe } from '../../../../../../types/analyticTypes';


interface IAnalyticsHeaderProps {
  product: IProduct;
  selectedTimeframe: string;
  timeframes: ITimeframe[];
  onBack: () => void;
  onTimeframePress: () => void;
  onInsightsPress: () => void;
}

const AnalyticsHeader: React.FC<IAnalyticsHeaderProps> = ({
  product,
  selectedTimeframe,
  timeframes,
  onBack,
  onTimeframePress,
  onInsightsPress,
}) => {
  const handleExport = () => {
    Alert.alert('Export', 'Analytics data exported successfully!');
  };

  const selectedTimeframeLabel = timeframes.find(t => t.key === selectedTimeframe)?.label;

  return (
    <View className="shadow-lg">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-16' : 'pt-10'} pb-5`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="flex-row items-center px-5 mb-4">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-black/20 items-center justify-center"
            onPress={onBack}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={24} color="#212121" />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4">
            <Text className="text-xl font-bold text-text-primary">Product Analytics</Text>
            <Text className="text-sm text-text-primary/80 mt-0.5">
              {product.title || 'Product Performance'}
            </Text>
          </View>
          
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-black/20 items-center justify-center"
            onPress={onInsightsPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="lightbulb" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity 
            className="flex-row items-center bg-black/20 rounded-full px-3 py-2"
            onPress={onTimeframePress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="schedule" size={18} color="#212121" />
            <Text className="text-sm font-semibold text-text-primary mx-2">
              {selectedTimeframeLabel}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={18} color="#212121" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-9 h-9 rounded-full bg-black/20 items-center justify-center"
            onPress={handleExport}
            activeOpacity={0.8}
          >
            <MaterialIcons name="file-download" size={18} color="#212121" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AnalyticsHeader;