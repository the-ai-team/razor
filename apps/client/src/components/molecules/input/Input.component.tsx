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
    <span
      className={
        isDisable
          ? cs('border-b border-neutral-40', 'opacity-40', 'cursor-not-allowed')
          : cs(
              'relative inline-block',
              'w-full min-w-max',
              'before:block before:absolute before:inset-0',
              'before:border-neutral-40 before:border-b before:focus-within:border-b-4',
              'before:hover:rounded',
              'before:transition-all before:duration-300',
            )
      }>
      <input
        className={
          isDisable
            ? cs(
                'text-neutral-90 bg-[transparent]',
                'placeholder-neutral-40 font-sora tracking-[.5px] text-[1.63rem] text-center',
                'transition-all duration-300',
                'w-full min-w-max py-2 px-4',
              )
            : cs(
                { 'border-white text-white': isValid },
                { 'border-error-60 text-error-60': isInvalid },
                {
                  'text-neutral-90 border-neutral-40': !isValid && !isInvalid,
                },
                'focus:ring-0 outline-none',
                'relative w-full min-w-max py-2 px-4',
                'bg-[transparent] hover:bg-neutral-40/20 focus:bg-neutral-40/20 hover:rounded focus:rounded',
                'placeholder-neutral-40 font-sora tracking-[.5px] text-[1.63rem] text-center',
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
    </span>
  );
}
