import { useEffect } from 'react';

export function useKeyPress(
  inputHandler: ((char: string) => void) | null,
): void {
  useEffect(() => {
    if (!inputHandler) {
      return;
    }

    const simpleLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const capitalLetters = simpleLetters.map(letter => letter.toUpperCase());

    const handleKeyPress = (e: KeyboardEvent): void => {
      // If event target on a input, don't do anything; else, prevent default
      // This is to prevent continuing race text while debugging in Storybook
      if (e.target instanceof HTMLInputElement) {
        return;
      }

      if (e.ctrlKey) {
        return;
      }
      e.preventDefault();

      if (e.key === ' ') {
        return inputHandler('SPACE');
      }
      if (e.key === 'Backspace') {
        return inputHandler('BACKSPACE');
      }

      //   Special chars
      if (e.key === ',') {
        return inputHandler(',');
      }
      if (e.key === '.') {
        return inputHandler('.');
      }
      if (e.key === "'") {
        return inputHandler("'");
      }
      if (e.key === '?') {
        return inputHandler('?');
      }
      if (e.key === '!') {
        return inputHandler('!');
      }

      // If key is a letter, return the letter
      for (let i = 0; i < simpleLetters.length; i++) {
        if (e.key === simpleLetters[i]) {
          return inputHandler(simpleLetters[i]);
        }
        if (e.key === capitalLetters[i]) {
          return inputHandler(capitalLetters[i]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputHandler]);
}
