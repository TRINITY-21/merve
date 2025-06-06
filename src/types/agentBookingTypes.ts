// types/agentBookingTypes.ts
export interface IBookingRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  amount: number;
  requestedDate: string;
  requestedTime: string;
  location: string;
  customLocation: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  createdAt: string;
  notes: string;
  urgency: 'low' | 'normal' | 'high';
  customerRating: number;
  estimatedDuration: number;
}

export interface ITab {
  key: string;
  label: string;
  icon: string;
  count: number;
}

export interface IServiceType {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface IUrgencyFilter {
  key: string;
  label: string;
  color: string;
}

export interface IWorkingHours {
  start: string;
  end: string;
}

export interface INotificationSettings {
  newRequests: boolean;
  reminders: boolean;
  cancellations: boolean;
}