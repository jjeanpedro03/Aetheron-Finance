export const calculateFintechRate = (marketPrice: string | number, spread: number): number => {
  const price = typeof marketPrice === 'string' ? parseFloat(marketPrice) : marketPrice;
  return price * (1 + spread / 100);
};