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
import { colors } from '../../../../../../constants/theme/colors';
import { IAddProductHeaderProps } from '../../../../../../types/addproductTypes';


const AddProductHeader: React.FC<IAddProductHeaderProps> = ({
  navigation,
  progressAnim,
  currentStep,
  totalSteps,
  onSaveDraft,
}) => {
  return (
    <View className="shadow-lg shadow-black/15 elevation-8">
      <LinearGradient 
        colors={colors.gradient.primary} 
        style={{
          paddingTop: Platform.OS === 'ios' ? 60 : 0,
          paddingBottom: 20,
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
        
        <View className="flex-row items-center justify-between px-5 mb-4">
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="chevron-left" size={24} color={colors.secondary} />
          </TouchableOpacity>
          
          <Text className="text-xl font-bold text-secondary flex-1 text-center">
            Add Product
          </Text>
          
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onSaveDraft}
            activeOpacity={0.8}
          >
            <MaterialIcons name="save" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
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
          <Text className="text-xs text-white text-center font-semibold">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AddProductHeader;