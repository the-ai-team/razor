import { AppRacePlayerCursor } from '@razor/models';

/** This function will separate player cursors line by line
 * using the first and last letter indexes of each line.
 *
 * @param firstLetterIndexes - The first letter index of each line
 * @param lastLetterIndexes - The last letter index of each line
 * @param playerCursors - The player cursors (Ungrouped)
 * @returns The player cursors grouped by lines
 */
export function computeCursorsPerLines(
  firstLetterIndexes: number[],
  lastLetterIndexes: number[],
  playerCursors: AppRacePlayerCursor[],
): AppRacePlayerCursor[][] {
  const cursorsPerLines: AppRacePlayerCursor[][] = [];

  for (let i = 0; i < firstLetterIndexes.length; i++) {
    const cursors: AppRacePlayerCursor[] = [];

    for (let j = 0; j < playerCursors.length; j++) {
      const cursor = playerCursors[j];
      const isCursorInLine =
        cursor.position >= firstLetterIndexes[i] &&
        cursor.position <= lastLetterIndexes[i];

      if (isCursorInLine) {
        cursors.push(cursor);
      }
    }

    cursorsPerLines.push(cursors);
  }
  return cursorsPerLines;
}
