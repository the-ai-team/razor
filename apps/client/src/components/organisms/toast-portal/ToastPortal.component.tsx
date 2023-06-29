import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { useToastPortal } from '../../../hooks/useToastPortal';
import { Toast, ToastProps } from '../../molecules';

interface ToastPortalProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export function ToastPortal({
  toasts,
  onClose,
}: ToastPortalProps): ReactElement | null {
  const { portalId, loaded } = useToastPortal();

  return loaded
    ? ReactDOM.createPortal(
        <div className='absolute bottom-0 right-0 w-full h-full'>
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast} onClose={onClose} />
          ))}
        </div>,
        document.getElementById(portalId) as HTMLElement,
      )
    : null;
}
