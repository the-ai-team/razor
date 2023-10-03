import {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppPlayerId,
  AppPlayerLogId,
  AppPlayerLogs,
  AppRaceId,
} from '@razor/models';
import { Dispatch, RootState } from '@razor/store';
import { Cursor, ToastType, UnderlineCursor } from 'apps/client/src/components';
import { MAX_INVALID_CHARS_ALLOWED } from 'apps/client/src/constants/race';
import { useToastContext } from 'apps/client/src/hooks/useToastContext';
import { getSavedPlayerId } from 'apps/client/src/utils/save-player-id';
import cs from 'classnames';
import { ReactComponent as GamePad } from 'pixelarticons/svg/gamepad.svg';

import { getCursorPositionsWithPlayerAvatars } from './utils/get-cursor-position';
import { inputHandler, InputStatus } from './utils/input-handler';
import { useKeyPress } from './utils/key-press-listener';
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
  const dispatch = useDispatch<Dispatch>();
  const { t } = useTranslation(['room', 'common']);
  const addToast = useToastContext();

  const selfPlayerId = useRef<AppPlayerId | null>(getSavedPlayerId());
  const [handleKeyPress, updateHandleKeyPress] = useState<
    ((char: string) => void) | null
  >(null);
  // useKeyPress(handleKeyPress);

  const raceData = game.racesModel[raceId];
  const players = raceData.players;
  let playerIds: AppPlayerId[] = [];
  if (players) {
    playerIds = Object.keys(players) as AppPlayerId[];
  } else {
    console.error('no players');
  }

  const raceText = raceData.text;
  const indexConverter = useMemo(
    () => new RaceTextIndexConverter(raceText),
    [raceText],
  );
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

  const splittedWordsArray = useRef<string[]>([]);
  /** Explanation: Player cursor at i means player cursor is placed before ith letter */
  const [playerCursorAt, updatePlayerCursorAt] = useState<number>(0);
  const [noOfInvalidChars, updateNoOfInvalidChars] = useState<number>(0);
  const invalidCursorAt = playerCursorAt + noOfInvalidChars;
  const [otherPlayerCursors, updateOtherPlayerCursors] = useState<number[]>([]);

  useEffect((): void => {
    if (!raceData || !selfPlayerId.current || !playerIds) {
      return addToast({
        title: t('toasts.game_error.title', { ns: 'common' }),
        type: ToastType.Error,
        message: t('toasts.game_error.message', { ns: 'common' }) as string,
        icon: <GamePad />,
        isImmortal: true,
      });
    }

    const selfPlayerLogId: AppPlayerLogId = `${raceId}-${selfPlayerId.current}`;
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

    splittedWordsArray.current = indexConverter.splittedWordsIncludingSpaces;
    updateOtherPlayerCursors(
      playerCursorsWithAvatars.map(cursor => cursor.position),
    );
  }, [game.playerLogsModel, players, raceData, raceId]);

  const handleKeyPressFunction = (char: string): void => {
    const inputStatus = inputHandler(char, raceText[playerCursorAt]);
    if (!selfPlayerId.current) {
      return;
    }

    if (inputStatus === InputStatus.CORRECT) {
      if (noOfInvalidChars > 0) {
        return;
      }
      const playerLog = {
        timestamp: Date.now(),
        textLength: playerCursorAt + 1,
      };
      updatePlayerCursorAt(playerCursorAt + 1);
      dispatch.game.sendTypeLog({
        playerLog,
        raceId,
        playerId: selfPlayerId.current,
      });
    } else if (inputStatus === InputStatus.INCORRECT) {
      updateNoOfInvalidChars(prev => {
        if (prev === MAX_INVALID_CHARS_ALLOWED) {
          return MAX_INVALID_CHARS_ALLOWED;
        }
        return prev + 1;
      });
    } else if (inputStatus === InputStatus.BACKSPACE) {
      updateNoOfInvalidChars(prev => {
        if (prev === 0) {
          return 0;
        }
        return prev - 1;
      });
    }
  };
  useKeyPress(handleKeyPressFunction);

  if (!raceData || !selfPlayerId.current || !playerIds) {
    return <div>Race data not found</div>;
  }

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
        {splittedWordsArray.current?.map((word, wordIndex) => {
          const letters = word.split('');
          const isMostLeftWord = mostLeftWordIndexes.includes(wordIndex);
          const isMostRightWord = mostRightWordIndexes.includes(wordIndex);

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={wordIndex}>
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
                      key={charIndex}
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
                }) ?? null}
              </span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
