import { ReactElement, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PlayerId } from '@razor/models';

import { savedData } from './save-player-data';

interface GuardedRouteProps {
  component: React.ElementType;
  path: string;
}

export function GuardedRoute({
  component: Component,
}: GuardedRouteProps): ReactElement | null {
  const [playerId, setPlayerId] = useState<PlayerId | null>(
    savedData.savedPlayerId,
  );

  useEffect(() => {
    const updatePlayerId = savedData.addEventListener(() => {
      setPlayerId(savedData.savedPlayerId);
    });

    return () => {
      savedData.removeEventListener(() => updatePlayerId);
    };
  }, []);

  const { roomId } = useParams();

  if (!playerId) {
    return <Navigate replace to={roomId ? `/${roomId}` : '/'} />;
  }

  return <Component />;
}
