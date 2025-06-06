// types/PromoteProduct.types.ts

export interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  currentViews: number;
  currentSaves: number;
  category: string;
}

export interface IPromotionPlan {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
  pricing: {
    7: number;
    14: number;
    30: number;
  };
  estimatedViews: {
    7: string;
    14: string;
    30: string;
  };
  badge: string | null;
}

export interface IDuration {
  days: number;
  label: string;
  discount: number;
}

export interface IPaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  popular: boolean;
}

export interface IPricing {
  basePrice: number;
  discount: number;
  finalPrice: number;
}

export interface IAnalytics {
  currentPeriod: {
    views: number;
    saves: number;
    inquiries: number;
    shares: number;
  };
  projected: {
    views: number;
    saves: number;
    inquiries: number;
    shares: number;
  };
}

export interface IPromoteProductScreenProps {
  productId?: string;
}

export interface IHeaderProps {
  currentStep: number;
  onBack: () => void;
  onAnalytics: () => void;
}

export interface IProductCardProps {
  product: IProduct;
}

export interface IPlanSelectionProps {
  plans: IPromotionPlan[];
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
}

export interface IDurationSelectionProps {
  durations: IDuration[];
  selectedDuration: number;
  selectedPlan: IPromotionPlan;
  isAutoRenewal: boolean;
  onDurationSelect: (days: number) => void;
  onAutoRenewalToggle: (value: boolean) => void;
}

export interface IReviewProps {
  selectedPlan: IPromotionPlan;
  selectedDuration: number;
  durations: IDuration[];
  pricing: IPricing;
}

export interface IAnalyticsModalProps {
  visible: boolean;
  analytics: IAnalytics;
  onClose: () => void;
}

export interface IPaymentModalProps {
  visible: boolean;
  paymentMethods: IPaymentMethod[];
  selectedPaymentMethod: string;
  selectedPlan: IPromotionPlan;
  pricing: IPricing;
  onClose: () => void;
  onPaymentMethodSelect: (methodId: string) => void;
  onPayment: () => void;
}

export interface IBottomActionProps {
  currentStep: number;
  pricing: IPricing;
  onContinue: () => void;
}