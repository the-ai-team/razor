import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@razor/store';

import './services/socket-communication';
import './i18n';
import './controllers';

import { ToastContextProvider } from './providers';
import { Router } from './router';

import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <Router />
      </ToastContextProvider>
    </Provider>
  </StrictMode>,
);
