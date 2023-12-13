"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const RoleModel = (0, mongoose_1.model)("roles", RoleSchema);
exports.default = RoleModel;
//# sourceMappingURL=role.js.map