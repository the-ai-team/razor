import { ReactElement, useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MAX_ALLOWED_PLAYERS } from '@razor/constants';
import { AppTournamentId } from '@razor/models';
import { RootState } from '@razor/store';
import cs from 'classnames';

import { ListItem, Text } from '../../../../components';
import { TextSize, TextType } from '../../../../models';

export interface PlayerListProps {
  tournamentId: AppTournamentId;
}

export function PlayerList({ tournamentId }: PlayerListProps): ReactElement {
  const game = useSelector((store: RootState) => store.game);
  const [playerIds, setPlayerIds] = useState(
    game.tournamentsModel[tournamentId]?.playerIds,
  );
  const playersModel = useRef(game.playersModel);
  const containerRef = useRef<HTMLDivElement>(null);
  const [topCoverVisible, setTopCoverVisible] = useState(false);
  const [bottomCoverVisible, setBottomCoverVisible] = useState(true);
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

    containerRef.current?.addEventListener('scroll', containerScroll);
  }, [containerRef, playerIds]);

  if (!playerIds?.length || playerIds.length === 0) {
    return <div></div>;
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
          {playerIds.map((playerId, index) => (
            <ListItem
              title={playersModel.current[playerId].name}
              imgURL={playersModel.current[playerId].avatarLink}
              number={index + 1}
              key={playerId}
            />
          ))}
          {playerIds.length === 1 ? (
            <div className='text-white self-center py-6'>
              You cannot start a race alone.
            </div>
          ) : null}
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
