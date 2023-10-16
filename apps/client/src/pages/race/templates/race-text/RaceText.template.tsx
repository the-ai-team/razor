import { Fragment, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { AppRaceId } from '@razor/models';
import { RootState } from '@razor/store';
import { Cursor } from 'apps/client/src/components';
import cs from 'classnames';
import { nanoid } from 'nanoid';

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
  const spaceSeparatedText = raceText.split(' ');
  const playerCursorAt = [2, 4];

  return (
    <div className=''>
      <div
        className={cs(
          'relative w-full py-6 pl-20 pr-10',
          'bg-neutral-20  border-[3px] border-neutral-40',
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
            const isCursorAtSpace =
              playerCursorAt[0] === wordIndex &&
              playerCursorAt[1] >= word.length;
            return (
              <Fragment key={nanoid()}>
                {/* Utilizing separate spans to prevent text from wrapping in the middle of a word. */}
                <span
                  className={cs(
                    { 'indent-32': wordIndex === 0 },
                    'bg-surface bg-opacity-60',
                  )}>
                  {letters.map((letter, letterIndex) => {
                    const isCursorAt =
                      playerCursorAt[0] === wordIndex &&
                      playerCursorAt[1] === letterIndex;
                    const isLetterBehindCursor =
                      wordIndex < playerCursorAt[0] ||
                      (wordIndex === playerCursorAt[0] &&
                        letterIndex < playerCursorAt[1]);

                    return (
                      <span
                        key={nanoid()}
                        className={cs('relative pl-[0.025em]', {
                          'text-neutral-30': isLetterBehindCursor,
                        })}>
                        {isCursorAt ? <Cursor /> : null}
                        {letter}
                      </span>
                    );
                  })}
                </span>

                {wordIndex !== spaceSeparatedText.length - 1 && (
                  <span className={cs('bg-surface bg-opacity-60 relative ')}>
                    {isCursorAtSpace ? <Cursor isAtSpace /> : null}
                    &nbsp;
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
