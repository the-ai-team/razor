import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotFound } from './pages/NotFound';
import { GuardedRoute } from './utils/guardedRoute';
import { Home, Layout, Leaderboard, Race, Room } from './pages';

export function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':roomId'>
            <Route index element={<Home />} />
            <Route
              path='room'
              element={<GuardedRoute path='room' component={Room} />}
            />
            <Route
              path='race'
              element={<GuardedRoute path='race' component={Race} />}
            />
            <Route
              path='leaderboards/:raceIndex'
              element={
                <GuardedRoute path='leaderboard' component={Leaderboard} />
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
