import { generateAvatarLink } from './generate-avatar-link';

describe('[Utils] generateAvatarLink', () => {
  it.each([
    ['Player', '506c61796572'],
    ['Razor123', '52617a6f72313233'],
  ])('Generate avatar link for player "%s"', async (name, seed) => {
    const image = await generateAvatarLink(name);
    expect(image).toMatch(
      `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`,
    );
  });
});
