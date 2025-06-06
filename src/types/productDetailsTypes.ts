// types/productDetails.ts

export interface IProductAgent {
  id: string;
  name: string;
  profileImage: string;
  rating: number;
  totalReviews: number;
  verified: boolean;
  location: string;
  distance: number;
  responseTime: string;
  memberSince: string;
  totalProducts: number;
  phone: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface IProductSpecifications {
  [key: string]: string;
}

export interface IDetailedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  category: string;
  agent: IProductAgent;
  specifications: IProductSpecifications;
  inStock: boolean;
  stockCount: number;
  condition: string;
  warranty: string;
  isPromoted: boolean;
  tags: string[];
  rating: number;
  totalReviews: number;
  datePosted: string;
  lastUpdated: string;
  views: number;
  saves: number;
}

export interface IReview {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpful: number;
  verified: boolean;
}

export interface ISimilarProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  agent: {
    name: string;
    verified: boolean;
  };
}

export interface IChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'seller';
  timestamp: Date;
  status: 'sending' | 'delivered' | 'read';
}

export interface ITab {
  key: string;
  label: string;
  icon: string;
}

export interface IProductImageGalleryProps {
  images: string[];
  selectedIndex: number;
  isPromoted: boolean;
  discount?: number;
  isFavorite: boolean;
  onImagePress: () => void;
  onImageChange: (index: number) => void;
  onFavoritePress: () => void;
  onOptionsPress: () => void;
}

export interface IProductInfoProps {
  product: IDetailedProduct;
  fadeAnim: any;
  slideAnim: any;
}

export interface IProductTabsProps {
  tabs: ITab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

export interface IProductDescriptionProps {
  description: string;
  showFull: boolean;
  onToggle: () => void;
}

export interface IProductSpecificationsProps {
  specifications: IProductSpecifications;
}

export interface IProductReviewsProps {
  reviews: IReview[];
  productRating: number;
  totalReviews: number;
  showAll: boolean;
  onToggleShowAll: () => void;
}

export interface ISellerInfoProps {
  agent: IProductAgent;
  onViewProfile: () => void;
  onViewStore: () => void;
}

export interface ISimilarProductsProps {
  products: ISimilarProduct[];
  visible: boolean;
  onClose: () => void;
  onProductPress: (productId: string) => void;
}

export interface IImageModalProps {
  visible: boolean;
  images: string[];
  selectedIndex: number;
  onClose: () => void;
}

export interface IOptionsMenuProps {
  visible: boolean;
  isFollowingSeller: boolean;
  onClose: () => void;
  onShare: () => void;
  onFollowSeller: () => void;
  onReportSeller: () => void;
}

export interface IChatBottomSheetProps {
  visible: boolean;
  agent: IProductAgent;
  messages: IChatMessage[];
  isTyping: boolean;
  chatMessage: string;
  chatSheetAnim: any;
  onClose: () => void;
  onSendMessage: () => void;
  onMessageChange: (text: string) => void;
  onCall: () => void;
}

export interface IBottomActionsProps {
  showSellerNumber: boolean;
  sellerPhone: string;
  onCall: () => void;
  onDirections: () => void;
  onMessage: () => void;
}

export interface IProductDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      productId: string;
    };
  };
}

export type TabKey = 'description' | 'specifications' | 'reviews' | 'seller';