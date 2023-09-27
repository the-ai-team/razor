import { flatMap } from 'lodash';

interface GetCharIndexProps {
  wordIndex: number;
  letterIndex?: number;
}

export class RaceTextIndexConverter {
  readonly raceText: string;
  readonly splittedWordsIncludingSpaces: string[];
  /** Array containing cumulative length of words. */
  readonly cumulativeWordLengthsArray: number[] = [];

  constructor(raceText: string) {
    this.raceText = raceText;
    this.splittedWordsIncludingSpaces = flatMap(
      raceText.split(' '),
      (value, index, array) => {
        // Add non-breaking space between each words
        return index < array.length - 1 ? [value, '\u00A0'] : [value];
      },
    );

    this.computeWordLengthsArray();
  }

  private computeWordLengthsArray(): void {
    let cumulativeLength = 0;

    for (const word of this.splittedWordsIncludingSpaces) {
      cumulativeLength += word.length;
      this.cumulativeWordLengthsArray.push(cumulativeLength);
    }
  }

  getCharIndex({ wordIndex, letterIndex = 0 }: GetCharIndexProps): number {
    let index = 0;
    index = this.cumulativeWordLengthsArray[wordIndex - 1] || 0;
    index += letterIndex;

    return index;
  }

  isCursorAtChar(
    charIndex: number,
    {
      cursorAt = -1,
      cursorsAt = [],
    }: { cursorAt?: number; cursorsAt?: number[] } = {},
  ): boolean {
    return cursorsAt.length > 0
      ? cursorsAt.includes(charIndex)
      : charIndex === cursorAt;
  }

  isCharBehindCursor(charIndex: number, cursorAt: number): boolean {
    return charIndex < cursorAt;
  }

  isCharBetweenCursors(
    charIndex: number,
    leftCursor: number,
    rightCursor: number,
  ): boolean {
    return charIndex >= leftCursor && charIndex < rightCursor;
  }
}
