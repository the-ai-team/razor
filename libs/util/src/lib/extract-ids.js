"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidityOfId = exports.extractId = exports.ExtractIdType = void 0;
var ExtractIdType;
(function (ExtractIdType) {
    ExtractIdType["Tournament"] = "tournament";
    ExtractIdType["Player"] = "player";
    ExtractIdType["Race"] = "race";
    ExtractIdType["PlayerLog"] = "playerLog";
})(ExtractIdType || (exports.ExtractIdType = ExtractIdType = {}));
/** Extract an id from a compound id
 *
 * @param inputId - Compound id to extract from.
 * @param inputIdType - Type of id to input id.
 * @param outputIdType - Type of id to extract.
 * @returns - Extracted id.
 */
const extractId = (inputId, inputIdType, outputIdType) => {
    if (inputIdType === outputIdType) {
        return inputId;
    }
    // Check the validity of the input id.
    const validInput = (0, exports.checkValidityOfId)(inputIdType, inputId);
    if (!validInput) {
        throw new Error('Invalid input value');
    }
    const splittedId = inputId.split('-');
    switch (outputIdType) {
        case ExtractIdType.Tournament:
            // Extract the first part of the id if the input id type is "race" or "playerLog".
            if (inputIdType === ExtractIdType.Race) {
                return splittedId[0];
            }
            else if (inputIdType === ExtractIdType.PlayerLog) {
                return splittedId[0];
            }
            else {
                throw new Error('Invalid type');
            }
        case ExtractIdType.Player:
            // Extract the second part of the id if the input id type is "playerLog".
            if (inputIdType === ExtractIdType.PlayerLog) {
                return splittedId[2];
            }
            else {
                throw new Error('Invalid type');
            }
        case ExtractIdType.Race:
            // Extract the first two parts of the id if the input id type is "playerLog".
            if (inputIdType === ExtractIdType.PlayerLog) {
                return `${splittedId[0]}-${splittedId[1]}`;
            }
            else {
                throw new Error('Invalid type');
            }
        default:
            throw new Error('Invalid type');
    }
};
exports.extractId = extractId;
/** Checking validity of an id
 *
 * @param type - Type of id to check.
 * @param id - Id to check.
 */
const checkValidityOfId = (type, id) => {
    switch (type) {
        case ExtractIdType.Tournament:
            return id.match(/^T:[a-zA-Z0-9]{8}$/);
        case ExtractIdType.Player:
            return id.match(/^P:[a-zA-Z0-9]{8}$/);
        case ExtractIdType.Race:
            return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/);
        case ExtractIdType.PlayerLog:
            return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/);
    }
};
exports.checkValidityOfId = checkValidityOfId;
//# sourceMappingURL=extract-ids.js.map