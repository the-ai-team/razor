import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { Cursor } from 'apps/client/src/components';
import cs from 'classnames';
import { nanoid } from 'nanoid';

import { RaceTextIndexConverter } from './utils';

export interface RaceTextProps {
  raceId: AppRaceId;
}

export function RaceText({ raceId }: RaceTextProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const players = game.racesModel[raceId]?.players;
  let playerIds;
  if (players) {
    playerIds = Object.keys(players);
  } else {
    console.error('no players');
  }

  const raceText = game.racesModel[raceId]?.text;
  const indexConverter = new RaceTextIndexConverter(raceText);
  const spaceSeparatedText = indexConverter.spaceSeparatedText;
  const playerCursorAt = 50;
  const invalidCursorAt = 60;

  return (
    <div
      className={cs(
        'relative w-full py-6 pl-20 pr-10',
        'bg-neutral-20 border-[3px] border-neutral-40',
        'select-none',
        'rounded-md',
      )}>
      <div
        className={cs(
          'font-roboto text-[1.63rem] font-medium text-neutral-90',
          'flex flex-wrap justify-space-between',
        )}>
        {spaceSeparatedText.map((word, wordIndex) => {
          const letters = word.split('');
          const isCursorAtSpace = indexConverter.isCursorAtSpace(
            wordIndex,
            playerCursorAt,
          );
          const isSpaceBehindCursor = indexConverter.isSpaceBehindCursor(
            wordIndex,
            playerCursorAt,
          );
          const isSpaceBehindInvalidCursor = indexConverter.isSpaceBehindCursor(
            wordIndex,
            invalidCursorAt,
          );
          const isSpaceBetweenCursors =
            !isSpaceBehindCursor && isSpaceBehindInvalidCursor;

          return (
            <Fragment key={nanoid()}>
              {/* Utilizing separate spans to prevent text from wrapping in the middle of a word. */}
              <span
                className={cs(
                  { 'indent-32': wordIndex === 0 },
                  'bg-surface bg-opacity-60',
                )}>
                {letters.map((letter, letterIndex) => {
                  const isCursorAt = indexConverter.isCursorAtLetter(
                    wordIndex,
                    letterIndex,
                    playerCursorAt,
                  );
                  const isLetterBehindCursor =
                    indexConverter.isLetterBehindCursor(
                      wordIndex,
                      letterIndex,
                      playerCursorAt,
                    );
                  const isLetterBehindInvalidCursor =
                    indexConverter.isLetterBehindCursor(
                      wordIndex,
                      letterIndex,
                      invalidCursorAt,
                    );
                  const isLetterBetweenCursors =
                    !isLetterBehindCursor && isLetterBehindInvalidCursor;

                  return (
                    <span
                      key={nanoid()}
                      className={cs('relative pl-[0.5px]', {
                        'text-neutral-30': isLetterBehindCursor,
                        'text-error-50 bg-error-50 bg-opacity-20':
                          isLetterBetweenCursors,
                      })}>
                      {isCursorAt ? <Cursor /> : null}
                      {letter}
                    </span>
                  );
                })}
              </span>

              {wordIndex !== spaceSeparatedText.length - 1 && (
                <span className={cs('bg-surface bg-opacity-60 relative')}>
                  <span
                    className={cs({
                      'text-error-50 bg-error-50 bg-opacity-20':
                        isSpaceBetweenCursors,
                    })}>
                    {isCursorAtSpace ? <Cursor isAtSpace /> : null}
                    &nbsp;
                  </span>
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
