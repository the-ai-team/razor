import { ReactElement, useState } from 'react';
import { Button, Input, InputState } from '../../molecules';

export interface ButtonWithInputProps {
  onClick: (value: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  children: string;
  inputPlaceholder?: string;
  inputSize?: number;
  maxInputLength?: number;
  icon?: ReactElement;
  inputState?: InputState;
}

export function ButtonWithInput({
  onClick,
  isDisabled,
  children,
  inputPlaceholder,
  inputSize,
  maxInputLength,
  icon,
  inputState = InputState.Neutral,
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
      isDisabled={isDisabled}
      onClick={buttonClickHandler}
      icon={icon}
      input={
        <div>
          <Input
            onChange={inputChangeHandler}
            placeholder={inputPlaceholder}
            props={{ size: inputSize, maxLength: maxInputLength }}
            isDisable={isDisabled}
            state={inputState}
          />
        </div>
      }>
      {children}
    </Button>
  );
}
