// AgentMapView.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Typography } from '../../../../../components/common';
import { colors } from '../../../../../constants/theme/colors';
import { IAgentData } from '../../../../../types/agentProfileTypes';


interface AgentMapViewProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export const AgentMapView: React.FC<AgentMapViewProps> = ({
  agentData,
  fadeAnim,
  slideAnim
}) => {
  const mapRef = useRef<MapView>(null);
  const latitude = parseFloat(String(agentData.location.coordinates.lat));
  const longitude = parseFloat(String(agentData.location.coordinates.lng));

  if (isNaN(latitude) || isNaN(longitude)) {
    return (
      <Animated.View
        className="h-45 rounded-2xl overflow-hidden mb-4 border border-black/6 shadow-sm shadow-black/20 elevation-8 mx-4 mt-4"
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <Text>Error: Invalid coordinates</Text>
      </Animated.View>
    );
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      }, 1000);
    }
  }, [latitude, longitude]);



  return (
    <>
      <View className="pl-4 pt-3">
     <Typography variant="semibold" size={16} style={{ color: colors.text.primary, letterSpacing: 0.5 }}>
          Agent Location
        </Typography>
      </View>

      <Animated.View
        className="rounded-2xl overflow-hidden mb-4 border border-gray-300 mx-4 mt-4"
        style={{ height: 180, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}

        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      </Animated.View>

    </>
  );
};