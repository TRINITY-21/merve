// hooks/useMapNavigation.ts - Custom hook for map navigation
import { useCallback, useState } from 'react';
import type { IAgent } from '../types';
import { getDistance } from '../utils/mapHelper';
import { LocationCoordinate } from './useLocation';

interface RouteData {
  coordinates: LocationCoordinate[];
  duration: number;
  distance: number;
}

interface UseMapNavigationReturn {
  selectedAgent: IAgent | null;
  routes: Record<string, LocationCoordinate[]>;
  routeTimes: Record<string, number>;
  isNavigating: boolean;
  showDirections: boolean;
  currentUserLocation: LocationCoordinate | null;
  remainingRoute: LocationCoordinate[] | null;
  routeProgress: number;
  selectAgent: (agent: IAgent) => void;
  getDirections: (origin: LocationCoordinate, modes: string[]) => Promise<void>;
  startNavigation: () => Promise<void>;
  stopNavigation: () => void;
  updateUserLocation: (location: LocationCoordinate) => void;
}

export const useMapNavigation = (): UseMapNavigationReturn => {
  const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);
  const [routes, setRoutes] = useState<Record<string, LocationCoordinate[]>>({});
  const [routeTimes, setRouteTimes] = useState<Record<string, number>>({});
  const [isNavigating, setIsNavigating] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<LocationCoordinate | null>(null);
  const [remainingRoute, setRemainingRoute] = useState<LocationCoordinate[] | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);

  const getOSRMDirections = async (
    origin: LocationCoordinate,
    destination: LocationCoordinate,
    profile: string = 'driving'
  ): Promise<RouteData | null> => {
    try {
      const osrmProfile = profile === 'walking' ? 'walking' :
        profile === 'cycling' ? 'cycling' : 'driving';

      const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return {
          coordinates: route.geometry.coordinates.map((coord: number[]) => ({
            latitude: coord[1],
            longitude: coord[0]
          })),
          duration: route.duration / 60,
          distance: route.distance / 1000
        };
      }
      return null;
    } catch (error) {
      console.error('Direction error:', error);
      return null;
    }
  };

 const selectAgent = useCallback((agent: IAgent | null) => {
  setSelectedAgent(agent);
  setShowDirections(false);
  setRoutes({});
  setRouteTimes({});
}, []);

  const getDirections = useCallback(async (origin: LocationCoordinate, modes: string[]) => {
    if (!selectedAgent) return;

    const newRoutes: Record<string, LocationCoordinate[]> = {};
    const newTimes: Record<string, number> = {};

    for (const mode of modes) {
      const routeData = await getOSRMDirections(origin, selectedAgent, mode);
      if (routeData) {
        newRoutes[mode] = routeData.coordinates;
        newTimes[mode] = Math.round(routeData.duration);
      }
    }

    setRoutes(newRoutes);
    setRouteTimes(newTimes);
    setShowDirections(true);
  }, [selectedAgent]);

  const startNavigation = useCallback(async () => {
    if (!selectedAgent || !currentUserLocation) return;

    setIsNavigating(true);
    const routeData = await getOSRMDirections(currentUserLocation, selectedAgent);
    if (routeData) {
      setRemainingRoute(routeData.coordinates);
    }
  }, [selectedAgent, currentUserLocation]);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
    setRemainingRoute(null);
    setRouteProgress(0);
  }, []);

  const updateUserLocation = useCallback((location: LocationCoordinate) => {
    setCurrentUserLocation(location);
    
    // Calculate progress if navigating
    if (isNavigating && remainingRoute) {
      // Simple progress calculation based on distance to destination
      if (selectedAgent) {
        const distanceToDestination = getDistance(location, selectedAgent);
        const totalDistance = remainingRoute.length > 0 ? 
          getDistance(remainingRoute[0], selectedAgent) : 0;
        
        if (totalDistance > 0) {
          const progress = Math.max(0, 100 - (distanceToDestination / totalDistance) * 100);
          setRouteProgress(Math.min(progress, 100));
        }
      }
    }
  }, [isNavigating, remainingRoute, selectedAgent]);

  return {
    selectedAgent,
    routes,
    routeTimes,
    isNavigating,
    showDirections,
    currentUserLocation,
    remainingRoute,
    routeProgress,
    selectAgent,
    getDirections,
    startNavigation,
    stopNavigation,
    updateUserLocation,
  };
};