import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    ListRenderItem,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { FadeInDown } from 'react-native-reanimated';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import { colors } from '../../../constant/theme/colors';
// import Button from '../components/common/Button';
// import Card from '../components/common/Card';
// import useStore from '../store/useStore';
// import { colors } from '../utils/colors';

const { width, height } = Dimensions.get('window');

const OPENROUTE_API_KEY = '5b3ce3597851110001cf624845b4a45f44a34dc58799d56d22733f70';

// Type definitions
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Agent {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  provider: string;
  status: 'open' | 'closed';
  rating: string;
  cashAvailable: boolean;
  services: string[];
  distance: string;
}

interface RouteData {
  coordinates: Coordinates[];
  duration: number;
  distance: number;
}

interface Routes {
  [key: string]: Coordinates[];
}

interface RouteTimes {
  [key: string]: number;
}

interface NavigationStats {
  distance: number;
  time: number;
}

interface NearbyAgent {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

interface ServiceType {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface TransportMode {
  label: string;
  icon: string;
  iconSet: 'Ionicons' | 'MaterialIcons';
  mode: string;
  profile: string;
}

interface RequestData {
  service: string;
  amount: string;
  location: string;
  distance: string;
  customerName: string;
  requestTime: string;
}

interface AcceptedAgent {
  id: string;
  name: string;
  profilePicture: string;
  location: string;
  phone: string;
  rating: string;
  completedTransactions: string;
  latitude: number;
  longitude: number;
}

interface Waypoint extends Coordinates {
  index: number;
  progress: number;
}

type FilterType = 'all' | 'mtn' | 'vodafone' | 'airteltigo' | 'glo';
type ServiceId = 'cash-in' | 'cash-out' | 'bill-payment' | 'airtime-data';

const MapScreen: React.FC = () => {
  const { agents, selectedAgent, setSelectedAgent } = useStore();
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [showList, setShowList] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [selectedTransport, setSelectedTransport] = useState<string>('car');
  const [showDirections, setShowDirections] = useState<boolean>(false);
  const [directionsOrigin, setDirectionsOrigin] = useState<Coordinates | null>(null);
  const [routeDuration, setRouteDuration] = useState<number | null>(null);
  const navigation = useNavigation();
  const [routes, setRoutes] = useState<Routes>({});
  const [routeTimes, setRouteTimes] = useState<RouteTimes>({});
  const [activeRoutes, setActiveRoutes] = useState<string[]>([]); 
  const mapRef = useRef<MapView>(null);
  const slideAnim = useRef<Animated.Value>(new Animated.Value(height)).current;
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [currentUserLocation, setCurrentUserLocation] = useState<Coordinates | null>(null);
  const [remainingRoute, setRemainingRoute] = useState<Coordinates[] | null>(null);
  const [navigationStats, setNavigationStats] = useState<NavigationStats>({ distance: 0, time: 0 });
  const [locationSubscription, setLocationSubscription] = useState<{ remove: () => void } | null>(null);
  const [navigationInstructions, setNavigationInstructions] = useState<any>(null);
  const [nextTurn, setNextTurn] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.0922);
  const [userPath, setUserPath] = useState<Coordinates[]>([]);
  const [routeProgress, setRouteProgress] = useState<number>(0);
  const [totalRouteDistance, setTotalRouteDistance] = useState<number>(0);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
  const [routeWaypoints, setRouteWaypoints] = useState<Waypoint[]>([]);

  // Quick Cash Help states
  const [showQuickCash, setShowQuickCash] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceId>('cash-in');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [isRequestingAgent, setIsRequestingAgent] = useState<boolean>(false);
  const [agentAccepted, setAgentAccepted] = useState<boolean>(false);
  const [acceptedAgent, setAcceptedAgent] = useState<AcceptedAgent | null>(null);
  const quickCashSlideAnim = useRef<Animated.Value>(new Animated.Value(height)).current;
  const rotationAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const pulseAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
  const agentRotationAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Agent notification states
  const [showAgentNotification, setShowAgentNotification] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const agentNotificationSlideAnim = useRef<Animated.Value>(new Animated.Value(-300)).current;

  const nearbyAgents: NearbyAgent[] = [
    { id: '1', name: 'Sarah J.', avatar: 'person', color: '#4CAF50' },
    { id: '2', name: 'Michael K.', avatar: 'person-outline', color: '#2196F3' },
    { id: '3', name: 'Emma L.', avatar: 'person', color: '#FF9800' },
    { id: '4', name: 'David R.', avatar: 'person-outline', color: '#9C27B0' },
    { id: '5', name: 'Lisa M.', avatar: 'person', color: '#FF5722' },
    { id: '6', name: 'John D.', avatar: 'person-outline', color: '#607D8B' },
  ];

