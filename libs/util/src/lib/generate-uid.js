"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUid = void 0;
const constants_1 = require("@razor/constants");
const models_1 = require("@razor/models");
const nanoid_1 = require("nanoid");
/** Nanoid with custom alphabet */
const nanoid = (0, nanoid_1.customAlphabet)(constants_1.NANOID_ALPHABET, constants_1.GENERAL_ID_LENGTH);
/** Generate an unique id for given id type.
 *
 * @param type - Type of id to generate.
 * @returns - Generated id.
 */
const generateUid = (type) => {
    switch (type) {
        case models_1.AppIdNumberType.Tournament:
            return `T:${nanoid(constants_1.TOURNAMENT_ID_LENGTH)}`;
        case models_1.AppIdNumberType.Player:
            return `P:${nanoid(constants_1.PLAYER_ID_LENGTH)}`;
        default:
            return nanoid(constants_1.GENERAL_ID_LENGTH);
    }
};
exports.generateUid = generateUid;
//# sourceMappingURL=generate-uid.js.map