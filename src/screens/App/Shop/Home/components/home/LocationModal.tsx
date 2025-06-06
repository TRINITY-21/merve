// components/LocationModal.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ILocationModalProps } from '../../../../../../types/marketplaceTypes';

interface ILocationModalInternalProps extends ILocationModalProps {
  slideAnim: Animated.Value;
}

const LocationModal: React.FC<ILocationModalInternalProps> = ({
  visible,
  locations,
  selectedLocation,
  slideAnim,
  onClose,
  onLocationSelect,
}) => {
  const handleLocationSelect = (city: string, region: string) => {
    onLocationSelect(`${city}, ${region}`);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <Animated.View 
          className="flex-1 bg-white mt-25 rounded-t-3xl"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <View className="flex-row justify-between items-center px-6 py-5 border-b border-gray-light">
            <Text className="text-xl font-bold text-text-primary">Choose Location</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#212121" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6">
            {locations.map((region) => (
              <View key={region.region} className="mb-6">
                <Text className="text-base font-bold text-text-primary mb-3">
                  {region.region} Region
                </Text>
                <View className="gap-2">
                  {region.cities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      className={`flex-row justify-between items-center py-3 px-4 rounded-xl ${
                        selectedLocation.includes(city) 
                          ? 'bg-accent' 
                          : 'bg-background'
                      }`}
                      onPress={() => handleLocationSelect(city, region.region)}
                      activeOpacity={0.8}
                    >
                      <Text 
                        className={`text-sm font-semibold ${
                          selectedLocation.includes(city) 
                            ? 'text-white' 
                            : 'text-text-primary'
                        }`}
                      >
                        {city}
                      </Text>
                      {selectedLocation.includes(city) && (
                        <MaterialIcons name="check" size={16} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LocationModal;