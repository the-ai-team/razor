import { useEffect } from 'react';

export function useKeyPress(inputHandler: (char: string) => void): void {
  useEffect(() => {
    const simpleLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const capitalLetters = simpleLetters.map(letter => letter.toUpperCase());
    // Keycodes: KeyA, KeyB,...
    const keyCodes = capitalLetters.map(letter => `Key${letter}`);
    const handleKeyPress = (e: KeyboardEvent): void => {
      e.preventDefault();
      if (e.code === 'Space') {
        return inputHandler('SPACE');
      }
      if (e.code === 'Backspace') {
        return inputHandler('BACKSPACE');
      }

      //   Special chars
      if (e.code === 'Comma') {
        return inputHandler(',');
      }

      if (e.code === 'Period') {
        return inputHandler('.');
      }

      if (e.code === 'Quote') {
        return inputHandler("'");
      }

      if (e.key === '?') {
        return inputHandler('?');
      }

      if (e.key === '!') {
        return inputHandler('!');
      }

      // t f =>  t
      // f t =>  t
      // f f =>  f
      // t t =>  f
      // Not equal act as XOR here
      const isCapital =
        e.getModifierState('CapsLock') !== e.getModifierState('Shift');

      // If key code between 65 and 90, it's a letter, input correct letter based on caps lock
      for (let i = 0; i < keyCodes.length; i++) {
        if (e.code === keyCodes[i]) {
          return inputHandler(isCapital ? capitalLetters[i] : simpleLetters[i]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return (): void => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputHandler]);
}
