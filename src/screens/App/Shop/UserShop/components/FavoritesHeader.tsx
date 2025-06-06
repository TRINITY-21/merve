// components/FavoritesHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IFavoritesHeaderProps } from '../../../../../types/favoriteProductTypes';
import { StatsDisplay } from './StatsDisplay';

export const FavoritesHeader: React.FC<IFavoritesHeaderProps> = ({
  favoriteProducts,
  searchQuery,
  onSearchChange,
  onBack,
  onClearAll,
}) => {
  const inStockCount = favoriteProducts.filter(p => p.inStock).length;
  const onSaleCount = favoriteProducts.filter(p => p.discount).length;

  return (
    <View 
      className="shadow-lg shadow-black/15"
      style={{
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <LinearGradient 
        colors={['#FFCC00', '#FFB300']} 
        className={`${Platform.OS === 'ios' ? 'pt-15' : 'pt-10'} pb-6`}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFCC00" />
        
        <View className="px-5">
          {/* Header Title with Back and Clear All */}
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onBack}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chevron-left" size={24} color="#1E3A5F" />
            </TouchableOpacity>
            
            <Text className="text-3xl font-black text-[#1E3A5F] text-center flex-1">
              My Favorites
            </Text>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
              onPress={onClearAll}
              activeOpacity={0.8}
            >
              <MaterialIcons name="clear-all" size={24} color="#1E3A5F" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View 
            className="flex-row items-center bg-white/90 rounded-2xl px-4 py-3.5 gap-3 mb-4"
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <MaterialIcons name="search" size={20} color="#9E9E9E" />
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Search favorites..."
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

          {/* Stats */}
          <StatsDisplay
            totalItems={favoriteProducts.length}
            inStockItems={inStockCount}
            onSaleItems={onSaleCount}
          />
        </View>
      </LinearGradient>
    </View>
  );
};