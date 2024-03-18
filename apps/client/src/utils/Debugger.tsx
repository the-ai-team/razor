import { ReactElement, useEffect, useState } from 'react';
import cs from 'classnames';

import { socket, tryReconnect } from '../services';

import { savedData } from './save-player-data';

enum DebuggerCommands {
  ENABLE = 'debugger',
}

export function Debugger(): ReactElement {
  const [showDebugger, toggleDebugger] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isExpanded, toggleExpand] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(0);
  const [connectionLogs, setConnectionLogs] = useState<string[]>([]);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const validCommands: string[] = [DebuggerCommands.ENABLE];

  useEffect((): void => {
    if (validCommands.some(command => command.startsWith(typedText))) {
      // Check if typedText is a valid command
      if (validCommands.includes(typedText)) {
        switch (typedText) {
          case DebuggerCommands.ENABLE:
            toggleDebugger(!showDebugger);
            break;
          default:
            break;
        }
        setTypedText('');
      }
    } else {
      setTypedText('');
    }
  }, [typedText]);

  const handleKeyDown = (event: KeyboardEvent): void => {
    // Check pressed key between a-z
    if (!alphabet.includes(event.key)) {
      setTypedText('');
      return;
    }
    setTypedText(prev => prev + event.key);
  };

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      toggleDebugger(true);
    }

    const updateData = (): void => {
      setLastUpdatedTime(Date.now());
      console.log('Updated saved data');
    };

    const getFormattedTime = (): string => {
      const time = new Date(Date.now());
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };

    const addConnectedLog = (): void => {
      setConnectionLogs(prev => [
        ...prev,
        `Connected @${getFormattedTime()}`,
        savedData.authToken ? `AuthToken: ${savedData.authToken}` : '',
      ]);
    };
    const addDisconnectedLog = (reason: string): void => {
      setConnectionLogs(prev => [
        ...prev,
        `[${reason}] Disconnected @${getFormattedTime()}`,
      ]);
    };

    savedData.addEventListener(updateData);
    document.addEventListener('keydown', handleKeyDown);
    socket.on('connect', addConnectedLog);
    socket.on('disconnect', addDisconnectedLog);

    return () => {
      savedData.removeEventListener(updateData);
      document.removeEventListener('keydown', handleKeyDown);
      socket.off('connect', addConnectedLog);
      socket.off('disconnect', addDisconnectedLog);
    };
  }, []);

  if (!showDebugger) {
    return <></>;
  }

  return (
    <div
      className={cs(
        'absolute bg-neutral-20  p-2 top-0 right-0 z-50',
        'text-white border border-neutral-40',
        'font-roboto text-sm text-right',
        'overflow-hidden',
        'transition-all duration-300',
        isExpanded ? 'h-full' : 'h-12',
      )}>
      <div className='flex justify-between items-center mb-2'>
        <h2>Debugger</h2>
        <button
          className='bg-neutral-40 hover:bg-neutral-50 px-2 py-1 rounded'
          type='button'
          onClick={(): void => toggleExpand(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <p>Last updated - {lastUpdatedTime}</p>
      <div className='flex flex-col mt-2'>
        <span>Version: {import.meta.env.MODE}</span>
        <b>Saved Data</b>
        <span>AuthToken: {savedData.authToken || 'N/A'}</span>
        <span>PlayerId: {savedData.savedPlayerId || 'N/A'}</span>
        <span>UserName: {savedData.savedPlayerName || 'N/A'}</span>
        <span>RoomId: {savedData.savedRoomId || 'N/A'}</span>
        <span>SocketId: {savedData.savedSocketId || 'N/A'}</span>
        <span className='flex justify-end items-center gap-4 my-2'>
          {socket.connected ? (
            <>
              <div className='rounded-full bg-white h-2 w-2 inline-block' />
              Connected
            </>
          ) : (
            <>
              <div className='rounded-full bg-primary-40 h-2 w-2 inline-block' />
              Disconnected
            </>
          )}
        </span>
        <button
          type='button'
          className='bg-neutral-40 hover:bg-neutral-50 px-2 py-1 rounded mt-2'
          onClick={(): void => {
            socket.disconnect();
          }}>
          Disconnect Sockets
        </button>
        <button
          type='button'
          className='bg-neutral-40 hover:bg-neutral-50 px-2 py-1 rounded mt-2'
          onClick={(): void => {
            tryReconnect('transport close');
          }}>
          Try reconnect
        </button>
        <span className='mt-2'>Connection Logs</span>
        <div className='flex flex-col gap-1 max-h-[300px] overflow-y-scroll scroll-m-10 p-2 my-2 bg-neutral-40 rounded'>
          {connectionLogs.map((log, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>{log}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
