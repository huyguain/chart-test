import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { StockData } from '../types/stock';
import { formatPrice, formatFullDate } from '../utils/formatters';

interface StockChartProps {
  stockData: StockData[];
  isMobile: boolean;
}

export const StockChart = ({ stockData, isMobile }: StockChartProps) => {
  return (
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
            formatter={(value: number) => [formatPrice(value), 'Price']}
            labelFormatter={(label: string) => {
              const item = stockData.find(d => d.date === label);
              if (item && item.fullDate) {
                return formatFullDate(item.fullDate);
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
  );
};
