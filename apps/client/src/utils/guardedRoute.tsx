import { ReactElement } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { savedData } from './save-player-data';

interface GuardedRouteProps {
  component: React.ElementType;
  path: string;
}

export function GuardedRoute({
  component: Component,
}: GuardedRouteProps): ReactElement | null {
  const playerId = savedData.savedPlayerId;
  const { roomId } = useParams();

  if (!playerId) {
    return <Navigate replace to={roomId ? `/${roomId}` : '/'} />;
  }

  return <Component />;
}
