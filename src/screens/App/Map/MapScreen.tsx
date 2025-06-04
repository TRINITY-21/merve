// screens/MapScreen.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Platform,
    Animated as RNAnimated,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Typography } from '../../../components/common';
import EmergencyButton from '../../../components/common/EmergencyButton';
import ListToggleButton from '../../../components/common/ListToggleButton';
import { AgentListItem, MapHeader, NavigationOverlay, SelectedAgentCard, ZoomControls } from '../../../components/map';
import { AgentNotificationCard } from '../../../components/notifications';
import { QuickCashBottomSheet } from '../../../components/quickcash';
import { defaultServiceTypes, defaultTransportModes } from '../../../config/defaults';
import { colors } from '../../../constants/theme/colors';
import { useLocation } from '../../../hooks/useLocation';
import { useMapNavigation } from '../../../hooks/useMapNavigation';
import { useQuickCash } from '../../../hooks/useQuickCash';
import useStore from '../../../store/useStore';
import { IAgent } from '../../../types';

type RootStackParamList = {
    Map: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { agents, selectedAgent, setSelectedAgent } = useStore();
    const { location, isLoading: locationLoading } = useLocation();
    const mapNavigation = useMapNavigation();
    const quickCash = useQuickCash();

    const [showList, setShowList] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [mapLoading, setMapLoading] = useState<boolean>(true);
    const [zoomLevel, setZoomLevel] = useState<number>(0.0922);
    const [showAgentNotification, setShowAgentNotification] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<any>(null);

    const mapRef = useRef<MapView>(null);
    const slideAnim = useRef(new RNAnimated.Value(height)).current;

    useEffect(() => {
        console.log('Navigation object:', navigation); // Debug navigation
        if (location) {
            setMapLoading(false);
        }
    }, [location, navigation]);

    const getMarkerColor = (provider: string): string => {
        return colors.vendor[provider as keyof typeof colors.vendor] || colors.primary;
    };

    const handleZoomIn = () => {
        if (mapRef.current) {
            const newZoom = Math.max(zoomLevel * 0.5, 0.001);
            setZoomLevel(newZoom);
            mapRef.current.animateToRegion({
                latitude: mapNavigation.currentUserLocation?.latitude || location!.latitude,
                longitude: mapNavigation.currentUserLocation?.longitude || location!.longitude,
                latitudeDelta: newZoom,
                longitudeDelta: newZoom * 0.5,
            }, 300);
        }
    };

    const handleZoomOut = () => {
        if (mapRef.current) {
            const newZoom = Math.min(zoomLevel * 2, 0.5);
            setZoomLevel(newZoom);
            mapRef.current.animateToRegion({
                latitude: mapNavigation.currentUserLocation?.latitude || location!.latitude,
                longitude: mapNavigation.currentUserLocation?.longitude || location!.longitude,
                latitudeDelta: newZoom,
                longitudeDelta: newZoom * 0.5,
            }, 300);
        }
    };

    const handleResetZoom = () => {
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

    const handleAgentSelect = (agent: IAgent) => {
        setSelectedAgent(agent);
        mapNavigation.selectAgent(agent);
        setShowList(false);
        RNAnimated.spring(slideAnim, {
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
        }
    };

    const handleGetDirections = async () => {
        if (!location || !selectedAgent) return;
        try {
            const modes = defaultTransportModes.map(mode => mode.profile);
            await mapNavigation.getDirections(location, modes);
        } catch (error) {
            Alert.alert('Unable to get directions. Please try again.');
        }
    };

    const handleStartNavigation = async () => {
        if (location) {
            mapNavigation.updateUserLocation(location);
            await mapNavigation.startNavigation();
        }
    };

    const handleQuickCashRequest = async (service: string, amount: string) => {
        await quickCash.requestAgent(service, amount);
        setTimeout(() => {
            const selectedServiceData = defaultServiceTypes.find(s => s.id === service);
            if (selectedServiceData) {
                setRequestData({
                    service: selectedServiceData.label,
                    amount: amount,
                    location: 'Adepazari, Sakarya',
                    distance: '150m away',
                    customerName: 'John Doe',
                    requestTime: new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                });
                setShowAgentNotification(true);
            }
        }, 2000);
    };

    const handleAgentAccept = () => {
        setShowAgentNotification(false);
        quickCash.resetState();
    };

    const handleAgentDecline = () => {
        setShowAgentNotification(false);
    };

    const toggleList = () => {
        setShowList((prevShowList) => {
            const newShowList = !prevShowList;
            RNAnimated.spring(slideAnim, {
                toValue: newShowList ? 0 : height * 0.6,
                useNativeDriver: false,
                tension: 50,
                friction: 10,
            }).start();
            return newShowList;
        });
    };

    const filteredAgents = useMemo(() => {
        return agents.filter((agent: IAgent) => {
            if (!agent.name || !agent.address) return false;
            const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.address.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = selectedFilter === 'all' || agent.provider === selectedFilter;
            return matchesSearch && matchesFilter;
        });
    }, [agents, searchQuery, selectedFilter]);

    const renderAgentItem = ({ item }: { item: IAgent }) => (
        <AgentListItem
            agent={item}
            onPress={handleAgentSelect}
            showDistance={true}
            showServices={true}
        />
    );

    if (!location || locationLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Typography variant="medium" size={14} className="mt-3 text-gray-600 tracking-wide">
                    Loading map...
                </Typography>
            </View>
        );
    }


    const handleFilterChange = () => {
        if (selectedFilter === 'all') {
            setSelectedFilter('delivery');
        } else {
            setSelectedFilter('all');
        }
    }

    return (
        <View className="flex-1">
            <StatusBar barStyle="dark-content" />
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: zoomLevel,
                    longitudeDelta: zoomLevel * 0.5,
                }}
                showsUserLocation={!mapNavigation.isNavigating}
                showsMyLocationButton={false}
                onMapReady={() => setMapLoading(false)}
                followsUserLocation={mapNavigation.isNavigating}
                showsTraffic={mapNavigation.isNavigating}
                showsBuildings={true}
                showsCompass={mapNavigation.isNavigating}
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                onRegionChangeComplete={(region) => {
                    setZoomLevel(region.latitudeDelta);
                }}
            >
                {!mapLoading && filteredAgents.map((agent) => (
                    <Marker
                        key={agent.id}
                        coordinate={{
                            latitude: agent.latitude,
                            longitude: agent.longitude,
                        }}
                        onPress={() => handleAgentSelect(agent)}
                    >
                        <View className="items-center justify-center">
                            <View
                                className={`w-9 h-9 rounded-full items-center justify-center shadow-lg border-2 border-white ${selectedAgent?.id === agent.id ? 'w-11 h-11 border-3' : ''}`}
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
                {mapNavigation.isNavigating && mapNavigation.remainingRoute && mapNavigation.remainingRoute.length > 0 && (
                    <>
                        <Polyline
                            coordinates={mapNavigation.remainingRoute}
                            strokeWidth={8}
                            strokeColor="rgba(0, 122, 255, 0.3)"
                            lineCap="round"
                            lineJoin="round"
                        />
                        <Polyline
                            coordinates={mapNavigation.remainingRoute}
                            strokeWidth={5}
                            strokeColor="#007AFF"
                            lineCap="round"
                            lineJoin="round"
                        />
                    </>
                )}
                {mapNavigation.isNavigating && mapNavigation.currentUserLocation && (
                    <Marker
                        coordinate={mapNavigation.currentUserLocation}
                        anchor={{ x: 0.5, y: 0.5 }}
                        flat={true}
                    >
                        <View className="items-center justify-center">
                            <View className="w-5 h-5 rounded-full bg-blue-500 border-3 border-white shadow-md" />
                            <View className="absolute w-12 h-12 rounded-full bg-blue-500 opacity-20" />
                        </View>
                    </Marker>
                )}
                {mapNavigation.isNavigating && selectedAgent && (
                    <Marker
                        coordinate={{
                            latitude: selectedAgent.latitude,
                            longitude: selectedAgent.longitude,
                        }}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <View className="items-center">
                            <MaterialIcons name="place" size={40} color="#FF3B30" />
                            <Typography variant="semibold" size={10} className="bg-white px-2 py-1 rounded-xl text-gray-900 mt-1 shadow-sm">
                                DESTINATION
                            </Typography>
                        </View>
                    </Marker>
                )}
                {!mapNavigation.isNavigating && mapNavigation.showDirections && Object.keys(mapNavigation.routes).map((mode) => (
                    <Polyline
                        key={`route-${mode}`}
                        coordinates={mapNavigation.routes[mode]}
                        strokeWidth={4}
                        strokeColor="#007AFF"
                        lineCap="round"
                        lineJoin="round"
                    />
                ))}
            </MapView>

            <MapHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
                onNotificationPress={() => { }}
                onProfilePress={() => navigation.navigate('Map')}
                notificationCount={3}
            />

            <ZoomControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
            />


            <EmergencyButton quickCash={quickCash} />


            <ListToggleButton toggleList={toggleList} />

            <NavigationOverlay
                visible={mapNavigation.isNavigating}
                progress={mapNavigation.routeProgress}
                stats={{
                    distance: 0,
                    time: 0
                }}
                distanceTraveled={0}
                onStop={mapNavigation.stopNavigation}
            />

            {selectedAgent && (
                <SelectedAgentCard
                    agent={selectedAgent}
                    selectedTransport="car"
                    onTransportChange={() => { }}
                    onClose={() => {
                        setSelectedAgent(null);
                    }}
                    onGetDirections={handleGetDirections}
                    onStartNavigation={handleStartNavigation}
                    onStopNavigation={mapNavigation.stopNavigation}
                    isNavigating={mapNavigation.isNavigating}
                    showDirections={mapNavigation.showDirections}
                    routeTimes={mapNavigation.routeTimes}
                    transportModes={defaultTransportModes}
                />
            )}

            <RNAnimated.View
                className="absolute bottom-14 left-0 right-0 bg-gray-50 rounded-t-3xl shadow-2xl"
                style={{
                    height: height * 0.5,
                    transform: [{ translateY: slideAnim }],
                }}
            >
                <View className="flex-row justify-between items-center p-4 border-b border-gray-200 bg-white rounded-t-3xl">
                    <Typography variant="bold" size={16} className="text-gray-900 tracking-wide">
                        Nearby Agents
                    </Typography>
                    <TouchableOpacity onPress={toggleList}>
                        <MaterialIcons name="close" size={24} color={colors.gray.dark} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredAgents}
                    renderItem={renderAgentItem}
                    keyExtractor={(item) => item.id}
                    className="flex-1"
                    contentContainerClassName={`${Platform.OS === 'ios' ? 'pb-10' : 'pb-8'} pt-2`}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                />
            </RNAnimated.View>

            <AgentNotificationCard
                visible={showAgentNotification}
                requestData={requestData}
                onAccept={handleAgentAccept}
                onDecline={handleAgentDecline}
            />

            <QuickCashBottomSheet
                visible={quickCash.isVisible}
                onClose={() => {
                    quickCash.hide();
                    quickCash.resetState();
                }}
                onRequestAgent={handleQuickCashRequest}
                onCallAgent={() => {
                    console.log('Call agent');
                }}
                onMessageAgent={() => {
                    if (quickCash.acceptedAgent) {
                        // Add messaging logic
                    }
                }}
                onGetDirections={() => {
                    if (quickCash.acceptedAgent && mapRef.current) {
                        quickCash.hide();
                        setTimeout(() => {
                            mapRef.current?.animateToRegion({
                                latitude: quickCash.acceptedAgent.latitude,
                                longitude: quickCash.acceptedAgent.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            });
                        }, 500);
                    }
                }}
                isLoading={quickCash.isLoading}
                agentAccepted={quickCash.agentAccepted}
                acceptedAgent={quickCash.acceptedAgent}
                services={defaultServiceTypes}
                nearbyAgents={[
                    { id: '1', name: 'Sarah J.', avatar: 'person', color: '#4CAF50' },
                    { id: '2', name: 'Michael K.', avatar: 'person-outline', color: '#2196F3' },
                    { id: '3', name: 'Emma L.', avatar: 'person', color: '#FF9800' },
                    { id: '4', name: 'Kofi K.', avatar: 'person', color: '#FF9800' },
                    { id: '5', name: 'Amanah Lira.', avatar: 'person', color: '#FF1800' },
                    { id: '6', name: 'Daniel Amo.', avatar: 'person', color: '#FF4800' },

                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width,
        height,
    },
});

export default MapScreen;