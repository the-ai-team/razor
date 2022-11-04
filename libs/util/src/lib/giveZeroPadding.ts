export const giveZeroPadding = (num: number, size: number): string => {
  const s = num + '';
  s.padStart(size, '0');
  return s;
};
