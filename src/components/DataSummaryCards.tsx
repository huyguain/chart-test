import { formatPrice } from '../utils/formatters';
import { PriceChange, StockData } from '../types/stock';

interface DataSummaryCardsProps {
  stockData: StockData[];
  timeFrame: string;
  priceChange: PriceChange;
}

export const DataSummaryCards = ({ stockData, timeFrame, priceChange }: DataSummaryCardsProps) => {
  return (
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
  );
};
