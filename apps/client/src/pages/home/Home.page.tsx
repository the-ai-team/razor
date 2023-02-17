import { ReactElement, useState } from 'react';
import { endSocket, initializeSocket } from '../../services/initialize-socket';

export function Home(): ReactElement {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');

  return (
    <>
      <input
        type='text'
        value={playerName}
        onChange={(e): void => setPlayerName(e.target.value)}
        className='border-2 block m-2 p-2'
      />
      <input
        type='text'
        value={roomId}
        onChange={(e): void => setRoomId(e.target.value)}
        className='border-2 block m-2 p-2'
      />

      <button
        onClick={(): void => initializeSocket({ playerName, roomId })}
        type='button'
        className='border-2 block m-2 p-2'>
        Create/Join room
      </button>
      <button type='button' onClick={(): void => endSocket()}>
        socket end
      </button>
    </>
  );
}
