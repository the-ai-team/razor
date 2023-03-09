import { ReactElement, useState } from 'react';
import { Button, Input, InputState } from '../../molecules';

export interface ButtonWithInputProps {
  onClick: (value: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  inputPlaceholder?: string;
  icon?: ReactElement;
  inputSize?: number;
  maxInputLength?: number;
  isDisabled?: boolean;
  inputState?: InputState;
}

/**
 *
 * @param onClick - Button click handler, input value and button event will be passed; (value: string, e: React.MouseEvent<HTMLButtonElement>) => void;
 * @param children - Text content of button
 * @param [inputPlaceholder] - Placeholder text for input element (optional)
 * @param [icon] - Icon to be displayed on the left side of the button (optional)
 * @param [inputSize=12] - Size of the input element (optional)
 * @param [maxInputLength=12] - Max length of the input element (optional)
 * @param [isDisabled=false] - Disables the button (optional)
 */
export function ButtonWithInput({
  onClick,
  children,
  inputPlaceholder,
  icon,
  inputSize = 12,
  maxInputLength = 12,
  isDisabled = false,
  inputState = InputState.Neutral,
}: ButtonWithInputProps): ReactElement {
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
            value={inputValue}
            onChange={inputChangeHandler}
            placeholder={inputPlaceholder}
            props={{ size: inputSize, maxLength: maxInputLength }}
            isDisabled={isDisabled}
            state={inputState}
          />
        </div>
      }>
      {children}
    </Button>
  );
}