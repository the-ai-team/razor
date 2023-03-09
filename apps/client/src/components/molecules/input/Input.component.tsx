import cs from 'classnames';
import React, { ReactElement } from 'react';

export enum InputState {
  Valid = 'valid',
  Invalid = 'invalid',
  Neutral = 'neutral',
}

export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  state?: InputState;
  isDisabled?: boolean;
}

/**
 *
 * @param onChange - Input change handler; (e: React.ChangeEvent<HTMLInputElement>) => void;
 * @param value - Input value
 * @param [placeholder] - Input placeholder (optional)
 * @param [props] - Additional props to pass to input element (optional)
 * @param [isValid] - Whether input text is valid (optional)
 * @param [isInvalid] - Whether input text is invalid (optional)
 * @param [isDisabled] - Whether input is disabled (optional)
 */
export function Input({
  onChange,
  value,
  placeholder = '',
  props,
  state = InputState.Neutral,
  isDisabled = false,
}: InputProps): ReactElement {
  return (
    <span
      className={
        isDisabled
          ? cs(
              'opacity-40',
              'cursor-not-allowed',
              'relative inline-block',
              'w-full min-w-max',
              'before:block before:absolute before:inset-0',
              'before:border-b before:border-neutral-40',
            )
          : cs(
              { 'before:border-white text-white': state === InputState.Valid },
              {
                'before:border-error-60 text-error-60':
                  state === InputState.Invalid,
              },
              {
                'before:border-neutral-40 text-neutral-90':
                  state === InputState.Neutral,
              },
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
          isDisabled
            ? cs(
                'text-neutral-90 bg-[transparent]',
                'placeholder-neutral-40 font-sora tracking-[.5px] text-[1.63rem] text-center',
                'transition-all duration-300',
                'w-full min-w-max py-3 px-4',
              )
            : cs(
                'focus:ring-0 outline-none',
                'relative w-full min-w-max py-3 px-4',
                'bg-[transparent] hover:bg-neutral-40/20 focus:bg-neutral-40/20 hover:rounded focus:rounded',
                'placeholder-neutral-40 font-sora tracking-[.5px] text-[1.63rem] text-center',
                'transition-all duration-300',
              )
        }
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        {...props}
      />
    </span>
  );
}
