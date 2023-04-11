import axios from 'axios';

export const generateRaceText = async (): Promise<string> => {
  const url = 'http://www.metaphorpsum.com/paragraphs/1/8';
  try {
    return await axios.get(url);
  } catch (e) {
    throw new Error(e);
  }
};
