export enum InputStatus {
  CORRECT,
  INCORRECT,
  BACKSPACE,
}

export function inputHandler(
  char: string,
  nextCharToType: string,
): InputStatus {
  switch (char) {
    case 'BACKSPACE':
      return InputStatus.BACKSPACE;
    case 'SPACE':
      if (nextCharToType === ' ') {
        return InputStatus.CORRECT;
      }
      break;
    default:
      if (nextCharToType === char) {
        return InputStatus.CORRECT;
      }
      break;
  }
  return InputStatus.INCORRECT;
}
