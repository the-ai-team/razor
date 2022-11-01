import { store } from '@razor/store';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
