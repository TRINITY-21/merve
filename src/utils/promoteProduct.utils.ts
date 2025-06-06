import { VISIBILITY_MULTIPLIERS } from "../constants";
import { IDuration, IPricing, IPromotionPlan } from "../types/promoteTypes";


/**
 * Calculate the final pricing with discounts
 */
export const calculatePricing = (
  plan: IPromotionPlan,
  selectedDuration: number,
  durations: IDuration[]
): IPricing => {
  const basePrice = plan.pricing[selectedDuration as keyof typeof plan.pricing];
  const duration = durations.find(d => d.days === selectedDuration);
  const discount = duration?.discount || 0;
  const discountAmount = (basePrice * discount) / 100;
  
  return {
    basePrice,
    discount: discountAmount,
    finalPrice: basePrice - discountAmount
  };
};

/**
 * Get visibility multiplier for a plan
 */
export const getVisibilityMultiplier = (planId: string): string => {
  return VISIBILITY_MULTIPLIERS[planId as keyof typeof VISIBILITY_MULTIPLIERS] || '1x';
};

/**
 * Format currency display
 */
export const formatCurrency = (amount: number): string => {
  return `GHS ${amount.toFixed(2)}`;
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Check if a plan has a discount
 */
export const hasDiscount = (pricing: IPricing): boolean => {
  return pricing.discount > 0;
};

/**
 * Get discount percentage
 */
export const getDiscountPercentage = (duration: IDuration): number => {
  return duration.discount;
};

/**
 * Validate step number
 */
export const isValidStep = (step: number): boolean => {
  return step >= 1 && step <= 3;
};

/**
 * Get step progress percentage
 */
export const getStepProgress = (currentStep: number, totalSteps: number = 3): number => {
  return (currentStep / totalSteps) * 100;
};