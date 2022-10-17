// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';
import { ReactElement } from 'react';
import NxWelcome from './nx-welcome';

export function App(): ReactElement {
  return (
    <>
      <NxWelcome title='client' />
      <div />
    </>
  );
}

export default App;
