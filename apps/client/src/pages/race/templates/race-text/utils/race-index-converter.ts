interface GetCharIndexProps {
  wordIndex: number;
  letterIndex?: number;
  isSpace?: boolean;
}

export class RaceTextIndexConverter {
  readonly raceText: string;
  readonly spaceSeparatedText: string[];
  /** Array containing cumulative length of words. */
  readonly cumulativeWordLengthsArray: number[] = [];

  constructor(raceText: string) {
    this.raceText = raceText;
    this.spaceSeparatedText = raceText.split(' ');

    this.computeWordLengthsArray();
  }

  private computeWordLengthsArray(): void {
    let cumulativeLength = 0;

    for (const word of this.spaceSeparatedText) {
      cumulativeLength += word.length;
      this.cumulativeWordLengthsArray.push(cumulativeLength);
    }
  }

  getCharIndex({
    wordIndex,
    letterIndex = 0,
    isSpace = false,
  }: GetCharIndexProps): number {
    let index = 0;
    if (isSpace) {
      // index of space is considered as the length of the word
      // ex: "hello world" -> index of space is 5
      index = this.cumulativeWordLengthsArray[wordIndex];
      index += wordIndex; // Add spaces count
    } else {
      index = this.cumulativeWordLengthsArray[wordIndex - 1] || 0;
      index += wordIndex; // Add spaces count
      index += letterIndex;
    }

    return index;
  }

  isCursorAtSpace(wordIndex: number, cursorAt: number): boolean {
    const index = this.getCharIndex({ wordIndex, isSpace: true });
    return cursorAt === index;
  }

  isCursorAtLetter(
    wordIndex: number,
    letterIndex: number,
    cursorAt: number,
  ): boolean {
    const index = this.getCharIndex({ wordIndex, letterIndex });
    return cursorAt === index;
  }

  isSpaceBehindCursor(wordIndex: number, cursorAt: number): boolean {
    const index = this.getCharIndex({ wordIndex, isSpace: true });
    return cursorAt > index;
  }

  isLetterBehindCursor(
    wordIndex: number,
    letterIndex: number,
    cursorAt: number,
  ): boolean {
    const index = this.getCharIndex({ wordIndex, letterIndex });
    return cursorAt > index;
  }
}
