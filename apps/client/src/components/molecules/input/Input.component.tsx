import cs from 'classnames';
import React, { ReactElement, useState } from 'react';

enum InputState {
  Valid = 'valid',
  Invalid = 'invalid',
  Neutral = 'neutral',
}

export interface InputProps {
  value?: string;
  placeholder?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  state?: InputState;
}

export function Input({
  value,
  placeholder = '',
  props,
  state = InputState.Neutral,
}: InputProps): ReactElement {
  const [inputValue, setInputValue] = useState<string>(value || '');

  return (
    <input
      className={cs(
        { 'border-white text-white': state === InputState.Valid },
        { 'border-error-60 text-error-60': state === InputState.Invalid },
        { 'text-neutral-90 border-neutral-40': state === InputState.Neutral },
        'border-b hover:border-b-2 focus:border-b-4',
        'focus:ring-0 outline-none',
        'w-full py-2 px-4 min-w-max',
        'bg-[transparent] focus:bg-neutral-40/20 hover:rounded focus:rounded',
        'placeholder-neutral-40 font-major tracking-[.5px] text-[1.63rem] text-center',
        'transition-all duration-300',
      )}
      type='text'
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
      }}
      placeholder={placeholder}
      {...props}
    />
  );
}
