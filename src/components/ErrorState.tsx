interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center h-64 sm:h-80 md:h-96 p-6 sm:p-8 md:p-12">
      <div className="text-center text-red-600">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl">⚠️</span>
        </div>
        <p className="text-lg sm:text-xl font-semibold mb-2">Error loading data</p>
        <p className="text-sm mb-4 sm:mb-6 max-w-md px-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-lg sm:rounded-xl hover:bg-red-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
        >
          🔄 Retry
        </button>
      </div>
    </div>
  );
};
