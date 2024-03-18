import { ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AppFinishedPlayerValues,
  AppLeaderboard,
  AppPlayerStatus,
  AppRaceId,
  AppTimeoutPlayerValues,
} from '@razor/models';
import { RootState } from '@razor/store';
import { ListItem, Text } from 'apps/client/src/components';
import { TextSize, TextType } from 'apps/client/src/models';
import { savedData } from 'apps/client/src/utils/save-player-data';
import cs from 'classnames';

export interface LeaderboardProps {
  raceId: AppRaceId;
}

export function LeaderboardList({
  raceId,
}: LeaderboardProps): ReactElement | null {
  const { t } = useTranslation(['leaderboard']);

  const game = useSelector((store: RootState) => store.game);
  const entries: AppLeaderboard = game.leaderboardsModel[raceId] || [];
  const completedEntries = entries.filter(
    entry => entry.status === AppPlayerStatus.Complete,
  );
  const timeoutEntries = entries.filter(
    entry => entry.status === AppPlayerStatus.Timeout,
  );
  const racePlayers = game.racesModel[raceId]?.players || [];

  const raceTextLength = game.racesModel[raceId]?.text.length || 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const [topCoverVisible, setTopCoverVisible] = useState(false);
  const [bottomCoverVisible, setBottomCoverVisible] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const containerScroll = (): void => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const scrollPosition = element.scrollHeight - element.offsetHeight;

    if (element.scrollTop === 0) {
      setTopCoverVisible(false);
    } else if (element.scrollTop === scrollPosition) {
      setBottomCoverVisible(false);
    } else {
      setTopCoverVisible(true);
      setBottomCoverVisible(true);
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const scrollPosition = element.scrollHeight - element.offsetHeight;

    if (scrollPosition <= 0) {
      setBottomCoverVisible(false);
      setHasOverflow(false);
    } else {
      setBottomCoverVisible(true);
      setHasOverflow(true);
    }

    element.addEventListener('scroll', containerScroll);

    return () => {
      element.removeEventListener('scroll', containerScroll);
    };
  }, [containerRef]);

  if (!entries) {
    return null;
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full overflow-hidden relative'>
        <div
          className={cs(
            { 'opacity-0': !topCoverVisible },
            'block absolute  w-full',
            'top-0 h-12',
            'bg-gradient-to-b from-surface to-transparent',
            'z-10',
            'transition-all duration-300',
          )}
        />
        <div
          className={cs(
            'w-full h-full overflow-y-auto scrollbar scrollbar-full',
            // Adding right padding to avoid scrollbar overlapping with the content
            { 'pr-5': hasOverflow },
            'flex flex-col gap-4',
            'relative',
          )}
          ref={containerRef}>
          {completedEntries.map((entry, index) => {
            const player = racePlayers[entry.playerId];
            if (!player) {
              return <></>;
            }

            const values = entry.values as AppFinishedPlayerValues;

            return (
              <ListItem
                title={player.name}
                imgURL={player.avatarLink}
                number={index + 1}
                rightText={`${values.wpm.toFixed(2)} wpm`}
                isHighlighted={entry.playerId === savedData.savedPlayerId}
                key={entry.playerId}
              />
            );
          })}
          {completedEntries?.length > 0 && timeoutEntries?.length > 0 ? (
            <div className='w-full h-2 flex-shrink-0 bg-neutral-40 bg-opacity-60 rounded-full my-6 relative'>
              <Text
                type={TextType.Label}
                size={TextSize.Small}
                className='absolute w-full -top-3.5 flex justify-center'>
                {t('timeout_players') as string}
              </Text>
            </div>
          ) : null}
          {timeoutEntries.map(entry => {
            const player = racePlayers[entry.playerId];
            if (!player) {
              return <></>;
            }

            const values = entry.values as AppTimeoutPlayerValues;
            const completePercentage =
              raceTextLength > 0
                ? Math.round((values.distance / raceTextLength) * 100)
                : 'N/A';

            return (
              <ListItem
                title={player.name}
                imgURL={player.avatarLink}
                rightText={`${completePercentage}%`}
                isHighlighted={entry.playerId === savedData.savedPlayerId}
                isTranslucent
                key={entry.playerId}
              />
            );
          })}
        </div>
        <div
          className={cs(
            { 'opacity-0': !bottomCoverVisible },
            'block absolute w-full',
            'bottom-0 h-12',
            'bg-gradient-to-t from-surface to-transparent',
            'z-10',
            'transition-all duration-300',
          )}
        />
      </div>
    </div>
  );
}
