// components/MarketplaceHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Dimensions,
  PanResponder,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { IMarketplaceHeaderProps } from '../../../../../../types/marketplaceTypes';
const { width: screenWidth } = Dimensions.get('window');

const MarketplaceHeader: React.FC<IMarketplaceHeaderProps> = ({
  selectedLocation,
  showMap,
  searchQuery,
  radius,
  onLocationPress,
  onMapToggle,
  onSearchChange,
  onRadiusChange,
  onBack,
  onFavoritesPress,
}) => {
  // Pan responder for radius slider
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (event, gestureState) => {
        const sliderWidth = screenWidth - 140;
        const newRadius = Math.max(1, Math.min(10, Math.round((gestureState.moveX / sliderWidth) * 10)));
        if (newRadius !== radius) {
          onRadiusChange(newRadius);
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View className="shadow-lg">
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-16' : 'pt-10'} pb-6`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          {/* Header Title with Back and Favorite */}
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onBack}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-3xl font-black text-secondary text-center flex-1">
              Marketplace
            </Text>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onFavoritesPress}
              activeOpacity={0.8}
            >
              <MaterialIcons name="favorite-border" size={24} color="#1E3A5F" />
            </TouchableOpacity>
          </View>
          
          {/* Top Navigation */}
          <View className="flex-row justify-between items-center mb-5">
            <TouchableOpacity 
              className="flex-row items-center bg-white/15 rounded-full px-3 py-2 gap-1.5"
              onPress={onLocationPress}
              activeOpacity={0.8}
            >
              <MaterialIcons name="location-on" size={16} color="#1E3A5F" />
              <Text className="text-sm font-semibold text-secondary">
                {selectedLocation}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color="#1E3A5F" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onMapToggle}
              activeOpacity={0.8}
            >
              <MaterialIcons 
                name={showMap ? "view-list" : "map"} 
                size={20} 
                color="#1E3A5F" 
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white/90 rounded-2xl px-4 py-3.5 gap-3 mb-4 shadow-sm">
            <MaterialIcons name="search" size={20} color="#9E9E9E" />
            <TextInput
              className="flex-1 text-base text-text-primary"
              placeholder="Search products, stores..."
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholderTextColor="#9E9E9E"
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => onSearchChange('')}>
                <MaterialIcons name="clear" size={20} color="#9E9E9E" />
              </TouchableOpacity>
            )}
          </View>

          {/* Radius Slider */}
          <View className="flex-row items-center justify-between gap-4">
            <Text className="text-sm font-semibold text-secondary min-w-[80px]">
              Within {radius} km
            </Text>
            <View className="flex-1">
              <View 
                className="h-1 bg-white/30 rounded-sm relative mb-2"
                {...panResponder.panHandlers}
              >
                <View 
                  className="h-full bg-accent rounded-sm"
                  style={{ width: `${(radius / 10) * 100}%` }}
                />
                <View 
                  className="absolute -top-1.5 w-4 h-4 bg-accent rounded-full border-2 border-white"
                  style={{ left: `${(radius / 10) * 100}%`, transform: [{ translateX: -8 }] }}
                />
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-white/70 font-medium">1km</Text>
                <Text className="text-xs text-white/70 font-medium">10km</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default MarketplaceHeader;