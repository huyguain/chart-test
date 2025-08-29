import { useMemo } from 'react';
import { TimeFrame, TimeFrameOption } from '../types/stock';

interface TimeFrameButtonsProps {
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

export const TimeFrameButtons = ({ timeFrame, onTimeFrameChange }: TimeFrameButtonsProps) => {
  const timeFrames = useMemo<TimeFrameOption[]>(() => [
    { key: 'hourly', label: 'Hourly', icon: '⏰' },
    { key: 'daily', label: 'Daily', icon: '📅' },
    { key: 'weekly', label: 'Weekly', icon: '📊' },
    { key: 'monthly', label: 'Monthly', icon: '📈' }
  ], []);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
      {timeFrames.map((tf) => (
        <button
          key={tf.key}
          onClick={() => onTimeFrameChange(tf.key)}
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
  );
};
