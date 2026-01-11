// Indian Rupee Currency Formatting Utilities

/**
 * Formats a number to Indian Rupee format with proper grouping
 * e.g., 1234567 -> ₹12,34,567
 */
export const formatINR = (amount: number, showSymbol: boolean = true): string => {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  
  // Convert to string and split decimal
  const [integerPart, decimalPart] = absoluteAmount.toFixed(2).split('.');
  
  // Apply Indian numbering system grouping
  let lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);
  
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  
  const symbol = showSymbol ? '₹' : '';
  const sign = isNegative ? '-' : '';
  
  // Remove .00 for whole numbers
  if (decimalPart === '00') {
    return `${sign}${symbol}${formatted}`;
  }
  
  return `${sign}${symbol}${formatted}.${decimalPart}`;
};

/**
 * Formats large numbers in Indian format with abbreviations
 * e.g., 10000000 -> ₹1 Cr, 100000 -> ₹1 L
 */
export const formatINRCompact = (amount: number): string => {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  const sign = isNegative ? '-' : '';
  
  if (absoluteAmount >= 10000000) {
    // Crores
    const crores = absoluteAmount / 10000000;
    return `${sign}₹${crores.toFixed(crores % 1 === 0 ? 0 : 2)} Cr`;
  } else if (absoluteAmount >= 100000) {
    // Lakhs
    const lakhs = absoluteAmount / 100000;
    return `${sign}₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)} L`;
  } else if (absoluteAmount >= 1000) {
    // Thousands
    const thousands = absoluteAmount / 1000;
    return `${sign}₹${thousands.toFixed(thousands % 1 === 0 ? 0 : 1)}K`;
  }
  
  return `${sign}₹${absoluteAmount.toFixed(0)}`;
};

/**
 * Parses a string with Indian currency format to number
 */
export const parseINR = (value: string): number => {
  // Remove currency symbol, commas, and spaces
  const cleaned = value.replace(/[₹,\s]/g, '');
  return parseFloat(cleaned) || 0;
};

/**
 * Formats percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};