  const serviceTypes: ServiceType[] = [
    { 
      id: 'cash-in', 
      label: 'Cash In', 
      icon: 'account-balance-wallet', 
      color: '#4CAF50',
      bgColor: '#E8F5E8' 
    },
    { 
      id: 'cash-out', 
      label: 'Cash Out', 
      icon: 'payments', 
      color: '#FF5722',
      bgColor: '#FFF3F0' 
    },
    { 
      id: 'bill-payment', 
      label: 'Bills', 
      icon: 'receipt-long', 
      color: '#2196F3',
      bgColor: '#E8F4FD' 
    },
    { 
      id: 'airtime-data', 
      label: 'Airtime', 
      icon: 'smartphone', 
      color: '#9C27B0',
      bgColor: '#F3E5F5' 
    },
  ];

  const modes: TransportMode[] = [
    { label: 'Car', icon: 'car', iconSet: 'Ionicons', mode: 'driving', profile: 'driving' },
    { label: 'Motorcycle', icon: 'motorcycle', iconSet: 'MaterialIcons', mode: 'driving', profile: 'driving' },
    { label: 'Bike', icon: 'bicycle', iconSet: 'Ionicons', mode: 'cycling', profile: 'cycling' },
    { label: 'Walk', icon: 'walk', iconSet: 'Ionicons', mode: 'walking', profile: 'walking' },
    { label: 'Train', icon: 'train', iconSet: 'Ionicons', mode: 'driving', profile: 'driving' },
  ];

  useEffect(() => {
    const getLocationPermission = async (): Promise<void> => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          Alert.alert('Permission Required', 'Location permission is required for this app to work properly');
          return;
        }

        console.log('Getting current location...');
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 15000,
          maximumAge: 10000,
        });
        
        console.log('Current location obtained:', {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          accuracy: currentLocation.coords.accuracy
        });
        
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        console.error('Error getting current location:', error);
        
