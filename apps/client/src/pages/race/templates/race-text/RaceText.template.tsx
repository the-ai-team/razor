import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { Cursor, UnderlineCursor } from 'apps/client/src/components';
import cs from 'classnames';
import { nanoid } from 'nanoid';

import { RaceTextIndexConverter } from './utils';

export interface RaceTextProps {
  raceId: AppRaceId;
  debug?: {
    enableLetterCount?: boolean;
    enableSpaceCount?: boolean;
  };
}

export function RaceText({ raceId, debug = {} }: RaceTextProps): ReactElement {
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
  const playerCursorAt = 1; // Explanation: Player cursor at i means player cursor is placed before ith letter
  const invalidCursorAt = 52;
  const otherPlayerCursors = [12, 25, 26, 49, 80];

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

          const spaceIndex = indexConverter.getCharIndex({
            wordIndex,
            isSpace: true,
          });
          const isOtherPlayerCursorOnSpace =
            otherPlayerCursors.includes(spaceIndex);

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

                  const charIndex = indexConverter.getCharIndex({
                    wordIndex,
                    letterIndex,
                  });
                  const isOtherPlayerCursorOnLetter =
                    otherPlayerCursors.includes(charIndex);

                  return (
                    <span
                      key={nanoid()}
                      className={cs('relative pl-[0.5px]', {
                        'text-neutral-30': isLetterBehindCursor,
                        'text-error-50 bg-error-50 bg-opacity-20':
                          isLetterBetweenCursors,
                      })}>
                      {isCursorAt ? <Cursor /> : null}
                      {isOtherPlayerCursorOnLetter ? <UnderlineCursor /> : null}
                      <span className='relative'>
                        {letter}
                        {debug.enableLetterCount && (
                          <span
                            className={cs(
                              'absolute text-[0.45rem] top-[-0.5px] left-0 right-0 indent-0',
                              'text-neutral-90',
                            )}>
                            {indexConverter.getCharIndex({
                              wordIndex,
                              letterIndex,
                            })}
                          </span>
                        )}
                      </span>
                    </span>
                  );
                })}
              </span>

              {/* Word space */}
              {wordIndex !== spaceSeparatedText.length - 1 && (
                <span className={cs('bg-surface bg-opacity-60')}>
                  <span
                    className={cs(
                      {
                        'text-error-50 bg-error-50 bg-opacity-20':
                          isSpaceBetweenCursors,
                      },
                      'relative',
                    )}>
                    &nbsp;
                    {isCursorAtSpace ? <Cursor isAtSpace /> : null}
                    {isOtherPlayerCursorOnSpace ? (
                      <UnderlineCursor isAtSpace />
                    ) : null}
                    {debug.enableSpaceCount && (
                      <span
                        className={cs(
                          'absolute text-[0.55rem] h-1/2 m-auto inset-0 w-full text-center',
                          'text-neutral-90 bg-neutral-40',
                        )}>
                        {indexConverter.getCharIndex({
                          wordIndex: wordIndex,
                          isSpace: true,
                        })}
                      </span>
                    )}
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
