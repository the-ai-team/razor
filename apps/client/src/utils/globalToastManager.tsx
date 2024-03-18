import { ReactComponent as Disconnect } from 'pixelarticons/svg/cellular-signal-off.svg';
import { ReactComponent as CloseIcon } from 'pixelarticons/svg/close.svg';

import { ToastType } from '../components';
import { ToastContentArgs } from '../providers';

export const globalToastIcons = {
  close: CloseIcon,
  disconnect: Disconnect,
};

export type GlobalToastIcons = keyof typeof globalToastIcons;

let addToastGlobal: ((args: ToastContentArgs) => void) | null;

export const setGlobalToastManager = (
  addToast: (args: ToastContentArgs) => void,
): void => {
  addToastGlobal = addToast;
};

export const clearGlobalToastManager = (): void => {
  addToastGlobal = null;
};

export const addToast = ({
  message,
  title,
  type,
  icon,
}: {
  message: string;
  title: string;
  type: ToastType;
  icon: GlobalToastIcons;
}): void => {
  const Icon = globalToastIcons[icon];
  if (addToastGlobal) {
    addToastGlobal({ message, title, type, icon: <Icon /> });
  }
};
