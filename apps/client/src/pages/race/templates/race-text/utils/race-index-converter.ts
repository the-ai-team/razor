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
