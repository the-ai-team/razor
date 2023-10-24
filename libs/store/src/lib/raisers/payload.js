"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadNotProvided = void 0;
const models_1 = require("@razor/models");
/** Logger raiser for payload not provided for a function.
 *
 * @param funcName - Name of the function which is raising the error.
 * @param dispatch - Dispatch function of the store.
 * @param payloadName - Missing payload item.
 */
const payloadNotProvided = (funcName, dispatch, payloadName) => {
    dispatch.game.sendLogMessage({
        message: `[${funcName}] ${payloadName} is not provided.`,
        code: models_1.AppErrorCode.PayloadNotProvided,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.payloadNotProvided = payloadNotProvided;
//# sourceMappingURL=payload.js.map