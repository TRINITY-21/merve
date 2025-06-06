// constants/Vendor.constants.ts

import { IBenefit, IChartConfig, IVendorStats } from "../types/vendorTypes";

export const VENDOR_BENEFITS: IBenefit[] = [
  { 
    icon: 'visibility', 
    title: 'Increased Visibility', 
    desc: 'Get discovered by customers nearby' 
  },
  { 
    icon: 'insights', 
    title: 'Business Analytics', 
    desc: 'Track your performance and growth' 
  },
  { 
    icon: 'notifications', 
    title: 'Real-time Updates', 
    desc: 'Notify customers of your availability' 
  },
  { 
    icon: 'security', 
    title: 'Secure Platform', 
    desc: 'Safe and reliable transaction tracking' 
  },
];

export const MOCK_VENDOR_STATS: IVendorStats = {
  dailyCashIn: 2450.75,
  dailyCashOut: 1875.25,
  totalCustomers: 42,
  averageTransaction: 127.50,
  weeklyData: [
    { day: 'Mon', cashIn: 1200, cashOut: 800 },
    { day: 'Tue', cashIn: 1500, cashOut: 1100 },
    { day: 'Wed', cashIn: 1800, cashOut: 1300 },
    { day: 'Thu', cashIn: 2100, cashOut: 1600 },
    { day: 'Fri', cashIn: 2450, cashOut: 1875 },
    { day: 'Sat', cashIn: 1900, cashOut: 1400 },
    { day: 'Sun', cashIn: 1600, cashOut: 1200 },
  ],
};

export const DEFAULT_CHART_CONFIG: IChartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(30, 58, 95, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(117, 117, 117, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#FFCC00',
  },
};

export const VENDOR_STATUS_MESSAGES = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  CASH_IN: 'Cash In',
  CASH_OUT: 'Cash Out',
} as const;

export const VENDOR_SCREEN_TITLES = {
  VENDOR_DASHBOARD: 'Agent Dashboard',
  BECOME_AGENT: 'Become an Agent',
} as const;