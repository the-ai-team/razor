export const generateAvatarLink = async (
  playerName: string,
): Promise<string> => {
  const seed = playerName;
  const image = `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`;
  return image;
};
