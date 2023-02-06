import cs from 'classnames';
import React, { ReactElement } from 'react';

export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  isValid?: boolean;
  isInvalid?: boolean;
  isDisable?: boolean;
}

export function Input({
  onChange,
  value,
  placeholder,
  props,
  isValid,
  isInvalid,
  isDisable,
}: InputProps): ReactElement {
  placeholder ||= '';
  isValid ||= false;
  isInvalid ||= false;
  isDisable ||= false;

  return (
    <input
      className={
        isDisable
          ? cs(
              'opacity-40',
              'cursor-not-allowed',
              'w-full py-2 px-4 min-w-max',
              'border-b text-neutral-90 border-neutral-40',
              'bg-[transparent]',
              'placeholder-neutral-40 font-major tracking-[.5px] text-[1.63rem] text-center',
              'transition-all duration-300',
            )
          : cs(
              { 'border-white text-white': isValid },
              { 'border-error-60 text-error-60': isInvalid },
              { 'text-neutral-90 border-neutral-40': !isValid && !isInvalid },
              'border-b hover:border-b-2 focus:border-b-4',
              'focus:ring-0 outline-none',
              'w-full py-2 px-4 min-w-max',
              'bg-[transparent] focus:bg-neutral-40/20 hover:rounded focus:rounded',
              'placeholder-neutral-40 font-major tracking-[.5px] text-[1.63rem] text-center',
              'transition-all duration-300',
            )
      }
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={isDisable}
      {...props}
    />
  );
}
