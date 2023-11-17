import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@razor/store';

import './services/socket-communication';
import './i18n';
import './controllers';

import { Debugger } from './utils/Debugger';
import { App } from './app';
import { ToastContextProvider } from './providers';

import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
      <Debugger />
    </Provider>
  </StrictMode>,
);
