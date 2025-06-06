// types/Vendor.types.ts

export interface IUser {
  isVendor: boolean;
  name?: string;
  email?: string;
  phone?: string;
  id?: string;
}

export interface IVendorStats {
  dailyCashIn: number;
  dailyCashOut: number;
  totalCustomers: number;
  averageTransaction: number;
  weeklyData: IWeeklyData[];
}

export interface IWeeklyData {
  day: string;
  cashIn: number;
  cashOut: number;
}

export interface IVendorStatus {
  isAvailable: boolean;
  cashInEnabled: boolean;
  cashOutEnabled: boolean;
}

export interface IBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface IChartConfig {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity?: number) => string;
  labelColor: (opacity?: number) => string;
  style: {
    borderRadius: number;
  };
  propsForDots: {
    r: string;
    strokeWidth: string;
    stroke: string;
  };
}

export interface IVendorScreenProps {
  user?: IUser;
  vendorStats?: IVendorStats;
  onToggleVendorMode?: () => void;
}

export interface IVendorHeaderProps {
  title: string;
  onBack: () => void;
}

export interface IVendorStatusCardProps {
  status: IVendorStatus;
  onStatusChange: (status: Partial<IVendorStatus>) => void;
}

export interface IVendorStatsCardProps {
  stats: IVendorStats;
}

export interface IVendorChartCardProps {
  weeklyData: IWeeklyData[];
  chartConfig: IChartConfig;
}

export interface IVendorUpgradeCardProps {
  onLearnMore: () => void;
}

export interface INonVendorHeroProps {
  onGetStarted: () => void;
}

export interface IBenefitsSectionProps {
  benefits: IBenefit[];
}

export interface IBenefitCardProps {
  benefit: IBenefit;
  index: number;
}

export interface ICTASectionProps {
  onStartAsAgent: () => void;
}

export interface IVendorDashboardProps {
  stats: IVendorStats;
  status: IVendorStatus;
  chartConfig: IChartConfig;
  onStatusChange: (status: Partial<IVendorStatus>) => void;
  onUpgrade: () => void;
}

export interface INonVendorViewProps {
  benefits: IBenefit[];
  onStartAsAgent: () => void;
}