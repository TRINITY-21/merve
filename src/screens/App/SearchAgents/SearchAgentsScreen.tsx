// screens/ViewAllAgentsScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, RefreshControl, View } from 'react-native';
import { REFRESH_TIMEOUT } from '../../../constants';
import { DUMMY_AGENTS, PROVIDER_OPTIONS, SERVICE_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '../../../constants/seachAgentConstants';
import { FilterType, IAgent, IAgentsScreenProps, SortKey, SortOrder, ViewMode } from '../../../types/searchAgentTypes';
import { calculateAgentStats, getDefaultFilters, hasActiveFilters, processAgents } from '../../../utils/searchAgentUtils';
import AgentCard from './AgentCard';
import AgentFilters from './AgentFilters';
import AgentsHeader from './AgentsHeader';
import EmptyAgentsState from './EmptyAgentState';

const SearchAgentsScreen: React.FC<IAgentsScreenProps> = ({
  initialAgents = DUMMY_AGENTS,
  onAgentPress,
  onChatPress,
}) => {
  const navigation = useNavigation();
  
  // State management
  const [agents, setAgents] = useState<IAgent[]>(initialAgents);
  const [filteredAgents, setFilteredAgents] = useState<IAgent[]>(initialAgents);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortKey>('distance');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedProvider, setSelectedProvider] = useState<FilterType>('all');
  const [selectedStatus, setSelectedStatus] = useState<FilterType>('all');
  const [selectedService, setSelectedService] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 25,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Process agents when filters change
  useEffect(() => {
    const processed = processAgents(
      agents,
      searchQuery,
      selectedProvider,
      selectedStatus,
      selectedService,
      sortBy,
      sortOrder
    );
    setFilteredAgents(processed);
  }, [agents, searchQuery, selectedProvider, selectedStatus, selectedService, sortBy, sortOrder]);

  // Event handlers
  const handleRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, REFRESH_TIMEOUT);
  };

  const handleSortChange = (sortKey: SortKey, order: SortOrder): void => {
    setSortBy(sortKey);
    setSortOrder(order);
  };

  const handleAgentPress = (agent: IAgent): void => {
    if (onAgentPress) {
      onAgentPress(agent);
    } else {
      navigation.navigate('AgentProfile' as never, { agent } as never);
    }
  };

  const handleChatPress = (agent: IAgent): void => {
    if (onChatPress) {
      onChatPress(agent);
    } else {
      navigation.navigate('Chat' as never, { agent } as never);
    }
  };

  const handleClearFilters = (): void => {
    const defaults = getDefaultFilters();
    setSelectedProvider(defaults.provider);
    setSelectedStatus(defaults.status);
    setSelectedService(defaults.service);
    setSearchQuery('');
  };

  const handleViewModeToggle = (): void => {
    setViewMode(prev => prev === 'list' ? 'grid' : 'list');
  };

  const renderAgentCard = ({ item, index }: { item: IAgent; index: number }) => (
    <AgentCard
      agent={item}
      index={index}
      fadeAnim={fadeAnim}
      slideAnim={slideAnim}
      scaleAnim={scaleAnim}
      onPress={handleAgentPress}
      onChatPress={handleChatPress}
    />
  );

  const stats = calculateAgentStats(filteredAgents);
  const filtersActive = hasActiveFilters(selectedProvider, selectedStatus, selectedService);

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <AgentsHeader
        searchQuery={searchQuery}
        viewMode={viewMode}
        showFilters={showFilters}
        stats={stats}
        onSearchChange={setSearchQuery}
        onViewModeToggle={handleViewModeToggle}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onBack={() => navigation.goBack()}
      />
      
      <View className="flex-1">
        <AgentFilters
          visible={showFilters}
          sortOptions={SORT_OPTIONS}
          providerOptions={PROVIDER_OPTIONS}
          statusOptions={STATUS_OPTIONS}
          serviceOptions={SERVICE_OPTIONS}
          sortBy={sortBy}
          sortOrder={sortOrder}
          selectedProvider={selectedProvider}
          selectedStatus={selectedStatus}
          selectedService={selectedService}
          onSortChange={handleSortChange}
          onProviderChange={setSelectedProvider}
          onStatusChange={setSelectedStatus}
          onServiceChange={setSelectedService}
        />
        
        <FlatList
          data={filteredAgents}
          renderItem={renderAgentCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingHorizontal: 20, 
            paddingBottom: 20 
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#FFCC00']}
              tintColor="#FFCC00"
            />
          }
          ListEmptyComponent={() => (
            <EmptyAgentsState
              searchQuery={searchQuery}
              hasFilters={filtersActive}
              onClearFilters={filtersActive ? handleClearFilters : undefined}
            />
          )}
        />
      </View>
    </View>
  );
};

export default SearchAgentsScreen;