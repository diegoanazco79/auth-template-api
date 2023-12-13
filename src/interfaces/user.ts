import mongoose from "mongoose";

import { Auth } from "./auth";

export interface User extends Auth {
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
  role: mongoose.Types.ObjectId;
}
