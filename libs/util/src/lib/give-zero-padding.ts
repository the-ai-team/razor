/** Give zero padding according to the size given.
 * (eg: if size is 3, 1 -> 001, 12 -> 012, 123 -> 123)
 *
 * @param num - Number to be padded.
 * @param size - Size of the padding.
 * @returns Padded number.
 */
export const giveZeroPadding = (num: string, size: number): string => {
  return `${num}`.padStart(size, '0');
};
