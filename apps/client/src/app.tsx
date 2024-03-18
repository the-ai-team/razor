import { ReactElement, useEffect } from 'react';

import {
  clearGlobalToastManager,
  setGlobalToastManager,
} from './utils/globalToastManager';
import { useToastContext } from './hooks';
import { Router } from './router';

export function App(): ReactElement {
  const addToast = useToastContext();

  useEffect(() => {
    setGlobalToastManager(addToast);

    return () => {
      clearGlobalToastManager();
    };
  }, [addToast]);

  return <Router />;
}
