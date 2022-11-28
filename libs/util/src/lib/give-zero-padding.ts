export const giveZeroPadding = (num: string, size: number): string => {
  return `${num}`.padStart(size, '0');
};
