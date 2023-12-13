import mongoose from "mongoose";

import { Auth } from "./auth";

export interface User extends Auth {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
  role: string;
}
