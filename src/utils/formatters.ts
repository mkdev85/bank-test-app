export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount == null || isNaN(amount)) {
    return '$0.00';
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
