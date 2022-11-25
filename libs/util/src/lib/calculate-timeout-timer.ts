import { AVERAGE_WPM } from '@razor/constants';

const averageWPM = AVERAGE_WPM;

export const calculateTimeoutTimer = async (text: string) => {
  const wordCount = text.length / 5;
  const timeoutDuration = Math.ceil((wordCount / averageWPM) * 60);
  return timeoutDuration;
};
