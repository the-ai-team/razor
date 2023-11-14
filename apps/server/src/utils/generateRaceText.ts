import axios from 'axios';

export const generateRaceText = async (): Promise<string> => {
  const url = 'http://www.metaphorpsum.com/paragraphs/1/4';
  let raceText = '';

  try {
    const response = await axios.get(url);
    raceText = response.data;

    // Drop any char that is not a letter, space, comma, period, apostrophe, question mark, or exclamation point.
    // (Also drop new line)
    raceText = raceText.replace(/[^a-zA-Z ,.'?!]/g, '');

    return raceText;
  } catch (e) {
    throw new Error(e);
  }
};
