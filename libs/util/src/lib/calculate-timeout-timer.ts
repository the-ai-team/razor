const averageWPM = 50;

export const calculateTimeoutTimer = async (text: string) => {
  const averageWordLength = text.length / 5;
  const timeoutDuration = Math.ceil((averageWordLength / averageWPM) * 60);
  return timeoutDuration;
};
