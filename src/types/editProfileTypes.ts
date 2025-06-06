// types/interfaces.ts
import { Animated } from 'react-native';

export interface IAgentData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dateOfBirth: string;
  gender: string;
  idNumber: string;
  idType: string;
  
  // Business Information
  businessName: string;
  businessDescription: string;
  businessType: string;
  businessRegNumber: string;
  businessCategory: string;
  yearsInOperation: string;
  
  // Location & Contact
  businessAddress: string;
  city: string;
  region: string;
  postalCode: string;
  landmark: string;
  gpsAddress: string;
  
  // Banking Information
  bankName: string;
  accountNumber: string;
  accountName: string;
  mobileMoneyNumber: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  
  // Business Operations
  dailyTransactionLimit: string;
  monthlyTransactionLimit: string;
  floatAmount: string;
  minimumFloatAlert: string;
  operatingLicense: string;
  
  // Settings
  acceptsWeekendTransactions: boolean;
  offers24HourService: boolean;
  acceptsCashDeposits: boolean;
  acceptsCashWithdrawals: boolean;
  acceptsBillPayments: boolean;
  acceptsAirtimePurchases: boolean;
}

export interface IWorkingHoursDay {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface IWorkingHours {
  monday: IWorkingHoursDay;
  tuesday: IWorkingHoursDay;
  wednesday: IWorkingHoursDay;
  thursday: IWorkingHoursDay;
  friday: IWorkingHoursDay;
  saturday: IWorkingHoursDay;
  sunday: IWorkingHoursDay;
}

export interface ITabConfig {
  key: string;
  title: string;
  icon: string;
}

export interface IInputFieldOptions {
  required?: boolean;
  icon?: string;
  nextField?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}

export interface IToggleItemData {
  key: keyof IAgentData;
  label: string;
  icon: string;
  iconColor: string;
}

export interface IServiceToggle extends IToggleItemData {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface IHeaderProps {
  loading: boolean;
  hasChanges: boolean;
  onCancel: () => void;
  onSave: () => void;
  headerScaleAnim: Animated.Value;
}

export interface ITabBarProps {
  tabs: ITabConfig[];
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export interface ITabContentProps {
  activeTab: string;
  agentData: IAgentData;
  workingHours: IWorkingHours;
  profileImageUri: string;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onWorkingHoursChange: (day: keyof IWorkingHours, field: string, value: string | boolean) => void;
  onImagePicker: () => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface IInputFieldProps {
  label: string;
  fieldKey: keyof IAgentData;
  value: string | boolean;
  options?: IInputFieldOptions;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface IToggleItemProps {
  data: IServiceToggle;
}

export interface IInfoCardProps {
  title: string;
  content: string;
  icon?: string;
}

export interface IHoursItemProps {
  day: string;
  hours: IWorkingHoursDay;
  onWorkingHoursChange: (day: keyof IWorkingHours, field: string, value: string | boolean) => void;
}

export interface IProfileTabProps {
  agentData: IAgentData;
  profileImageUri: string;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onImagePicker: () => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface IBusinessTabProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface ILocationTabProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface IBankingTabProps {
  agentData: IAgentData;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  inputRefs: React.MutableRefObject<Record<string, any>>;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onFocusNextInput: (currentKey: string) => void;
}

export interface IHoursTabProps {
  agentData: IAgentData;
  workingHours: IWorkingHours;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  onInputChange: (key: keyof IAgentData, value: string | boolean) => void;
  onWorkingHoursChange: (day: keyof IWorkingHours, field: string, value: string | boolean) => void;
}