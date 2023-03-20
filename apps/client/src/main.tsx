import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from '@razor/store';

import './services/socket-communication';
import './i18n';
import './controllers';

import { NotFound } from './pages/NotFound';
import { Home, Layout, Leaderboard, Race, Room } from './pages';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':roomId'>
              <Route index element={<Home />} />
              <Route path='room' element={<Room />} />
              <Route path='race' element={<Race />} />
              <Route path='leaderboard' element={<Leaderboard />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
