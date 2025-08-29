'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockData {
  date: string;
  close: number;
  fullDate: Date;
}

interface ApiResponse {
  candles: StockData[];
}

export default function Home() {
  const [timeFrame, setTimeFrame] = useState<string>('hourly');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isHovered, setIsHovered] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);


  const timeFrames = useMemo(() => [
    { key: 'hourly', label: 'Hourly', icon: '⏰' },
    { key: 'daily', label: 'Daily', icon: '📅' },
    { key: 'weekly', label: 'Weekly', icon: '📊' },
    { key: 'monthly', label: 'Monthly', icon: '📈' }
  ], []);

  const fetchStockData = useCallback(async (selectedTimeFrame: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://chart.stockscan.io/candle/v3/TSLA/${selectedTimeFrame}/NASDAQ`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.candles && Array.isArray(result.candles)) {
        const formattedData = result.candles.map((item: { date: string; close: number }) => {
          const date = new Date(item.date);
          let formattedDate = '';
          
          if (selectedTimeFrame === 'hourly') {
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }) + ' ' + date.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            });
          } else if (selectedTimeFrame === 'daily') {
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: '2-digit'
            });
          } else if (selectedTimeFrame === 'weekly') {
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          } else { // monthly
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            });
          }
          
          return {
            date: formattedDate,
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

  useEffect(() => {
    fetchStockData(timeFrame);
  }, [timeFrame, fetchStockData]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTimeFrameChange = useCallback((newTimeFrame: string) => {
    setTimeFrame(newTimeFrame);
  }, []);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }, []);

  const priceChange = useMemo(() => {
    if (stockData.length < 2) return { change: 0, percentage: 0, isPositive: true };
    const currentPrice = stockData[stockData.length - 1].close;
    const previousPrice = stockData[stockData.length - 2].close;
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    return { change, percentage, isPositive: change >= 0 };
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

        {/* Enhanced responsive Time Frame Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
          {timeFrames.map((tf) => (
            <button
              key={tf.key}
              onClick={() => handleTimeFrameChange(tf.key)}
              onMouseEnter={() => setIsHovered(tf.key)}
              onMouseLeave={() => setIsHovered('')}
              className={`group relative px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base min-w-[60px] sm:min-w-[80px] md:min-w-[100px] ${
                timeFrame === tf.key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl border border-gray-200/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl transition-transform duration-300 group-hover:scale-110">
                  {tf.icon}
                </span>
                <span className="text-center leading-tight">
                  <span className="sm:hidden">{tf.key.charAt(0).toUpperCase()}</span>
                  <span className="hidden sm:inline md:hidden">{tf.key.charAt(0).toUpperCase() + tf.key.slice(1, 3)}</span>
                  <span className="hidden md:inline">{tf.label}</span>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced responsive Chart Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 p-6 sm:p-8 md:p-12">
              <div className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
                  <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
                </div>
                <p className="text-base sm:text-lg text-gray-600 font-medium">Loading {timeFrame} data...</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Fetching real-time stock information</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 p-6 sm:p-8 md:p-12">
              <div className="text-center text-red-600">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">⚠️</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold mb-2">Error loading data</p>
                <p className="text-sm mb-4 sm:mb-6 max-w-md px-4">{error}</p>
                <button
                  onClick={() => fetchStockData(timeFrame)}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-lg sm:rounded-xl hover:bg-red-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                >
                  🔄 Retry
                </button>
              </div>
            </div>
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

              {/* Responsive Chart */}
              <div className="h-64 sm:h-80 md:h-96 mb-6 sm:mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={stockData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b"
                      fontSize={10}
                      tick={{ fill: '#64748b', fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      tickMargin={8}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={10}
                      tick={{ fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                      label={!isMobile ? { 
                        value: 'Stock Price ($)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { 
                          textAnchor: 'middle', 
                          fill: '#64748b', 
                          fontSize: 12, 
                          fontWeight: 600 
                        }
                      } : undefined}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        padding: '12px',
                        fontSize: '12px'
                      }}
                      labelStyle={{ fontWeight: 'bold', color: '#1e293b', fontSize: 12 }}
                      formatter={(value: number) => [
                        formatPrice(value), 
                        'Price'
                      ]}
                      labelFormatter={(label: string) => {
                        const item = stockData.find(d => d.date === label);
                        if (item && item.fullDate) {
                          return item.fullDate.toLocaleString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                          });
                        }
                        return label;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="url(#colorClose)"
                      dot={{ fill: '#3b82f6', strokeWidth: 1, r: 2, stroke: 'white' }}
                      activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                    />
                    

                    
                  </AreaChart>
                </ResponsiveContainer>
                

              </div>
              

              
              {/* Responsive Data Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-blue-200/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-blue-700 font-medium">Current Price</p>
                    <span className="text-blue-600 text-sm sm:text-base">💰</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-3xl font-bold text-blue-900">
                    {formatPrice(stockData[stockData.length - 1]?.close || 0)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-green-200/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-green-700 font-medium">Data Points</p>
                    <span className="text-green-600 text-sm sm:text-base">📊</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-3xl font-bold text-green-900">{stockData.length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-purple-200/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-purple-700 font-medium">Time Frame</p>
                    <span className="text-purple-600 text-sm sm:text-base">⏱️</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-3xl font-bold text-purple-900 capitalize">{timeFrame}</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-orange-200/50">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-orange-700 font-medium">Price Change</p>
                    <span className="text-orange-600 text-sm sm:text-base">📈</span>
                  </div>
                  <p className={`text-lg sm:text-xl md:text-3xl font-bold ${priceChange.isPositive ? 'text-green-900' : 'text-red-900'}`}>
                    {formatPrice(priceChange.change)}
                  </p>
                </div>
              </div>
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
