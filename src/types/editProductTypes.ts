import { Animated } from 'react-native';

// Core Data Types
export interface IDeliveryOptions {
  pickup: boolean;
  delivery: boolean;
  shipping: boolean;
}

export interface IEditProductData {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  originalPrice: string;
  condition: string;
  warranty: string;
  stockCount: string;
  images: string[];
  specifications: Record<string, string>;
  tags: string[];
  location: string;
  deliveryOptions: IDeliveryOptions;
  isPromoted: boolean;
  isDraft: boolean;
  lastModified: string;
}

// UI Component Types
export interface IStep {
  key: string;
  title: string;
  icon: string;
}

export interface ICategory {
  key: string;
  label: string;
  icon: string;
}

export interface ICondition {
  key: string;
  label: string;
  desc: string;
}

// Component Props Types
export interface IEditProductScreenProps {
  navigation?: any;
  route?: any;
}

export interface IEditProductHeaderProps {
  navigation: any;
  progressAnim: Animated.Value;
  currentStep: number;
  totalSteps: number;
  hasChanges: boolean;
  onBackPress: () => void;
  onActionsPress: () => void;
}

export interface IStepIndicatorProps {
  steps: IStep[];
  currentStep: number;
}

export interface INavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

// Step Component Props
export interface IStepBaseProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  productData: IEditProductData;
  updateProductData: (field: keyof IEditProductData, value: any) => void;
}

export interface IBasicInfoStepProps extends IStepBaseProps {
  categories: ICategory[];
  onCategoryPress: () => void;
}

export interface IMediaStepProps extends IStepBaseProps {
  selectedImages: string[];
  mainImageIndex: number;
  onImagePicker: () => void;
  onRemoveImage: (index: number) => void;
  onSetMainImage: (index: number) => void;
}

export interface IDetailsStepProps extends IStepBaseProps {
  conditions: ICondition[];
  onConditionPress: () => void;
  onSpecPress: () => void;
  onTagPress: () => void;
  onRemoveSpecification: (key: string) => void;
  onRemoveTag: (tag: string) => void;
}

export interface IPricingStepProps extends IStepBaseProps {}

export interface IUpdateStepProps extends IStepBaseProps {
  selectedImages: string[];
  onPreview: () => void;
  onSaveChanges: () => void;
  onUpdateProduct: () => void;
}

// Modal Component Props
export interface ICategoryModalProps {
  visible: boolean;
  categories: ICategory[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  onClose: () => void;
}

export interface IConditionModalProps {
  visible: boolean;
  conditions: ICondition[];
  selectedCondition: string;
  onSelect: (condition: string) => void;
  onClose: () => void;
}

export interface ISpecificationModalProps {
  visible: boolean;
  newSpecKey: string;
  newSpecValue: string;
  onKeyChange: (key: string) => void;
  onValueChange: (value: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

export interface ITagModalProps {
  visible: boolean;
  newTag: string;
  onTagChange: (tag: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

export interface IActionsModalProps {
  visible: boolean;
  onPreview: () => void;
  onDuplicate: () => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface IDeleteModalProps {
  visible: boolean;
  onDelete: () => void;
  onClose: () => void;
}