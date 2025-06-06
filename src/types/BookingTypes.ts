// types/bookingTypes.ts
export interface IBooking {
  id: string;
  agentName: string;
  agentPhone: string;
  serviceType: string;
  amount: number;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  notes: string;
  reminderSet: boolean;
}

export interface IAgent {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export interface IServiceType {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface ITab {
  key: string;
  label: string;
  icon: string;
  count: number;
}

export interface IStatusFilter {
  key: string;
  label: string;
  color: string;
}
