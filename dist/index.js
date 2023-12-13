"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const role_1 = require("./routes/role");
const auth_1 = require("./routes/auth");
const config_1 = require("./config/config");
const mongo_1 = __importDefault(require("./config/mongo"));
const PORT = config_1.config.port || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(role_1.router);
app.use(auth_1.router);
(0, mongo_1.default)().then(() => console.log("MongoDB connected"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map