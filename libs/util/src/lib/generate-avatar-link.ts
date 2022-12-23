import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

export const generateAvatarLink = (playerName: string): string => {
  /** Convert player name text to hex value to use as a seed. */
  const seed = bytesToHex(stringToUTF8Bytes(playerName));

  const image = `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`;
  return image;
};

const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};

const stringToUTF8Bytes = (text: string): Uint8Array => {
  return new TextEncoder().encode(text);
};
