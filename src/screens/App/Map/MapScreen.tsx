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
    View
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { BottomSheet, Typography } from '../../../components/common';
import EmergencyButton from '../../../components/common/EmergencyButton';
import ListToggleButton from '../../../components/common/ListToggleButton';
import { defaultServiceTypes, defaultTransportModes } from '../../../config/defaults';
import { colors } from '../../../constants/theme/colors';
import { useLocation } from '../../../hooks/useLocation';
import { useMapNavigation } from '../../../hooks/useMapNavigation';
import { useQuickCash } from '../../../hooks/useQuickCash';
import { MapStackParamList } from '../../../navigation/AppNavigator';
import useStore from '../../../store/useStore';
import { IAgent } from '../../../types';
import { AgentNotificationCard } from '../Notification/components';
import { AgentListItem, MapHeader, SelectedAgentCard, ZoomControls } from './components';
import { QuickCashBottomSheet } from './components/quickcash';

type NavigationProp = NativeStackNavigationProp<MapStackParamList>;

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { agents, selectedAgent, setSelectedAgent } = useStore();
    const { location, isLoading: locationLoading, watchLocation } = useLocation();
    const mapNavigation = useMapNavigation();
    const quickCash = useQuickCash();

    const [showList, setShowList] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [mapLoading, setMapLoading] = useState<boolean>(true);
    const [zoomLevel, setZoomLevel] = useState<number>(0.0922);
    const [showAgentNotification, setShowAgentNotification] = useState<boolean>(false);
    const [requestData, setRequestData] = useState<any>(null);
    const [showUrgentSheet, setShowUrgentSheet] = useState<boolean>(false);
    const [selectedTransport, setSelectedTransport] = useState<string>('car');
    const [isCameraFollowing, setIsCameraFollowing] = useState<boolean>(true);

    const mapRef = useRef<MapView>(null);
    const slideAnim = useRef(new RNAnimated.Value(height)).current;

    useEffect(() => {
        const stopWatching = watchLocation();
        return stopWatching; // Cleanup on unmount
    }, []);

    useEffect(() => {
        console.log('Navigation object:', navigation); // Debug navigation
        if (location) {
            setMapLoading(false);
        }
    }, [location, navigation]);

    useEffect(() => {
        if (mapNavigation.isNavigating && location && mapRef.current && isCameraFollowing) {
            mapNavigation.updateUserLocation(location);
            mapRef.current.animateCamera({
                center: location,
                heading: location.heading,
                pitch: 45, // For a 3D-like view
                zoom: 18, // Closer zoom level
            }, { duration: 1000 });
        }
    }, [location, mapNavigation.isNavigating, isCameraFollowing]);

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
        setSelectedTransport('car');
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
            // Get directions for all transport modes to show times for all options
            const modes = defaultTransportModes.map(mode => mode.label.toLowerCase());
            await mapNavigation.getDirections(location, modes);
        } catch (error) {
            Alert.alert('Unable to get directions. Please try again.');
        }
    };

    const handleStartNavigation = async () => {
        if (location && selectedAgent) {
            const route = mapNavigation.routes[selectedTransport];
            const time = mapNavigation.routeTimes[selectedTransport];

            if (route && typeof time === 'number') {
                setIsCameraFollowing(true);
                mapNavigation.updateUserLocation(location);
                await mapNavigation.startNavigation(route, time);
            }
        }
    };

    const handleStopNavigation = () => {
        mapNavigation.stopNavigation();
    };

    const handleQuickCashRequest = async (service: string, amount: string) => {
        await quickCash.requestAgent(service, amount);
        setShowUrgentSheet(true);
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
        setShowList(prevShowList => !prevShowList);
    };

    const filteredAgents = useMemo(() => {
        return agents.filter((agent: IAgent) => {
            if (!agent.name || !agent.address) return false;
            const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.address.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = selectedFilter === 'all' || agent.provider[0] === selectedFilter;
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


    const handleUrgetSheetClose = (): void => {
        setShowUrgentSheet(false);
        quickCash.resetState();
    };

    const handleTransportChange = (transport: string) => {
        setSelectedTransport(transport);
        // Get directions for the selected transport mode
        if (selectedAgent && location) {
            const selectedMode = defaultTransportModes.find(mode => 
                mode.label.toLowerCase() === transport
            );
            
            if (selectedMode) {
                mapNavigation.getDirections(location, [transport]);
            }
        }
    };


    return (
        <View className="flex-1">

            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={false}
            />
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: zoomLevel,
                    longitudeDelta: zoomLevel * 0.5,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onMapReady={() => setMapLoading(false)}
                followsUserLocation={mapNavigation.isNavigating && isCameraFollowing}
                showsTraffic={mapNavigation.isNavigating}
                showsBuildings={true}
                showsCompass={mapNavigation.isNavigating}
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                onRegionChange={(region, details) => {
                    if (details?.isGesture && mapNavigation.isNavigating && isCameraFollowing) {
                        setIsCameraFollowing(false);
                    }
                }}
                onRegionChangeComplete={(region) => {
                    if (!mapNavigation.isNavigating) {
                        setZoomLevel(region.latitudeDelta);
                    }
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
                                style={{ backgroundColor: getMarkerColor(agent.provider[0]) }}
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
                            strokeWidth={12}
                            strokeColor="rgba(0, 122, 255, 0.2)"
                            lineCap="round"
                            lineJoin="round"
                        />
                        <Polyline
                            coordinates={mapNavigation.remainingRoute}
                            strokeWidth={8}
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
                        rotation={mapNavigation.currentUserLocation.heading || 0}
                    >
                        <MaterialIcons name="navigation" size={24} color={colors.primary} />
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


            {!mapNavigation.isNavigating && (
                <MapHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSearchSubmit={searchQuery => console.log('Search submitted:', searchQuery)}
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    onProfilePress={() => navigation.navigate('UserProfile')}
                    searchPlaceholder="Search locations near you"

                    // Profile props for Google Maps style
                    userAvatarUrl="https://picsum.photos/100/100?random=10"
                    userName="John Doe"
                    showAvatar={true}
                />
            )}

            <ZoomControls
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
                onRecenter={() => setIsCameraFollowing(true)}
                isNavigating={mapNavigation.isNavigating}
                isCameraFollowing={isCameraFollowing}
            />

            {!mapNavigation.isNavigating && (
                <EmergencyButton quickCash={quickCash} setShowUrgentSheet={setShowUrgentSheet} />
            )}

            {!mapNavigation.isNavigating && (
                <ListToggleButton toggleList={toggleList} />
            )}

            {/* Navigation Exit Button - Google Maps style */}
            {mapNavigation.isNavigating && (
                <View className={`absolute ${Platform.OS === 'ios' ? 'top-16' : 'top-3'} right-4 z-50`}>
                    <TouchableOpacity
                        onPress={handleStopNavigation}
                        className="w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center border border-gray-200"
                    >
                        <MaterialIcons name="close" size={24} color={colors.gray.dark} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Navigation Instructions - Google Maps style */}
            {mapNavigation.isNavigating && selectedAgent && (
                <View className="absolute bottom-8 left-4 right-4 z-50">
                    <View className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
                        <View className="flex-row items-center justify-between mb-3">
                            <View className="flex-1">
                                <Typography variant="bold" size={16} className="text-gray-900 mb-1">
                                    Navigating to {selectedAgent.name}
                                </Typography>
                                <Typography variant="medium" size={14} className="text-gray-600">
                                    {selectedTransport.charAt(0).toUpperCase() + selectedTransport.slice(1)} • {mapNavigation.remainingTime ?? '...'} min
                                </Typography>
                            </View>
                            <View className="items-center">
                                <MaterialIcons 
                                    name={selectedTransport === 'car' || selectedTransport === 'motorcycle' ? 'directions-car' : 
                                          selectedTransport === 'bike' ? 'directions-bike' : 'directions-walk'} 
                                    size={32} 
                                    color={colors.primary} 
                                />
                            </View>
                        </View>
                        
                        {/* Progress Bar */}
                        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <View
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${mapNavigation.routeProgress}%` }}
                            />
                        </View>
                        <Typography variant="semibold" size={12} className="text-gray-600 text-center mt-2">
                            {mapNavigation.routeProgress.toFixed(0)}% complete
                        </Typography>
                    </View>
                </View>
            )}

            {selectedAgent && !mapNavigation.isNavigating && (
                <SelectedAgentCard
                    agent={selectedAgent}
                    selectedTransport={selectedTransport}
                    onTransportChange={handleTransportChange}
                    onClose={() => {
                        setSelectedAgent(null);
                    }}
                    onGetDirections={handleGetDirections}
                    onStartNavigation={handleStartNavigation}
                    onStopNavigation={handleStopNavigation}
                    isNavigating={mapNavigation.isNavigating}
                    showDirections={mapNavigation.showDirections}
                    routeTimes={mapNavigation.routeTimes}
                    transportModes={defaultTransportModes}
                    isCalculatingDirections={mapNavigation.isCalculatingDirections}
                />
            )}

            <BottomSheet
                isVisible={showList}
                onClose={() => setShowList(false)}
                title="Nearby Agents"
                subtitle={`${filteredAgents.length} agents available`}
                height={Platform.OS === 'ios' ? '85%' : '90%'}
                maxHeight={Platform.OS === 'ios' ? '90%' : '95%'}
                minHeight={Platform.OS === 'ios' ? '75%' : '90%'}
                showCloseButton={true}
                closeIcon="close"
                statusBarStyle="dark-content"
                swipeToClose={false}
                onBackdropPress={() => setShowList(false)}
                contentStyle={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 0,
                    width: '100%',
                    flex: 1 // ensure content can expand
                }}
                scrollEnabled={true} // ✅ Enable scroll inside the sheet
                keyboardAware={false}
                animationDuration={200}
                animationType="spring"
                springConfig={{
                    tension: 300,
                    friction: 20
                }}
            >
                <FlatList
                    data={filteredAgents}
                    renderItem={renderAgentItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingBottom: Platform.OS === 'ios' ? 120 : 100,
                        paddingTop: 8
                    }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    overScrollMode="always"
                    scrollEnabled={true} // ✅ double-confirm it's scrollable
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center py-8 px-4">
                            <MaterialIcons name="search-off" size={48} color={colors.gray.light} />
                            <Typography variant="medium" size={16} className="text-gray-600 mt-4 text-center">
                                No agents found nearby
                            </Typography>
                            <Typography variant="regular" size={14} className="text-gray-500 mt-2 text-center">
                                Try adjusting your filters or search
                            </Typography>
                        </View>
                    }
                />
            </BottomSheet>


            <AgentNotificationCard
                visible={showAgentNotification}
                requestData={requestData}
                onAccept={handleAgentAccept}
                onDecline={handleAgentDecline}
            />

            <BottomSheet
                isVisible={showUrgentSheet}
                onClose={handleUrgetSheetClose}
                title='Quick Cash Help'
                subtitle='Get instant assistance from verified agents nearby'
                animationDuration={300}
                keyboardAware={true}
                height={Platform.OS === 'ios' ? '85%' : '90%'}
                maxHeight={Platform.OS === 'ios' ? '90%' : '95%'}
                minHeight={Platform.OS === 'ios' ? '70%' : '75%'}
                showCloseButton={true}
                closeIcon="close"
                statusBarStyle="dark-content"
                swipeToClose={true}
                onBackdropPress={() => setShowUrgentSheet(false)}
                contentStyle={{
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 24 : 32
                }}
            >

                <QuickCashBottomSheet
                    visible={true}
                    onClose={() => {
                        quickCash.hide();
                        setShowUrgentSheet(false);
                        handleUrgetSheetClose();
                        console.log(' agent');
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
                            // quickCash.show();
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
            </BottomSheet>
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