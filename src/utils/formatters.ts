export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatDate = (date: Date, timeFrame: string): string => {
  if (timeFrame === 'hourly') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } else if (timeFrame === 'daily') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit'
    });
  } else if (timeFrame === 'weekly') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } else { // monthly
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }
};

export const formatFullDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
