import "dotenv/config";
import express from "express";
import cors from "cors";

import { config } from "./config/config";
import dbConnect from "./config/mongo";
import router from "./routes";
import { getAllRoles } from "./controllers/role";

const PORT = config.port || 3001;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(router);

app.get("/role", getAllRoles)

dbConnect().then(() => console.log("MongoDB connected"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
