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


// TypeScript interfaces
export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  idNumber: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  emergencyContact: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  occupation: string;
  employer: string;
  monthlyIncome: string;
}

export interface IProfileSettings {
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  twoFactorEnabled: boolean;
  profileVisibility: 'Public' | 'Private';
  contactByEmail: boolean;
  contactByPhone: boolean;
  marketingEmails: boolean;
  transactionSMS: boolean;
}