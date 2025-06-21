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
  isCalculatingDirections: boolean;
  remainingTime: number | null;
  selectAgent: (agent: IAgent | null) => void;
  getDirections: (origin: LocationCoordinate, modes: string[]) => Promise<void>;
  startNavigation: (route: LocationCoordinate[], initialTime: number) => Promise<void>;
  stopNavigation: () => void;
  updateUserLocation: (location: LocationCoordinate) => void;
}

export const useMapNavigation = (): UseMapNavigationReturn => {
  const [selectedAgent, setSelectedAgent] = useState<IAgent | null>(null);
  const [routes, setRoutes] = useState<Record<string, LocationCoordinate[]>>({});
  const [routeTimes, setRouteTimes] = useState<Record<string, number>>({});
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCalculatingDirections, setIsCalculatingDirections] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<LocationCoordinate | null>(null);
  const [remainingRoute, setRemainingRoute] = useState<LocationCoordinate[] | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [initialNavigationTime, setInitialNavigationTime] = useState<number | null>(null);

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

    setIsCalculatingDirections(true);
    try {
        const newRoutes: Record<string, LocationCoordinate[]> = {};
        const newTimes: Record<string, number> = {};

        // Map transport mode labels to OSRM profiles
        const modeToProfile: Record<string, string> = {
            'car': 'driving',
            'motorcycle': 'driving',
            'bike': 'cycling',
            'walk': 'walking'
        };

        for (const mode of modes) {
            const profile = modeToProfile[mode] || 'driving';
            const routeData = await getOSRMDirections(origin, selectedAgent, profile);
            if (routeData) {
                newRoutes[mode] = routeData.coordinates;
                newTimes[mode] = Math.round(routeData.duration);
            }
        }

        setRoutes(newRoutes);
        setRouteTimes(newTimes);
        setShowDirections(true);
    } catch (error) {
        console.error("Error getting directions:", error);
    } finally {
        setIsCalculatingDirections(false);
    }
}, [selectedAgent]);

  const startNavigation = useCallback(async (route: LocationCoordinate[], initialTime: number) => {
    setIsNavigating(true);
    setRemainingRoute(route);
    setInitialNavigationTime(initialTime);
    setRemainingTime(initialTime);
  }, []);

  const stopNavigation = useCallback(() => {
    setIsNavigating(false);
    setRemainingRoute(null);
    setRouteProgress(0);
    setInitialNavigationTime(null);
    setRemainingTime(null);
  }, []);

  const updateUserLocation = useCallback((location: LocationCoordinate) => {
    setCurrentUserLocation(location);
    
    // Calculate progress if navigating
    if (isNavigating && remainingRoute && selectedAgent && initialNavigationTime) {
      // Simple progress calculation based on distance to destination
      const initialRouteDistance = getDistance(remainingRoute[0], selectedAgent);
      const remainingDistance = getDistance(location, selectedAgent);
      
      if (initialRouteDistance > 0) {
        const progress = Math.max(0, 100 - (remainingDistance / initialRouteDistance) * 100);
        setRouteProgress(Math.min(progress, 100));

        // Update remaining time based on progress
        if (typeof initialNavigationTime === 'number') {
            const newRemainingTime = initialNavigationTime * (1 - progress / 100);
            setRemainingTime(Math.round(newRemainingTime));
        }
      }
    }
  }, [isNavigating, remainingRoute, selectedAgent, initialNavigationTime]);

  return {
    selectedAgent,
    routes,
    routeTimes,
    isNavigating,
    showDirections,
    currentUserLocation,
    remainingRoute,
    routeProgress,
    isCalculatingDirections,
    remainingTime,
    selectAgent,
    getDirections,
    startNavigation,
    stopNavigation,
    updateUserLocation,
  };
};