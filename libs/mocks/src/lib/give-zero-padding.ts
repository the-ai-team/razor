// Give zero padding function to use in mock functions.
export const giveZeroPadding = (num: string, size: number): string => {
  const s = num + '';
  return s.padStart(size, '0');
};
