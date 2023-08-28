interface GetCharIndexProps {
  wordIndex: number;
  letterIndex?: number;
  isSpace?: boolean;
}

export class RaceTextIndexConverter {
  readonly raceText: string;
  readonly spaceSeparatedText: string[];
  /** Array containing length of every word. */
  readonly wordLengthsArray: number[] = [];

  constructor(raceText: string) {
    this.raceText = raceText;
    this.spaceSeparatedText = raceText.split(' ');

    this.computeWordLengthsArray();
  }

  private computeWordLengthsArray(): void {
    this.spaceSeparatedText.forEach(word => {
      this.wordLengthsArray.push(word.length);
    });
  }

  getCharIndex({
    wordIndex,
    letterIndex = 0,
    isSpace = false,
  }: GetCharIndexProps): number {
    let index = 0;

    for (let i = 0; i < wordIndex; i++) {
      index += this.wordLengthsArray[i];
      // Add 1 for space
      index++;
    }

    if (isSpace) {
      // index of space is considered as the length of the word
      // ex: "hello world" -> index of space is 5
      index += this.wordLengthsArray[wordIndex];
    } else {
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
