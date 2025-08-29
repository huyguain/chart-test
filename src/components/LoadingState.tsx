interface LoadingStateProps {
  timeFrame: string;
}

export const LoadingState = ({ timeFrame }: LoadingStateProps) => {
  return (
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
  );
};
