"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveZeroPadding = void 0;
/** Give zero padding according to the size given.
 * (eg: if size is 3, 1 -> 001, 12 -> 012, 123 -> 123)
 *
 * @param num - Number to be padded.
 * @param size - Size of the padding.
 * @returns Padded number.
 */
const giveZeroPadding = (num, size) => {
    return `${num}`.padStart(size, '0');
};
exports.giveZeroPadding = giveZeroPadding;
//# sourceMappingURL=give-zero-padding.js.map