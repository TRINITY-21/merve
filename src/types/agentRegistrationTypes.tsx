export interface IOperatingHours {
  [key: string]: {
    open: string;
    close: string;
    isClosed: boolean;
  };
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IFormData {
  name: string;
  phone: string;
  email: string;
  pin: string;
  confirmPin: string;
  otp: string;
  businessName: string;
  businessDescription: string;
  agentType: 'Retail' | 'Mobile' | 'Corporate';
  services: string[];
  networks: string[];
  address: string;
  landmark: string;
  contactPhone: string;
  whatsapp: string;
  operatingHours: IOperatingHours;
  isOpen: boolean;
  location: ILocation;
  idDocument: string | null;
  businessLicense: string | null;
  setupPhotos: string[];
  termsAccepted: boolean;
}

export interface IService {
  id: string;
  name: string;
  icon: string;
}

export interface INetwork {
  id: string;
  name: string;
  color: string;
}

export interface IStepProps {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  otpSent: boolean;
  setOtpSent: (sent: boolean) => void;
  sendOTP: (phone: string) => any;
}

export interface IAgentRegistrationHeaderProps {
  onGoBack: () => void;
  step: number;
  totalSteps: number;
}

export interface IProgressBarProps {
  step: number;
  totalSteps: number;
}