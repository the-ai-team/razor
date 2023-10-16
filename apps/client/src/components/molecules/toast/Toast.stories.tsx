import { Meta, Story } from '@storybook/react';
import { ReactComponent as WarningIcon } from 'pixelarticons/svg/alert.svg';
import { ReactComponent as ErrorIcon } from 'pixelarticons/svg/close.svg';
import { ReactComponent as InfoIcon } from 'pixelarticons/svg/info-box.svg';

import { Toast, ToastProps, ToastType } from './Toast.component';

export default {
  title: 'Molecules/Toast',
  component: Toast,
  args: {
    // This is used only to remove toast from context; therefore not required in storybook
    id: 'sample-id',
    isImmortal: true,
    toastHideDelay: 5000,
    children:
      'This is a toast message. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
} as Meta<ToastProps>;

const Template: Story<ToastProps> = args => <Toast {...args} />;

export const Info = Template.bind({});
Info.args = {
  title: 'Screenshot Captured',
  type: ToastType.Info,
  icon: <InfoIcon className='w-10 h-10' />,
};

export const Warn = Template.bind({});
Warn.args = {
  title: 'Network Unstable',
  type: ToastType.Warning,
  icon: <WarningIcon className='w-10 h-10 ' />,
};

export const Error = Template.bind({});
Error.args = {
  title: 'Server Error',
  type: ToastType.Error,
  icon: <ErrorIcon className='w-10 h-10 ' />,
};
