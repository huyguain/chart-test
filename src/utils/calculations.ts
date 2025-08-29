import { StockData, PriceChange } from '../types/stock';

export const calculatePriceChange = (stockData: StockData[]): PriceChange => {
  if (stockData.length < 2) {
    return { change: 0, percentage: 0, isPositive: true };
  }
  
  const currentPrice = stockData[stockData.length - 1].close;
  const previousPrice = stockData[stockData.length - 2].close;
  const change = currentPrice - previousPrice;
  const percentage = (change / previousPrice) * 100;
  
  return { 
    change, 
    percentage, 
    isPositive: change >= 0 
  };
};
