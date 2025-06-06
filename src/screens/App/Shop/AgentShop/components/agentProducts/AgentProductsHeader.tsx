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
import { IAgentProductsHeaderProps } from '../../../../../../types/agentProductTypes';
import QuickStats from './QuickStats';
import SearchBar from './SearchBar';

const AgentProductsHeader: React.FC<IAgentProductsHeaderProps> = ({
  navigation,
  searchQuery,
  onSearchChange,
  products,
  scaleAnim,
}) => {
  return (
    <Animated.View 
      className="shadow-lg shadow-black/15 elevation-8"
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <LinearGradient 
        colors={colors.gradient.primary} 
        style={{
          paddingTop: Platform.OS === 'ios' ? 60 : 40,
          paddingBottom: 24,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-5">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <MaterialIcons name="chevron-left" size={24} color={colors.white} />
            </TouchableOpacity>
            
            <Text className="text-xl font-bold text-white flex-1 text-center">
              My Products
            </Text>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => navigation.navigate('AddProductScreen')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />

          <QuickStats products={products} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default AgentProductsHeader;