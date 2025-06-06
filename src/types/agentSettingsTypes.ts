// types/agentSettings.ts

export interface IBusinessSettings {
  businessName: string;
  businessDescription: string;
  businessType: string;
  autoAcceptTransactions: boolean;
  dailyTransactionLimit: string;
  requireCustomerID: boolean;
  businessHours24: boolean;
  weekendOperations: boolean;
}

export interface IServiceSetting {
  enabled: boolean;
  commission: number;
  dailyLimit: number;
}

export interface IServiceSettings {
  cashIn: IServiceSetting;
  cashOut: IServiceSetting;
  billPayment: IServiceSetting;
  airtime: IServiceSetting;
  dataBundle: IServiceSetting;
  bankTransfer: IServiceSetting;
}

export interface INotificationSettings {
  transactionAlerts: boolean;
  dailyReports: boolean;
  lowBalanceAlerts: boolean;
  customerReviews: boolean;
  systemUpdates: boolean;
  promotionalOffers: boolean;
  securityAlerts: boolean;
  maintenanceNotices: boolean;
}

export interface ISecuritySettings {
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  autoLogout: boolean;
  sessionTimeout: string;
  suspiciousActivityAlerts: boolean;
  requirePinForTransactions: boolean;
  allowRemoteAccess: boolean;
  encryptTransactionData: boolean;
}

export interface ICustomerSettings {
  showRating: boolean;
  allowReviews: boolean;
  customerSupport24: boolean;
  automaticReceipts: boolean;
  customerVerification: string;
  shareContactInfo: boolean;
  loyaltyProgram: boolean;
  customerFeedbackAlerts: boolean;
}

export interface IOperationalSettings {
  floatManagement: string;
  lowFloatThreshold: string;
  highVolumeAlerts: boolean;
  performanceReports: string;
  backupLocation: string;
  dataRetention: string;
  complianceMode: string;
  auditTrail: boolean;
}

export interface ISettingsSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  expandable: boolean;
}

export interface IAgentSettingsHeaderProps {
  hasChanges: boolean;
  onBack: () => void;
  onReset: () => void;
  onSave: () => void;
}

export interface ISettingsSectionProps {
  section: ISettingsSection;
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
  children: React.ReactNode;
}

export interface ISettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface IActionItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  iconColor?: string;
}

export interface IServiceSettingCardProps {
  serviceKey: string;
  service: IServiceSetting;
  onServiceChange: (serviceKey: string, settingKey: keyof IServiceSetting, value: any) => void;
}

export interface IBusinessSettingsProps {
  settings: IBusinessSettings;
  onToggleChange: (key: keyof IBusinessSettings, value: boolean) => void;
  onNavigateToEdit: () => void;
}

export interface IServiceSettingsProps {
  settings: IServiceSettings;
  onServiceChange: (serviceKey: string, settingKey: keyof IServiceSetting, value: any) => void;
}

export interface INotificationSettingsProps {
  settings: INotificationSettings;
  onToggleChange: (key: keyof INotificationSettings, value: boolean) => void;
}

export interface ISecuritySettingsProps {
  settings: ISecuritySettings;
  onToggleChange: (key: keyof ISecuritySettings, value: boolean) => void;
}

export interface ICustomerSettingsProps {
  settings: ICustomerSettings;
  onToggleChange: (key: keyof ICustomerSettings, value: boolean) => void;
}

export interface IOperationalSettingsProps {
  settings: IOperationalSettings;
  onToggleChange: (key: keyof IOperationalSettings, value: boolean) => void;
}

export interface IAgentSettingsScreenProps {
  navigation: any;
  route?: {
    params?: any;
  };
}

export type SettingsSectionId = 'business' | 'services' | 'notifications' | 'security' | 'customer' | 'operational';