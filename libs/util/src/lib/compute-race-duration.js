"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeRaceDuration = void 0;
const constants_1 = require("@razor/constants");
/** Compute the time it would take for an average person to type given race text.
 *
 * @param text - Race text.
 * @returns Maximum allowed duration in seconds.
 */
const computeRaceDuration = (text) => {
    /** Average word count
     *
     * Assuming that the average word has 5 letters (and with the space 6 characters).
     */
    const wordCount = text.length / 6;
    const averageTime = Math.ceil((wordCount / constants_1.AVERAGE_WPM) * 60);
    const maximumAllowedTime = Math.ceil(averageTime * 1.35);
    return maximumAllowedTime;
};
exports.computeRaceDuration = computeRaceDuration;
//# sourceMappingURL=compute-race-duration.js.map