        try {
          console.log('Trying with lower accuracy...');
          const fallbackLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
            timeout: 20000,
          });
          
          setLocation({
            latitude: fallbackLocation.coords.latitude,
            longitude: fallbackLocation.coords.longitude,
          });
        } catch (fallbackError) {
          console.error('Fallback location also failed:', fallbackError);
          Alert.alert('Error', 'Unable to get your current location. Please check your GPS settings.');
        }
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); 
      }
    };
  }, [locationSubscription]);

  const zoomIn = (): void => {
    if (mapRef.current && location) {
      const newZoom = Math.max(zoomLevel * 0.5, 0.001);
      setZoomLevel(newZoom);
      
      mapRef.current.animateToRegion({
        latitude: currentUserLocation?.latitude || location.latitude,
        longitude: currentUserLocation?.longitude || location.longitude,
        latitudeDelta: newZoom,
        longitudeDelta: newZoom * 0.5,
      }, 300);
    }
  };

  const zoomOut = (): void => {
    if (mapRef.current && location) {
      const newZoom = Math.min(zoomLevel * 2, 0.5);
      setZoomLevel(newZoom);
      
      mapRef.current.animateToRegion({
        latitude: currentUserLocation?.latitude || location.latitude,
        longitude: currentUserLocation?.longitude || location.longitude,
        latitudeDelta: newZoom,
        longitudeDelta: newZoom * 0.5,
      }, 300);
    }
  };

  const resetZoom = (): void => {
    if (mapRef.current && location) {
      const defaultZoom = 0.0922;
      setZoomLevel(defaultZoom);
      
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: defaultZoom,
        longitudeDelta: 0.0421,
      }, 500);
    }
  };

  const getDistance = (point1: Coordinates, point2: Coordinates): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLng = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getOSRMDirections = async (
    origin: Coordinates, 
    destination: Coordinates, 
    profile: string = 'driving'
  ): Promise<RouteData | null> => {
    try {
      const osrmProfile = profile === 'foot-walking' ? 'walking' : 
                         profile === 'cycling-regular' ? 'cycling' : 'driving';
      
      const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
      
      console.log('OSRM URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('OSRM API error:', response.status);
        return null;
      }
      
      const data = await response.json();
      console.log('OSRM data:', data);
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates: Coordinates[] = route.geometry.coordinates.map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0]
        }));
        
        return {
          coordinates,
          duration: route.duration / 60, // Convert to minutes
          distance: route.distance / 1000 // Convert to km
        };
      }
      return null;
    } catch (error) {
      console.error('OSRM error:', error);
      return null;
    }
  };

  const handleGetDirections = async (): Promise<void> => {
    if (!selectedAgent) return;

    try {
      console.log('Getting current location for directions...');
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 10000,
      });
      
      const origin: Coordinates = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      
      setDirectionsOrigin(origin);
      
      console.log('Current location (origin):', origin);
      console.log('Selected agent:', selectedAgent);
      
      const distance = getDistance(origin, {
        latitude: selectedAgent.latitude,
        longitude: selectedAgent.longitude
      });
      console.log('Distance between points:', distance, 'km');
      
      if (distance > 1000) {
        console.error('Coordinates too far apart:', distance, 'km');
        Alert.alert('Distance Error', `Selected agent is ${distance.toFixed(1)}km away. This seems too far. Please select a closer agent.`);
        return;
      }
      
      const newRoutes: Routes = {};
      const newTimes: RouteTimes = {};
      
      for (const mode of modes) {
        const routeData = await getOSRMDirections(origin, selectedAgent, mode.profile);
        if (routeData) {
          newRoutes[mode.label.toLowerCase()] = routeData.coordinates;
          newTimes[mode.label.toLowerCase()] = Math.round(routeData.duration);
        }
      }
      
      setRoutes(newRoutes);
      setRouteTimes(newTimes);
      setShowDirections(true);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get your current location. Please check your GPS settings.');
    }
  };

  const filteredAgents: Agent[] = agents.filter((agent: Agent) => {
    if (!agent.name || !agent.address) {
      console.warn('Invalid agent data:', agent);
      return false;
    }
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || agent.provider === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleList = (): void => {
    setShowList((prevShowList) => {
      const newShowList = !prevShowList;
      Animated.spring(slideAnim, {
        toValue: newShowList ? 0 : height * 0.6,
        useNativeDriver: false,
        tension: 50,
        friction: 10,
      }).start();
      return newShowList;
    });
  };

  const selectAgent = (agent: Agent): void => {
    setSelectedAgent(agent);
    setShowList(false);
    setShowDirections(false);
    setDirectionsOrigin(null);
    Animated.spring(slideAnim, {
      toValue: height,
      useNativeDriver: false,
    }).start();

    if (mapRef.current && agent.latitude && agent.longitude) {
      mapRef.current.animateToRegion({
        latitude: agent.latitude,
        longitude: agent.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      console.warn('Invalid agent location:', agent);
    }
  };

  const getMarkerColor = (provider: string): string => {
    return colors.vendor?.[provider] || colors.primary;
  };

  const renderAgentItem: ListRenderItem<Agent> = ({ item }) => (
    <Card
      className="mx-4 my-1.5 bg-white rounded-2xl p-4 shadow-md border border-gray-50"
      onPress={() => selectAgent(item)}
      elevated={true}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-3">
          <Text className="text-sm font-extrabold text-gray-900 mb-1 tracking-wide">{item.name}</Text>
          <Text className="text-xs text-gray-600 font-medium leading-4 mb-2">{item.address}</Text>
          <View className="flex-row items-center flex-wrap">
            <MaterialIcons
              name="location-on"
              size={16}
              color={colors.gray.medium}
            />
            <Text className="text-xs text-gray-600 ml-1 mr-3 font-semibold tracking-wide">{item.distance}km</Text>
            <View
              className={`w-2 h-2 rounded-full mr-1 ${item.status === 'open' ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <Text className="text-xs text-gray-600 font-semibold tracking-wide">
              {item.status === 'open' ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>
        <View 
          className="px-2.5 py-1.5 rounded-2xl shadow-sm self-start"
          style={{ backgroundColor: getMarkerColor(item.provider) }}
        >
          <Text className="text-xs font-extrabold text-white tracking-wider">
            {item.provider.toUpperCase()}
          </Text>
        </View>
      </View>
      <View className="flex-row flex-wrap mt-3 gap-1.5">
        {item.services.map((service: string, index: number) => (
          <View key={index} className="bg-slate-100 px-2.5 py-1 rounded-xl border border-gray-100">
            <Text className="text-xs text-gray-600 font-bold tracking-wide">
              {service.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );

  const toggleQuickCash = (): void => {
    setShowQuickCash((prev) => {
      const newShow = !prev;
      Animated.spring(quickCashSlideAnim, {
        toValue: newShow ? 0 : height,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }).start();
      return newShow;
    });
  };

  const handleServiceSelect = (serviceId: ServiceId): void => {
    setSelectedService(serviceId);
  };

  const handleAmountChange = (amount: string): void => {
    setCashAmount(amount);
  };

  const handleRequestAgent = (): void => {
    if (!cashAmount.trim()) {
      Alert.alert('Missing Amount', 'Please enter an amount');
      return;
    }
    
    setIsRequestingAgent(true);
    // Add your request agent logic here
    
    setTimeout(() => {
      setIsRequestingAgent(false);
      setAgentAccepted(true);
      setAcceptedAgent({
        id: '1',
        name: 'Sarah Johnson',
        profilePicture: 'https://via.placeholder.com/80',
        location: '150m away • Verified Agent',
        phone: '+233123456789',
        rating: '4.9',
        completedTransactions: '2,847',
        latitude: location?.latitude ? location.latitude + 0.001 : 0,
        longitude: location?.longitude ? location.longitude + 0.001 : 0,
      });
    }, 3000);
  };

  const handleRegionChange = (region: Region): void => {
    setZoomLevel(region.latitudeDelta);
  };

  const stopNavigation = (): void => {
    setIsNavigating(false);
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
    setCurrentUserLocation(null);
    setRemainingRoute(null);
    setNavigationStats({ distance: 0, time: 0 });
  };

  return (
    <View className="flex-1">
      {location && (
        <MapView
          ref={mapRef}
          className="w-full h-full"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: zoomLevel,
            longitudeDelta: zoomLevel * 0.5,
          }}
          showsUserLocation={!isNavigating}
          showsMyLocationButton={false}
          onMapReady={() => setMapLoading(false)}
          followsUserLocation={isNavigating}
          showsTraffic={isNavigating}
          showsBuildings={true}
          showsCompass={isNavigating}
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          onRegionChangeComplete={handleRegionChange}
        >
          {/* Agent markers */}
          {!mapLoading && filteredAgents.map((agent: Agent) => (
            <Marker
              key={agent.id}
              coordinate={{
                latitude: agent.latitude,
                longitude: agent.longitude,
              }}
              onPress={() => selectAgent(agent)}
            >
              <View className="items-center justify-center">
                <View
                  className={`w-9 h-9 rounded-2xl items-center justify-center shadow-lg border-2 border-white ${
                    selectedAgent?.id === agent.id ? 'w-11 h-11 rounded-3xl border-4' : ''
                  }`}
                  style={{ backgroundColor: getMarkerColor(agent.provider) }}
                >
                  <MaterialIcons name="attach-money" size={20} color={colors.white} />
                </View>
                {selectedAgent?.id === agent.id && (
                  <View 
                    className="absolute w-16 h-16 rounded-full opacity-25"
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </View>
            </Marker>
          ))}

          {/* Destination marker during navigation */}
          {isNavigating && selectedAgent && (
            <Marker
              coordinate={{
                latitude: selectedAgent.latitude,
                longitude: selectedAgent.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View className="items-center justify-center">
                <MaterialIcons name="place" size={40} color="#FF3B30" />
                <Text className="bg-white px-2 py-1 rounded-xl text-xs font-semibold text-gray-900 mt-1 shadow-sm">
                  DESTINATION
                </Text>
              </View>
            </Marker>
          )}

          {/* Current user location during navigation */}
          {isNavigating && currentUserLocation && (
            <Marker
              coordinate={currentUserLocation}
              anchor={{ x: 0.5, y: 0.5 }}
              flat={true}
            >
              <View className="items-center justify-center">
                <View className="w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-lg" />
                <View className="absolute w-12 h-12 rounded-full bg-blue-500 opacity-20" />
              </View>
            </Marker>
          )}

          {/* User path breadcrumbs */}
          {isNavigating && userPath.length > 1 && (
            <Polyline
              coordinates={userPath}
              strokeWidth={4}
              strokeColor="#34C759"
              lineDashPattern={[5, 3]}
              lineCap="round"
              lineJoin="round"
            />
          )}

          {/* Route waypoints/progress markers */}
          {isNavigating && routeWaypoints.map((waypoint: Waypoint, index: number) => (
            <Marker
              key={`waypoint-${index}`}
              coordinate={waypoint}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View 
                className={`w-6 h-6 rounded-full items-center justify-center border-2 border-white shadow-sm ${
                  waypoint.progress <= routeProgress ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <Text className={`text-xs font-bold ${
                  waypoint.progress <= routeProgress ? 'text-white' : 'text-gray-600'
                }`}>
                  {index + 1}
                </Text>
              </View>
            </Marker>
          ))}

          {/* Navigation route */}
          {isNavigating && remainingRoute && remainingRoute.length > 0 && (
            <>
              <Polyline
                coordinates={remainingRoute}
                strokeWidth={8}
                strokeColor="rgba(0, 122, 255, 0.3)"
                lineCap="round"
                lineJoin="round"
              />
              <Polyline
                coordinates={remainingRoute}
                strokeWidth={5}
                strokeColor="#007AFF"
                lineCap="round"
                lineJoin="round"
              />
            </>
          )}

          {/* Regular directions */}
          {!isNavigating && showDirections && Object.keys(routes).map((mode: string) => (
            <Polyline
              key={`route-${mode}`}
              coordinates={routes[mode]}
              strokeWidth={mode === selectedTransport ? 4 : 2}
              strokeColor={mode === selectedTransport ? '#007AFF' : '#999999'}
              lineDashPattern={mode === selectedTransport ? [] : [5, 5]}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </MapView>
      )}

      {/* Agent Notification Top Sheet */}
      {showAgentNotification && (
        <Animated.View
          className="absolute top-0 left-4 right-4 z-50 shadow-2xl"
          style={{
            transform: [{ translateY: agentNotificationSlideAnim }],
          }}
        >
          <LinearGradient
            colors={colors.gradient.primary}
            className="rounded-2xl p-5 mt-12 ios:mt-12 android:mt-8"
          >
            {/* Notification Header */}
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
                <MaterialIcons name="notifications-active" size={24} color={colors.secondary} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-white tracking-tight">New Cash Request</Text>
                <Text className="text-xs text-white/80 font-medium mt-0.5">{requestData?.requestTime}</Text>
              </View>
              <View className="bg-red-500 px-2 py-1 rounded-xl">
                <Text className="text-xs font-extrabold text-white tracking-widest">URGENT</Text>
              </View>
            </View>

            {/* Request Details */}
            <View className="mb-5">
              <View className="flex-row items-center mb-4 bg-white/10 rounded-2xl p-4">
                <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-3">
                  <MaterialIcons name="person" size={28} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-white mb-1 tracking-tight">{requestData?.customerName}</Text>
                  <View className="flex-row items-center">
                    <MaterialIcons name="location-on" size={16} color={colors.secondary} />
                    <Text className="text-xs text-white/80 ml-1 font-medium">{requestData?.distance}</Text>
                  </View>
                </View>
              </View>

              <View className="bg-white/10 rounded-2xl p-4 gap-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-white/80 font-medium">Service</Text>
                  <Text className="text-sm text-white font-bold tracking-tight">{requestData?.service}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-white/80 font-medium">Amount</Text>
                  <Text className="text-sm text-white font-bold tracking-tight">€{requestData?.amount}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-white/80 font-medium">Location</Text>
                  <Text className="text-sm text-white font-bold tracking-tight">{requestData?.location}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mb-3">
              <TouchableOpacity 
                className="flex-1 flex-row items-center justify-center py-3 rounded-2xl bg-white border-2 border-white/30"
                onPress={() => {/* handleAgentDecline */}}
                activeOpacity={0.8}
              >
                <MaterialIcons name="close" size={20} color="#FF5722" />
                <Text className="text-sm font-semibold text-gray-700 ml-1.5 tracking-wide">Decline</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-2 flex-row items-center justify-center py-3 rounded-2xl bg-white/20 border-2 border-white/40"
                onPress={() => {/* handleAgentAccept */}}
                activeOpacity={0.8}
              >
                <MaterialIcons name="check" size={20} color={colors.white} />
                <Text className="text-sm font-bold text-white ml-1.5 tracking-wide">Accept Request</Text>
              </TouchableOpacity>
            </View>

            {/* Auto-decline countdown */}
            <View className="items-center">
              <Text className="text-xs text-white/80 font-medium text-center tracking-wide">
                Auto-decline in 15 seconds if no action taken
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      )}

      {/* Zoom Controls */}
      <View className="absolute right-4 flex-col bg-transparent ios:top-64 android:top-48">
        <TouchableOpacity 
          className="w-11 h-11 rounded-full bg-white items-center justify-center mb-2 shadow-lg border border-black/10"
          onPress={zoomIn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="add" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-11 h-11 rounded-full bg-white items-center justify-center mb-2 shadow-lg border border-black/10"
          onPress={zoomOut}
          activeOpacity={0.7}
        >
          <MaterialIcons name="remove" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-11 h-11 rounded-full bg-blue-500 items-center justify-center shadow-lg border border-black/10"
          onPress={resetZoom}
          activeOpacity={0.7}
        >
          <MaterialIcons name="my-location" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Quick Cash Help Button */}
      <TouchableOpacity
        className="absolute left-1.5 z-0 ios:bottom-20 android:bottom-16"
        onPress={toggleQuickCash}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[colors.error, colors.error, colors.error]}
          className="flex-row items-center px-3.5 py-2.5 rounded-3xl shadow-2xl"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="crisis-alert" size={20} color={colors.white} />
          <Text className="text-white font-black ml-1.5 text-xs tracking-wide">Live Agents</Text>
          <View className="w-2 h-2 rounded-full bg-blue-500 ml-2" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Navigation overlay */}
      {isNavigating && (
        <View className="absolute left-4 right-4 bg-blue-500/95 rounded-2xl p-4 shadow-2xl ios:top-24 android:top-16">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-bold text-white">Navigation Active</Text>
            <TouchableOpacity 
              className="w-7 h-7 rounded-full bg-white/20 items-center justify-center"
              onPress={stopNavigation}
            >
              <MaterialIcons name="close" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {/* Progress Bar */}
          <View className="my-3">
            <View className="h-1.5 bg-white/30 rounded-full overflow-hidden">
              <View 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${routeProgress}%` }}
              />
            </View>
            <Text className="text-white text-xs font-semibold text-center mt-1">{routeProgress.toFixed(0)}% Complete</Text>
          </View>
          
          {navigationStats.time > 0 && (
            <View className="flex-row justify-around">
              <View className="flex-row items-center">
                <MaterialIcons name="schedule" size={18} color={colors.white} />
                <Text className="text-white text-sm font-semibold ml-1">{navigationStats.time} min</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="straighten" size={18} color={colors.white} />
                <Text className="text-white text-sm font-semibold ml-1">{navigationStats.distance.toFixed(1)} km</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="trending-up" size={18} color={colors.white} />
                <Text className="text-white text-sm font-semibold ml-1">{distanceTraveled.toFixed(1)} km done</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-40 ios:top-0 android:top-5">
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)']}
          className="ios:pt-12 android:pt-1 pb-4 px-4 shadow-2xl"
        >
          <Animated.View
            entering={FadeInDown.duration(500)}
            className="absolute ios:top-14 android:top-4 right-4 z-50 w-10 h-10 rounded-full items-center justify-center bg-white/90"
          >
            <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen' as never)}>
              <Ionicons name="notifications" size={26} color={colors.secondary} />
              <View className="absolute -top-2.5 -right-1 w-4 h-4 rounded-full bg-red-500 items-center justify-center">
                <Text className="text-xs font-bold text-white">3</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <View className="flex-row items-center mt-2 px-0.5 mb-2.5">
            <TouchableOpacity
              className="mr-3.5 bg-white/90 rounded-2xl p-1.5 items-center justify-center"
              onPress={() => navigation.navigate('ProfileScreen' as never)}
              activeOpacity={0.7}
            >
              <Ionicons name="person-circle-outline" size={30} color={colors.secondary} />
            </TouchableOpacity>
          </View>

          <View className="mb-3">
            <View className="flex-row items-center bg-white rounded-2xl px-2.5 py-2.5 shadow-lg border border-white/80 ios:py-2.5 android:py-1.5">
              <MaterialIcons name="location-pin" size={24} color={colors.gray.medium} />
              <TextInput
                className="flex-1 ml-2.5 text-sm text-gray-900 font-medium tracking-wide"
                placeholder="Search for location"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={colors.gray.medium}
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-0"
          >
            {(['all', 'mtn', 'vodafone', 'airteltigo', 'glo'] as FilterType[]).map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2.5 rounded-2xl bg-white mr-2.5 border ${
                  selectedFilter === filter 
                    ? 'bg-orange-500 border-white shadow-2xl' 
                    : 'border-white/40'
                }`}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  className={`text-xs font-bold tracking-wide ${
                    selectedFilter === filter ? 'text-white' : 'text-orange-500'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>
      </View>

      {/* List Toggle */}
      <TouchableOpacity
        className="absolute ios:bottom-20 android:bottom-16 right-4"
        onPress={toggleList}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradient.primary}
          className="flex-row items-center px-4.5 py-2.5 rounded-3xl shadow-2xl"
        >
          <MaterialIcons name="list" size={20} color={colors.white} />
          <Text className="text-white font-extrabold ml-1.5 text-xs tracking-wide">List</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Selected Agent Card */}
      {selectedAgent && (
        <View className="absolute ios:bottom-28 android:bottom-24 left-4 right-4">
          <Card className="bg-white rounded-2xl p-4.5 shadow-2xl">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-base font-extrabold text-gray-900 tracking-wide mb-1">{selectedAgent.name}</Text>
                <Text className="text-xs text-gray-600 font-medium leading-4">{selectedAgent.address}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedAgent(null)}>
                <MaterialIcons name="close" size={24} color={colors.gray.medium} />
              </TouchableOpacity>
            </View>
            
            <View className="flex-row mt-3.5 gap-4">
              <View className="flex-row items-center">
                <MaterialIcons name="schedule" size={16} color={colors.success} />
                <Text className="ml-1 text-xs text-gray-600 font-semibold tracking-wide">
                  {selectedAgent.status === 'open' ? 'Open' : 'Closed'}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="star" size={16} color={colors.warning} />
                <Text className="ml-1 text-xs text-gray-600 font-semibold tracking-wide">{selectedAgent.rating}</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="attach-money" size={16} color={colors.success} />
                <Text className="ml-1 text-xs text-gray-600 font-semibold tracking-wide">
                  {selectedAgent.cashAvailable ? 'Cash Available' : 'No Cash'}
                </Text>
              </View>
            </View>
            
            <View className="flex-row justify-around mt-3 mb-2">
              {modes.map((mode: TransportMode, index: number) => (
                <TouchableOpacity
                  key={index}
                  className={`items-center p-1.5 ${
                    selectedTransport === mode.label.toLowerCase() ? 'bg-black/5 rounded-xl' : ''
                  }`}
                  onPress={() => setSelectedTransport(mode.label.toLowerCase())}
                >
                  {mode.iconSet === 'Ionicons' ? (
                    <Ionicons
                      name={mode.icon as any}
                      size={24}
                      color={selectedTransport === mode.label.toLowerCase() ? colors.primary : colors.gray.medium}
                    />
                  ) : (
                    <MaterialIcons
                      name={mode.icon as any}
                      size={24}
                      color={selectedTransport === mode.label.toLowerCase() ? colors.primary : colors.gray.medium}
                    />
                  )}
                  <Text
                    className={`text-xs mt-1 ${
                      selectedTransport === mode.label.toLowerCase() 
                        ? 'text-blue-500 font-semibold' 
                        : 'text-gray-500'
                    }`}
                  >
                    {mode.label}
                  </Text>
                  {routeTimes[mode.label.toLowerCase()] && (
                    <Text className="text-xs text-gray-500 mt-0.5 font-semibold">
                      {routeTimes[mode.label.toLowerCase()]}min
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Navigation Buttons */}
            {!isNavigating ? (
              <View className="flex-row mt-4">
                <Button
                  title="Get Directions"
                  icon="directions"
                  gradient
                  size='small'
                  onPress={handleGetDirections}
                  style={{ flex: 1, marginRight: 8 }}
                />
                {showDirections && (
                  <Button
                    title="Start Navigation"
                    icon="navigation"
                    gradient
                    size='small'
                    onPress={() => {/* startSimpleNavigation */}}
                    style={{ flex: 1, marginLeft: 8 }}
                  />
                )}
              </View>
            ) : (
              <Button
                title="Stop Navigation"
                icon="stop"
                gradient
                onPress={stopNavigation}
                style={{ backgroundColor: colors.error, marginTop: 16 }}
              />
            )}
            
            {/* Show estimated time */}
            {showDirections && routeTimes[selectedTransport] && (
              <Text className="mt-3 text-sm text-gray-900 font-semibold text-center">
                Estimated time: {routeTimes[selectedTransport]} min
              </Text>
            )}
          </Card>
        </View>
      )}

      {/* Agent List Bottom Sheet */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-slate-50 rounded-t-3xl shadow-2xl"
        style={{
          height: height * 0.5,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <View className="flex-row justify-between items-center p-4.5 border-b border-black/10 bg-white rounded-t-3xl">
          <Text className="text-base font-extrabold text-gray-900 tracking-wide">Nearby Agents</Text>
          <TouchableOpacity onPress={toggleList}>
            <MaterialIcons name="close" size={24} color={colors.gray.dark} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredAgents}
          renderItem={renderAgentItem}
          keyExtractor={(item: Agent) => item.id}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 40 : 32, paddingTop: 8 }}
          className="flex-1"
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        />
      </Animated.View>

      {/* Quick Cash Help Bottom Sheet */}
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 ios:h-4/5 android:h-5/6"
        style={{
          transform: [{ translateY: quickCashSlideAnim }],
        }}
      >
        {/* Loading Overlay */}
        {isRequestingAgent && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-white/95 z-50 items-center justify-center rounded-t-3xl">
            <View className="items-center justify-center relative w-72 h-72">
              {/* Agent Avatars in Circle */}
              <Animated.View
                className="absolute w-72 h-72 items-center justify-center"
                style={{
                  transform: [
                    {
                      rotate: agentRotationAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-360deg'],
                      }),
                    },
                  ],
                }}
              >
                {nearbyAgents.map((agent: NearbyAgent, index: number) => {
                  const angle = (index * 360) / nearbyAgents.length;
                  const radius = 100;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <Animated.View
                      key={agent.id}
                      className="absolute items-center"
                      style={{
                        transform: [
                          { translateX: x },
                          { translateY: y },
                          {
                            rotate: agentRotationAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                            }),
                          },
                        ],
                      }}
                    >
                      <Animated.View
                        className="w-10 h-10 rounded-full items-center justify-center shadow-lg border-2 border-white"
                        style={{ 
                          backgroundColor: agent.color,
                          transform: [
                            {
                              scale: rotationAnim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [1, 1.1, 1],
                              }),
                            },
                          ],
                        }}
                      >
                        <MaterialIcons name={agent.avatar as any} size={20} color={colors.white} />
                      </Animated.View>
                      <Text className="text-xs font-semibold text-gray-600 mt-1 text-center">{agent.name}</Text>
                    </Animated.View>
                  );
                })}
              </Animated.View>
            </View>
          </View>
        )}

        {!agentAccepted ? (
          <>
            {/* Header */}
            <View className="px-5 pt-4 pb-2 border-b border-gray-100">
              <View className="w-9 h-1 bg-gray-300 rounded-full self-center mt-3 mb-2" />
              <View>
                <View className="flex-row items-center mb-1">
                  <MaterialIcons name="flash-on" size={24} color={colors.primary} />
                  <Text className="text-xl font-bold text-gray-900 ml-2 tracking-tight">Quick Cash Help</Text>
                </View>
                <Text className="text-sm text-gray-600 font-normal leading-5">
                  Get instant assistance from verified agents nearby
                </Text>
              </View>
              <TouchableOpacity 
                onPress={toggleQuickCash}
                className="absolute top-4 right-5 w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <MaterialIcons name="close" size={20} color={colors.gray.medium} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              className="flex-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: Platform.OS === 'android' ? 24 : 0,
              }}
            >
              {/* Service Selection */}
              <View className="px-5 pt-3 pb-4">
                <Text className="text-base font-semibold text-gray-900 mb-4 tracking-tight">Select Service</Text>
                <View className="flex-row justify-between">
                  {serviceTypes.map((service: ServiceType) => (
                    <TouchableOpacity
                      key={service.id}
                      className={`flex-1 items-center py-4 px-2 mx-1 rounded-2xl border-2 ${
                        selectedService === service.id 
                          ? 'border-blue-500 bg-blue-50 scale-105' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      onPress={() => handleServiceSelect(service.id as ServiceId)}
                      activeOpacity={0.7}
                    >
                      <View 
                        className={`w-12 h-12 rounded-3xl items-center justify-center mb-2 ${
                          selectedService === service.id ? 'bg-blue-500' : ''
                        }`}
                        style={{ 
                          backgroundColor: selectedService === service.id 
                            ? service.color 
                            : service.bgColor 
                        }}
                      >
                        <MaterialIcons 
                          name={service.icon as any} 
                          size={24} 
                          color={selectedService === service.id ? colors.white : service.color} 
                        />
                      </View>
                      <Text className={`text-xs font-medium text-center tracking-tight ${
                        selectedService === service.id ? 'text-orange-500 font-semibold' : 'text-gray-600'
                      }`}>
                        {service.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Amount Input */}
              <View className="px-5 py-3">
                <Text className="text-base font-semibold text-gray-900 mb-4 tracking-tight">Enter Amount</Text>
                <View className="gap-4">
                  <View className="flex-row items-center border-2 border-gray-300 rounded-2xl px-5 py-4 ios:py-4 android:py-0 bg-gray-50">
                    <Text className="text-xl font-semibold text-gray-900 mr-3">GHS</Text>
                    <TextInput
                      className="flex-1 text-xl font-semibold text-gray-900"
                      value={cashAmount}
                      onChangeText={handleAmountChange}
                      placeholder="0.00"
                      keyboardType="numeric"
                      placeholderTextColor={colors.gray.medium}
                    />
                  </View>
                  <View className="flex-row justify-between gap-2">
                    {['10', '25', '50', '100'].map((amount: string) => (
                      <TouchableOpacity
                        key={amount}
                        className="flex-1 py-3 rounded-xl bg-gray-200 items-center"
                        onPress={() => handleAmountChange(amount)}
                      >
                        <Text className="text-sm font-semibold text-gray-600">GHS{amount}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Request Button */}
              <View className="px-5 py-3">
                <TouchableOpacity
                  className="mt-0 min-h-14"
                  onPress={handleRequestAgent}
                  activeOpacity={0.9}
                  disabled={isRequestingAgent}
                >
                  <LinearGradient
                    colors={colors.gradient.primary}
                    className="flex-row items-center justify-center py-4 rounded-2xl shadow-2xl min-h-14"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <MaterialIcons name="flash-on" size={20} color={colors.white} />
                    <Text className="text-base font-semibold text-white ml-2 tracking-wide">Request Agent Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        ) : (
          // Agent Accepted View
          <View className="flex-1 p-5">
            <View className="w-9 h-1 bg-gray-300 rounded-full self-center mb-2" />
            
            <View className="items-center py-2.5 mb-1">
              <View className="mb-4">
                <MaterialIcons name="check-circle" size={48} color="#4CAF50" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Agent Found!</Text>
              <Text className="text-base text-gray-600 text-center leading-5.5 px-4">
                Your request has been accepted by a verified agent
              </Text>
            </View>

            <View className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-200">
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full bg-white items-center justify-center mr-4 relative border-2 border-gray-200">
                  <MaterialIcons name="person" size={32} color="#FF6B35" />
                  <View className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white items-center justify-center">
                    <MaterialIcons name="verified" size={16} color="#4CAF50" />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1 tracking-tight">{acceptedAgent?.name}</Text>
                  <Text className="text-sm text-gray-600 mb-2 font-medium">{acceptedAgent?.location}</Text>
                  <View className="flex-row items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons name="star" size={14} color="#FFB300" />
                      <Text className="text-xs text-gray-600 font-semibold ml-1">{acceptedAgent?.rating}</Text>
                    </View>
                    <View className="w-0.5 h-3 bg-gray-300 mx-3" />
                    <View className="flex-row items-center">
                      <MaterialIcons name="history" size={14} color={colors.gray.medium} />
                      <Text className="text-xs text-gray-600 font-semibold ml-1">{acceptedAgent?.completedTransactions}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <Text className="text-base font-semibold text-gray-900 mb-4 tracking-tight">Contact Agent</Text>
            <View className="flex-row justify-between mb-6 gap-3">
              <TouchableOpacity className="flex-1 items-center py-4 rounded-2xl border-2 bg-green-50 border-green-200">
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                  <MaterialIcons name="call" size={20} color="#4CAF50" />
                </View>
                <Text className="text-xs font-semibold text-gray-900 tracking-wide">Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-1 items-center py-4 rounded-2xl border-2 bg-blue-50 border-blue-200"
                onPress={() => {
                  if (acceptedAgent && mapRef.current) {
                    toggleQuickCash();
                    setTimeout(() => {
                      mapRef.current?.animateToRegion({
                        latitude: acceptedAgent.latitude,
                        longitude: acceptedAgent.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      });
                    }, 500);
                  }
                }}
              >
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                  <MaterialIcons name="directions" size={20} color="#2196F3" />
                </View>
                <Text className="text-xs font-semibold text-gray-900 tracking-wide">Directions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-1 items-center py-4 rounded-2xl border-2 bg-orange-50 border-orange-200"
                onPress={() => navigation.navigate('ChatScreen' as never, { agent: acceptedAgent } as never)}
              >
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm">
                  <MaterialIcons name="message" size={20} color="#FF6B35" />
                </View>
                <Text className="text-xs font-semibold text-gray-900 tracking-wide">Message</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              className="bg-gray-100 py-4 rounded-2xl items-center"
              onPress={() => {
                setAgentAccepted(false);
                setAcceptedAgent(null);
                setCashAmount('');
                setSelectedService('cash-in');
                toggleQuickCash();
              }}
            >
              <Text className="text-base font-semibold text-gray-600 tracking-wide">Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default MapScreen;