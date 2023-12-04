import { ReactElement, useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MAX_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournamentId } from '@razor/models';
import { RootState } from '@razor/store';
import { savedData } from 'apps/client/src/utils/save-player-data';
import cs from 'classnames';

import { ListItem, Text } from '../../../../components';
import { TextSize, TextType } from '../../../../models';

export interface PlayerListProps {
  tournamentId: AppTournamentId;
}

export function PlayerList({
  tournamentId,
}: PlayerListProps): ReactElement | null {
  const game = useSelector((store: RootState) => store.game);
  const [playerIds, setPlayerIds] = useState(
    game.tournamentsModel[tournamentId]?.playerIds,
  );
  const playersModel = useRef(game.playersModel);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTopOverflowing, setTopOverflowing] = useState(false);
  const [isBottomOverflowing, setBottomOverflowing] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    setPlayerIds(game.tournamentsModel[tournamentId]?.playerIds);
    playersModel.current = game.playersModel;
  }, [game.playersModel, game.tournamentsModel, tournamentId]);

  const containerScroll = (): void => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const scrollPosition = element.scrollHeight - element.offsetHeight;

    if (element.scrollTop === 0) {
      setTopOverflowing(false);
    } else if (element.scrollTop === scrollPosition) {
      setBottomOverflowing(false);
    } else {
      setTopOverflowing(true);
      setBottomOverflowing(true);
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }
    const scrollPosition = element.scrollHeight - element.offsetHeight;

    if (scrollPosition <= 0) {
      setBottomOverflowing(false);
      setHasOverflow(false);
    } else {
      setBottomOverflowing(true);
      setHasOverflow(true);
    }

    element.addEventListener('scroll', containerScroll);

    return () => {
      element.removeEventListener('scroll', containerScroll);
    };
  }, [containerRef, playerIds]);

  if (!playerIds?.length || playerIds.length === 0) {
    return null;
  }

  const current_count = playerIds.length.toString();
  const max_count = MAX_ALLOWED_PLAYERS.toString();

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex justify-end items-baseline'>
        <Trans
          i18nKey='room:player_count'
          defaults='<Count><0>{{current_count}}</0><1>/{{max_count}} Players</1></Count>'
          values={{
            current_count: playerIds.length,
            max_count: MAX_ALLOWED_PLAYERS,
          }}
          components={{
            Count: (
              <>
                <Text type={TextType.Title} size={TextSize.Medium}>
                  {current_count}
                </Text>
                <Text type={TextType.Title} size={TextSize.Small}>
                  {max_count}
                </Text>
              </>
            ),
          }}
        />
      </div>
      <div className='w-full h-full overflow-hidden relative'>
        <div
          className={cs(
            'w-full h-full min-h-[200px] overflow-y-auto scrollbar scrollbar-full',
            // Adding right padding to avoid scrollbar overlapping with the content
            { 'pr-5': hasOverflow },
            'overflow-mask',
            { 'top-overflowing': isTopOverflowing },
            { 'bottom-overflowing': isBottomOverflowing },
            'flex flex-col gap-4',
            'relative',
          )}
          ref={containerRef}>
          {playerIds.map((playerId, index) => (
            <ListItem
              title={playersModel.current[playerId].name}
              imgURL={playersModel.current[playerId].avatarLink}
              isHighlighted={playerId === savedData.savedPlayerId}
              key={playerId}
            />
          ))}
          {playerIds.length === 1 ? (
            <div className='text-white self-center py-6'>
              You cannot start a race alone.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
