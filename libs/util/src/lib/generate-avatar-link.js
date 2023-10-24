"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAvatarLink = void 0;
const generateAvatarLink = (playerName) => {
    /** Convert player name text to hex value to use as a seed. */
    const seed = bytesToHex(stringToUTF8Bytes(playerName));
    const image = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${seed}&scale=80`;
    return image;
};
exports.generateAvatarLink = generateAvatarLink;
const bytesToHex = (bytes) => {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};
const stringToUTF8Bytes = (text) => {
    return new TextEncoder().encode(text);
};
//# sourceMappingURL=generate-avatar-link.js.map