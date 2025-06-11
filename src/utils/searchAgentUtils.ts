// utils/Agents.utils.ts
// import { IAgent, SortKey, SortOrder, FilterType, IAgentStats } from '../types/Agents.types';

import { AgentProvider, FilterType, IAgent, IAgentStats, SortKey, SortOrder } from "../types/searchAgentTypes";

/**
 * Filter agents based on search query
 */
export const filterAgentsBySearch = (agents: IAgent[], searchQuery: string): IAgent[] => {
  if (!searchQuery.trim()) return agents;

  const query = searchQuery.toLowerCase();
  return agents.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.address.toLowerCase().includes(query)
  );
};

/**
 * Filter agents based on provider
 */

const filterAgentsByProvider = (agents: IAgent[], provider: FilterType): IAgent[] => {
  if (provider === 'all') return agents;
  return agents.filter(agent => agent.provider.includes(provider as AgentProvider));
};

/**
 * Filter agents based on status
 */
export const filterAgentsByStatus = (agents: IAgent[], status: FilterType): IAgent[] => {
  if (status === 'all') return agents;
  return agents.filter(agent => agent.status === status);
};

/**
 * Filter agents based on service
 */
export const filterAgentsByService = (agents: IAgent[], service: FilterType): IAgent[] => {
  if (service === 'all') return agents;
  return agents.filter(agent => agent.services.includes(service as any));
};

/**
 * Sort agents based on sort key and order
 */
export const sortAgents = (agents: IAgent[], sortBy: SortKey, sortOrder: SortOrder): IAgent[] => {
  return [...agents].sort((a, b) => {
    let aValue: any = a[sortBy] as any;
    let bValue: any = b[sortBy] as any;

    if (sortBy === 'joinedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

/**
 * Process all agent filters and sorting
 */
export const processAgents = (
  agents: IAgent[],
  searchQuery: string,
  provider: FilterType,
  status: FilterType,
  service: FilterType,
  sortBy: SortKey,
  sortOrder: SortOrder
): IAgent[] => {
  let filtered = filterAgentsBySearch(agents, searchQuery);
  filtered = filterAgentsByProvider(filtered, provider);
  filtered = filterAgentsByStatus(filtered, status);
  filtered = filterAgentsByService(filtered, service);
  return sortAgents(filtered, sortBy, sortOrder);
};


/**
 * Calculate agent statistics
 */
export const calculateAgentStats = (agents: IAgent[]): IAgentStats => {
  return {
    total: agents?.length || 0,
    open: agents?.filter(agent => agent?.status === 'open').length || 0,
    cashAvailable: agents?.filter(agent => agent?.cashAvailable).length   ,
  };
};

/**
 * Check if any filters are active
 */
export const hasActiveFilters = (
  provider: FilterType,
  status: FilterType,
  service: FilterType
): boolean => {
  return provider !== 'all' || status !== 'all' || service !== 'all';
};

/**
 * Clear all filters
 */
export const getDefaultFilters = () => ({
  provider: 'all' as FilterType,
  status: 'all' as FilterType,
  service: 'all' as FilterType,
});

/**
 * Format agent distance
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Get status color helper
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'open': return '#4CAF50';
    case 'closed': return '#F44336';
    case 'busy': return '#FF9800';
    default: return '#9E9E9E';
  }
};

/**
 * Get provider color helper
 */
export const getProviderColor = (provider: string): string => {
  const colors = {
    mtn: '#FFCC00',
    vodafone: '#E60000',
    airteltigo: '#FF0066',
  };
  return colors[provider as keyof typeof colors] || '#9E9E9E';
};

/**
 * Format agent transactions count
 */
export const formatTransactions = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

/**
 * Check if agent is currently open
 */
export const isAgentOpen = (agent: IAgent): boolean => {
  return agent.status === 'open' && agent.cashAvailable;
};

/**
 * Get agent availability status text
 */
export const getAvailabilityStatus = (agent: IAgent): string => {
  if (agent.status === 'closed') return 'Closed';
  if (agent.status === 'busy') return 'Busy';
  if (!agent.cashAvailable) return 'No Cash';
  return 'Available';
};