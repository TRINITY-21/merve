import { useEffect, useState } from 'react';
import { IDetailedProduct, TabKey } from '../types/productDetailsTypes';
import { mockProduct, mockReviews } from '../utils/productDetailsDummyData';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<IDetailedProduct | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [showSimilarProducts, setShowSimilarProducts] = useState<boolean>(true);
  const [isFollowingSeller, setIsFollowingSeller] = useState<boolean>(false);
  const [showSellerNumber, setShowSellerNumber] = useState<boolean>(false);

  // In a real app, you'd fetch data here
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct);
    }, 500);
  }, [productId]);

  const toggleFavorite = () => setIsFavorite(prev => !prev);
  const toggleFullDescription = () => setShowFullDescription(prev => !prev);
  const toggleAllReviews = () => setShowAllReviews(prev => !prev);
  const toggleSimilarProducts = () => setShowSimilarProducts(prev => !prev);
  const toggleFollowingSeller = () => setIsFollowingSeller(prev => !prev);
  const toggleShowSellerNumber = () => setShowSellerNumber(prev => !prev);

  return {
    product,
    isFavorite,
    toggleFavorite,
    selectedImageIndex,
    setSelectedImageIndex,
    activeTab,
    setActiveTab,
    showFullDescription,
    toggleFullDescription,
    showAllReviews,
    toggleAllReviews,
    showSimilarProducts,
    toggleSimilarProducts,
    isFollowingSeller,
    toggleFollowingSeller,
    showSellerNumber,
    toggleShowSellerNumber,
    mockReviews // Keeping this here for now as it's directly used in ProductReviews
  };
};