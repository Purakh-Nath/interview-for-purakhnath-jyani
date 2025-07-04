export const getStatusColor = (launch) => {
  if (launch.upcoming) return 'bg-yellow-100 text-yellow-700';
  if (launch.success) return 'bg-green-100 text-green-700';
  return 'bg-red-100 text-red-700';
};
