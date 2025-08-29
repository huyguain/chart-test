'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { TimeFrameButtons } from '../components/TimeFrameButtons';
import { StockChart } from '../components/StockChart';
import { DataSummaryCards } from '../components/DataSummaryCards';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { useStockData } from '../hooks/useStockData';
import { useMobile } from '../hooks/useMobile';
import { calculatePriceChange } from '../utils/calculations';
import { formatPrice } from '../utils/formatters';
import { TimeFrame } from '../types/stock';

export default function Home() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('hourly');
  const { stockData, loading, error, fetchStockData } = useStockData();
  const isMobile = useMobile();

  useEffect(() => {
    fetchStockData(timeFrame);
  }, [timeFrame, fetchStockData]);

  const handleTimeFrameChange = useCallback((newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
  }, []);

  const priceChange = useMemo(() => {
    return calculatePriceChange(stockData);
  }, [stockData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        {/* Header with enhanced responsive design */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <span className="text-2xl sm:text-3xl text-white font-bold">T</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3 sm:mb-4">
            TSLA Stock Chart
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Real-time Tesla stock price visualization with advanced analytics and professional insights
          </p>
        </div>

        {/* Time Frame Buttons */}
        <TimeFrameButtons 
          timeFrame={timeFrame} 
          onTimeFrameChange={handleTimeFrameChange} 
        />

        {/* Enhanced responsive Chart Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {loading ? (
            <LoadingState timeFrame={timeFrame} />
          ) : error ? (
                          <ErrorState 
                error={error} 
                onRetry={() => fetchStockData(timeFrame)} 
              />
          ) : stockData.length > 0 ? (
            <div className="p-4 sm:p-6 md:p-8">
              {/* Responsive Chart Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div className="text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    TSLA Stock Price - {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} View
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">NASDAQ: TSLA • Last updated: {new Date().toLocaleString()}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
                    priceChange.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <span className={`mr-2 ${priceChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {priceChange.isPositive ? '↗️' : '↘️'}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(Math.abs(priceChange.change))} ({priceChange.percentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Chart */}
              <StockChart 
                stockData={stockData} 
                isMobile={isMobile} 
              />
              
              {/* Data Summary Cards */}
              <DataSummaryCards 
                stockData={stockData} 
                timeFrame={timeFrame} 
                priceChange={priceChange} 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 p-6 sm:p-8 md:p-12">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">📊</span>
                </div>
                <p className="text-base sm:text-lg font-medium">No data available</p>
                <p className="text-xs sm:text-sm mt-2">Try selecting a different time frame</p>
              </div>
            </div>
          )}
        </div>

        {/* Responsive Footer */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
            <span className="text-blue-600">🔗</span>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">Data provided by StockScan API</p>
            <span className="hidden sm:inline text-gray-400">•</span>
            <p className="text-gray-500 text-xs sm:text-sm">Built with Next.js & Recharts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
