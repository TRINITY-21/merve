// types/Agents.types.ts

export type AgentStatus = 'open' | 'closed' | 'busy';
export type AgentProvider = 'mtn' | 'vodafone' | 'airteltigo';
export type AgentService = 'cash_in' | 'cash_out' | 'bill_payment' | 'airtime';
export type SortKey = 'distance' | 'rating' | 'name' | 'Pins' | 'joinedDate';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'list' | 'grid';
export type FilterType = 'all' | AgentStatus | AgentProvider | AgentService;

export interface IAgent {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  status: AgentStatus;
  services: AgentService[];
  provider: AgentProvider;
  rating: number;
  cashAvailable: boolean;
  phone: string;
  workingHours: string;
  transactions: number;
  joinedDate: string;
}

export interface ISortOption {
  key: SortKey;
  label: string;
  icon: string;
}

export interface IProviderOption {
  key: 'all' | AgentProvider;
  label: string;
  color: string;
}

export interface IStatusOption {
  key: 'all' | AgentStatus;
  label: string;
  color: string;
}

export interface IServiceOption {
  key: 'all' | AgentService;
  label: string;
}

export interface IAgentStats {
  total: number;
  open: number;
  cashAvailable: number;
}

export interface IAgentsScreenProps {
  initialAgents?: IAgent[];
  onAgentPress?: (agent: IAgent) => void;
  onChatPress?: (agent: IAgent) => void;
}

export interface IAgentsHeaderProps {
  searchQuery: string;
  viewMode: ViewMode;
  showFilters: boolean;
  stats: IAgentStats;
  onSearchChange: (query: string) => void;
  onViewModeToggle: () => void;
  onToggleFilters: () => void;
  onBack: () => void;
}

export interface IAgentFiltersProps {
  visible: boolean;
  sortOptions: ISortOption[];
  providerOptions: IProviderOption[];
  statusOptions: IStatusOption[];
  serviceOptions: IServiceOption[];
  sortBy: SortKey;
  sortOrder: SortOrder;
  selectedProvider: FilterType;
  selectedStatus: FilterType;
  selectedService: FilterType;
  onSortChange: (sortKey: SortKey, order: SortOrder) => void;
  onProviderChange: (provider: FilterType) => void;
  onStatusChange: (status: FilterType) => void;
  onServiceChange: (service: FilterType) => void;
}

export interface IAgentCardProps {
  agent: IAgent;
  index: number;
  fadeAnim: any;
  slideAnim: any;
  scaleAnim: any;
  onPress: (agent: IAgent) => void;
  onChatPress: (agent: IAgent) => void;
}

export interface IAgentServicesProps {
  services: AgentService[];
}

export interface IAgentStatsDisplayProps {
  transactions: number;
  cashAvailable: boolean;
}

export interface IRatingStarsProps {
  rating: number;
  size?: number;
  showRatingText?: boolean;
}

export interface IEmptyAgentsStateProps {
  searchQuery?: string;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export interface IAgentCardHeaderProps {
  agent: IAgent;
}

export interface IAgentCardBodyProps {
  agent: IAgent;
}

export interface IAgentCardFooterProps {
  agent: IAgent;
  onChatPress: (agent: IAgent) => void;
}