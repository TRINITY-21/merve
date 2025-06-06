// utils/Reviews.utils.ts

import { IHelpfulVotes, IReview, UserRole } from "../types/reviewsTypes";

/**
 * Initialize helpful votes from review data
 */
export const initializeHelpfulVotes = (reviews: IReview[]): IHelpfulVotes => {
  const votes: IHelpfulVotes = {};
  reviews.forEach(review => {
    votes[review.id] = {
      helpful: review.helpfulCount || 0,
      notHelpful: review.notHelpfulCount || 0
    };
  });
  return votes;
};

/**
 * Check if a review belongs to the current user
 */
export const isOwnReview = (
  review: IReview, 
  userRole: UserRole, 
  currentUserName: string, 
  isReceived: boolean
): boolean => {
  if (userRole === 'user') {
    return !isReceived; // If user viewing received reviews, none are their own
  } else {
    return isReceived && review.reviewerName === currentUserName;
  }
};

/**
 * Generate a new review ID
 */
export const generateReviewId = (prefix: string, existingReviews: IReview[]): string => {
  return `${prefix}${existingReviews.length + 1}`;
};

/**
 * Get current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Validate review before submission
 */
export const validateReview = (rating: number, comment: string): { isValid: boolean; error?: string } => {
  if (rating === 0) {
    return { isValid: false, error: 'Please provide a star rating.' };
  }
  if (comment.trim() === '') {
    return { isValid: false, error: 'Please add a comment for your review.' };
  }
  return { isValid: true };
};

/**
 * Create a new review object
 */
export const createNewReview = (
  id: string,
  targetAgent: { id: string; name: string; avatar: string },
  rating: number,
  comment: string
): IReview => {
  return {
    id,
    reviewedName: targetAgent.name,
    reviewedType: 'Agent',
    avatar: targetAgent.avatar,
    rating,
    comment: comment.trim(),
    date: getCurrentDate(),
    verified: false,
    entityId: targetAgent.id,
    reply: null,
    helpfulCount: 0,
    notHelpfulCount: 0
  };
};

/**
 * Calculate helpful percentage
 */
export const calculateHelpfulPercentage = (helpful: number, notHelpful: number): number => {
  const total = helpful + notHelpful;
  return total > 0 ? (helpful / total) * 100 : 0;
};

/**
 * Format entity name for display
 */
export const formatEntityName = (entityName: string, userRole: UserRole): string => {
  if (userRole === 'agent' && entityName === 'Your Business Name') {
    return 'Your Business';
  }
  return entityName;
};