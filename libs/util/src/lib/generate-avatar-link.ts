import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

export const generateAvatarLink = async (
  playerName: string,
): Promise<string> => {
  const seed = bytesToHex(stringToUTF8Bytes(playerName));

  const image = `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`;
  return image;
};

const bytesToHex = (bytes: Uint8Array) => {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};

const stringToUTF8Bytes = (text: string) => {
  return new TextEncoder().encode(text);
};
