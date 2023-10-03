import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AppPlayerId,
  AppPlayerLogId,
  AppPlayerLogs,
  AppRaceId,
} from '@razor/models';
import { RootState } from '@razor/store';
import { Cursor, ToastType, UnderlineCursor } from 'apps/client/src/components';
import { useToastContext } from 'apps/client/src/hooks/useToastContext';
import { getSavedPlayerId } from 'apps/client/src/utils/save-player-id';
import cs from 'classnames';
import { nanoid } from 'nanoid';
import { ReactComponent as GamePad } from 'pixelarticons/svg/gamepad.svg';

import {
  getCursorPosition,
  getCursorPositionsWithPlayerAvatars,
} from './utils/get-cursor-position';
import { RaceTextIndexConverter } from './utils';

export interface RaceTextProps {
  raceId: AppRaceId;
  debug?: {
    enableLetterCount?: boolean;
    enableSpaceCount?: boolean;
    highlightLeftMostWords?: boolean;
    highlightRightMostWords?: boolean;
  };
}

export function RaceText({ raceId, debug = {} }: RaceTextProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const selfPlayerId = useRef<AppPlayerId | null>(getSavedPlayerId());
  const { t } = useTranslation(['room', 'common']);
  const addToast = useToastContext();

  const raceData = game.racesModel[raceId];
  const players = raceData.players;
  let playerIds;
  if (players) {
    playerIds = Object.keys(players);
  } else {
    console.error('no players');
  }

  const raceText = raceData.text;
  const paragraphRef = useRef<HTMLDivElement>(null);
  // Indexes of most right words from words list including spaces
  const [mostLeftWordIndexes, setMostLeftWordIndexes] = useState<number[]>([]);
  const [mostRightWordIndexes, setMostRightWordIndexes] = useState<number[]>(
    [],
  );

  useEffect(() => {
    const calculateMostRightWords = (): void => {
      const spans =
        paragraphRef.current?.querySelectorAll<HTMLSpanElement>(
          ':scope > span',
        );

      if (spans) {
        let mostRightElement: HTMLSpanElement | null = null;
        let mostRightElementBoundary = 0;
        const mostLeftWordIndexesArray: number[] = [0];
        const mostRightWordIndexesArray: number[] = [];

        for (const [index, span] of spans.entries()) {
          const rightBoundary = span.getBoundingClientRect().right;
          if (!mostRightElement) {
            mostRightElement = span;
            mostRightElementBoundary = rightBoundary;
          } else if (rightBoundary > mostRightElementBoundary) {
            mostRightElement = span;
            mostRightElementBoundary = rightBoundary;
          } else {
            mostLeftWordIndexesArray.push(index);
            mostRightWordIndexesArray.push(index - 1);
            mostRightElement = null;
            mostRightElementBoundary = 0;
          }
        }
        mostRightWordIndexesArray.push(spans.length - 1);
        setMostLeftWordIndexes(mostLeftWordIndexesArray);
        setMostRightWordIndexes(mostRightWordIndexesArray);
      }
    };

    calculateMostRightWords();
    window.addEventListener('resize', calculateMostRightWords);

    return () => {
      window.removeEventListener('resize', calculateMostRightWords);
    };
  }, [raceText]);

  useEffect((): void => {
    if (!raceData || !selfPlayerId.current) {
      addToast({
        title: t('toasts.game_error.title', { ns: 'common' }),
        type: ToastType.Error,
        message: t('toasts.game_error.message', { ns: 'common' }) as string,
        icon: <GamePad />,
        isImmortal: true,
      });
    }
  }, []);

  if (!raceData || !selfPlayerId.current || !playerIds) {
    return <div>Race data not found</div>;
  }

  const selfPlayerLogId: AppPlayerLogId = `${raceId}-${selfPlayerId.current}`;
  const selfPlayerLogs = game.playerLogsModel[selfPlayerLogId];
  const otherPlayerLogs: AppPlayerLogs = {};
  for (const id of playerIds) {
    if (id !== selfPlayerId.current) {
      const appPlayerLogId: AppPlayerLogId = `${raceId}-${id as AppPlayerId}`;

      otherPlayerLogs[appPlayerLogId] = game.playerLogsModel[appPlayerLogId];
    }
  }
  const playerCursorsWithAvatars = getCursorPositionsWithPlayerAvatars(
    otherPlayerLogs,
    players,
  );
  console.log(playerCursorsWithAvatars);

  const indexConverter = new RaceTextIndexConverter(raceText);
  const splittedWordsArray = indexConverter.splittedWordsIncludingSpaces;
  const playerCursorAt = getCursorPosition(selfPlayerLogs); // Explanation: Player cursor at i means player cursor is placed before ith letter
  const invalidCursorAt = 10;
  const otherPlayerCursors = playerCursorsWithAvatars.map(
    cursor => cursor.position,
  );

  return (
    <div
      className={cs(
        'relative w-full py-6 pl-20 pr-10',
        'bg-neutral-20 border-[3px] border-neutral-40',
        'select-none',
        'rounded-md',
      )}>
      <div
        ref={paragraphRef}
        className={cs(
          'font-roboto text-[1.63rem] font-medium text-neutral-90',
          'flex flex-wrap justify-space-between',
        )}>
        {splittedWordsArray.map((word, wordIndex) => {
          const letters = word.split('');
          const isMostLeftWord = mostLeftWordIndexes.includes(wordIndex);
          const isMostRightWord = mostRightWordIndexes.includes(wordIndex);

          return (
            <Fragment key={nanoid()}>
              {/* Utilizing separate spans to prevent text from wrapping in the middle of a word. */}
              <span
                className={cs('bg-surface bg-opacity-60 relative', {
                  'ml-36': wordIndex === 0,
                  'after:block after:absolute after:w-2 after:h-full after:-right-2 after:inset-y-0 after:bg-surface after:bg-opacity-60':
                    isMostLeftWord || isMostRightWord,
                  'after:-right-2': isMostRightWord,
                  'after:-left-2': isMostLeftWord,
                  'ring-2 ring-secondary-70':
                    (isMostLeftWord && debug.highlightLeftMostWords) ||
                    (isMostRightWord && debug.highlightRightMostWords),
                })}>
                {letters.map((letter, letterIndex) => {
                  const isSpace = letter === '\u00A0';
                  const charIndex = indexConverter.getCharIndex({
                    wordIndex,
                    letterIndex,
                  });
                  const isCursorAtLetter = indexConverter.isCursorAtChar(
                    charIndex,
                    { cursorAt: playerCursorAt },
                  );
                  const isLetterBehindCursor =
                    indexConverter.isCharBehindCursor(
                      charIndex,
                      playerCursorAt,
                    );
                  const isLetterBetweenCursors =
                    indexConverter.isCharBetweenCursors(
                      charIndex,
                      playerCursorAt,
                      invalidCursorAt,
                    );
                  const isOtherPlayerCursorsOnLetter =
                    indexConverter.isCursorAtChar(charIndex, {
                      cursorsAt: otherPlayerCursors,
                    });

                  return (
                    <span
                      key={nanoid()}
                      className={cs('relative pl-[0.5px]', {
                        'text-neutral-30': isLetterBehindCursor,
                        'text-error-50 bg-error-50 bg-opacity-20':
                          isLetterBetweenCursors,
                      })}>
                      {isCursorAtLetter ? <Cursor isAtSpace={isSpace} /> : null}
                      {isOtherPlayerCursorsOnLetter ? (
                        <UnderlineCursor />
                      ) : null}
                      <span className='relative'>
                        {letter}
                        <span
                          className={cs(
                            'absolute text-[0.45rem] top-[-0.5px] inset-x-0 indent-0 text-center',
                            'text-neutral-90',
                            {
                              'bg-neutral-40 text-[0.55rem] inset-0 m-auto h-1/2 w-full flex content-center items-center':
                                isSpace && debug.enableSpaceCount,
                              hidden:
                                (isSpace && !debug.enableSpaceCount) ||
                                (!isSpace && !debug.enableLetterCount),
                            },
                          )}>
                          {charIndex}
                        </span>
                      </span>
                    </span>
                  );
                })}
              </span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
