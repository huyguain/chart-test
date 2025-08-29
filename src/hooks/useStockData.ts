import { useState, useCallback } from 'react';
import { StockData, ApiResponse, TimeFrame } from '../types/stock';
import { formatDate } from '../utils/formatters';

export const useStockData = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchStockData = useCallback(async (timeFrame: TimeFrame) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://chart.stockscan.io/candle/v3/TSLA/${timeFrame}/NASDAQ`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.candles && Array.isArray(result.candles)) {
        const formattedData = result.candles.map((item: { date: string; close: number }) => {
          const date = new Date(item.date);
          
          return {
            date: formatDate(date, timeFrame),
            close: Number(item.close),
            fullDate: date
          };
        });
        
        setStockData(formattedData);
      } else {
        setError('Invalid data format received from API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stockData,
    loading,
    error,
    fetchStockData
  };
};
