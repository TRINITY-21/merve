// types/analytics.ts

export interface IProduct {
  id: string;
  title: string;
  description?: string;
  price?: number;
  images?: string[];
}

export interface ITimeframe {
  key: string;
  label: string;
  value: string;
}

export interface ITab {
  key: string;
  label: string;
  icon: string;
}

export interface IOverviewData {
  totalViews: number;
  uniqueViews: number;
  inquiries: number;
  favorites: number;
  shares: number;
  agentVisits: number;
  conversionRate: number;
  averageViewTime: string;
}

export interface ITrends {
  views: number[];
  inquiries: number[];
  favorites: number[];
  shares: number[];
}

export interface IAgeGroup {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
}

export interface ILocation {
  city: string;
  views: number;
  percentage: number;
}

export interface IDemographics {
  ageGroups: IAgeGroup[];
  locations: ILocation[];
}

export interface ISearchKeyword {
  keyword: string;
  searches: number;
  rank: number;
}

export interface IPerformance {
  ranking: number;
  totalProducts: number;
  categoryRanking: number;
  categoryTotal: number;
  viewsVsCategory: number;
  searchKeywords: ISearchKeyword[];
}

export interface IAnalyticsData {
  overview: IOverviewData;
  trends: ITrends;
  demographics: IDemographics;
  performance: IPerformance;
}

export interface IMetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: string;
  color?: string;
}

export interface IInsight {
  icon: string;
  title: string;
  text: string;
  color: string;
}

export interface IProductAnalyticsScreenProps {
  route: {
    params?: {
      product?: IProduct;
    };
  };
}