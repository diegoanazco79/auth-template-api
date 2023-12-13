import "dotenv/config";
import express from "express";
import cors from "cors";

import { config } from "./config/config";
import dbConnect from "./config/mongo";
import router from "./routes";
import { getAllRoles, postRole } from "./controllers/role";
import { check } from "express-validator";
import { uniqueRoleName } from "./db-validators/role";
import { validateFields } from "./utils/errorHandlers";

const PORT = config.port || 3001;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(router);

app.get("/role", getAllRoles)
app.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must be unique").custom(uniqueRoleName),
    validateFields,
  ],
  postRole
);

dbConnect().then(() => console.log("MongoDB connected"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
