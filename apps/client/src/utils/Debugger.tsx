import { ReactElement, useEffect, useState } from 'react';
import cs from 'classnames';

import { savedData } from '../services';

enum DebuggerCommands {
  ENABLE = 'debugger',
}

export function Debugger(): ReactElement {
  const [showDebugger, toggleDebugger] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isExpanded, toggleExpand] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(0);

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
      console.log('Updated data');
    };

    savedData.addEventListener(updateData);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      savedData.removeEventListener(updateData);
      document.removeEventListener('keydown', handleKeyDown);
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
        isExpanded ? 'h-full' : 'h-10',
      )}>
      <div className='flex justify-between mb-2'>
        <h2>Debugger</h2>
        <button type='button' onClick={(): void => toggleExpand(!isExpanded)}>
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
      </div>
    </div>
  );
}
