export interface StockData {
  date: string;
  close: number;
  fullDate: Date;
}

export interface ApiResponse {
  candles: StockData[];
}

export type TimeFrame = 'hourly' | 'daily' | 'weekly' | 'monthly';

export interface TimeFrameOption {
  key: TimeFrame;
  label: string;
  icon: string;
}

export interface PriceChange {
  change: number;
  percentage: number;
  isPositive: boolean;
}
