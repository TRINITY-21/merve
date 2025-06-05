export interface IUser {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  accountType: string;
  balance: string;
  totalTransactions: number;
  rating: number;
  location: string;
  bio: string;
}

export interface INotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  transactionAlerts: boolean;
  socialUpdates: boolean;
  promotionalOffers: boolean;
}

export interface IPrivacySettings {
  profileVisibility: boolean;
  locationSharing: boolean;
  activityStatus: boolean;
  contactSync: boolean;
}

export interface IExpandedSections {
  [key: string]: boolean;
}

export interface ISectionItem {
  id: string;
  title: string;
  icon: string;
  action: 'navigate' | 'toggle' | 'rate' | 'share';
  screen?: string;
  key?: keyof INotificationSettings | keyof IPrivacySettings;
  subtitle?: string;
  badge?: string;
  highlight?: boolean;
  warning?: boolean;
}
export interface IAccountSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  expandable: boolean;
  items: ISectionItem[];
}

export interface IQuickAction {
  id: string;
  title: string;
  icon: string;
  action: 'navigate' | 'rate' | 'share';
  screen?: string;
  color: string;
}

export interface IAboutItem {
  id: string;
  title: string;
  icon: string;
  action: 'navigate';
  screen: string;
  subtitle?: string;
}
