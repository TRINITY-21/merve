import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { IFormData } from '../../../../../types/agentRegistrationTypes';

interface ILocationContactStepProps {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  cardStyle: any;
}

const LocationContactStep: React.FC<ILocationContactStepProps> = ({
  formData,
  setFormData,
  cardStyle,
}) => {
  return (
    <Animated.View 
      style={cardStyle}
      className="bg-white/95 rounded-2xl p-5 mb-5 border border-[#FFCC00]/30 shadow-lg"
    >
      <Text className="text-xl font-bold text-[#212121] mb-2">
        Location & Contact
      </Text>
      <Text className="text-sm text-[#757575] mb-5">
        Where can customers find you? 📍
      </Text>

      {/* Address Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="location-on" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Precise Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Landmark Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="place" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Landmark"
          value={formData.landmark}
          onChangeText={(text) => setFormData({ ...formData, landmark: text })}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Contact Phone Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="phone" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* WhatsApp Input */}
      <View className="flex-row items-center bg-[#E0E0E0] rounded-xl px-4 py-3 mb-4 border border-[#9E9E9E]">
        <MaterialIcons name="chat" size={24} color="#00BFA5" />
        <TextInput
          className="flex-1 ml-2 text-base text-[#212121]"
          placeholder="WhatsApp Number (Optional)"
          value={formData.whatsapp}
          onChangeText={(text) => setFormData({ ...formData, whatsapp: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Map Container */}
      <View className="h-50 rounded-2xl overflow-hidden mb-4 border border-[#9E9E9E]">
        <MapView
          className="flex-1"
          region={{
            latitude: formData.location.latitude || 5.6037, // Default to Accra
            longitude: formData.location.longitude || -0.1870,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) =>
            setFormData({
              ...formData,
              location: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
            })
          }
        >
          {formData.location.latitude !== 0 && (
            <Marker
              coordinate={{
                latitude: formData.location.latitude,
                longitude: formData.location.longitude,
              }}
            />
          )}
        </MapView>
      </View>
    </Animated.View>
  );
};

export default LocationContactStep;