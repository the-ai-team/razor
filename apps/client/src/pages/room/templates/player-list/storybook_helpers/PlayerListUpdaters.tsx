import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@razor/store';

import { testTournamentId } from './test-race';

export function PlayerListUpdaters(): ReactElement {
  const [newPlayerName, updateNewPlayerName] = useState<string>('');

  const game = useSelector((state: RootState) => state.game);
  const dispatch: Dispatch = useDispatch();

  const addPlayer = (): void => {
    const playerIds = game.tournamentsModel[testTournamentId].playerIds;
    dispatch.game.joinPlayer({
      receivedTournamentId: testTournamentId,
      playerName: newPlayerName || `player${playerIds.length + 1}`,
    });
  };

  const clearLastPlayer = (): void => {
    const playerIds = game.tournamentsModel[testTournamentId].playerIds;
    dispatch.game.clearPlayer({
      playerId: playerIds[playerIds.length - 1],
    });
  };

  return (
    <div>
      <div className='mt-36 flex gap-5 items-center'>
        {/* TODO: Should move this inside to storybook using its controls.
        Storybook Controls didn't have button yet. - https://github.com/storybookjs/storybook/issues/11971 */}
        <h4 className='text-white'>Debug tools</h4>
        <input
          type='text'
          name='player-name'
          placeholder='Player name'
          value={newPlayerName}
          onChange={(e): void => updateNewPlayerName(e.target.value)}
        />
        <button
          type='button'
          className='bg-white p-2 rounded-xl'
          onClick={(): void => addPlayer()}>
          Add player
        </button>
        <button
          type='button'
          className='bg-primary-70 p-2 rounded-xl'
          onClick={(): void => clearLastPlayer()}>
          Clear last player
        </button>
      </div>
    </div>
  );
}
