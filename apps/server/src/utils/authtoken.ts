import { v4 as uuidv4, validate, version } from 'uuid';

/**
 * Generate a new auth token using uuid v4.
 * This token will be used to authenticate the player.
 * uuid - https://www.npmjs.com/package/uuid
 */
export function generateAuthToken(): string {
  return uuidv4();
}

/**
 * Validate the auth token.
 * It will check the uuid version and validate the token.
 * @param token
 */
export function validateAuthToken(token: string): boolean {
  return validate(token) && version(token) === 4;
}
