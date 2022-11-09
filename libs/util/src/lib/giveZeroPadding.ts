export const giveZeroPadding = (num: string, size: number): string => {
  const s = num + '';
  return s.padStart(size, '0');
};
