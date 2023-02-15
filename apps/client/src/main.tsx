import { store } from '@razor/store';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Layout } from './pages';
import './services/initialize-socket';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <div className='h-screen'>
        <Layout />
      </div>
    </Provider>
  </StrictMode>,
);
