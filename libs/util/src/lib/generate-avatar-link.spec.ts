import { TextEncoder } from 'util';
import { generateAvatarLink } from './generate-avatar-link';

global.TextEncoder = TextEncoder;

describe('[Utils] generateAvatarLink', () => {
  it.each([
    ['Player', '506c61796572'],
    ['Razor123', '52617a6f72313233'],
  ])('Generate avatar link for player "%s"', (name, seed) => {
    const image = generateAvatarLink(name);
    expect(image).toMatch(
      `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`,
    );
  });
});
