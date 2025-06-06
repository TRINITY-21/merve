// utils/Vendor.utils.ts

import { IVendorStats, IVendorStatus } from "../types/vendorTypes";

/**
 * Format currency amount for display
 */
export const formatCurrency = (amount: number): string => {
  return `GH₵ ${amount.toFixed(2)}`;
};

/**
 * Calculate total daily transactions
 */
export const calculateDailyTotal = (stats: IVendorStats): number => {
  return stats.dailyCashIn + stats.dailyCashOut;
};

/**
 * Calculate weekly average for cash in
 */
export const calculateWeeklyCashInAverage = (stats: IVendorStats): number => {
  const total = stats.weeklyData.reduce((sum, day) => sum + day.cashIn, 0);
  return total / stats.weeklyData.length;
};

/**
 * Calculate weekly average for cash out
 */
export const calculateWeeklyCashOutAverage = (stats: IVendorStats): number => {
  const total = stats.weeklyData.reduce((sum, day) => sum + day.cashOut, 0);
  return total / stats.weeklyData.length;
};

/**
 * Get status color based on availability
 */
export const getStatusColor = (isAvailable: boolean): string => {
  return isAvailable ? '#4CAF50' : '#F44336';
};

/**
 * Get status text
 */
export const getStatusText = (isAvailable: boolean): string => {
  return isAvailable ? 'Open' : 'Closed';
};

/**
 * Check if vendor has any services enabled
 */
export const hasServicesEnabled = (status: IVendorStatus): boolean => {
  return status.cashInEnabled || status.cashOutEnabled;
};

/**
 * Get enabled services list
 */
export const getEnabledServices = (status: IVendorStatus): string[] => {
  const services: string[] = [];
  if (status.cashInEnabled) services.push('Cash In');
  if (status.cashOutEnabled) services.push('Cash Out');
  return services;
};

/**
 * Calculate commission based on transaction amount
 */
export const calculateCommission = (amount: number, rate: number = 0.02): number => {
  return amount * rate;
};

/**
 * Format large numbers with K/M suffixes
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Get performance indicator based on daily stats
 */
export const getPerformanceIndicator = (stats: IVendorStats): 'excellent' | 'good' | 'average' | 'poor' => {
  const dailyTotal = calculateDailyTotal(stats);
  
  if (dailyTotal >= 5000) return 'excellent';
  if (dailyTotal >= 3000) return 'good';
  if (dailyTotal >= 1500) return 'average';
  return 'poor';
};

/**
 * Calculate transaction growth compared to average
 */
export const calculateGrowthPercentage = (current: number, average: number): number => {
  if (average === 0) return 0;
  return ((current - average) / average) * 100;
};

/**
 * Check if vendor is performing above average
 */
export const isAboveAverage = (stats: IVendorStats): boolean => {
  const dailyTotal = calculateDailyTotal(stats);
  const weeklyAverage = (calculateWeeklyCashInAverage(stats) + calculateWeeklyCashOutAverage(stats));
  return dailyTotal > weeklyAverage;
};

/**
 * Generate performance insights
 */
export const generatePerformanceInsights = (stats: IVendorStats): string[] => {
  const insights: string[] = [];
  const performance = getPerformanceIndicator(stats);
  const isGrowing = isAboveAverage(stats);
  
  if (performance === 'excellent') {
    insights.push('🎉 Excellent performance today!');
  } else if (performance === 'poor') {
    insights.push('📈 Consider promoting your services to increase transactions');
  }
  
  if (isGrowing) {
    insights.push('📊 You\'re performing above your weekly average');
  }
  
  if (stats.totalCustomers > 50) {
    insights.push('👥 Great customer engagement today');
  }
  
  return insights;
};