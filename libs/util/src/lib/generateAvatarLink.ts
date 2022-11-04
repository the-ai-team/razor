import { AppIdNumberType } from '@razor/models';
import { generateUid } from './generateUid';

export const generateAvatarLink = async (): Promise<string> => {
  const randomSeed = await generateUid(AppIdNumberType.General);
  const image = `https://avatars.dicebear.com/api/open-peeps/${randomSeed}.svg`;
  return image;
};
