// components/AgentFilters.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IAgentFiltersProps } from '../../../types/searchAgentTypes';

const AgentFilters: React.FC<IAgentFiltersProps> = ({
  visible,
  sortOptions,
  providerOptions,
  statusOptions,
  serviceOptions,
  sortBy,
  sortOrder,
  selectedProvider,
  selectedStatus,
  selectedService,
  onSortChange,
  onProviderChange,
  onStatusChange,
  onServiceChange,
}) => {
  const filterSlideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(filterSlideAnim, {
      toValue: visible ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const renderSortOptions = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 mb-2.5">
      <View className="flex-row gap-3">
        {sortOptions?.map((option) => (
          <TouchableOpacity
            key={option.key}
            className="rounded-2xl overflow-hidden"
            onPress={() => {
              if (sortBy === option.key) {
                onSortChange(option.key, sortOrder === 'asc' ? 'desc' : 'asc');
              } else {
                onSortChange(option.key, 'asc');
              }
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={sortBy === option.key ? ['#FFCC00', '#FFB300'] : ['#f8fafc', '#ffffff']}
              className="flex-row items-center px-4 py-2.5 gap-1.5"
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={16} 
                color={sortBy === option.key ? 'white' : '#757575'} 
              />
              <Text className={`text-sm font-semibold ${
                sortBy === option.key ? 'text-white' : 'text-[#757575]'
              }`}>
                {option.label}
              </Text>
              {sortBy === option.key && (
                <MaterialIcons 
                  name={sortOrder === 'asc' ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                  size={16} 
                  color="white" 
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderFilterSection = () => (
    <Animated.View 
      className="bg-white mx-5 rounded-2xl p-5 shadow-lg"
      style={{ transform: [{ translateY: filterSlideAnim }] }}
    >
      {/* Provider Filter */}
      <View className="mb-5">
        <Text className="text-base font-bold text-[#212121] mb-3">
          Network Provider
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row flex-wrap gap-2.5">
            {providerOptions.map((provider) => (
              <TouchableOpacity
                key={provider.key}
                className={`px-4 py-2 rounded-2xl border-1.5 ${
                  selectedProvider === provider.key 
                    ? 'bg-[#00BFA5] border-[#00BFA5]' 
                    : 'bg-white border-[#E0E0E0]'
                }`}
                style={{
                  borderColor: selectedProvider === provider.key ? '#00BFA5' : provider.color
                }}
                onPress={() => onProviderChange(provider.key)}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-semibold ${
                  selectedProvider === provider.key ? 'text-white' : 'text-[#757575]'
                }`}>
                  {provider.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Status Filter */}
      <View className="mb-5">
        <Text className="text-base font-bold text-[#212121] mb-3">
          Status
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row flex-wrap gap-2.5">
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status.key}
                className={`px-4 py-2 rounded-2xl border-1.5 ${
                  selectedStatus === status.key 
                    ? 'bg-[#00BFA5] border-[#00BFA5]' 
                    : 'bg-white border-[#E0E0E0]'
                }`}
                style={{
                  borderColor: selectedStatus === status.key ? '#00BFA5' : status.color
                }}
                onPress={() => onStatusChange(status.key)}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-semibold ${
                  selectedStatus === status.key ? 'text-white' : 'text-[#757575]'
                }`}>
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Service Filter */}
      <View>
        <Text className="text-base font-bold text-[#212121] mb-3">
          Services
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row flex-wrap gap-2.5">
            {serviceOptions.map((service) => (
              <TouchableOpacity
                key={service.key}
                className={`px-4 py-2 rounded-2xl border-1.5 ${
                  selectedService === service.key 
                    ? 'bg-[#00BFA5] border-[#00BFA5]' 
                    : 'bg-white border-[#E0E0E0]'
                }`}
                onPress={() => onServiceChange(service.key)}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-semibold ${
                  selectedService === service.key ? 'text-white' : 'text-[#757575]'
                }`}>
                  {service.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );

  return (
    <View className="pt-2.5">
      {renderSortOptions()}
      {visible && renderFilterSection()}
    </View>
  );
};

export default AgentFilters;