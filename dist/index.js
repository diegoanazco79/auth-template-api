"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const mongo_1 = __importDefault(require("./config/mongo"));
const role_1 = require("./controllers/role");
const express_validator_1 = require("express-validator");
const role_2 = require("./db-validators/role");
const errorHandlers_1 = require("./utils/errorHandlers");
const PORT = config_1.config.port || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(router);
app.get("/role", role_1.getAllRoles);
app.post("/", [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("name", "Name must be unique").custom(role_2.uniqueRoleName),
    errorHandlers_1.validateFields,
], role_1.postRole);
(0, mongo_1.default)().then(() => console.log("MongoDB connected"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map