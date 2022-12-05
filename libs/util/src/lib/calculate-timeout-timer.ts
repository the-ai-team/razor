import { AVERAGE_WPM } from '@razor/constants';

/** Calculating timeout timer for the race text.
 *
 * @param {string} text - Race text.
 * @returns {number} - Timeout timer in seconds.
 */
export const calculateTimeoutTimer = (text: string): number => {
  /** Average word count
   *
   * Assuming that the average word has 5 letters.
   */
  const wordCount = text.length / 5;

  /** Timeout timer in seconds. */
  const timeoutDuration = Math.ceil((wordCount / AVERAGE_WPM) * 60);
  return timeoutDuration;
};
