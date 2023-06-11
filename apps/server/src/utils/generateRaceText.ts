import axios from 'axios';

export const generateRaceText = async (): Promise<string> => {
  const url = 'http://www.metaphorpsum.com/paragraphs/1/8';
  let raceText = '';

  try {
    const response = await axios.get(url);
    raceText = response.data;
    return raceText;
  } catch (e) {
    throw new Error(e);
  }
};
