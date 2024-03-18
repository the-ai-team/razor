import { ReactElement, useEffect } from 'react';

import {
  clearGlobalToastManager,
  setGlobalToastManager,
} from './utils/globalToastManager';
import { AppRouter } from './appRouter';
import { useToastContext } from './hooks';

export function App(): ReactElement {
  const addToast = useToastContext();

  useEffect(() => {
    setGlobalToastManager(addToast);

    return () => {
      clearGlobalToastManager();
    };
  }, [addToast]);

  return <AppRouter />;
}
