import { ReactElement, useState } from 'react';
import { Button, Input } from '../../molecules';

export interface ButtonWithInputProps {
  onClick: (value: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisable?: boolean;
  children: string;
  inputPlaceholder?: string;
  inputSize?: number;
  maxInputLength?: number;
}

export function ButtonWithInput({
  onClick,
  isDisable,
  children,
  inputPlaceholder,
  inputSize,
  maxInputLength,
}: ButtonWithInputProps): ReactElement {
  inputSize ||= 12;
  maxInputLength ||= 12;

  const [inputValue, setInputValue] = useState<string>('');

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    // Prevents onClick from firing when input element is clicked
    if (!(e.target instanceof HTMLInputElement)) {
      onClick(inputValue, e);
    }
  };

  return (
    <Button
      isDisable={isDisable}
      onClick={buttonClickHandler}
      input={
        <div>
          <Input
            onChange={inputChangeHandler}
            placeholder={inputPlaceholder}
            props={{ size: inputSize, maxLength: maxInputLength }}
          />
        </div>
      }>
      {children}
    </Button>
  );
}
