import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, ScrollView, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
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
  const inputStyle = {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: 0,
    lineHeight: Platform.OS === 'ios' ? 20 : 18,
    includeFontPadding: false,
    textAlignVertical: 'center' as const,
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    marginLeft: 8,
    fontFamily: 'JosefinSans_400Regular',
  };

  const iconStyle = {
    marginTop: Platform.OS === 'ios' ? 0 : -1
  };

  const containerStyle = {
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    minHeight: Platform.OS === 'ios' ? 52 : 48
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: 20 }}
      contentContainerStyle={{
        paddingBottom: 10,
        flexGrow: 1
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View
        style={[cardStyle, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: colors.primary + '30',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }]}
      >
        <Typography
          variant="semibold"
          className="text-xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Location & Contact
        </Typography>
        <Typography size={14}
          className="text-sm mb-5"
          style={{ color: colors.text.secondary }}
        >
          Where can customers find you? 📍
        </Typography>

        {/* Address Input */}
        <View
          className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, {
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="location-on" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Precise Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Landmark Input */}
        <View
          className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, {
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="place" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Landmark"
            value={formData.landmark}
            onChangeText={(text) => setFormData({ ...formData, landmark: text })}
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Contact Phone Input */}
        <View
          className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, {
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="phone" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="Contact Phone"
            value={formData.contactPhone}
            onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* WhatsApp Input */}
        <View
          className="flex-row items-center rounded-xl px-4 mb-4 border"
          style={[containerStyle, {
            backgroundColor: colors.background || '#F8F9FA',
            borderColor: colors.primary + '30'
          }]}
        >
          <MaterialIcons name="chat" size={24} color={colors.primary} style={iconStyle} />
          <TextInput
            style={inputStyle}
            placeholder="WhatsApp Number (Optional)"
            value={formData.whatsapp}
            onChangeText={(text) => setFormData({ ...formData, whatsapp: text })}
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor={colors.text.secondary}
          />
        </View>

        {/* Map Section */}
        <View className="mb-4">
          <Typography variant='semibold'
            className="text-lg mb-3"
            style={{ color: colors.text.primary }}
          >
            Pin Your Location
          </Typography>
          <Typography
            className="text-sm mb-3"
            style={{ color: colors.text.secondary }}
          >
            Tap on the map to set your exact location
          </Typography>

          {/* Map Container */}
          <View
            className="rounded-2xl overflow-hidden"
            style={{
              height: 200,
              borderWidth: 2,
              borderColor: colors.primary + '30'
            }}
          >
            <MapView
              style={{ flex: 1 }}
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
                  pinColor={colors.primary}
                />
              )}
            </MapView>
          </View>

          {/* Location Status */}
          {formData.location.latitude !== 0 ? (
            <View
              className="flex-row items-center justify-center mt-3 py-2 px-4 rounded-lg"
              style={{ backgroundColor: colors.success + '20' }}
            >
              <MaterialIcons name="check-circle" size={16} color={colors.success} />
              <Typography variant='regular'
                className="ml-2 text-sm"
                style={{ color: colors.success }}
              >
                Location selected successfully
              </Typography>
            </View>
          ) : (
            <View
              className="flex-row items-center justify-center mt-3 py-2 px-4 rounded-lg"
              style={{ backgroundColor: colors.warning + '20' }}
            >
              <MaterialIcons name="location-off" size={16} color={colors.warning} />
              <Typography
                className="ml-2 text-sm"
                style={{ color: colors.warning }}
              >
                Please tap on the map to set your location
              </Typography>
            </View>
          )}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default LocationContactStep;