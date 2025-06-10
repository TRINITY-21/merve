// components/BottomActions.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../../../../constants/theme/colors';
import { IBottomActionsProps } from '../../../../../../types/productDetailsTypes';

const BottomActions: React.FC<IBottomActionsProps> = ({
  showSellerNumber,
  sellerPhone,
  onCall,
  onDirections,
  onMessage,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="absolute bottom-0 left-0 right-0">
      {/* Sophisticated gradient overlay */}
      <LinearGradient 
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)', '#FFFFFF']} 
        className="h-8" 
      />
      
      <View 
        className="bg-white/95 backdrop-blur-xl px-6 pt-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        {/* Main action buttons */}
        <View className="flex-row gap-3 items-center">
          {/* Directions Button - Circular */}
          <TouchableOpacity 
            className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-full items-center justify-center"
            onPress={onDirections}
            activeOpacity={0.7}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <MaterialIcons name="directions" size={24} color="#0D9488" />
          </TouchableOpacity>
          
          {/* Call Button - Hero CTA */}
          <TouchableOpacity 
            className="flex-1 rounded-2xl py-4 px-6 items-center justify-center overflow-hidden"
            onPress={onCall}
            activeOpacity={0.8}
            style={{
              // shadowColor: colors.primary,
              // shadowOffset: { width: 0, height: 4 },
              // shadowOpacity: 0.3,
              // shadowRadius: 12,
              // elevation: 8,
            }}
          >
            {showSellerNumber ? (
              <View className="items-center">
                <Text className="text-lg font-bold text-primary tracking-wide mb-1">
                  {sellerPhone}
                </Text>
                <Text className="text-xs text-accent font-medium">
                  Tap to call now
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-3">
                <View className="bg-white/20 p-2 rounded-full">
                  <MaterialIcons name="phone" size={22} color={colors.primary} />
                </View>
                <Text className="text-base font-bold text-primary tracking-wide">
                  Call Agent
                </Text> 
              </View>
            )}
          </TouchableOpacity>
          
          {/* Message Button - Circular */}
          <TouchableOpacity 
            className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-full items-center justify-center relative"
            onPress={onMessage}
            activeOpacity={0.7}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <MaterialIcons name="chat" size={24} color={colors.primary} />
            {/* Online indicator */}
            <View className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View> 

        {/* Safety tip - positioned below buttons when phone shown */}
        {showSellerNumber && (
          <View className="mt-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-2xl p-4">
            <View className="flex-row items-start gap-3">
              <View className="bg-orange-100 p-0.5 rounded-full">
                <MaterialIcons name="security" size={14} color="#F97316" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-orange-800 mb-1">
                  Safety First
                </Text>
                <Text className="text-xs text-orange-700 leading-4">
                  Meet in public places and inspect items before payment. Never send money in advance.
                </Text>
              </View>
            </View>
          </View>
        )}

      </View>
    </View>
  );
};

export default BottomActions;