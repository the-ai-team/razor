import { v4 as uuidv4, validate, version } from 'uuid';

export function generateAuthToken(): string {
  return uuidv4();
}

export function validateAuthToken(token: string): boolean {
  return validate(token) && version(token) === 4;
}
