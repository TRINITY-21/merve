// components/PromoteProductHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IHeaderProps } from '../../../../types/promoteTypes';

const PromoteProductHeader: React.FC<IHeaderProps> = ({
  currentStep,
  onBack,
  onAnalytics,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progressValue = currentStep / 3;
    Animated.timing(progressAnim, {
      toValue: progressValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <View className="z-10">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-12' : 'pt-8'} pb-5`}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        <View className="flex-row items-center justify-between px-5 mb-4">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onBack}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          
          <Text className="flex-1 text-center text-xl font-bold text-white px-5">
            Promote Your Product
          </Text>
          
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onAnalytics}
            activeOpacity={0.8}
          >
            <MaterialIcons name="analytics" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View className="px-5">
          <View className="h-1 bg-white/30 rounded-sm mb-2">
            <Animated.View 
              className="h-full bg-white rounded-sm"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                })
              }}
            />
          </View>
          <Text className="text-xs text-white text-center opacity-80">
            Step {currentStep} of 3
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PromoteProductHeader;