"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceIdSchema = void 0;
const zod_1 = require("zod");
// ==== Primary Schemas ==== //
exports.raceIdSchema = zod_1.z.custom(id => /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/.test(id));
//# sourceMappingURL=race.js.map