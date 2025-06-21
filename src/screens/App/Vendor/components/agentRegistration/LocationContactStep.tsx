import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  const getInputContainerStyle = (inputName: string) => ({
    ...containerStyle,
    backgroundColor: colors.white,
    borderColor: focusedInput === inputName ? colors.primary : colors.gray.light,
    borderWidth: focusedInput === inputName ? 2 : 1,
    borderRadius: 12,
    // shadowColor: focusedInput === inputName ? colors.primary : colors.shadowColor,
    // shadowOffset: colors.shadowOffset,
    // shadowOpacity: focusedInput === inputName ? 0.1 : 0.05,
    // shadowRadius: focusedInput === inputName ? 8 : 4,
    // elevation: focusedInput === inputName ? 4 : 2,
  });

  return (
    <Animated.View
      style={[cardStyle, {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.gray.light,
        marginTop: 10,
      }]}
    >
      <View style={{ marginBottom: 24 }}>
        <Typography
          variant="semibold"
          className="text-xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Location & Contact
        </Typography>
        <Typography size={14}
          className="text-sm"
          style={{ color: colors.text.secondary, lineHeight: 20 }}
        >
          Where can customers find you? Help them locate your business easily.
        </Typography>
      </View>

      {/* Address Input */}
      <View
        className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('address')}
      >
        <MaterialIcons name="location-on" size={24} color={focusedInput === 'address' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Precise Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('address')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="words"
        />
      </View>

      {/* Landmark Input */}
      <View
        className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('landmark')}
      >
        <MaterialIcons name="place" size={24} color={focusedInput === 'landmark' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Nearby Landmark"
          value={formData.landmark}
          onChangeText={(text) => setFormData({ ...formData, landmark: text })}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('landmark')}
          onBlur={() => setFocusedInput(null)}
          autoCapitalize="words"
        />
      </View>

      {/* Contact Phone Input */}
      <View
        className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('contactPhone')}
      >
        <MaterialIcons name="phone" size={24} color={focusedInput === 'contactPhone' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="Contact Phone Number"
          value={formData.contactPhone}
          onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('contactPhone')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* WhatsApp Input */}
      <View
        className="flex-row items-center rounded-xl px-4 mb-4 border"
        style={getInputContainerStyle('whatsapp')}
      >
        <MaterialIcons name="chat" size={24} color={focusedInput === 'whatsapp' ? colors.primary : colors.text.secondary} style={iconStyle} />
        <TextInput
          style={inputStyle}
          placeholder="WhatsApp Number (Optional)"
          value={formData.whatsapp}
          onChangeText={(text) => setFormData({ ...formData, whatsapp: text })}
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor={colors.text.secondary}
          onFocus={() => setFocusedInput('whatsapp')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      {/* Map Section */}
      <View style={{ marginBottom: 20 }}>
        <Typography variant='semibold'
          className="text-lg mb-3"
          style={{ color: colors.text.primary }}
        >
          Pin Your Location
        </Typography>
        <Typography
          variant='regular'
          size={14}
          className="text-sm mb-3"
          style={{ color: colors.text.secondary, lineHeight: 20 }}
        >
          Tap on the map to set your exact location. This helps customers find you easily.
        </Typography>

        {/* Map Container */}
        <View
          style={{
            height: 200,
            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: colors.gray.light,
            ...(Platform.OS === 'android' && {
              elevation: 4,
            }),
            ...(Platform.OS === 'ios' && {
              shadowColor: colors.shadowColor,
              shadowOffset: colors.shadowOffset,
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }),
          }}
        >
          <MapView
            style={{ 
              flex: 1,
              ...(Platform.OS === 'android' && {
                width: '100%',
                height: '100%',
              }),
            }}
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
            onMapReady={() => setMapLoaded(true)}
            showsUserLocation={true}
            showsMyLocationButton={true}
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
        {formData.location.latitude !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 12,
              backgroundColor: colors.primary + '10',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
          >
            <MaterialIcons name="location-on" size={16} color={colors.primary} />
            <Typography variant='regular'
              style={{
                marginLeft: 8,
                fontSize: 12,
                color: colors.primary,
              }}
            >
              Lat: {formData.location.latitude.toFixed(4)}, Lng: {formData.location.longitude.toFixed(4)}
            </Typography>
          </View>
        )}
      </View>

    </Animated.View>
  );
};

export default LocationContactStep;