import "dotenv/config";
import { connect } from "mongoose";

import { config } from "./config";

/**
 * Connect to MongoDB
 */
const dbConnect = async () => {
  const DB_URI = config.mongo_db_uri || "";
  await connect(DB_URI);
};

export default dbConnect;
