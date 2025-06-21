// src/config/componentDefaults.ts
import { TransportMode } from '../screens/App/Map/components/SelectedAgentCard';
import type { ServiceType } from '../screens/App/Map/components/quickcash/ServiceSelectionGrid';

export const defaultServiceTypes: ServiceType[] = [
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

export const defaultTransportModes: TransportMode[] = [
  { label: 'Car', icon: 'car', iconSet: 'Ionicons' as const, mode: 'driving', profile: 'driving' },
  { label: 'Motorcycle', icon: 'motorcycle', iconSet: 'MaterialIcons' as const, mode: 'driving', profile: 'driving' },
  { label: 'Bike', icon: 'bicycle', iconSet: 'Ionicons' as const, mode: 'cycling', profile: 'cycling' },
  { label: 'Walk', icon: 'walk', iconSet: 'Ionicons' as const, mode: 'walking', profile: 'walking' },
];