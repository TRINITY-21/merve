// hooks/useLocation.ts - Custom hook for location management
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export interface LocationCoordinate {
  latitude: number;
  longitude: number;
  heading?: number;
}

interface UseLocationReturn {
  location: LocationCoordinate | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  watchLocation: () => () => void;
}

export const useLocation = (autoRequest: boolean = true): UseLocationReturn => {
  const [location, setLocation] = useState<LocationCoordinate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        heading: currentLocation.coords.heading ?? undefined,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      
      // Fallback to default location (Accra, Ghana)
      setLocation({
        latitude: 5.6037,
        longitude: -0.1870,
      });
      
      Alert.alert('Location Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  
  const watchLocation = () => {
    let subscription: Location.LocationSubscription;

    const startWatching = async () => {
      try {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (newLocation) => {
            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              heading: newLocation.coords.heading ?? undefined,
            });
          }
        );
      } catch (err) {
        console.error('Error watching location:', err);
      }
    };

    startWatching();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  };

  useEffect(() => {
    if (autoRequest) {
      requestLocation();
    }
  }, [autoRequest]);

  return {
    location,
    isLoading,
    error,
    requestLocation,
    watchLocation,
  };
};
