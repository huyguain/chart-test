'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockData {
  date: string;
  close: number;
}

interface ApiResponse {
  candles: StockData[];
}

export default function Home() {
  const [timeFrame, setTimeFrame] = useState<string>('hourly');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const timeFrames = [
    { key: 'hourly', label: 'Hourly' },
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' }
  ];

  const fetchStockData = async (selectedTimeFrame: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://chart.stockscan.io/candle/v3/TSLA/${selectedTimeFrame}/NASDAQ`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.candles && Array.isArray(result.candles)) {
        const formattedData = result.candles.map((item: { date: string; close: number }) => ({
          date: new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          close: Number(item.close)
        }));
        
        console.log('Formatted data:', formattedData);
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
  };

  useEffect(() => {
    fetchStockData(timeFrame);
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame: string) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TSLA Stock Chart</h1>
          <p className="text-lg text-gray-600">Real-time stock price visualization</p>
        </div>

        {/* Time Frame Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {timeFrames.map((tf) => (
            <button
              key={tf.key}
              onClick={() => handleTimeFrameChange(tf.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                timeFrame === tf.key
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading {timeFrame} data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center text-red-600">
                <p className="text-lg font-semibold mb-2">Error loading data</p>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => fetchStockData(timeFrame)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : stockData.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                TSLA Stock Price - {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} View
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#666"
                      fontSize={12}
                      tick={{ fill: '#666' }}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tick={{ fill: '#666' }}
                      label={{ 
                        value: 'Stock Price ($)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#666' }
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                      labelStyle={{ fontWeight: 'bold', color: '#333' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2, fill: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Data Summary */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Current Price</p>
                  <p className="text-2xl font-bold text-blue-800">
                    ${stockData[stockData.length - 1]?.close || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Data Points</p>
                  <p className="text-2xl font-bold text-green-800">{stockData.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Time Frame</p>
                  <p className="text-2xl font-bold text-purple-800 capitalize">{timeFrame}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Data provided by StockScan API • Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
