import { createContext, ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ToastProps } from '../../components';
import { ToastPortal } from '../../components/organisms/toast-portal/ToastPortal.component';

// Omitting id and onClose from Toast props they are handled by the ToastContextProvider
interface ToastContentArgs
  extends Omit<ToastProps, 'id' | 'onClose' | 'children'> {
  message?: string;
}
export type ToastContextArgs = (toast: ToastContentArgs) => void;
export const ToastContext = createContext<ToastContextArgs | undefined>(
  undefined,
);

export interface ToastContextProviderArgs {
  children: ReactElement;
}

export function ToastContextProvider({
  children,
}: ToastContextProviderArgs): ReactElement {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function onToastClose(id: string): void {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }

  /**
   * Use to add a new toast to the toast portal
   * @param toast
   */
  function addToast({ message, ...args }: ToastContentArgs): void {
    const id = `toast${uuidv4()}`;

    // TODO: make toasts stack on older toasts, instead of replacing them
    setToasts([{ ...args, children: message, id }]);
  }

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastPortal
        onClose={(id: string): void => {
          onToastClose(id);
        }}
        toasts={toasts}
      />
    </ToastContext.Provider>
  );
}
