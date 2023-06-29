import { useContext } from 'react';

import { ToastContext, ToastContextArgs } from '../providers';

export function useToastContext(): ToastContextArgs {
  const ctx = useContext(ToastContext);

  if (ctx === undefined) {
    throw new Error('ToastContext not found.');
  }

  return ctx;
}
