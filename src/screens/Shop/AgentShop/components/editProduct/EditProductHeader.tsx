import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { colors } from '../../../../../constants/theme/colors';
import { IEditProductHeaderProps } from '../../../../../types/editProductTypes';

const EditProductHeader: React.FC<IEditProductHeaderProps> = ({
  navigation,
  progressAnim,
  currentStep,
  totalSteps,
  hasChanges,
  onBackPress,
  onActionsPress,
}) => {
  return (
    <View className="shadow-lg shadow-black/15 elevation-8">
      <LinearGradient 
        colors={colors.gradient.primary} 
        style={{
          paddingTop: Platform.OS === 'ios' ? 60 : 40,
          paddingBottom: 20,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        
        <View className="flex-row items-center justify-between px-5 mb-4">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onBackPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View className="flex-1 items-center flex-row justify-center">
            <Text className="text-xl font-bold text-white">
              Edit Product
            </Text>
            {hasChanges && (
              <View className="w-2 h-2 rounded-full bg-yellow-400 ml-2" />
            )}
          </View>
          
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onActionsPress}
            activeOpacity={0.8}
          >
            <MaterialIcons name="more-vert" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="px-5">
          <View className="h-1 bg-white/30 rounded-sm mb-2">
            <Animated.View 
              className="h-full bg-yellow-400 rounded-sm"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                })
              }}
            />
          </View>
          <Text className="text-xs text-white/80 text-center font-semibold">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default EditProductHeader;